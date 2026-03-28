import Head from 'next/head';
import Link from 'next/link';
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

const CURRENT_YEAR = new Date().getFullYear();
const BUSINESS_NAME = PUBLIC_BUSINESS_NAME;
const BUSINESS_SITE = PUBLIC_SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

const PLATFORM_ITEMS = [
  {
    title: 'Live AI Sales Battles',
    body: 'Run realistic objection rounds against difficult buyer personas and improve your close timing in every session.',
  },
  {
    title: 'Elite Training Tracks',
    body: 'Climb structured tracks built for closers: discovery control, script systems, and high-pressure conversation flow.',
  },
  {
    title: 'Performance Analytics',
    body: 'Track session quality, confidence, and conversion fundamentals so your reps become predictably stronger.',
  },
  {
    title: 'Member Commerce Layer',
    body: 'Launch your rep identity with premium FSA ELITE drops and self-promoting gear directly inside the platform.',
  },
];

const PRODUCT_DROPS = [
  {
    title: 'Closer Uniform Hoodie',
    detail: 'Heavyweight, clean silhouette piece for everyday showroom reps.',
    price: '$79',
  },
  {
    title: 'FSA ELITE Cap Series',
    detail: 'Structured embroidered cap collection designed for camera and floor confidence.',
    price: '$42',
  },
  {
    title: 'Self-Promo Brand Kit',
    detail: 'Creator-forward identity package for reps building a public-facing personal brand.',
    price: '$119',
  },
];

const MARKETPLACE_STEPS = [
  {
    title: 'Train Your Pitch',
    body: 'Use AI roleplay and objection drills to sharpen the conversations that actually close deals.',
  },
  {
    title: 'Build Your Identity',
    body: 'Turn your name, image, and team presence into a recognizable personal sales brand.',
  },
  {
    title: 'Return To Shop',
    body: 'Come back for apparel, creator kits, and self-logo gear that helps you show up stronger online and in person.',
  },
];

