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

const PILLARS = [
  {
    icon: '\u{1F3AF}',
    title: 'AI Roleplay Lab',
    body: '5 buyer personas. Real-time scoring on 6 skills. Pressure-test your close before the real money is on the table.',
  },
  {
    icon: '\u{1F9F0}',
    title: 'Sales Promo Tools',
    body: 'Branded notepads, presentation folders, USB drives, and desk gear that keep your name in the room after you leave.',
  },
  {
    icon: '\u{1F4B3}',
    title: 'Business Cards',
    body: '250 premium matte cards or a tap-to-share NFC card — make your intro land before you finish the handshake.',
  },
  {
    icon: '\u{1F454}',
    title: 'Closer Gear',
    body: 'Hoodies, caps, and creator kits that say you take your craft seriously — before you open your mouth.',
  },
];

const FEATURED_DROPS = [
  { name: 'Branded Leather Portfolio', price: '$39', tag: 'Pro Tool' },
  { name: 'Premium Business Cards (250ct)', price: '$49', tag: 'Essential' },
  { name: 'Self-Promo Brand Kit', price: '$119', tag: 'Best Value' },
  { name: 'Digital NFC Card', price: '$29', tag: 'New' },
];

const STEPS = [
  {
    num: '01',
    title: 'Join',
    body: '$12.99 once. No subscription. Instant access to AI training, the member store, and every future update.',
  },
  {
    num: '02',
    title: 'Train',
    body: 'Run AI objection drills against 5 tough personas. See exactly where your pitch breaks — then fix it.',
  },
  {
    num: '03',
    title: 'Promote',
    body: 'Order business cards, desk tools, branded promo gear — and walk into every room looking like you own it.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Who is this for?',
    answer:
      'Sales managers who want sharper teams and individual reps who want stronger conversations, cleaner branding, and a more memorable presence in any industry.',
  },
  {
    question: 'What does it cost?',
    answer:
      'One-time $12.99 for full platform access. Most sales courses charge $49/month or $997+ for coaching. This is less than a sales lunch — no monthly fees, no recurring charges. Store items are priced separately.',
  },
  {
    question: 'What do I get immediately?',
    answer:
      'Immediate access to the AI Roleplay Lab, your dashboard, the full member store, and all future FSA ELITE training content tied to this membership.',
  },
  {
    question: 'How do I get support?',
    answer:
      'Email fsaeliteperformance@gmail.com or call +1 (337) 336-2635 for billing, access, or order questions.',
  },
];

