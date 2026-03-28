import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  PUBLIC_SEO_KEYWORDS,
  LEGAL_BUSINESS_NAME,
  PUBLIC_BUSINESS_NAME,
  PUBLIC_SITE_URL,
  STRIPE_STATEMENT_DESCRIPTOR,
  SUPPORT_ADDRESS_CITY,
  SUPPORT_ADDRESS_LINE_1,
  SUPPORT_ADDRESS_POSTAL,
  SUPPORT_ADDRESS_STATE,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';
import {
  FLAGSHIP_OFFER_DESCRIPTION,
  FLAGSHIP_OFFER_NAME,
  formatUsd,
  PRICING_TIERS,
  SUBSCRIPTION_PRICE_CENTS,
} from '../lib/subscriptionPlan';
import { fetchMembershipStatus } from '../lib/membershipClient';

const CURRENT_YEAR = new Date().getFullYear();
const BUSINESS_NAME = PUBLIC_BUSINESS_NAME;
const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

const FEATURES = [
  {
    title: FLAGSHIP_OFFER_NAME,
    description:
      'Start with a revenue-generating offer: optimize the pitch, tighten follow-up, and train the sales motion with 3–5 pilot clients before adding complexity.',
    stat: '90',
    statLabel: 'Day Proof Window',
  },
  {
    title: 'Rep Scorecards',
    description:
      'Track discovery quality, objection handling, follow-up discipline, close rate, and coachability so performance becomes measurable and repeatable.',
    stat: '5',
    statLabel: 'Core KPI Lanes',
  },
  {
    title: 'Recruiting Structure',
    description:
      'Build the five reasons strong reps stay: money, structure, standards, growth opportunity, and a mission worth joining.',
    stat: '5',
    statLabel: 'Rep Drivers',
  },
  {
    title: 'Software After Proof',
    description:
      'Use the Roleplay Lab, dashboard, and OLIVE to codify what already works in the field — not to guess before revenue exists.',
    stat: '3',
    statLabel: 'Phase Ladder',
  },
];

const INDUSTRIES = ['Automotive', 'Home Services', 'Insurance', 'Solar', 'Real Estate', 'Retail', 'B2B', 'Local Services'];

const STEPS = [
  {
    num: '01',
    title: 'Sell one flagship offer',
    description: 'Lead with consulting, training, and done-with-you optimization instead of splitting focus across unrelated products.',
  },
  {
    num: '02',
    title: 'Prove it with clients',
    description: 'Use 3–5 paying or pilot accounts to capture proof, objections, SOPs, and the KPI rhythm that actually drives revenue.',
  },
  {
    num: '03',
    title: 'Scale the validated system',
    description: 'Add recruiting, rep leadership, and software only after the method is measurable enough to repeat with confidence.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is FSA Elite Performance, exactly?',
    answer:
      'FSA Elite Performance is one sales performance business. We help businesses increase revenue with trained sales talent, repeatable sales systems, and performance coaching — then turn the proven method into software.',
  },
  {
    question: 'What should launch first?',
    answer:
      'The first flagship offer is a 90-day sales performance sprint for small and mid-sized businesses. It gives FSA a fast path to proof, recurring service revenue, and a cleaner path to productizing the method later.',
  },
  {
    question: 'How does pricing work today?',
    answer:
      `${PRICING_TIERS[0]?.name ?? 'Solo Access'} is live now for ${formatUsd(SUBSCRIPTION_PRICE_CENTS)}. Team and enterprise plans are scoped separately so coaching cadence, reporting, and leadership support can match the size of the engagement.`,
  },
  {
    question: 'Why keep the app if services come first?',
    answer:
      'Because the software should document and scale a winning process. The Roleplay Lab, dashboard, and OLIVE become stronger once they are fed by real client delivery, rep KPI data, and repeatable SOPs.',
  },
];

