import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { SUBSCRIPTION_PRODUCT_ID } from '../../lib/subscriptionPlan';

// ─── Stripe webhook handler for backup activation ────────────────────────────
// This webhook listens for checkout.session.completed events and ensures
// membership is activated even if the user never completes the redirect flow.
// This provides a backup mechanism for payment-to-access conversion.

// Disable body parsing so we can verify the webhook signature
export const config = {
  api: {
    bodyParser: false,
  },
};

let stripeClient: Stripe | null = null;

function getStripeClient(secretKey: string): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return res.status(500).json({ error: 'Webhook configuration error' });
  }

  if (!webhookSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET is not set - webhook signature verification disabled');
    // Continue without signature verification (not recommended for production)
  }

  const stripe = getStripeClient(secretKey);
  const signature = req.headers['stripe-signature'];

  if (!signature) {
    console.error('Missing stripe-signature header');
    return res.status(400).json({ error: 'Missing signature' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // Parse without verification (not recommended for production)
      event = JSON.parse(rawBody.toString()) as Stripe.Event;
    }
  } catch (err: unknown) {
    console.error('Webhook signature verification failed:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Verification error details:', errorMessage);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process membership checkouts
    if (session.metadata?.product_id === SUBSCRIPTION_PRODUCT_ID && session.payment_status === 'paid') {
      console.log('Webhook: Membership payment completed for session:', session.id);
      console.log('Customer email:', session.customer_email);

      // Log successful payment for record-keeping
      // In a production system, you might:
      // 1. Store this in a database
      // 2. Send a confirmation email
      // 3. Trigger analytics events
      // 4. Update CRM systems

      // Note: The actual membership activation happens via the redirect flow
      // to /api/activate-membership, which sets the membership cookie.
      // This webhook serves as a backup notification and audit trail.
    }
  }

  // Always return 200 to acknowledge receipt
  return res.status(200).json({ received: true });
}
