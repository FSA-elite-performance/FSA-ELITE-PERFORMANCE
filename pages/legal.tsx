import Head from 'next/head';
import Link from 'next/link';
import {
  PUBLIC_SEO_KEYWORDS,
  PUBLIC_SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

const LEGAL_LINKS = [
  {
    href: '/privacy-policy',
    title: 'Privacy Policy',
    body: 'How FSA ELITE handles customer information, browser storage, payments, and platform support data.',
  },
  {
    href: '/terms',
    title: 'Terms of Service',
    body: 'Terms covering site usage, training access, payments, intellectual property, and support policies.',
  },
  {
    href: '/refund-policy',
    title: 'Refund Policy',
    body: 'The policy for digital access, merch orders, and billing questions tied to FSA ELITE purchases.',
  },
];

export default function LegalPage() {
  return (
    <>
      <Head>
        <title>Legal | FSA ELITE Performance</title>
        <meta
          name="description"
          content="Access the FSA ELITE legal center for privacy, terms, refunds, and support information at fsaeliteperformance.com."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/legal`} />
      </Head>

      <main className="policy-page">
        <section className="policy-hero">
          <div className="container policy-shell">
            <Link href="/" className="store-back-link">
              ← Back to Home
            </Link>

            <div className="policy-card">
              <p className="eyebrow">Legal Center</p>
              <h1>Privacy, terms, refunds, and support in one place</h1>
              <p className="policy-lead">
                Use this page as the clean legal hub for FSA ELITE whenever you need a fast route back to the core business policies.
              </p>

              <div className="policy-section-list">
                {LEGAL_LINKS.map((item) => (
                  <section className="policy-section" key={item.href}>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                    <div className="policy-actions">
                      <Link href={item.href} className="btn-secondary">
                        Open {item.title}
                      </Link>
                    </div>
                  </section>
                ))}
              </div>

              <section className="policy-section">
                <h2>Support</h2>
                <p>
                  For billing, access, or policy questions, contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or call {SUPPORT_PHONE}.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}