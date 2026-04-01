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
  SUPPORT_ADDRESS_COUNTRY,
  SUPPORT_ADDRESS_LINE_1,
  SUPPORT_ADDRESS_POSTAL,
  SUPPORT_ADDRESS_STATE,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';
import {
  formatUsd,
  SUBSCRIPTION_NAME,
  SUBSCRIPTION_PRICE_CENTS,
} from '../lib/subscriptionPlan';
import { fetchMembershipStatus } from '../lib/membershipClient';

const CURRENT_YEAR = new Date().getFullYear();
const BUSINESS_NAME = PUBLIC_BUSINESS_NAME;
const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

const FEATURES = [
  {
    icon: '🎯',
    title: 'Train the Conversation',
    description: 'Run AI objection drills under pressure. Get scored on rapport, closing, and recovery — the skills that separate closers from talkers.',
    bullets: ['5 buyer personas that push back hard', 'Real-time score feedback on every response', 'Drill loops that target your weakest points'],
  },
  {
    icon: '🔥',
    title: 'Build Your Presence',
    description: 'Premium business cards, branded gear, and professional tools that make you look established before you say a single word.',
    bullets: ['Self-branding cards and promo tools', 'Closer gear built for real selling environments', 'Desk, meeting, and content-ready identity pieces'],
  },
  {
    icon: '💎',
    title: 'Be Remembered After the Meeting',
    description: 'Leave behind something that keeps your name working when the conversation ends — folders, branded materials, polished follow-up tools.',
    bullets: ['Presentation folders and leave-behinds', 'Branded portfolios and desk gear', 'Materials that build trust on contact'],
  },
  {
    icon: '⚡',
    title: 'Become the Rep People Trust Faster',
    description: 'Confidence is built through preparation. Professionalism is built through consistency. FSA ELITE trains both.',
    bullets: ['Skill tracking across 6 core sales metrics', 'OLIVE AI coach available 24/7', 'Progress system that compounds over time'],
  },
];

const INDUSTRIES = ['Automotive', 'Real Estate', 'Insurance', 'Solar', 'Retail', 'B2B', 'SaaS', 'Finance'];

