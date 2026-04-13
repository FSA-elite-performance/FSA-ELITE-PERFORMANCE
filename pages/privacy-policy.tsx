import Head from 'next/head';
import Link from 'next/link';
import {
  LEGAL_BUSINESS_NAME,
  PUBLIC_BUSINESS_NAME,
  PUBLIC_SITE_URL,
  SUPPORT_ADDRESS_CITY,
  SUPPORT_ADDRESS_COUNTRY,
  SUPPORT_ADDRESS_LINE_1,
  SUPPORT_ADDRESS_POSTAL,
  SUPPORT_ADDRESS_STATE,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';

const UPDATED_AT = 'March 24, 2026';

const SECTIONS = [
  {
    title: 'Information We Collect',
    body:
      'We collect the information you provide when you contact us, complete checkout, request support, or use training features. This can include your name, email address, phone number, billing details processed through Stripe, and limited product or account activity needed to deliver access and customer support.',
  },
  {
    title: 'How We Use Information',
    body:
      'We use your information to process payments, deliver digital training access, support merchandise orders, respond to billing or access requests, maintain account security, and improve the FSA ELITE platform experience.',
  },
  {
    title: 'Payments And Third Parties',
    body:
      'Payments are processed through Stripe. We do not store full payment card details on our website. Third-party providers may process data only as needed to support checkout, hosting, analytics, communications, and platform operations.',
  },
  {
    title: 'Cookies And Local Storage',
    body:
      'We use browser storage and similar technologies to maintain session state, membership access, checkout context, cart contents, and training experience preferences. These technologies help the site function correctly.',
  },
  {
    title: 'Data Sharing',
    body:
      'We do not sell your personal information. We share data only with service providers and platforms that help us operate the business, process payments, deliver support, comply with legal obligations, or protect the security of the site.',
  },
  {
    title: 'Security And Retention',
    body:
      'We use reasonable administrative, technical, and operational measures to protect business and customer information. We keep records for as long as reasonably needed for support, platform operations, security review, payment reconciliation, and legal compliance.',
  },
  {
    title: 'Your Choices',
    body:
      'You may contact us to request updates to your contact information or to ask questions about the information associated with your purchases or support requests. We will respond as reasonably possible for our business operations and legal obligations.',
  },
  {
    title: 'Children',
    body:
      'FSA ELITE is intended for adult business and training use. The site is not directed to children under 13, and we do not knowingly collect personal information from children through the platform.',
  },
  {
    title: 'Contact',
    body:
      'If you have privacy questions, contact FSA ELITE support by email or phone using the details listed below.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | FSA Elite Performance</title>
        <meta
          name="description"
          content="Read the FSA ELITE Performance privacy policy for customer information, payments, support, and data handling."
        />
      </Head>

      <main className="policy-page">
        <section className="policy-hero">
          <div className="container policy-shell">
            <Link href="/" className="store-back-link">
              ← Back to Home
            </Link>

            <div className="policy-card">
              <p className="eyebrow">Privacy Policy</p>
              <h1>How FSA ELITE handles customer information</h1>
              <p className="policy-lead">
                This Privacy Policy applies to {PUBLIC_BUSINESS_NAME}, operated by {LEGAL_BUSINESS_NAME}, at{' '}
                <a href={PUBLIC_SITE_URL}>{PUBLIC_SITE_URL}</a>.
              </p>
              <p className="policy-meta">Last updated: {UPDATED_AT}</p>

              <div className="policy-section-list">
                {SECTIONS.map((section) => (
                  <section className="policy-section" key={section.title}>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </section>
                ))}
              </div>

              <section className="policy-section">
                <h2>Support Contact</h2>
                <ul className="policy-list">
                  <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
                  <li>Phone: {SUPPORT_PHONE}</li>
                  <li>
                    Address: {SUPPORT_ADDRESS_LINE_1}, {SUPPORT_ADDRESS_CITY}, {SUPPORT_ADDRESS_STATE} {SUPPORT_ADDRESS_POSTAL},{' '}
                    {SUPPORT_ADDRESS_COUNTRY}
                  </li>
                </ul>
              </section>

              <div className="policy-actions">
                <Link href="/terms" className="btn-secondary">
                  View Terms
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