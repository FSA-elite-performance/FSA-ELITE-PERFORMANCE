import Head from 'next/head';
import Link from 'next/link';
import {
  LEGAL_BUSINESS_NAME,
  PUBLIC_BUSINESS_NAME,
  PUBLIC_SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';

const UPDATED_AT = 'March 24, 2026';

const DIGITAL_ITEMS = [
  'Elite Sales Performance is sold as a one-time digital training access product.',
  'Access is delivered after successful payment confirmation.',
  'If you experience a billing problem, duplicate charge concern, or access-delivery issue, contact support promptly so we can review the order.',
];

const MERCH_ITEMS = [
  'Merchandise and branded product orders are reviewed separately from digital access requests.',
  'If a merch item arrives damaged, incorrect, or fails to arrive, contact support with your order details so we can review a replacement or other resolution.',
  'Shipping or fulfillment timing can vary based on product availability and production timing.',
];

const CANCELLATION_ITEMS = [
  'Customers may contact support with billing, cancellation, duplicate charge, or delivery questions.',
  'We review support requests as promptly as reasonably possible after receiving the relevant order details.',
  'Submitting a request does not automatically guarantee a refund; each issue is reviewed based on the order, delivery status, and payment circumstances.',
];

export default function RefundPolicyPage() {
  return (
    <>
      <Head>
        <title>Refund Policy | FSA ELITE Performance</title>
        <meta
          name="description"
          content="Read the FSA ELITE Performance refund and support policy for digital training access and merchandise orders."
        />
      </Head>

      <main className="policy-page">
        <section className="policy-hero">
          <div className="container policy-shell">
            <Link href="/" className="store-back-link">
              ← Back to Home
            </Link>

            <div className="policy-card">
              <p className="eyebrow">Refund Policy</p>
              <h1>Order support, billing review, and resolution policy</h1>
              <p className="policy-lead">
                This Refund Policy applies to {PUBLIC_BUSINESS_NAME}, operated by {LEGAL_BUSINESS_NAME}, at{' '}
                <a href={PUBLIC_SITE_URL}>{PUBLIC_SITE_URL}</a>.
              </p>
              <p className="policy-meta">Last updated: {UPDATED_AT}</p>

              <section className="policy-section">
                <h2>Digital Training Access</h2>
                <ul className="policy-list">
                  {DIGITAL_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  Because the training product is a digital access purchase, refund eligibility may depend on the billing issue,
                  whether access was delivered correctly, and the specific circumstances of the order. Contact support first so we
                  can review the payment and resolve the issue directly.
                </p>
              </section>

              <section className="policy-section">
                <h2>Merchandise Orders</h2>
                <ul className="policy-list">
                  {MERCH_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="policy-section">
                <h2>Cancellations And Billing Review</h2>
                <ul className="policy-list">
                  {CANCELLATION_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  The fastest path to resolution is to contact support directly with the checkout email, order date, and a clear
                  description of the issue before escalating through other channels.
                </p>
              </section>

              <section className="policy-section">
                <h2>How To Request Help</h2>
                <p>
                  Include the customer email used during checkout, the product purchased, the order date, and a short description
                  of the issue so we can review it quickly.
                </p>
                <ul className="policy-list">
                  <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
                  <li>Phone: {SUPPORT_PHONE}</li>
                </ul>
              </section>

              <div className="policy-actions">
                <Link href="/privacy-policy" className="btn-secondary">
                  View Privacy Policy
                </Link>
                <Link href="/terms" className="btn-secondary">
                  View Terms
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}