import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
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
const BUSINESS_SITE = PUBLIC_SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

const HERO_METRICS = [
  {
    value: '24/7',
    label: 'AI objection reps available on demand',
  },
  {
    value: formatUsd(SUBSCRIPTION_PRICE_CENTS),
    label: 'One-time access to the full training offer',
  },
  {
    value: 'Multi-Industry',
    label: 'Built for auto, solar, insurance, retail, real estate, and B2B',
  },
];

const PLATFORM_ITEMS = [
  {
    title: 'AI Roleplay Lab',
    body: 'Practice against tough buyers, price shoppers, and hesitant decision-makers until your responses sound automatic under pressure.',
  },
  {
    title: 'AI Self-Branding Tools',
    body: 'Use AI-powered tools to create custom logos, design personal branding assets, and build a visual identity that sets you apart from every other rep.',
  },
  {
    title: 'Business Cards & Digital Cards',
    body: 'Order premium printed business cards or get a tap-to-share digital NFC card with your custom branding, QR code, and contact info built in.',
  },
  {
    title: 'Closer Frameworks',
    body: 'Train discovery, objection control, and conversation structure with systems designed for real selling environments.',
  },
  {
    title: 'Personal Brand Layer',
    body: 'Build a sharper identity with self-promotion gear, creator kits, and branded assets that make your presence feel intentional.',
  },
  {
    title: 'Return-Loop Commerce',
    body: 'The platform is built to bring members back after training for new drops, updates, and higher-value identity tools.',
  },
];

const POSITIONING_POINTS = [
  'Sharper positioning than a plain coaching page',
  'More premium than a generic training funnel',
  'Built to feel like a closer brand, not a template',
];

const INDUSTRIES = ['Automotive', 'Real Estate', 'Insurance', 'Solar', 'Retail', 'B2B'];

const PRODUCT_DROPS = [
  {
    title: 'Closer Uniform Hoodie',
    detail: 'Heavyweight, clean silhouette piece for everyday showroom reps.',
    price: '$79',
    tag: 'Signature Drop',
  },
  {
    title: 'FSA ELITE Cap Series',
    detail: 'Structured embroidered cap collection designed for camera and floor confidence.',
    price: '$42',
    tag: 'Identity Piece',
  },
  {
    title: 'Premium Business Cards',
    detail: '250-count thick-stock matte cards with your name, logo, QR code, and FSA ELITE branding.',
    price: '$49',
    tag: 'Essential',
  },
  {
    title: 'Digital Business Card',
    detail: 'Tap-to-share NFC smart card with custom branding, social links, and contact info built in.',
    price: '$29',
    tag: 'New Drop',
  },
  {
    title: 'Self-Promo Brand Kit',
    detail: 'Creator-forward identity package for reps building a public-facing personal brand, from cards to merch.',
    price: '$119',
    tag: 'Creator Stack',
  },
];

const MARKETPLACE_STEPS = [
  {
    title: 'Step 01',
    heading: 'Enter the lab',
    body: 'Use AI roleplay drills and self-branding tools to tighten the exact moments that usually cost reps the deal.',
  },
  {
    title: 'Step 02',
    heading: 'Build your brand',
    body: 'Create custom logos, order business cards, and set up a digital NFC card that makes your first impression unforgettable.',
  },
  {
    title: 'Step 03',
    heading: 'Return for the drops',
    body: 'Come back for gear, business cards, creator kits, and branding tools that support the rep identity you are building in public.',
  },
];

const ROADMAP_ITEMS = [
  {
    title: 'iOS Experience Upgrade',
    body: 'Native iPhone experience now supports completed roleplay sessions, synced progress tracking, and member commerce in one flow.',
  },
  {
    title: 'Android Experience Upgrade',
    body: 'Android now mirrors the core training loop with completed sessions, synchronized profiles, and mobile-first access on the floor.',
  },
  {
    title: 'Certification Engine',
    body: 'Skill-gated advancement with rankings, visible progress, and team-level credibility for serious reps.',
  },
];

