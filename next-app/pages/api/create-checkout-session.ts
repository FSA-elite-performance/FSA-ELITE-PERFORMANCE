import type { NextApiRequest, NextApiResponse } from 'next';
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

// ─── Handler ──────────────────────────────────────────────────────────────────
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

  // Base URL used for success/cancel redirects.
  // Set NEXT_PUBLIC_BASE_URL in your environment (Vercel / GitHub Secrets).
  // Falls back to localhost for local dev.
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

  if (!isValidBaseUrl(baseUrl)) {
    console.error('NEXT_PUBLIC_BASE_URL is invalid');
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