export default function Home() {
  const [hasMembership, setHasMembership] = useState(false);

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
        <title>FSA ELITE | FSA Elite Performance Sales Training, Roleplay, and Branding</title>
        <meta
          name="description"
          content="Find FSA Elite at fsaeliteperformance.com for AI-powered sales training, objection roleplay, self-branding tools, and closer gear built for reps who want to level up fast."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:site_name" content="FSA ELITE" />
        <meta property="og:title" content="FSA ELITE | FSA Elite Performance Sales Training, Roleplay, and Branding" />
        <meta property="og:description" content="Find FSA Elite at fsaeliteperformance.com for AI-powered sales training, objection roleplay, self-branding tools, and closer gear built for reps who want to level up fast." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE | FSA Elite Performance Sales Training, Roleplay, and Branding" />
        <meta name="twitter:description" content="Find FSA Elite at fsaeliteperformance.com for AI-powered sales training, objection roleplay, self-branding tools, and closer gear built for reps who want to level up fast." />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
      </Head>

      <main className="hp">
        {/* Nav */}
        <header className="hp-nav">
          <div className="container hp-nav-inner">
            <Link href="/" className="hp-logo-link">
              <img src="/logo.png" alt="FSA ELITE" className="hp-logo" />
              <span className="hp-logo-text">FSA ELITE</span>
            </Link>
            <nav className="hp-nav-links">
              <Link href="#training">Training</Link>
              <Link href="#store">Store</Link>
              <Link href="#faq">FAQ</Link>
            </nav>
            <div className="hp-nav-actions">
              <Link href={trainingLink} className="btn-secondary btn-sm">
                {hasMembership ? 'Open Roleplay Lab' : 'See Member Access'}
              </Link>
              <Link href="/checkout-preview" className="btn-primary btn-sm">
                Unlock Access \u2014 {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="hp-hero">
          <div className="container hp-hero-inner">
            <div className="hp-hero-logo-wrap">
              <img src="/logo.png" alt="FSA ELITE Performance Training" className="hp-hero-logo" />
            </div>
            <p className="hp-pill"><span className="hp-pill-dot" aria-hidden="true" />One Payment. Lifetime Access.</p>
            <h1 className="hp-title">
              Close harder.<br />
              Look sharper.<br />
              Get remembered.
            </h1>
            <p className="hp-subtitle">
              AI objection drills, self-branding tools, and closer gear — all in one platform
              for reps who refuse to blend in. One payment. No subscription.
            </p>
            <div className="hp-hero-actions">
              <Link href="/checkout-preview" className="btn-primary btn-lg">
                Unlock {SUBSCRIPTION_NAME} \u2014 {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
              <Link href={storeLink} className="btn-secondary btn-lg">
                {hasMembership ? 'Open Member Store' : 'Preview the Member Store'}
              </Link>
            </div>
            <p className="hp-hero-note">Instant access · 5 AI personas · 15+ store products · Secure Stripe checkout · No monthly subscription</p>
          </div>
        </section>

        {/* Industry bar */}
        <div className="hp-industries">
          <div className="container hp-industries-inner">
            {['Automotive', 'Real Estate', 'Insurance', 'Solar', 'Retail', 'B2B'].map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <section className="hp-section" id="training">
          <div className="container">
            <p className="eyebrow">What You Get</p>
            <h2 className="hp-section-title">Training, branding, and gear &mdash; connected.</h2>
            <div className="hp-pillar-grid">
              {PILLARS.map((p) => (
                <article className="hp-pillar" key={p.title}>
                  <span className="hp-pillar-icon">{p.icon}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="hp-section hp-section-alt">
          <div className="container">
            <p className="eyebrow">How It Works</p>
            <h2 className="hp-section-title">Three steps from signup to closing stronger</h2>
            <div className="hp-steps">
              {STEPS.map((s) => (
                <article className="hp-step" key={s.num}>
                  <span className="hp-step-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Store teaser */}
        <section className="hp-section" id="store">
          <div className="container">
            <div className="hp-split">
              <div>
                <p className="eyebrow">Member Store</p>
                <h2 className="hp-section-title">Tools and identity pieces that keep working after the pitch ends</h2>
                <p className="hp-muted-text">
                  Business cards, desk gear, and promo tools built for reps who want cleaner introductions,
                  better leave-behinds, and a stronger professional look in every room.
                </p>
                <div className="hp-store-cta">
                  <Link href={storeLink} className="btn-primary">
                    {hasMembership ? 'Shop the Store' : 'Unlock Member Store'}
                  </Link>
                </div>
              </div>
              <div className="hp-drops-grid">
                {FEATURED_DROPS.map((d) => (
                  <article className="hp-drop" key={d.name}>
                    <span className="hp-drop-tag">{d.tag}</span>
                    <h4>{d.name}</h4>
                    <strong>{d.price}</strong>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="hp-cta-band">
          <div className="container hp-cta-inner">
            <h2>The rep who prepares harder closes more.</h2>
            <p>Most reps wing it. FSA ELITE members drill it, brand it, and walk in looking like they have already closed this deal before.</p>
            <div className="hp-hero-actions">
              <Link href="/checkout-preview" className="btn-primary btn-lg">
                Start for {formatUsd(SUBSCRIPTION_PRICE_CENTS)}
              </Link>
              <Link href={trainingLink} className="btn-secondary btn-lg">
                {hasMembership ? 'Open Roleplay Lab' : 'Preview Training'}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="hp-section hp-section-alt" id="faq">
          <div className="container">
            <p className="eyebrow">FAQ</p>
            <h2 className="hp-section-title">Common questions</h2>
            <div className="hp-faq-grid">
              {FAQ_ITEMS.map((f) => (
                <article className="hp-faq" key={f.question}>
                  <h3>{f.question}</h3>
                  <p>{f.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="hp-footer">
          <div className="container hp-footer-inner">
            <div className="hp-footer-brand">
              <img src="/logo.png" alt="FSA ELITE" className="hp-footer-logo" />
              <div>
                <strong>{BUSINESS_NAME}</strong>
                <span>Operated by {LEGAL_BUSINESS_NAME}</span>
              </div>
            </div>
            <div className="hp-footer-meta">
              <p>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> \u00b7 {SUPPORT_PHONE}
              </p>
              <p>
                {SUPPORT_ADDRESS_LINE_1}, {SUPPORT_ADDRESS_CITY}, {SUPPORT_ADDRESS_STATE} {SUPPORT_ADDRESS_POSTAL}, {SUPPORT_ADDRESS_COUNTRY}
              </p>
              <p>Statement descriptor: {STRIPE_STATEMENT_DESCRIPTOR}</p>
            </div>
            <div className="hp-footer-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/refund-policy">Refund Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
            <p className="hp-footer-copy">\u00a9 {CURRENT_YEAR} {BUSINESS_NAME}. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