const STEPS = [
  {
    num: '01',
    title: 'Join',
    description: 'One-time payment. No subscription. Instant access to training, branding tools, and the member store.',
  },
  {
    num: '02',
    title: 'Train',
    description: 'Run AI objection drills. Get scored. Watch your pitch get sharper and your confidence get louder.',
  },
  {
    num: '03',
    title: 'Show Up Different',
    description: 'Walk in with sharper skills, cleaner branding, and a presence that closes before you even speak.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Who is this for?',
    answer: 'Sales professionals who want to sound sharper in conversations, look more established in person, and leave behind something people remember. Built for closers in any industry.',
  },
  {
    question: 'What does it cost?',
    answer: `One-time ${formatUsd(SUBSCRIPTION_PRICE_CENTS)} for full platform access — training, AI coaching, and the member store. No monthly fees. Store items priced separately.`,
  },
  {
    question: 'What makes this different from other training?',
    answer: 'Most platforms teach scripts. FSA ELITE builds identity. You train under pressure with AI, then back it up with professional branding tools that make people trust you faster.',
  },
  {
    question: 'How do I get support?',
    answer: `Email ${SUPPORT_EMAIL} or call ${SUPPORT_PHONE} for billing, access, or order questions.`,
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
        <title>FSA ELITE | Train Like a Closer. Look Like a Closer.</title>
        <meta
          name="description"
          content="FSA ELITE helps sales reps sharpen their pitch, elevate their image, and build a brand that closes before they even speak. AI training + professional self-branding."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:site_name" content="FSA ELITE" />
        <meta property="og:title" content="FSA ELITE | Train Like a Closer. Look Like a Closer." />
        <meta property="og:description" content="Sharpen your pitch, elevate your image, and build a presence people remember. AI sales training + professional self-branding." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE | Train Like a Closer" />
        <meta name="twitter:description" content="AI-powered sales training and professional self-branding tools for reps who refuse to blend in." />
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
              <Link href="#features">Features</Link>
              <Link href="#how-it-works">How It Works</Link>
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
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
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
            <div className="landing-hero-badge landing-hero-badge-gold">
              <span className="landing-badge-dot" />
              One Payment. Lifetime Access.
            </div>
            
            <h1 className="landing-hero-title">
              Sharpen your close.
              <br />
              <span className="landing-hero-highlight">Sharpen your image.</span>
            </h1>
            
            <p className="landing-hero-subtitle">
              FSA ELITE helps sales reps sharpen their pitch, elevate their image,
              and build a brand that closes before they even speak.
            </p>

            <div className="landing-hero-actions">
              <Link href="/checkout-preview" className="btn-primary btn-lg">
                Unlock Access — {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
              <Link href={trainingLink} className="btn-secondary btn-lg">
                {hasMembership ? 'Open Roleplay Lab' : 'Preview Training'}
              </Link>
            </div>

            <p className="landing-hero-note">
              Instant access · No subscription · Secure checkout
            </p>
          </div>

          <div className="landing-hero-visual">
            <div className="landing-hero-split">
              <div className="landing-split-side">
                <span className="landing-split-label landing-split-label-train">Training</span>
                <ul className="landing-split-items">
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-blue" />
                    AI objection drills
                  </li>
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-blue" />
                    Real-time scoring
                  </li>
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-blue" />
                    5 buyer personas
                  </li>
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-blue" />
                    Skill tracking
                  </li>
                </ul>
              </div>
              <div className="landing-split-side">
                <span className="landing-split-label landing-split-label-presence">Presence</span>
                <ul className="landing-split-items">
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-gold" />
                    Business cards
                  </li>
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-gold" />
                    Branded gear
                  </li>
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-gold" />
                    Desk tools
                  </li>
                  <li className="landing-split-item">
                    <span className="landing-split-dot landing-split-dot-gold" />
                    Promo identity
                  </li>
                </ul>
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

        {/* Identity Pillars Section */}
        <section className="landing-section" id="features">
          <div className="landing-section-header">
            <span className="landing-eyebrow">The FSA Elite System</span>
            <h2 className="landing-section-title">Skill creates the closer. Presence makes them unforgettable.</h2>
            <p className="landing-section-subtitle">
              Training builds the conversation. Branding builds the reputation. FSA gives you both.
            </p>
          </div>

          <div className="landing-pillars-grid">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="landing-pillar-card">
                <span className="landing-pillar-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="landing-pillar-bullets">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="landing-section landing-section-alt" id="how-it-works">
          <div className="landing-section-header">
            <span className="landing-eyebrow">How It Works</span>
            <h2 className="landing-section-title">From signup to showing up different</h2>
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
            <h2>Average reps try to be liked. Elite reps try to be remembered.</h2>
            <p>
              Train the pitch. Upgrade the presence. Walk in looking like you have
              already closed this deal before. FSA ELITE builds both sides.
            </p>
            <div className="landing-cta-actions">
              <Link href="/checkout-preview" className="btn-primary btn-lg">
                Start for {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
              <Link href={storeLink} className="btn-secondary btn-lg">
                {hasMembership ? 'Open Store' : 'Explore Closer Gear'}
              </Link>
            </div>
          </div>
        </section>

        {/* Midline */}
        <div className="landing-midline">
          <p className="landing-midline-text">
            {"\"I'm not just learning sales — I "}
            <strong>look</strong>
            {", "}
            <strong>sound</strong>
            {", and "}
            <strong>move</strong>
            {' like a pro. People remember me.\"'}
          </p>
        </div>

        {/* FAQ Section */}
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
                <Link href="/roleplay">Training Lab</Link>
                <Link href="/store">Closer Gear</Link>
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
