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
  formatUsd,
  SUBSCRIPTION_PRICE_CENTS,
} from '../lib/subscriptionPlan';
import { fetchMembershipStatus } from '../lib/membershipClient';

const CURRENT_YEAR = new Date().getFullYear();
const BUSINESS_NAME = PUBLIC_BUSINESS_NAME;
const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

const BRAND_PILLARS = [
  {
    eyebrow: 'FSA Elite Training',
    title: 'Sharpen the rep.',
    description:
      'Pressure-test your pitch before real money is on the line. AI roleplay with 5 buyer personas, live objection scoring, drill loops, and a skill dashboard that shows exactly where your close breaks.',
    items: [
      'AI roleplay with 5 buyer personas',
      'Objection handling score breakdowns',
      'Repeat drill loops until it sticks',
      'Progress tracked across 6 core sales skills',
      'OLIVE — your AI coach, available 24/7',
    ],
    stat: '5',
    statLabel: 'Buyer Personas',
    accent: 'var(--color-accent)',
  },
  {
    eyebrow: 'FSA Elite Presence',
    title: 'Sharpen the rep\'s image.',
    description:
      'Business cards that make people remember your name. Desk gear that signals you mean business. Branded tools that walk into every room before you do.',
    items: [
      'Premium 250-count business cards with QR code',
      'Digital tap-to-share NFC card',
      'Branded leather portfolio and presentation folders',
      'Closer hoodies and structured caps',
      'Custom desk gear and promo tools',
    ],
    stat: '17+',
    statLabel: 'Identity Products',
    accent: 'var(--color-warning)',
  },
  {
    eyebrow: 'FSA Elite Identity',
    title: 'Become the rep people remember.',
    description:
      'Skill earns the sale. Image earns the trust. Together they build a reputation that closes before you even open your mouth.',
    items: [
      '"I look established before I say a word"',
      '"I walk in sharper than the last rep they saw"',
      '"People remember my name after I leave"',
      '"I train under pressure so real conversations feel easy"',
      '"I\'m not just learning sales — I\'m building a brand"',
    ],
    stat: '1',
    statLabel: 'Platform. Skill + Identity.',
    accent: 'var(--color-success)',
  },
];

const INDUSTRIES = ['Automotive', 'Real Estate', 'Insurance', 'Solar', 'Retail', 'B2B', 'SaaS', 'Finance'];

const STEPS = [
  {
    num: '01',
    title: 'Join Once.',
    description: 'One payment. No monthly fees. Instant access to the full platform — training lab, member store, AI coach, and every future update.',
  },
  {
    num: '02',
    title: 'Train Under Pressure.',
    description: 'Run objection drills against AI buyers who push back hard. Score your responses. Drill the weak spots until your close feels automatic.',
  },
  {
    num: '03',
    title: 'Show Up Sharp.',
    description: 'Order your presence tools. Business cards that stick. Gear that signals you\'re serious. Walk into every room looking like you\'ve already won.',
  },
];

