import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import {
  LEGAL_BUSINESS_NAME,
  PUBLIC_BUSINESS_NAME,
  STRIPE_STATEMENT_DESCRIPTOR,
} from '../../lib/businessDetails';
import { MERCH_PRODUCTS } from '../../lib/merchCatalog';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment configuration error. Contact support.' });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
  if (!isValidBaseUrl(baseUrl)) {
    console.error('NEXT_PUBLIC_BASE_URL is invalid');
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
    const candidate = item as CheckoutItem;
    if (typeof candidate.productId !== 'string' || typeof candidate.quantity !== 'number') {
      return res.status(400).json({ error: 'Each item must include productId and quantity.' });
    }

    const sanitizedProductId = candidate.productId.trim();
    if (!sanitizedProductId) {
      return res.status(400).json({ error: 'productId cannot be empty.' });
    }

    if (!Number.isInteger(candidate.quantity) || candidate.quantity < 1 || candidate.quantity > MAX_QTY_PER_ITEM) {
      return res.status(400).json({ error: `quantity must be an integer between 1 and ${MAX_QTY_PER_ITEM}.` });
    }

    const product = catalogMap.get(sanitizedProductId);
    if (!product) {
      return res.status(400).json({ error: `Unknown product: ${sanitizedProductId}` });
    }

    lineItems.push({
      quantity: candidate.quantity,
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
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
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
