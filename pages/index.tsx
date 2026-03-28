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
    title: 'AI Roleplay Lab',
    description: '5 buyer personas with real-time scoring on objection handling, closing techniques, and rapport building.',
    stat: '5',
    statLabel: 'AI Personas',
  },
  {
    title: 'FSA Store',
    description: 'Premium business cards, branded gear, and promo tools that make your presence memorable.',
    stat: '17+',
    statLabel: 'Products',
  },
  {
    title: 'OLIVE Assistant',
    description: 'Your AI sales coach available 24/7 for roleplay practice, script help, and pitch feedback.',
    stat: '24/7',
    statLabel: 'Available',
  },
  {
    title: 'Skill Tracking',
    description: 'Monitor your progress across 6 core sales skills with detailed performance analytics.',
    stat: '6',
    statLabel: 'Skills Tracked',
  },
];

const INDUSTRIES = ['Automotive', 'Real Estate', 'Insurance', 'Solar', 'Retail', 'B2B', 'SaaS', 'Finance'];

const GROWTH_PATH = [
  {
    title: 'Phase 1 · Founding Access',
    description: 'Start with AI drills, dashboard visibility, and store access so the method gets proven in real conversations first.',
    stat: 'Now',
    statLabel: 'Live',
  },
  {
    title: 'Phase 2 · Team Training',
    description: 'Add recurring coaching, score reviews, and sales-process support for small and mid-sized businesses.',
    stat: 'MRR',
    statLabel: 'Team Programs',
  },
  {
    title: 'Phase 3 · Enterprise System',
    description: 'Turn the proven method into recruiting standards, leadership visibility, and software-enabled performance.',
    stat: 'Scale',
    statLabel: 'Systemized',
  },
];

