import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// ─── Body parser must be disabled so Stripe can verify the raw request body ───
export const config = {
  api: {
    bodyParser: false,
  },
};

// ─── Helper: read the raw request body into a Buffer ─────────────────────────
function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// ─── Singleton Stripe client ──────────────────────────────────────────────────
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
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment configuration error.' });
  }
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return res.status(500).json({ error: 'Webhook configuration error.' });
  }

  const stripe = getStripeClient(secretKey);

  // Read and verify the raw body signature
  let rawBody: Buffer;
  try {
    rawBody = await getRawBody(req);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to read request body.';
    console.error('Webhook body read error:', message);
    return res.status(400).json({ error: `Webhook error: ${message}` });
  }

  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).json({ error: 'Missing stripe-signature header.' });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed.';
    console.error('Webhook signature error:', message);
    return res.status(400).json({ error: `Webhook error: ${message}` });
  }

  // ─── Event handlers ───────────────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email ?? session.customer_email ?? '(unknown)';
    const amountDollars =
      session.amount_total != null ? `${(session.currency ?? '').toUpperCase()} $${(session.amount_total / 100).toFixed(2)}` : null;

    console.log(
      `[webhook] Payment received — session ${session.id} | ${customerEmail}` +
        (amountDollars != null ? ` | ${amountDollars}` : '')
    );

    // TODO: Provision access for the customer here.
    // Suggested next steps:
    //   1. Look up or create a user record in your database (e.g. Supabase / Firebase)
    //      using `customerEmail` and `session.id`.
    //   2. Send a welcome / access email via a transactional email provider
    //      (e.g. Resend, SendGrid, Postmark).
    //   3. Grant the customer access to the training portal (fsaelite.org).
    //
    // Example Supabase insert:
    //   await supabase.from('purchases').insert({
    //     email: customerEmail,
    //     stripe_session_id: session.id,
    //     amount_cents: session.amount_total,
    //     purchased_at: new Date().toISOString(),
    //   });
  }

  // Acknowledge receipt to Stripe — must respond within 30 s
  return res.status(200).json({ received: true });
}
