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
  FLAGSHIP_OFFER_DESCRIPTION,
  FLAGSHIP_OFFER_NAME,
  formatUsd,
  PRICING_TIERS,
  SUBSCRIPTION_DESCRIPTION,
  SUBSCRIPTION_MARKETING_FEATURES,
  SUBSCRIPTION_NAME,
  SUBSCRIPTION_PRICE_CENTS,
} from '../lib/subscriptionPlan';
import { CHECKOUT_CONTEXT_KEY } from '../lib/accessKeys';

const PLAN_ITEMS = [
  ...SUBSCRIPTION_MARKETING_FEATURES,
  'Secure Stripe-hosted checkout with support and policy links visible before payment',
  'Designed as the self-serve starting point while team and enterprise pricing is scoped separately',
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

  const contactHref = `mailto:${SUPPORT_EMAIL}?subject=FSA%20Elite%20Performance%20Pricing`;

  return (
    <>
      <Head>
        <title>Pricing & Access | FSA ELITE</title>
        <meta
          name="description"
          content="Review FSA ELITE pricing, flagship offer positioning, and the live solo access checkout before choosing the right sales performance plan."
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
              <p className="eyebrow">Pricing & Access</p>
              <h1>Start with one clear offer, then expand into recurring revenue.</h1>
              <p className="checkout-preview-description">
                {FLAGSHIP_OFFER_NAME} is the lead offer. Use it to create proof, tighten SOPs, and validate the KPI rhythm
                before scaling recruiting or software.
              </p>
              <p className="store-support-line">{FLAGSHIP_OFFER_DESCRIPTION}</p>

              <div className="landing-features-grid">
                {PRICING_TIERS.map((tier) => (
                  <article key={tier.id} className="landing-feature-card">
                    <div className="landing-feature-stat">
                      <strong>{tier.priceLabel}</strong>
                      <span>{tier.cadenceLabel}</span>
                    </div>
                    <h3>{tier.name}</h3>
                    <p>{tier.description}</p>
                    <p><strong>Best for:</strong> {tier.bestFor}</p>
                    {tier.contactOnly ? (
                      <a href={contactHref} className="btn-secondary btn-sm">
                        {tier.ctaLabel}
                      </a>
                    ) : (
                      <button type="button" className="btn-primary btn-sm" onClick={startCheckout} disabled={checkoutLoading}>
                        {checkoutLoading ? 'Redirecting…' : tier.ctaLabel}
                      </button>
                    )}
                  </article>
                ))}
              </div>

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
              <p className="checkout-preview-badge">Solo plan live now</p>
              <p className="checkout-preview-note">Sold by {PUBLIC_BUSINESS_NAME}</p>
              <h2>{SUBSCRIPTION_NAME}</h2>
              <div className="checkout-preview-price">
                <strong>{formatUsd(SUBSCRIPTION_PRICE_CENTS)}</strong>
                <span>self-serve launch access</span>
              </div>
              <p className="checkout-preview-note">{SUBSCRIPTION_DESCRIPTION}</p>
              <p className="checkout-preview-note">
                This checkout is for the solo plan only. Team and enterprise programs are scoped separately around seats,
                leadership support, KPI reporting, and rollout needs.
              </p>
              <button type="button" className="btn-primary checkout-preview-button" onClick={startCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? 'Redirecting…' : '🔒 Start Solo Access — ' + formatUsd(SUBSCRIPTION_PRICE_CENTS)}
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