const ROADMAP_ITEMS = [
  {
    title: 'iOS App Launch',
    body: 'Native iOS experience with roleplay sessions, score history, and member commerce.',
  },
  {
    title: 'Android App Launch',
    body: 'Full Android release with synchronized profiles and challenge ladders.',
  },
  {
    title: 'Certification Engine',
    body: 'Skill-gated advancement with badges, rankings, and team-level visibility.',
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
      'Immediate access to roleplay training, objection tracks, mindset systems, and member updates as new modules go live.',
  },
  {
    question: 'How do I get support for billing or access?',
    answer:
      'For billing questions, order support, access issues, or cancellation requests, contact support by email or phone and include the email used during checkout.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>FSA ELITE Performance | Sales Training and Member Marketplace</title>
        <meta
          name="description"
          content="FSA ELITE Performance combines AI sales training, roleplay, and a member marketplace for self-branding gear built for salespeople in any industry."
        />
      </Head>

      <main>
        <section className="home-hero">
          <div className="container">
            <div className="home-top-row">
              <p className="home-top-note">fsaeliteperformance.com</p>
              <p className="home-top-note home-top-note-muted">Founding Access Open</p>
            </div>

            <div className="home-hero-grid">
              <div>
                <img className="home-brand-logo" src="/logo.png" alt="FSA ELITE Performance logo" />
                <p className="eyebrow">FSA ELITE PERFORMANCE</p>
                <h1 className="home-hero-title">Train your sales game. Return for the gear that grows your brand.</h1>
                <p className="home-hero-copy">
                  FSA ELITE is a training and shopping ecosystem for salespeople in any industry. Practice real
                  conversations, sharpen performance, then come back to buy premium self-logo products and brand gear
                  that help you stand out in the market.
                </p>
                <p className="home-subnote home-subnote-strong">
                  High-performance training, athlete-style development, and elite optimization for serious closers.
                </p>

                <div className="home-availability-row" role="status" aria-label="platform availability">
                  <span>Web platform: live</span>
                  <span>iOS launch: in progress</span>
                  <span>Android launch: in progress</span>
                </div>

                <div className="home-price-callout">
                  <strong>{formatUsd(SUBSCRIPTION_PRICE_CENTS)}</strong>
                  <span>full training course</span>
                </div>

                <div className="home-cta-row">
                  <Link href="/checkout-preview" className="btn-primary">
                    Get Started
                  </Link>
                  <Link href="/roleplay" className="btn-secondary">
                    Try AI Roleplay
                  </Link>
                  <Link href="/store" className="btn-secondary">
                    Shop Member Gear
                  </Link>
                  <Link href="#faq" className="btn-secondary">
                    Learn More
                  </Link>
                </div>

                <p className="home-subnote">
                  One-time payment for {SUBSCRIPTION_NAME} with secure Stripe-hosted checkout.
                </p>
                <p className="home-subnote home-subnote-strong">
                  Support contact: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
                </p>
              </div>

              <aside className="home-proof-panel" aria-label="FSA launch highlights">
                <p className="eyebrow">Member Marketplace</p>
                <h2>Built so reps train here, then keep coming back to shop here.</h2>
                <ul className="home-proof-list">
                  <li>Training for automotive, real estate, solar, insurance, retail, and B2B</li>
                  <li>Marketplace feel with repeat-return shopping behavior</li>
                  <li>Premium gear for personal logos, team identity, and self-promo</li>
                </ul>
                <Link href="/store" className="btn-secondary home-proof-btn">
                  View Current Drops
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section className="home-signal-strip" aria-label="FSA performance principles">
          <div className="container home-signal-grid">
            <p>Train like a professional.</p>
            <p>Shop like a member.</p>
            <p>Build a brand people remember.</p>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <p className="eyebrow">Platform Core</p>
            <h2 className="section-title">A sales training app with an Amazon-style member return loop</h2>
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
            <p className="eyebrow">How It Works</p>
            <h2 className="section-title">One place to train, improve, and buy back into your own image</h2>
            <div className="home-market-grid">
              {MARKETPLACE_STEPS.map((item) => (
                <article className="home-market-card" key={item.title}>
                  <p className="home-market-step">{item.title}</p>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container home-split">
            <div>
              <p className="eyebrow">Sales Identity Stack</p>
              <h2 className="section-title">For any salesperson building skill and visibility</h2>
              <p className="section-copy">
                FSA ELITE is not limited to one vertical. It is for salespeople who want better reps, better
                confidence, and a clean place to buy products that represent their own name, team, or identity.
              </p>
            </div>
            <ul className="checklist">
              <li>Practice scripts and objection handling on demand</li>
              <li>Return later to shop featured merch and brand assets</li>
              <li>Use self-logo gear to support online and offline presence</li>
              <li>Grow from trainee to recognizable sales professional</li>
            </ul>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <p className="eyebrow">Member Store</p>
            <h2 className="section-title">A shopping shelf designed to pull members back in</h2>
            <div className="home-grid home-grid-products">
              {PRODUCT_DROPS.map((item) => (
                <article className="home-card home-product-card" key={item.title}>
                  <p className="home-product-tag">Drop Preview</p>
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
            <h2 className="section-title">Web now. Mobile next. Dominance always.</h2>
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
            <h2 className="section-title">Common questions</h2>
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
                  <li>Roleplay training and member content are delivered online after successful checkout.</li>
                  <li>Member store merchandise uses a separate Stripe checkout with product-specific pricing.</li>
                  <li>Billing questions, access issues, order status requests, and cancellation inquiries are handled by email or phone.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="home-final-cta">
          <div className="container home-final-cta-inner">
            <h2>Start now and become impossible to ignore on the floor.</h2>
            <p>
              Review the $12.99 full course access, train daily, and grow with FSA ELITE as we expand to iOS and Android.
            </p>
            <div className="home-cta-row home-final-cta-row">
              <Link href="/checkout-preview" className="btn-primary">
                Open Checkout Preview
              </Link>
              <Link href="/roleplay" className="btn-secondary">
                Try AI Roleplay Free
              </Link>
              <Link href="/store" className="btn-secondary">
                Open Member Store
              </Link>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <p>© {CURRENT_YEAR} {BUSINESS_NAME}. Sales training and member commerce for any industry.</p>
          <p>
            Public website: {BUSINESS_SITE} · Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
          </p>
        </footer>
      </main>
    </>
  );
}