export default function Home() {
  const [hasMembership, setHasMembership] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void fetchMembershipStatus().then((status) => {
      if (active) setHasMembership(status);
    });
    return () => {
      active = false;
    };
  }, []);

  const trainingLink = hasMembership ? '/roleplay' : '/checkout-preview';
  const soloTier = PRICING_TIERS.find((tier) => tier.id === 'solo');
  const contactHref = `mailto:${SUPPORT_EMAIL}?subject=FSA%20Elite%20Performance%20Growth%20Plan`;

  return (
    <>
      <Head>
        <title>FSA ELITE | Sales Performance Systems for Reps and Teams</title>
        <meta
          name="description"
          content="FSA Elite Performance helps businesses grow revenue with trained reps, performance coaching, AI roleplay, and repeatable sales systems before scaling the method into software."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:site_name" content="FSA ELITE" />
        <meta property="og:title" content="FSA ELITE | Sales Performance Systems for Reps and Teams" />
        <meta
          property="og:description"
          content="Revenue-first sales performance systems, recruiting-ready structure, and AI training built from real client proof."
        />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE | Sales Performance Systems" />
        <meta
          name="twitter:description"
          content="One sales performance business: services first, proof second, software after validation."
        />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
      </Head>

      <div className="landing-page">
        <header className="landing-nav">
          <div className="landing-nav-inner">
            <Link href="/" className="landing-brand">
              <img src="/logo.jpg" alt="FSA ELITE" className="landing-logo" />
              <span className="landing-brand-text">FSA ELITE</span>
            </Link>

            <nav className="landing-nav-links">
              <Link href="#offer">Offer</Link>
              <Link href="#how-it-works">Ladder</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="#faq">FAQ</Link>
            </nav>

            <div className="landing-nav-actions">
              <Link href="/login" className="landing-nav-link">Log in</Link>
              <Link href="/checkout-preview" className="btn-primary btn-sm">
                See Pricing
              </Link>
            </div>

            <button
              className="landing-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="landing-mobile-menu">
              <Link href="#offer" onClick={() => setMobileMenuOpen(false)}>Offer</Link>
              <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>Ladder</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              <Link href="/checkout-preview" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>
                See Pricing
              </Link>
            </div>
          )}
        </header>

        <section className="landing-hero">
          <div className="landing-hero-content">
            <div className="landing-hero-badge">
              <span className="landing-badge-dot" />
              Revenue First. Software After Proof.
            </div>

            <h1 className="landing-hero-title">
              One clear
              <br />
              <span className="landing-hero-highlight">sales performance business</span>
            </h1>

            <p className="landing-hero-subtitle">
              FSA Elite Performance helps businesses increase revenue with trained sales talent,
              repeatable coaching, and real KPI accountability — then turns the proven system into software.
            </p>

            <div className="landing-hero-actions">
              <Link href="#pricing" className="btn-primary btn-lg">
                See Pricing Options
              </Link>
              <Link href={trainingLink} className="btn-secondary btn-lg">
                {hasMembership ? 'Open Roleplay Lab' : 'View Solo Access'}
              </Link>
            </div>

            <p className="landing-hero-note">
              Start with {FLAGSHIP_OFFER_NAME} · Build proof with 3–5 clients · Productize what works
            </p>
          </div>

          <div className="landing-hero-visual">
            <div className="landing-hero-card">
              <div className="landing-hero-card-header">
                <span className="landing-card-dot" />
                <span className="landing-card-dot" />
                <span className="landing-card-dot" />
              </div>
              <div className="landing-hero-card-content">
                <div className="landing-demo-chat">
                  <div className="landing-demo-msg landing-demo-msg-ai">
                    <span className="landing-demo-speaker">Client KPI Review</span>
                    {'"Discovery is weak, follow-up is inconsistent, and your reps are improvising the close."'}
                  </div>
                  <div className="landing-demo-msg landing-demo-msg-user">
                    Let&apos;s install the scorecard, drill the objections, and fix the handoff.
                  </div>
                </div>
                <div className="landing-demo-scores">
                  <div className="landing-score-item">
                    <span>Pilot Clients</span>
                    <strong className="score-high">3-5</strong>
                  </div>
                  <div className="landing-score-item">
                    <span>Rep KPIs</span>
                    <strong className="score-mid">5</strong>
                  </div>
                  <div className="landing-score-item">
                    <span>Phases</span>
                    <strong className="score-high">3</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="landing-industries">
          <div className="landing-industries-inner">
            {INDUSTRIES.map((industry) => (
              <span key={industry} className="landing-industry">{industry}</span>
            ))}
          </div>
        </div>

        <section className="landing-section" id="offer">
          <div className="landing-section-header">
            <span className="landing-eyebrow">Flagship Offer</span>
            <h2 className="landing-section-title">Start with one offer that produces proof fast</h2>
            <p className="landing-section-subtitle">
              {FLAGSHIP_OFFER_DESCRIPTION}
            </p>
          </div>

          <div className="landing-features-grid">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="landing-feature-card">
                <div className="landing-feature-stat">
                  <strong>{feature.stat}</strong>
                  <span>{feature.statLabel}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section landing-section-alt" id="how-it-works">
          <div className="landing-section-header">
            <span className="landing-eyebrow">Three-Phase Ladder</span>
            <h2 className="landing-section-title">Consulting and training first. Rep leverage next. Software last.</h2>
          </div>

          <div className="landing-steps">
            {STEPS.map((step, index) => (
              <article key={step.num} className="landing-step">
                <div className="landing-step-num">{step.num}</div>
                <div className="landing-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < STEPS.length - 1 && <div className="landing-step-line" />}
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section" id="pricing">
          <div className="landing-section-header">
            <span className="landing-eyebrow">Pricing</span>
            <h2 className="landing-section-title">Use self-serve access for reps, then grow into recurring team revenue</h2>
            <p className="landing-section-subtitle">
              The solo plan is live today. Team and enterprise plans are designed to support recurring revenue, leadership cadence,
              and measurable performance reporting.
            </p>
          </div>

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
                  <Link href="/checkout-preview" className="btn-primary btn-sm">
                    {soloTier?.ctaLabel ?? 'Start Solo Access'}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="landing-cta">
          <div className="landing-cta-content">
            <h2>Stop selling a scattered idea. Start selling one measurable outcome.</h2>
            <p>
              FSA Elite Performance wins when the offer, coaching rhythm, recruiting structure, and software all point
              to the same result: more revenue from better-trained reps.
            </p>
            <div className="landing-cta-actions">
              <a href={contactHref} className="btn-primary btn-lg">
                Book the Flagship Offer
              </a>
              <Link href="/checkout-preview" className="btn-secondary btn-lg">
                Review Solo Access
              </Link>
            </div>
          </div>
        </section>

        <section className="landing-section" id="faq">
          <div className="landing-section-header">
            <span className="landing-eyebrow">FAQ</span>
            <h2 className="landing-section-title">Common questions</h2>
          </div>

          <div className="landing-faq-grid">
            {FAQ_ITEMS.map((item) => (
              <article key={item.question} className="landing-faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="landing-footer">
          <div className="landing-footer-inner">
            <div className="landing-footer-brand">
              <img src="/logo.jpg" alt="FSA ELITE" className="landing-footer-logo" />
              <div>
                <strong>{BUSINESS_NAME}</strong>
                <span>Operated by {LEGAL_BUSINESS_NAME}</span>
              </div>
            </div>

            <div className="landing-footer-links">
              <div className="landing-footer-col">
                <h4>Product</h4>
                <Link href="/roleplay">Roleplay Lab</Link>
                <Link href="/store">Member Store</Link>
                <Link href="/checkout-preview">Pricing</Link>
              </div>
              <div className="landing-footer-col">
                <h4>Legal</h4>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/refund-policy">Refund Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </div>
              <div className="landing-footer-col">
                <h4>Contact</h4>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                <span>{SUPPORT_PHONE}</span>
              </div>
            </div>

            <div className="landing-footer-bottom">
              <p>{SUPPORT_ADDRESS_LINE_1}, {SUPPORT_ADDRESS_CITY}, {SUPPORT_ADDRESS_STATE} {SUPPORT_ADDRESS_POSTAL}</p>
              <p>Statement descriptor: {STRIPE_STATEMENT_DESCRIPTOR}</p>
              <p>&copy; {CURRENT_YEAR} {BUSINESS_NAME}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
