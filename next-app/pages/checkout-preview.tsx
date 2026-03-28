import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
  PUBLIC_BUSINESS_NAME,
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

const PLAN_ITEMS = [
  ...SUBSCRIPTION_MARKETING_FEATURES,
  'Email support for billing, access, and cancellation requests',
];

export default function CheckoutPreview() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  async function startCheckout() {
    if (checkoutLoading) return;

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
        <title>Checkout Preview | FSA ELITE Performance</title>
        <meta
          name="description"
          content="Review the Elite Sales Performance full course access before continuing to Stripe Checkout."
        />
      </Head>

      <main className="checkout-preview-page">
        <section className="checkout-preview-hero">
          <div className="container checkout-preview-shell">
            <div className="checkout-preview-copy">
              <Link href="/" className="store-back-link">
                ← Back to Home
              </Link>
              <p className="eyebrow">Order Preview</p>
              <h1>{SUBSCRIPTION_NAME}</h1>
              <p className="checkout-preview-description">{SUBSCRIPTION_DESCRIPTION}</p>
              <ul className="checkout-preview-list">
                {PLAN_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <aside className="checkout-preview-card">
              <p className="checkout-preview-badge">Full course access</p>
              <p className="checkout-preview-note">Sold by {PUBLIC_BUSINESS_NAME}</p>
              <h2>{SUBSCRIPTION_NAME}</h2>
              <div className="checkout-preview-price">
                <strong>{formatUsd(SUBSCRIPTION_PRICE_CENTS)}</strong>
                <span>one-time payment</span>
              </div>
              <p className="checkout-preview-note">
                You will be redirected to Stripe-hosted checkout to complete your purchase securely.
              </p>
              <button type="button" className="btn-primary checkout-preview-button" onClick={startCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? 'Redirecting to Checkout...' : 'Continue to Secure Checkout'}
              </button>
              {checkoutError && <p className="home-error checkout-preview-error">{checkoutError}</p>}
              <p className="checkout-preview-support">
                Questions before checkout? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
              </p>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}