import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// ─── Configuration ────────────────────────────────────────────────────────────
// Price in cents (USD). $97.00 = 9700.
// To switch to a subscription, replace price_data with a Stripe Price ID:
//   price: process.env.STRIPE_PRICE_ID,   // e.g. price_1Abc123...
// and change mode to 'subscription'.
const PRICE_CENTS = 9700; // $97.00 one-time early access
const PRODUCT_NAME = 'FSA Elite — Early Access';
const PRODUCT_DESCRIPTION =
  'Full access to FSA Elite Sales Training: modules, AI roleplay, certifications, and closer mindset curriculum. Founding member rate — locked in for life.';

// ─── Singleton client (reused across warm serverless invocations) ─────────────
let stripeClient: Stripe | null = null;
function getStripeClient(secretKey: string): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const stripe = getStripeClient(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // one-time payment; change to 'subscription' with a Price ID for recurring
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: PRICE_CENTS,
            product_data: {
              name: PRODUCT_NAME,
              description: PRODUCT_DESCRIPTION,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      // Collect billing address — useful for tax & records
      billing_address_collection: 'auto',
    });

    return res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    console.error('Stripe error:', err);
    const message =
      err instanceof Stripe.errors.StripeError ? err.message : 'Internal server error';
    return res.status(500).json({ error: message });
  }
}
