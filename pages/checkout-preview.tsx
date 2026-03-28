import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
  PUBLIC_SEO_KEYWORDS,
  PUBLIC_BUSINESS_NAME,
  PUBLIC_SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';
import {
  formatUsd,
  SUBSCRIPTION_DESCRIPTION,
  SUBSCRIPTION_MARKETING_FEATURES,
  SUBSCRIPTION_NAME,
  SUBSCRIPTION_PRICE_CENTS,
} from '../lib/subscriptionPlan';
import { CHECKOUT_CONTEXT_KEY } from '../lib/accessKeys';

const PLAN_ITEMS = [
  ...SUBSCRIPTION_MARKETING_FEATURES,
  'Secure Stripe-hosted checkout with support and policy links visible before payment',
  'Email support for billing, access, and cancellation requests',
];

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? '';

export default function CheckoutPreview() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  async function startCheckout() {
    if (checkoutLoading) return;

    if (!STRIPE_PUBLISHABLE_KEY) {
      setCheckoutError('Stripe publishable key is missing. Contact support before checkout.');
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError('');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setCheckoutError(data.error ?? 'Unable to start checkout right now. Please try again.');
        return;
      }

      window.localStorage.setItem(CHECKOUT_CONTEXT_KEY, 'membership');
      window.location.href = data.url;
    } catch {
      setCheckoutError('Network error while starting checkout. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Full Access Training Checkout | FSA ELITE</title>
        <meta
          name="description"
          content="Review FSA ELITE full access training, pricing, and support details before continuing to secure Stripe checkout on fsaeliteperformance.com."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/checkout-preview`} />
      </Head>

      <main className="checkout-preview-page">
        <section className="checkout-preview-hero">
          <div className="container checkout-preview-shell">
            <div className="checkout-preview-copy">
              <Link href="/" className="store-back-link">
                ← Back to Home
              </Link>
              <p className="eyebrow">Full Access Training Checkout</p>
              <h1>{SUBSCRIPTION_NAME}</h1>
              <p className="checkout-preview-description">{SUBSCRIPTION_DESCRIPTION}</p>
              <p className="store-support-line">
                Most sales courses charge $49/month. Coaching programs run $997+. This is {formatUsd(SUBSCRIPTION_PRICE_CENTS)} — once — and you keep everything.
              </p>
              <ul className="checkout-preview-list">
                {PLAN_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <aside className="checkout-preview-card">
              <div className="checkout-preview-brand">
                <img src="/logo.png" alt="FSA ELITE" className="checkout-preview-logo" />
                <div>
                  <strong className="checkout-preview-brand-name">FSA ELITE</strong>
                  <span className="checkout-preview-brand-domain">fsaeliteperformance.com</span>
                </div>
              </div>
              <p className="checkout-preview-badge">Full course access</p>
              <p className="checkout-preview-note">Sold by {PUBLIC_BUSINESS_NAME}</p>
              <h2>{SUBSCRIPTION_NAME}</h2>
              <div className="checkout-preview-price">
                <strong>{formatUsd(SUBSCRIPTION_PRICE_CENTS)}</strong>
                <span>one-time payment</span>
              </div>
              <p className="checkout-preview-note">
                Full access training unlocks the AI Roleplay Lab with 5 buyer personas, your performance dashboard, and the full 15+ product member store.
              </p>
              <p className="checkout-preview-note">
                Secure Stripe-hosted checkout. No subscription. No surprise charges. Takes 30 seconds.
              </p>
              <button type="button" className="btn-primary checkout-preview-button" onClick={startCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? 'Redirecting…' : '🔒 Unlock Lifetime Access — ' + formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </button>
              {checkoutError && <p className="home-error checkout-preview-error">{checkoutError}</p>}
              <p className="checkout-preview-support">
                Questions before checkout? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
              </p>
              <p className="policy-inline-links">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <span>•</span>
                <Link href="/refund-policy">Refund Policy</Link>
                <span>•</span>
                <Link href="/terms">Terms</Link>
              </p>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}