import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

type ResponseData = {
  url?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const priceAmountCents = parseInt(process.env.PRICE_AMOUNT_CENTS || '9700', 10);

  // Defensive checks — warn loudly if secrets are missing
  if (!secretKey || secretKey === 'sk_test_REPLACE_ME') {
    console.warn(
      '[FSA Elite] ⚠️  STRIPE_SECRET_KEY is missing or is still the placeholder value. ' +
      'Copy next-app/.env.example to next-app/.env.local and add your real Stripe key.'
    );
    return res.status(500).json({
      error:
        'Stripe is not configured. Set STRIPE_SECRET_KEY in your environment variables. ' +
        'See next-app/.env.example for instructions.',
    });
  }

  if (!baseUrl) {
    console.warn(
      '[FSA Elite] ⚠️  NEXT_PUBLIC_BASE_URL is not set. ' +
      'Stripe success/cancel redirects may not work correctly.'
    );
  }

  const resolvedBaseUrl = baseUrl || 'http://localhost:3000';

  let stripe: Stripe;
  try {
    stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' });
  } catch (initError) {
    console.error('[FSA Elite] Failed to initialize Stripe SDK:', initError);
    return res.status(500).json({ error: 'Failed to initialize payment provider.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: priceAmountCents,
            product_data: {
              name: 'FSA Elite — Early Access',
              description:
                'Full access to FSA Elite Sales Performance Training — modules, objection drills, certifications, and AI-powered coaching.',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${resolvedBaseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${resolvedBaseUrl}/cancel`,
    });

    if (!session.url) {
      console.error('[FSA Elite] Stripe session created but no URL returned:', session.id);
      return res.status(500).json({ error: 'Checkout session created but no redirect URL was returned.' });
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    const stripeError = err as Stripe.errors.StripeError;
    console.error('[FSA Elite] Stripe checkout session error:', stripeError);
    return res.status(500).json({
      error: 'Failed to create checkout session. Please try again later.',
    });
  }
}