const TRANSFORMATION_BLOCKS = [
  {
    num: '01',
    eyebrow: 'Train the Conversation',
    title: 'Sound sharper than every rep who walked in before you.',
    description:
      'Most reps improvise. FSA ELITE members drill. AI roleplay puts you against buyers who won\'t back down — skeptical, price-resistant, and guarded. Score your handling. Fix what breaks. Repeat until the close feels automatic.',
    cta: 'Open the Roleplay Lab',
    href: '/roleplay',
  },
  {
    num: '02',
    eyebrow: 'Build Your Presence',
    title: 'Look more established before you say a word.',
    description:
      'A weak card. No leave-behind. Generic follow-up. That\'s forgettable. Business cards with your name and QR code, a branded portfolio, and a digital card that shares your info instantly — these are the details that separate average reps from ones people remember.',
    cta: 'Shop Presence Tools',
    href: '/store',
  },
  {
    num: '03',
    eyebrow: 'Be Remembered',
    title: 'Leave behind something they don\'t throw away.',
    description:
      'Branded folders with your proposal inside. Custom notepads that stay on the desk for months. USB drives loaded with your pitch. Every leave-behind is a rep in the room after you\'ve left. Make it count.',
    cta: 'See Leave-Behind Gear',
    href: '/store',
  },
  {
    num: '04',
    eyebrow: 'Become the Trusted Rep',
    title: 'Confidence, preparation, and consistency close deals.',
    description:
      'People buy from reps who know their product and look like they\'ve done this a hundred times. Training builds that confidence. Branding builds that trust. FSA ELITE builds both.',
    cta: 'Get Full Access',
    href: '/checkout-preview',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Who is this built for?',
    answer: 'Sales reps across any industry who want sharper conversations, a more established presence, and a rep identity that people remember. Automotive, real estate, insurance, B2B, solar — if you close deals, this was built for you.',
  },
  {
    question: 'What does it actually cost?',
    answer: `One-time ${formatUsd(SUBSCRIPTION_PRICE_CENTS)}. Not per month. Not per year. One payment, lifetime access to the full platform — training, store, AI coach, and every future update. Less than a sales lunch.`,
  },
  {
    question: 'What do I get access to?',
    answer: 'The AI Roleplay Lab with 5 buyer personas, the OLIVE assistant for 24/7 coaching, the full member store (17+ identity and presence products), your skill dashboard, and all future releases — immediately.',
  },
  {
    question: 'Are the store products customized with my brand?',
    answer: 'Yes. Business cards, notepads, portfolios, and other products are personalized with your name, logo, and contact info. These are self-branding tools built for reps who want their name to stick.',
  },
  {
    question: 'How do I get help?',
    answer: `Email ${SUPPORT_EMAIL} or call ${SUPPORT_PHONE} for billing, store orders, or platform access questions. We respond fast.`,
  },
  {
    question: 'What if I want something custom?',
    answer: 'Submit a Custom Merch Design Request from the store. Specific colors, team logos, custom quantities — we build it. Contact us to start.',
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
    return () => { active = false; };
  }, []);

  const trainingLink = hasMembership ? '/roleplay' : '/checkout-preview';
  const storeLink = hasMembership ? '/store' : '/checkout-preview';

  return (
    <>
      <Head>
        <title>FSA ELITE | Train Like a Closer. Look Like a Closer. Build a Name People Remember.</title>
        <meta
          name="description"
          content="FSA ELITE sharpens your pitch with AI roleplay training and elevates your image with premium self-branding tools. One payment. Skill + identity. Built for closers."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:site_name" content="FSA ELITE" />
        <meta property="og:title" content="FSA ELITE | Train Like a Closer. Look Like a Closer." />
        <meta property="og:description" content="AI roleplay training + professional self-branding tools for reps who refuse to be forgettable." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE | Train Like a Closer. Look Like a Closer." />
        <meta name="twitter:description" content="AI roleplay training + self-branding tools for sales reps who want to close more and be remembered." />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
      </Head>

      <div className="landing-page">
        {/* Navigation */}
        <header className="landing-nav">
          <div className="landing-nav-inner">
            <Link href="/" className="landing-brand">
              <img src="/logo.jpg" alt="FSA ELITE" className="landing-logo" />
              <span className="landing-brand-text">FSA ELITE</span>
            </Link>

            <nav className="landing-nav-links">
              <Link href="#brand-stack">What You Get</Link>
              <Link href="#transformation">How It Works</Link>
              <Link href="#faq">FAQ</Link>
            </nav>

            <div className="landing-nav-actions">
              <Link href="/login" className="landing-nav-link">Log in</Link>
              <Link href="/checkout-preview" className="btn-primary btn-sm">
                Get Started
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
              <Link href="#brand-stack" onClick={() => setMobileMenuOpen(false)}>What You Get</Link>
              <Link href="#transformation" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              <Link href="/checkout-preview" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="landing-hero">
          <div className="landing-hero-content">
            <div className="landing-hero-badge">
              <span className="landing-badge-dot" />
              One Payment. Lifetime Access. Skill + Identity.
            </div>
            
            <h1 className="landing-hero-title">
              Train like a closer.
              <br />
              <span className="landing-hero-highlight">Look like a closer.</span>
              <br />
              Build a name people remember.
            </h1>
            
            <p className="landing-hero-subtitle">
              FSA ELITE sharpens your pitch with AI pressure-testing and elevates
              your image with professional branding tools. Because skill closes deals —
              but presence makes them remember you.
            </p>

            <div className="landing-hero-actions">
              <Link href="/checkout-preview" className="btn-primary btn-lg">
                Get Full Access — {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
              <Link href={trainingLink} className="btn-secondary btn-lg">
                {hasMembership ? 'Open Roleplay Lab' : 'Preview Training'}
              </Link>
            </div>

            <p className="landing-hero-note">
              Instant access · No monthly fees · Secure Stripe checkout
            </p>
          </div>

          <div className="landing-hero-visual">
            <div className="landing-hero-card">
              <div className="landing-hero-card-header">
                <span className="landing-card-dot" />
                <span className="landing-card-dot" />
                <span className="landing-card-dot" />
                <span className="landing-hero-card-label">AI Roleplay Lab — Live Session</span>
              </div>
              <div className="landing-hero-card-content">
                <div className="landing-demo-chat">
                  <div className="landing-demo-msg landing-demo-msg-ai">
                    <span className="landing-demo-speaker">Skeptical Steve</span>
                    {'"We\'ve been burned by vendors before. Why should I trust your company?"'}
                  </div>
                  <div className="landing-demo-msg landing-demo-msg-user">
                    {'"That\'s exactly why I\'m here — let me show you the three things our last three clients said after 90 days."'}
                  </div>
                </div>
                <div className="landing-demo-scores">
                  <div className="landing-score-item">
                    <span>Rapport</span>
                    <strong className="score-high">92</strong>
                  </div>
                  <div className="landing-score-item">
                    <span>Objection</span>
                    <strong className="score-mid">78</strong>
                  </div>
                  <div className="landing-score-item">
                    <span>Close</span>
                    <strong className="score-high">85</strong>
                  </div>
                </div>
                <p className="landing-demo-feedback">
                  ✓ Strong reframe. Use a third-party proof story next to push past hesitation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Bar */}
        <div className="landing-industries">
          <div className="landing-industries-inner">
            {INDUSTRIES.map((industry) => (
              <span key={industry} className="landing-industry">{industry}</span>
            ))}
          </div>
        </div>

        {/* Brand Stack Section */}
        <section className="landing-section" id="brand-stack">
          <div className="landing-section-header">
            <span className="landing-eyebrow">The FSA ELITE Brand Stack</span>
            <h2 className="landing-section-title">Skill. Presence. Identity.</h2>
            <p className="landing-section-subtitle">
              Not a training app. Not a merch store. A closer identity ecosystem —
              built to sharpen how you sell and how you show up.
            </p>
          </div>

          <div className="landing-pillar-grid">
            {BRAND_PILLARS.map((pillar) => (
              <article key={pillar.eyebrow} className="landing-pillar-card">
                <div className="landing-pillar-header">
                  <span className="landing-pillar-eyebrow" style={{ color: pillar.accent }}>
                    {pillar.eyebrow}
                  </span>
                  <div className="landing-pillar-stat">
                    <strong style={{ color: pillar.accent }}>{pillar.stat}</strong>
                    <span>{pillar.statLabel}</span>
                  </div>
                </div>
                <h3 className="landing-pillar-title">{pillar.title}</h3>
                <p className="landing-pillar-description">{pillar.description}</p>
                <ul className="landing-pillar-list">
                  {pillar.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Transformation Sections */}
        <section className="landing-section-transform" id="transformation">
          <div className="landing-transform-inner">
            <div className="landing-section-header">
              <span className="landing-eyebrow">How FSA ELITE Works</span>
              <h2 className="landing-section-title">Four moves. One system.</h2>
              <p className="landing-section-subtitle">
                From the first drill to the last leave-behind, FSA ELITE builds the rep
                people respect and the brand they remember.
              </p>
            </div>

            <div className="landing-transform-grid">
              {TRANSFORMATION_BLOCKS.map((block) => (
                <article key={block.num} className="landing-transform-block">
                  <div className="landing-transform-num">{block.num}</div>
                  <span className="landing-eyebrow">{block.eyebrow}</span>
                  <h3 className="landing-transform-title">{block.title}</h3>
                  <p className="landing-transform-desc">{block.description}</p>
                  <Link
                    href={block.href}
                    className="landing-transform-link"
                  >
                    {block.cta} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="landing-section landing-section-alt" id="how-it-works">
          <div className="landing-section-header">
            <span className="landing-eyebrow">The Rep Journey</span>
            <h2 className="landing-section-title">Join. Train. Show up sharp.</h2>
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

        {/* CTA Section */}
        <section className="landing-cta">
          <div className="landing-cta-content">
            <span className="landing-eyebrow">One decision. Permanent advantage.</span>
            <h2>The rep who prepares harder closes more.<br />The rep who looks sharper gets trusted faster.</h2>
            <p>
              Most reps wing it and hope. FSA ELITE members drill it, brand it, and walk in
              looking like they have already closed this deal before. For {formatUsd(SUBSCRIPTION_PRICE_CENTS)}, there
              is no reason to be the forgettable rep in the room.
            </p>
            <div className="landing-cta-actions">
              <Link href="/checkout-preview" className="btn-primary btn-lg">
                Get Full Access — {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
              <Link href={storeLink} className="btn-secondary btn-lg">
                {hasMembership ? 'Browse the Store' : 'See Presence Tools'}
              </Link>
            </div>
            <p className="landing-hero-note" style={{ marginTop: '1.25rem' }}>
              Instant access · No monthly fees · Backed by Stripe security
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="landing-section" id="faq">
          <div className="landing-section-header">
            <span className="landing-eyebrow">FAQ</span>
            <h2 className="landing-section-title">Straight answers.</h2>
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

        {/* Footer */}
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
                <h4>Platform</h4>
                <Link href="/roleplay">AI Roleplay Lab</Link>
                <Link href="/store">Presence Store</Link>
                <Link href="/checkout-preview">Get Access</Link>
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