const APP_INSPIRED_ITEMS = [
  {
    title: 'Daily Drill Loop',
    body: 'Borrow the best lesson from strong mobile training apps: short daily reps, clear prompts, and a reason to come back tomorrow and finish every session.',
  },
  {
    title: 'Session Review Feedback',
    body: 'Like top coaching products, FSA tracks how a rep is performing across web, iOS, and Android so improvement feels measurable, not vague.',
  },
  {
    title: 'Unlock Progression',
    body: 'Boss personas, certifications, and gated milestones create a real skill ladder instead of a static course archive.',
  },
  {
    title: 'Mobile-First Product Direction',
    body: 'The long-term experience should feel as fast and habitual as a top iPhone app, with quick daily entry points and clear next actions.',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Looks premium immediately',
    body: 'The public experience signals elite positioning before the user reads the first line of copy.',
  },
  {
    title: 'Connects skill with status',
    body: 'Training, image, and shopping behavior all support the same brand story instead of feeling disconnected.',
  },
  {
    title: 'Built for repeated return',
    body: 'Members can train now and keep coming back later for drops, updates, and stronger positioning tools.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Who is this for?',
    answer:
      'FSA ELITE is for salespeople in any industry, including automotive, real estate, insurance, solar, retail, service, and B2B teams that need stronger conversations and stronger personal branding.',
  },
  {
    question: 'What is the training price?',
    answer:
      'Elite Sales Performance full training course access is a one-time payment of $12.99 through Stripe Checkout.',
  },
  {
    question: 'What do I get immediately?',
    answer:
      'Immediate access to AI roleplay training, AI self-branding tools for logo and identity creation, the member business card store, objection tracks, mindset systems, and member updates as new modules go live.',
  },
  {
    question: 'How do I get support for billing or access?',
    answer:
      'For billing questions, order support, access issues, or cancellation requests, contact support by email or phone and include the email used during checkout.',
  },
];

