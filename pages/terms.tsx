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

const TERMS_ITEMS = [
  {
    title: 'Use Of The Site',
    body:
      'You agree to use the website only for lawful purposes and in a way that does not interfere with platform security, site availability, checkout systems, or other users.',
  },
  {
    title: 'Products And Access',
    body:
      'FSA ELITE sells digital training access and may also offer branded merchandise or other related products. Product descriptions, availability, and pricing may change over time.',
  },
  {
    title: 'Payments',
    body:
      'Payments are processed through Stripe. By placing an order, you authorize the applicable one-time payment or merchandise charge shown during checkout.',
  },
  {
    title: 'Accounts And Access Control',
    body:
      'Digital access is intended for the purchaser or approved user account associated with the order. We may suspend or limit access if misuse, abuse, fraud, or platform security concerns are identified.',
  },
  {
    title: 'No Earnings Guarantee',
    body:
      'Training, coaching tools, roleplay systems, and branding resources are provided for education and performance development. We do not guarantee sales results, income, business outcomes, or earnings of any kind.',
  },
  {
    title: 'Intellectual Property',
    body:
      'All training content, branding, website copy, graphics, and platform materials remain the property of FSA ELITE and its operators unless otherwise stated. You may not reproduce or resell protected materials without permission.',
  },
  {
    title: 'Support And Policy Updates',
    body:
      'We may update the website, platform features, product offerings, and these terms from time to time. Continued use of the site after updates means you accept the revised terms.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | FSA ELITE Performance</title>
        <meta
          name="description"
          content="Read the FSA ELITE Performance terms of service for training access, payments, site usage, and customer responsibilities."
        />
      </Head>

      <main className="policy-page">
        <section className="policy-hero">
          <div className="container policy-shell">
            <Link href="/" className="store-back-link">
              ← Back to Home
            </Link>

            <div className="policy-card">
              <p className="eyebrow">Terms of Service</p>
              <h1>Terms for using the FSA ELITE website and products</h1>
              <p className="policy-lead">
                These Terms of Service apply to {PUBLIC_BUSINESS_NAME}, operated by {LEGAL_BUSINESS_NAME}, at{' '}
                <a href={PUBLIC_SITE_URL}>{PUBLIC_SITE_URL}</a>.
              </p>
              <p className="policy-meta">Last updated: {UPDATED_AT}</p>

              <div className="policy-section-list">
                {TERMS_ITEMS.map((item) => (
                  <section className="policy-section" key={item.title}>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </section>
                ))}
              </div>

              <section className="policy-section">
                <h2>Contact</h2>
                <p>
                  Questions about these terms can be sent to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or by phone at {SUPPORT_PHONE}.
                </p>
              </section>

              <div className="policy-actions">
                <Link href="/privacy-policy" className="btn-secondary">
                  View Privacy Policy
                </Link>
                <Link href="/refund-policy" className="btn-secondary">
                  View Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}