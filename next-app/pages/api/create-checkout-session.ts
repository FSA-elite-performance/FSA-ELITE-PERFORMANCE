import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

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

  const body = req.body && typeof req.body === 'object' ? req.body : null;
  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Checkout payload must include a non-empty items array' });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return res.status(400).json({
        error: 'Each item must have a valid stripePriceId and a positive integer quantity',
      });
    }

    const { stripePriceId, quantity } = item as {
      stripePriceId?: unknown;
      quantity?: unknown;
    };
    const normalizedStripePriceId = typeof stripePriceId === 'string' ? stripePriceId.trim() : '';

    if (
      typeof stripePriceId !== 'string' ||
      !normalizedStripePriceId ||
      typeof quantity !== 'number' ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        error: 'Each item must have a valid stripePriceId and a positive integer quantity',
      });
    }

    lineItems.push({
      price: normalizedStripePriceId,
      quantity,
    });
  }

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  let origin = 'http://localhost:3000';
  try {
    origin = new URL(configuredSiteUrl).origin;
  } catch (error: unknown) {
    console.warn('Invalid NEXT_PUBLIC_SITE_URL. Falling back to localhost.', error);
  }

  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // one-time payment; change to 'subscription' with a Price ID for recurring
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
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
