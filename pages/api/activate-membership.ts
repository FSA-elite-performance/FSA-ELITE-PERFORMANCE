import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { SUBSCRIPTION_PRODUCT_ID } from '../../lib/subscriptionPlan';
import { buildMembershipCookie, createMembershipToken } from '../../lib/membershipAccess';

type ActivateMembershipSuccess = {
  active: true;
};

type ActivateMembershipError = {
  active: false;
  error: string;
};

type ActivateMembershipRequest = {
  sessionId?: unknown;
};

const SUCCESS_REDIRECT_PATH = '/success?checkout=membership';

let stripeClient: Stripe | null = null;

function getStripeClient(secretKey: string): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivateMembershipSuccess | ActivateMembershipError>
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ active: false, error: 'Method not allowed.' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set');

    if (req.method === 'GET') {
      return res.redirect(302, '/checkout-preview?error=activation_unavailable');
    }

    return res.status(500).json({ active: false, error: 'Membership activation is unavailable.' });
  }

  const rawSessionId =
    req.method === 'POST'
      ? (req.body as ActivateMembershipRequest)?.sessionId
      : req.query.session_id;

  const sessionId = typeof rawSessionId === 'string' ? rawSessionId.trim() : '';

  if (!sessionId) {
    if (req.method === 'GET') {
      return res.redirect(302, '/checkout-preview?error=missing_session');
    }

    return res.status(400).json({ active: false, error: 'sessionId is required.' });
  }

  const stripe = getStripeClient(secretKey);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      if (req.method === 'GET') {
        return res.redirect(302, '/checkout-preview?error=payment_incomplete');
      }

      return res.status(400).json({ active: false, error: 'Payment has not completed.' });
    }

    if (session.metadata?.product_id !== SUBSCRIPTION_PRODUCT_ID) {
      if (req.method === 'GET') {
        return res.redirect(302, '/checkout-preview?error=ineligible_session');
      }

      return res.status(400).json({ active: false, error: 'Session is not eligible for membership activation.' });
    }

    const token = await createMembershipToken(session.id);
    if (!token) {
      console.error('MEMBERSHIP_SIGNING_SECRET or STRIPE_SECRET_KEY is required for membership token signing');

      if (req.method === 'GET') {
        return res.redirect(302, '/checkout-preview?error=activation_unavailable');
      }

      return res.status(500).json({ active: false, error: 'Membership activation is unavailable.' });
    }

    res.setHeader('Set-Cookie', buildMembershipCookie(token, process.env.NODE_ENV === 'production'));

    if (req.method === 'GET') {
      return res.redirect(302, `${SUCCESS_REDIRECT_PATH}&session_id=${encodeURIComponent(session.id)}`);
    }

    return res.status(200).json({ active: true });
  } catch (error: unknown) {
    console.error('Membership activation failed:', error);

    if (req.method === 'GET') {
      return res.redirect(302, '/checkout-preview?error=activation_failed');
    }

    return res.status(500).json({ active: false, error: 'Membership activation failed. Please contact support.' });
  }
}