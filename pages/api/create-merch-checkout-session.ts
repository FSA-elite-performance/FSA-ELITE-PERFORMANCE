import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import {
  LEGAL_BUSINESS_NAME,
  PUBLIC_BUSINESS_NAME,
  STRIPE_STATEMENT_DESCRIPTOR,
} from '../../lib/businessDetails';
import { MERCH_PRODUCTS } from '../../lib/merchCatalog';
import { MEMBERSHIP_COOKIE_NAME, parseCookie, verifyMembershipToken } from '../../lib/membershipAccess';

type CheckoutItem = {
  productId?: unknown;
  quantity?: unknown;
};

type RequestBody = {
  items?: unknown;
};

type SuccessResponse = { url: string };
type ErrorResponse = { error: string };

const MAX_ITEMS = 20;
const MAX_QTY_PER_ITEM = 10;

let stripeClient: Stripe | null = null;

function getStripeClient(secretKey: string): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

function isValidBaseUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.hostname === 'localhost';
  } catch {
    return false;
  }
}

function firstHeaderValue(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    const firstValue = value[0]?.trim();
    return firstValue || null;
  }

  const normalized = value?.trim();
  return normalized || null;
}

function resolveBaseUrl(req: NextApiRequest): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, '');
  if (configured && isValidBaseUrl(configured)) {
    return configured;
  }

  const forwardedProto = firstHeaderValue(req.headers['x-forwarded-proto'])?.split(',')[0]?.trim();
  const forwardedHost = firstHeaderValue(req.headers['x-forwarded-host'])?.split(',')[0]?.trim();
  const host = forwardedHost ?? firstHeaderValue(req.headers.host);

  if (!host) {
    return 'http://localhost:3000';
  }

  const protocol =
    forwardedProto === 'http' || forwardedProto === 'https'
      ? forwardedProto
      : host.startsWith('localhost')
        ? 'http'
        : 'https';

  return `${protocol}://${host}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const membershipToken = parseCookie(req.headers.cookie, MEMBERSHIP_COOKIE_NAME);
  const hasMembership = await verifyMembershipToken(membershipToken);
  if (!hasMembership) {
    return res.status(401).json({ error: 'Membership is required before merch checkout.' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment configuration error. Contact support.' });
  }

  const baseUrl = resolveBaseUrl(req);
  if (!isValidBaseUrl(baseUrl)) {
    console.error('Unable to resolve a valid checkout base URL');
    return res.status(500).json({ error: 'Payment configuration error. Contact support.' });
  }

  const { items } = req.body as RequestBody;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items must be a non-empty array.' });
  }

  if (items.length > MAX_ITEMS) {
    return res.status(400).json({ error: `Too many items. Maximum is ${MAX_ITEMS}.` });
  }

  const catalogMap = new Map(MERCH_PRODUCTS.map((product) => [product.id, product]));
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const checkoutItem = item as CheckoutItem;
    if (typeof checkoutItem.productId !== 'string' || typeof checkoutItem.quantity !== 'number') {
      return res.status(400).json({ error: 'Each item must include productId and quantity.' });
    }

    const sanitizedProductId = checkoutItem.productId.trim();
    if (!sanitizedProductId) {
      return res.status(400).json({ error: 'productId cannot be empty.' });
    }

    if (!Number.isInteger(checkoutItem.quantity) || checkoutItem.quantity < 1 || checkoutItem.quantity > MAX_QTY_PER_ITEM) {
      return res.status(400).json({ error: `quantity must be an integer between 1 and ${MAX_QTY_PER_ITEM}.` });
    }

    const product = catalogMap.get(sanitizedProductId);
    if (!product) {
      return res.status(400).json({ error: `Unknown product: ${sanitizedProductId}` });
    }

    lineItems.push({
      quantity: checkoutItem.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          description: product.description,
          images: [`${baseUrl}${product.image}`],
        },
      },
    });
  }

  const stripe = getStripeClient(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/success?checkout=merch&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      payment_intent_data: {
        statement_descriptor: STRIPE_STATEMENT_DESCRIPTOR,
      },
      metadata: {
        legal_business_name: LEGAL_BUSINESS_NAME,
        public_business_name: PUBLIC_BUSINESS_NAME,
      },
    });

    if (!session.url) {
      console.error('Stripe merch session created without URL');
      return res.status(500).json({ error: 'Unable to initialize checkout. Please try again.' });
    }

    return res.status(200).json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe merch checkout error:', error);
    return res.status(500).json({ error: 'Unable to initialize checkout. Please try again.' });
  }
}