export default function Home() {
  const [hasMembership, setHasMembership] = useState(false);

  useEffect(() => {
    let active = true;

    void fetchMembershipStatus().then((status) => {
      if (active) {
        setHasMembership(status);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const trainingLink = hasMembership ? '/roleplay' : '/checkout-preview';
  const storeLink = hasMembership ? '/store' : '/checkout-preview';

  return (
    <>
      <Head>
        <title>FSA ELITE Performance | Sales Training and Member Marketplace</title>
        <meta
          name="description"
          content="FSA ELITE Performance combines AI sales training, roleplay, and a member marketplace for self-branding gear built for salespeople in any industry."
        />
        <link rel="canonical" href="https://fsaeliteperformance.com/" />
        <meta property="og:title" content="FSA ELITE Performance | Sales Training and Member Marketplace" />
        <meta property="og:description" content="FSA ELITE Performance combines AI sales training, roleplay, and a member marketplace for self-branding gear built for salespeople in any industry." />
        <meta property="og:url" content="https://fsaeliteperformance.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE Performance | Sales Training and Member Marketplace" />
        <meta name="twitter:description" content="FSA ELITE Performance combines AI sales training, roleplay, and a member marketplace for self-branding gear built for salespeople in any industry." />
        <meta name="twitter:image" content="/logo.png" />
      </Head>

      <main className="home-page">
        <section className="home-hero">
          <div className="container">
            <header className="home-nav" aria-label="Primary">
              <div className="home-domain-bar">
                <span>Official: <a href="https://fsaeliteperformance.com" target="_blank" rel="noopener noreferrer">fsaeliteperformance.com</a></span>
              </div>
              <div className="home-brand-lockup">
                <div className="home-dual-logos">
                  <img className="home-brand-logo" src="/logo.png" alt="FSA ELITE Performance logo" />
                  <img className="home-brand-badge" src="/logo-badge.jpg" alt="FSA ELITE badge" />
                </div>
                <div>
                  <p className="home-brand-title">FSA ELITE</p>
                  <p className="home-brand-subtitle">Sales training and member marketplace</p>
                </div>
              </div>

              <nav className="home-nav-links">
                <Link href="#system">System</Link>
                <Link href="#store">Store</Link>
                <Link href="#faq">FAQ</Link>
              </nav>

              <div className="home-nav-actions">
                <Link href={trainingLink} className="btn-secondary">
                  {hasMembership ? 'AI Roleplay' : 'Unlock Access'}
                </Link>
                <Link href="/checkout-preview" className="btn-primary">
                  Join Now
                </Link>
              </div>
            </header>

            <div className="home-hero-grid">
              {/* Promo banner: small announcement to increase promotion visibility */}
              <div style={{ gridColumn: '1 / -1', marginBottom: '0.8rem' }}>
                <div style={{ background: 'linear-gradient(90deg, #f7f3ec, rgba(202,161,95,0.06))', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-primary-soft)' }}>
                    Launch Special: Get full training access for <strong>$12.99</strong> — AI roleplay and branding tools included.
                  </div>
                  <div>
                    <Link href="/checkout-preview" className="btn-primary">Join Now</Link>
                  </div>
                </div>
              </div>
              <div className="home-hero-copy-wrap">
                <p className="home-launch-pill">Founding access is open</p>
                <p className="eyebrow">FSA ELITE PERFORMANCE</p>
                <h1 className="home-hero-title">Train like a closer. Brand like a CEO. Build an identity that keeps paying you back.</h1>
                <p className="home-hero-copy">
                  FSA ELITE is a premium training and commerce platform for serious salespeople. Practice live
                  objection handling, use AI tools to create your own logos and branding, order premium and digital
                  business cards, and shop self-branded gear that makes your presence stronger online and on the floor.
                </p>

                <div className="home-hero-actions">
                  <Link href="/checkout-preview" className="btn-primary">
                    Start {SUBSCRIPTION_NAME}
                  </Link>
                  <Link href={trainingLink} className="btn-secondary">
                    {hasMembership ? 'Open Roleplay Lab' : 'Unlock Roleplay Lab'}
                  </Link>
                  <Link href={storeLink} className="btn-secondary">
                    {hasMembership ? 'Browse the Store' : 'Unlock Member Store'}
                  </Link>
                </div>

                <div className="home-hero-meta">
                  <p>
                    One-time payment: <strong>{formatUsd(SUBSCRIPTION_PRICE_CENTS)}</strong>
                  </p>
                  <p>
                    Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
                  </p>
                </div>

                <div className="home-stat-grid" aria-label="Platform highlights">
                  {HERO_METRICS.map((item) => (
                    <article className="home-stat-card" key={item.value}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="home-command-panel" aria-label="FSA positioning panel">
                <p className="home-command-kicker">Closer Operating System</p>
                <h2>Way stronger than a generic course page. Built to feel like a real premium brand.</h2>
                <p className="home-command-copy">
                  The goal is not just to sell access once. The goal is to build an ecosystem where training,
                  reputation, and repeat-return commerce all reinforce the same identity.
                </p>
                <ul className="home-proof-list">
                  {POSITIONING_POINTS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="home-command-status" role="status" aria-label="Platform availability">
                  <span>Web platform live</span>
                  <span>iOS platform live</span>
                  <span>Android platform live</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="home-marquee" aria-label="Industries served">
          <div className="container home-marquee-track">
            {INDUSTRIES.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="home-section" id="system">
          <div className="container">
            <div className="home-section-heading">
              <p className="eyebrow">Platform Core</p>
              <h2 className="section-title">A sharper public front-end for a training system that actually has depth behind it</h2>
              <p className="section-copy">
                This is where skill building, better positioning, and repeat-return member behavior come together in a
                single experience.
              </p>
            </div>
            <div className="home-grid">
              {PLATFORM_ITEMS.map((item) => (
                <article className="home-card" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section-alt">
          <div className="container">
            <div className="home-section-heading home-section-heading-split">
              <div>
                <p className="eyebrow">Member Loop</p>
                <h2 className="section-title">The model is simple: train hard, improve fast, then keep returning to reinforce the brand</h2>
              </div>
              <p className="section-copy">
                Instead of feeling like a dead-end checkout page, the site should feel like the front door to an
                ecosystem with room to grow.
              </p>
            </div>

            <div className="home-market-grid">
              {MARKETPLACE_STEPS.map((item) => (
                <article className="home-market-card" key={item.title}>
                  <p className="home-market-step">{item.title}</p>
                  <h3>{item.heading}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <div className="home-section-heading home-section-heading-split">
              <div>
                <p className="eyebrow">Why It Hits Harder</p>
                <h2 className="section-title">A better FSA site needs more than nicer colors. It needs a stronger argument.</h2>
              </div>
              <p className="section-copy">
                The message now positions FSA ELITE as a premium system for closers who care about skill, confidence,
                and visible status.
              </p>
            </div>

            <div className="home-proof-grid">
              {DIFFERENTIATORS.map((item) => (
                <article className="home-proof-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section-alt">
          <div className="container">
            <div className="home-section-heading home-section-heading-split">
              <div>
                <p className="eyebrow">What Strong Apps Teach</p>
                <h2 className="section-title">The best sales apps do four things well: fast return loops, visible progress, stronger feedback, and cleaner next steps.</h2>
              </div>
              <p className="section-copy">
                That pattern now fits FSA better: not just content delivery, but a product rhythm that feels more like a real training app and less like a one-time sales page.
              </p>
            </div>

            <div className="home-proof-grid">
              {APP_INSPIRED_ITEMS.map((item) => (
                <article className="home-proof-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section" id="store">
          <div className="container">
            <div className="home-section-heading home-section-heading-split">
              <div>
                <p className="eyebrow">Member Store</p>
                <h2 className="section-title">The storefront should feel like a reward for joining the culture, not an afterthought</h2>
              </div>
              <p className="section-copy">
                Featured drops turn the site into a branded destination and give members another reason to return after
                the initial purchase.
              </p>
            </div>
            <p className="home-store-note">
              One-stop shop direction: training plus self-promotion products like premium business cards, digital NFC cards,
              custom brand assets, clothing, and creator kits. Store checkout is live for members.
            </p>

            <div className="home-grid home-grid-products">
              {PRODUCT_DROPS.map((item) => (
                <article className="home-card home-product-card" key={item.title}>
                  <p className="home-product-tag">{item.tag}</p>
                  <h2>{item.title}</h2>
                  <p>{item.detail}</p>
                  <strong className="home-product-price">{item.price}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section-alt">
          <div className="container">
            <p className="eyebrow">Launch Roadmap</p>
            <h2 className="section-title">Web, iOS, and Android aligned. Better session performance over time.</h2>
            <div className="faq-list">
              {ROADMAP_ITEMS.map((item) => (
                <article className="faq-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section" id="faq">
          <div className="container">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Common questions before people commit</h2>
            <div className="faq-list">
              {FAQ_ITEMS.map((item) => (
                <article className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section-alt">
          <div className="container">
            <p className="eyebrow">Business Details</p>
            <div className="home-business-grid">
              <article className="home-business-card">
                <h2>Public business information</h2>
                <dl className="home-business-list">
                  <div>
                    <dt>Public business name</dt>
                    <dd>{BUSINESS_NAME}</dd>
                  </div>
                  <div>
                    <dt>Legal entity</dt>
                    <dd>{LEGAL_BUSINESS_NAME}</dd>
                  </div>
                  <div>
                    <dt>Website</dt>
                    <dd>{BUSINESS_SITE}</dd>
                  </div>
                  <div>
                    <dt>Support email</dt>
                    <dd>
                      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Support phone</dt>
                    <dd>{SUPPORT_PHONE}</dd>
                  </div>
                  <div>
                    <dt>Support address</dt>
                    <dd>
                      {SUPPORT_ADDRESS_LINE_1}, {SUPPORT_ADDRESS_CITY}, {SUPPORT_ADDRESS_STATE} {SUPPORT_ADDRESS_POSTAL},{' '}
                      {SUPPORT_ADDRESS_COUNTRY}
                    </dd>
                  </div>
                  <div>
                    <dt>Primary offer</dt>
                    <dd>One-time full digital sales training course access with AI roleplay and optional member merchandise.</dd>
                  </div>
                  <div>
                    <dt>Statement descriptor</dt>
                    <dd>{STRIPE_STATEMENT_DESCRIPTOR}</dd>
                  </div>
                </dl>
              </article>

              <article className="home-business-card">
                <h2>Delivery and customer support</h2>
                <ul className="home-business-points">
                  <li>Elite Sales Performance full training course access is billed as a one-time $12.99 Stripe payment.</li>
                  <li>Roleplay training and member content unlock after successful membership checkout.</li>
                  <li>The member self-promotion store unlocks after membership and uses separate merch checkout pricing.</li>
                  <li>Store checkout for self-branding items is marked coming soon while final Stripe product pricing is added.</li>
                  <li>Billing questions, access issues, order status requests, and cancellation inquiries are handled by email or phone.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="home-final-cta">
          <div className="container home-final-cta-inner">
            <div className="home-dual-logos" style={{ justifyContent: 'center', marginBottom: '1.2rem' }}>
              <img className="home-brand-logo" src="/logo.png" alt="FSA ELITE Performance logo" />
              <img className="home-brand-badge" src="/logo-badge.jpg" alt="FSA ELITE badge" />
            </div>
            <p className="eyebrow">Start Here</p>
            <h2>Build skill first. Build reputation next. Build a brand people remember after that.</h2>
            <p>
              Enter through the full training offer, use the roleplay lab immediately, and keep coming back as the FSA
              ELITE system expands.
            </p>
            <div className="home-cta-row home-final-cta-row">
              <Link href="/checkout-preview" className="btn-primary">
                Review Checkout
              </Link>
              <Link href={trainingLink} className="btn-secondary">
                {hasMembership ? 'Open Roleplay Lab' : 'Unlock Training Access'}
              </Link>
              <Link href={storeLink} className="btn-secondary">
                {hasMembership ? 'Explore Member Store' : 'Unlock Member Store'}
              </Link>
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <div className="home-dual-logos" style={{ justifyContent: 'center', marginBottom: '0.8rem' }}>
            <img className="home-brand-badge" src="/logo-badge.jpg" alt="FSA ELITE badge" style={{ width: '2.4rem' }} />
            <img className="home-brand-logo" src="/logo.png" alt="FSA ELITE Performance logo" style={{ width: '2.4rem' }} />
          </div>
          <p>© {CURRENT_YEAR} {BUSINESS_NAME}. Sales training and member commerce for any industry.</p>
          <p>
            Public website: {BUSINESS_SITE} · Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
          </p>
          <p className="site-footer-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>•</span>
            <Link href="/refund-policy">Refund Policy</Link>
            <span>•</span>
            <Link href="/terms">Terms of Service</Link>
          </p>
        </footer>
      </main>
    </>
  );
}
