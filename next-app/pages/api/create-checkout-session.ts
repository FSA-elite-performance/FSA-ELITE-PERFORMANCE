import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

type SuccessResponse = { url: string };
type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const priceAmountCents = parseInt(process.env.PRICE_AMOUNT_CENTS || '9700', 10);

  // Defensive: warn and return early if secrets are missing
  if (!stripeSecretKey) {
    console.warn(
      '[FSA Elite] ⚠️  STRIPE_SECRET_KEY is not set. ' +
      'Copy next-app/.env.example to next-app/.env.local and add your Stripe test key.'
    );
    return res.status(500).json({
      error:
        'Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment variables.',
    });
  }

  if (!baseUrl) {
    console.warn(
      '[FSA Elite] ⚠️  NEXT_PUBLIC_BASE_URL is not set. ' +
      'Set it to http://localhost:3000 for local dev, or your Vercel URL in production.'
    );
    return res.status(500).json({
      error:
        'Base URL is not configured. Please set NEXT_PUBLIC_BASE_URL in your environment variables.',
    });
  }

  try {
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'FSA Elite — Early Access',
              description:
                'Sales training. Closer mindset. Real growth. ' +
                'Built for hungry salespeople who want to level up and win.',
            },
            unit_amount: priceAmountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    if (!session.url) {
      throw new Error('Stripe did not return a checkout URL.');
    }

    return res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred.';
    console.error('[FSA Elite] Stripe checkout error:', message);
    return res.status(500).json({ error: message });
  }
}
