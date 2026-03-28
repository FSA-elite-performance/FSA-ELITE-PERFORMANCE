import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBotId } from 'botid/server';
import Stripe from 'stripe';
import {
  LEGAL_BUSINESS_NAME,
  PUBLIC_BUSINESS_NAME,
  STRIPE_STATEMENT_DESCRIPTOR,
} from '../../lib/businessDetails';
import {
  SUBSCRIPTION_DESCRIPTION,
  SUBSCRIPTION_METADATA,
  SUBSCRIPTION_NAME,
  SUBSCRIPTION_PRODUCT_ID,
  SUBSCRIPTION_PRODUCT_TAX_CODE,
  SUBSCRIPTION_PRICE_CENTS,
} from '../../lib/subscriptionPlan';
import { BOTID_ROUTE_CONFIG } from '../../lib/botid-config';
import { getBotIdServerOptions } from '../../lib/botid-server';

// ─── Singleton client (reused across warm serverless invocations) ─────────────
let stripeClient: Stripe | null = null;
function getStripeClient(secretKey: string): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

type SuccessResponse = { url: string };
type ErrorResponse = { error: string };

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
    const first = value[0]?.trim();
    return first || null;
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

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const verification = await checkBotId(
      getBotIdServerOptions(BOTID_ROUTE_CONFIG.createCheckoutSession, req.headers)
    );

    if (verification.isBot) {
      console.warn('BotID blocked request to /api/create-checkout-session');
      return res.status(403).json({ error: 'Access denied.' });
    }
  } catch (error: unknown) {
    console.error('BotID verification failed for /api/create-checkout-session:', error);
    return res.status(500).json({ error: 'Service temporarily unavailable. Please try again later.' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment configuration error. Contact support.' });
  }

  // Base URL used for success/cancel redirects. Prefer configured env,
  // and otherwise infer from the current request host (works on Vercel URLs).
  const baseUrl = resolveBaseUrl(req);

  if (!isValidBaseUrl(baseUrl)) {
    console.error('Unable to resolve a valid checkout base URL');
    return res.status(500).json({ error: 'Payment configuration error. Contact support.' });
  }

  const stripe = getStripeClient(secretKey);
  const priceId =
    process.env.STRIPE_TRAINING_PRICE_ID?.trim() ?? process.env.STRIPE_PRICE_ID?.trim();

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = priceId
    ? {
        price: priceId,
        quantity: 1,
      }
    : {
        price_data: {
          currency: 'usd',
          unit_amount: SUBSCRIPTION_PRICE_CENTS,
          tax_behavior: 'exclusive',
          product_data: {
            name: SUBSCRIPTION_NAME,
            description: SUBSCRIPTION_DESCRIPTION,
            images: [`${baseUrl}/logo.png`],
            tax_code: SUBSCRIPTION_PRODUCT_TAX_CODE,
            metadata: {
              ...SUBSCRIPTION_METADATA,
            },
          },
        },
        quantity: 1,
      };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [lineItem],
      success_url: `${baseUrl}/api/activate-membership?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      payment_intent_data: {
        statement_descriptor: STRIPE_STATEMENT_DESCRIPTOR,
      },
      metadata: {
        legal_business_name: LEGAL_BUSINESS_NAME,
        public_business_name: PUBLIC_BUSINESS_NAME,
        product_name: SUBSCRIPTION_NAME,
        product_id: SUBSCRIPTION_PRODUCT_ID,
        ...SUBSCRIPTION_METADATA,
      },
    });

    if (!session.url) {
      console.error('Stripe session created without URL');
      return res.status(500).json({ error: 'Unable to initialize checkout. Please try again.' });
    }

    return res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: 'Unable to initialize checkout. Please try again.' });
  }
}