const PRICING_OPTIONS = [
  {
    title: 'Solo / Founding Access',
    description: `Start with the current Phase One experience for ${formatUsd(SUBSCRIPTION_PRICE_CENTS)} one time.`,
    stat: formatUsd(SUBSCRIPTION_PRICE_CENTS),
    statLabel: 'One Time',
  },
  {
    title: 'Team Training',
    description: 'Monthly recurring coaching, onboarding, and KPI reviews for growing sales teams.',
    stat: 'Monthly',
    statLabel: 'Contact Sales',
  },
  {
    title: 'Enterprise',
    description: 'Custom scope for larger rollouts, leadership reporting, and recruiting standards.',
    stat: 'Custom',
    statLabel: 'Annual / Scoped',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Join',
    description: 'One-time payment. Instant Phase One access. No recurring charges.',
  },
  {
    num: '02',
    title: 'Train',
    description: 'Run AI objection drills and see exactly where your pitch breaks.',
  },
  {
    num: '03',
    title: 'Close',
    description: 'Walk into every room with sharper skills and a stronger presence.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Who is this for?',
    answer: 'Closers, team leads, and small-to-mid-sized businesses that want more revenue from stronger conversations, cleaner systems, and a sharper rep presence.',
  },
  {
    question: 'What does it cost?',
    answer: `Founding Access is ${formatUsd(SUBSCRIPTION_PRICE_CENTS)} one time for the current Phase One experience. Team and enterprise programs are structured separately as recurring engagements.`,
  },
  {
    question: 'What do I get?',
    answer: 'Immediate access to the current AI Roleplay Lab, OLIVE assistant, dashboard, and FSA Store. Future phases and premium service layers may be offered separately.',
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
  return (
    <>
      <Head>
        <title>FSA ELITE | Sales Performance Training for Closers and Teams</title>
        <meta
          name="description"
          content="FSA Elite Performance helps closers and sales teams grow revenue with AI roleplay, rep-branding tools, and a sharper sales system."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:site_name" content="FSA ELITE" />
        <meta property="og:title" content="FSA ELITE | Sales Performance Training for Closers and Teams" />
        <meta property="og:description" content="AI roleplay, rep-branding tools, and sales performance training built to help closers and teams grow revenue." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE | Sales Performance Training" />
        <meta name="twitter:description" content="AI roleplay, rep-branding tools, and sales performance training for closers and teams." />
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
              <div className="landing-hero-badge">
                <span className="landing-badge-dot" />
                Phase One. Founding Access.
              </div>
              
              <h1 className="landing-hero-title">
                Train the rep.
                <br />
                <span className="landing-hero-highlight">Sharpen the system.</span>
              </h1>
              
              <p className="landing-hero-subtitle">
                FSA Elite Performance helps closers and growing sales teams increase revenue
                with AI drills, rep-branding tools, and a sales system that gets proven before it gets bigger.
              </p>

              <div className="landing-hero-actions">
                <Link href="/checkout-preview" className="btn-primary btn-lg">
                  Claim Founding Access — {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
                </Link>
                <Link href={trainingLink} className="btn-secondary btn-lg">
                  {hasMembership ? 'Open Roleplay Lab' : 'Preview Training'}
              </Link>
            </div>

            <p className="landing-hero-note">
              Current Phase One access · One-time payment · Secure checkout
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
                    <span className="landing-demo-speaker">Skeptical Steve</span>
                    {'"We\'ve been burned by vendors before. Why should I trust your company?"'}
                  </div>
                  <div className="landing-demo-msg landing-demo-msg-user">
                    Your response here...
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

        {/* Features Section */}
        <section className="landing-section" id="features">
          <div className="landing-section-header">
            <span className="landing-eyebrow">Features</span>
            <h2 className="landing-section-title">The current sales performance stack</h2>
            <p className="landing-section-subtitle">
              Start with the drills, dashboard, and store that help prove the method in real conversations.
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

        <section className="landing-section landing-section-alt">
          <div className="landing-section-header">
            <span className="landing-eyebrow">Growth Ladder</span>
            <h2 className="landing-section-title">Build proof before you build complexity</h2>
            <p className="landing-section-subtitle">
              FSA ELITE starts with a sharp entry offer, then expands into recurring team programs and a scalable system.
            </p>
          </div>

          <div className="landing-features-grid">
            {GROWTH_PATH.map((item) => (
              <article key={item.title} className="landing-feature-card">
                <div className="landing-feature-stat">
                  <strong>{item.stat}</strong>
                  <span>{item.statLabel}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="landing-section" id="how-it-works">
          <div className="landing-section-header">
            <span className="landing-eyebrow">How It Works</span>
            <h2 className="landing-section-title">Start with proof, then scale</h2>
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

        <section className="landing-section landing-section-alt">
          <div className="landing-section-header">
            <span className="landing-eyebrow">Pricing Model</span>
            <h2 className="landing-section-title">Start with access. Grow into recurring revenue.</h2>
            <p className="landing-section-subtitle">
              The current checkout unlocks Phase One today, while team and enterprise programs support the long-term revenue model.
            </p>
          </div>

          <div className="landing-features-grid">
            {PRICING_OPTIONS.map((item) => (
              <article key={item.title} className="landing-feature-card">
                <div className="landing-feature-stat">
                  <strong>{item.stat}</strong>
                  <span>{item.statLabel}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="landing-cta">
          <div className="landing-cta-content">
            <h2>The rep who prepares harder closes more.</h2>
            <p>
              Most reps wing it. FSA ELITE starts by sharpening the rep, then turns
              that proof into stronger coaching, cleaner standards, and scalable growth.
            </p>
            <div className="landing-cta-actions">
              <Link href="/checkout-preview" className="btn-primary btn-lg">
                Start Phase One for {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
              <a href={`mailto:${SUPPORT_EMAIL}?subject=FSA%20ELITE%20Team%20Training`} className="btn-secondary btn-lg">
                Ask About Team Training
              </a>
            </div>
          </div>
        </section>

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
                <h4>Product</h4>
                <Link href="/roleplay">Roleplay Lab</Link>
                <Link href="/store">Store</Link>
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
