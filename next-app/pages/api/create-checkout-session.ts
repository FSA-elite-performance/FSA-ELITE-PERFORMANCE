import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const priceAmountCents = Number(process.env.PRICE_AMOUNT_CENTS ?? 1999);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

if (!stripeSecret) {
  console.warn(
    '[FSA Elite] WARNING: STRIPE_SECRET_KEY is not set. ' +
      'POST /api/create-checkout-session will return 500 until this environment variable is configured. ' +
      'Copy next-app/.env.example to next-app/.env.local and set your Stripe secret key.'
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ url: string } | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  if (!stripeSecret) {
    console.warn('[FSA Elite] Checkout attempted but STRIPE_SECRET_KEY is not configured.');
    return res.status(500).json({
      error:
        'Stripe is not configured on this server. ' +
        'Set the STRIPE_SECRET_KEY environment variable and redeploy.',
    });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'FSA Elite — Early Access',
              description: 'Early access to the FSA Elite sales performance training platform',
            },
            unit_amount: priceAmountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return res.status(200).json({ url: session.url as string });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Stripe error';
    console.error('[FSA Elite] Stripe checkout session error:', message);
    return res.status(500).json({ error: message });
  }
}
