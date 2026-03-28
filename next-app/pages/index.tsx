import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const CURRENT_YEAR = new Date().getFullYear();

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI Sales Roleplay Trainer',
    body: 'Practice live objection handling with an AI customer that pushes back, asks hard questions, and rewards genuine rapport-building — available 24/7.',
  },
  {
    icon: '📚',
    title: 'Structured Training Modules',
    body: 'Step-by-step curriculum covering the full sales process: meet & greet, needs analysis, presentation, negotiation, and the close.',
  },
  {
    icon: '🏆',
    title: 'Closer Certifications',
    body: 'Earn verifiable certifications at each mastery level — Bronze, Silver, and Gold Closer — to prove your skills to any dealer or manager.',
  },
  {
    icon: '💰',
    title: 'Income Calculator',
    body: 'Model your earning potential based on units, gross, and backend products. Know exactly what hitting your numbers looks like in dollars.',
  },
  {
    icon: '🧠',
    title: 'Closer Mindset Curriculum',
    body: 'Psychology-backed lessons on handling rejection, staying hungry, and building the mental toughness that separates top performers from average reps.',
  },
  {
    icon: '🔒',
    title: 'Founding Member Rate — Locked for Life',
    body: 'Get in now at the early-access price and keep it forever. No price increases, no re-enrollment fees — one payment, lifetime access.',
  },
];

const TESTIMONIALS = [
  {
    quote: "I went from 8 units a month to 18 in 60 days. The AI roleplay alone is worth 10× what they charge.",
    name: 'Marcus T.',
    title: 'Internet Sales Manager, Texas',
  },
  {
    quote: "The objection modules finally gave me a system instead of just winging it every time. My gross is up $400 per deal.",
    name: 'Stephanie R.',
    title: 'Sales Consultant, Florida',
  },
  {
    quote: "I was skeptical of online training but this is different. Practical, direct, no fluff — exactly what floor guys need.",
    name: 'Devon L.',
    title: 'Finance Manager, California',
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  async function handleCheckout() {
    setLoading(true);
    setCheckoutError('');
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' });
      const data: unknown = await res.json();
      const url = data && typeof data === 'object' && 'url' in data && typeof (data as Record<string, unknown>).url === 'string'
        ? (data as { url: string }).url
        : null;
      const errorMsg = data && typeof data === 'object' && 'error' in data && typeof (data as Record<string, unknown>).error === 'string'
        ? (data as { error: string }).error
        : null;
      if (!res.ok || !url) {
        setCheckoutError(errorMsg ?? 'Could not start checkout. Please try again.');
        return;
      }
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>FSA Elite — Sales Training for Closers</title>
        <meta
          name="description"
          content="AI-powered sales roleplay, structured modules, and closer certifications for automotive sales professionals. Early access — $97 one-time."
        />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>

        {/* ── Hero ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 55%, #1a1000 100%)',
            padding: '6rem 1.5rem 5rem',
            textAlign: 'center',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <p
              style={{
                color: 'var(--color-primary)',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontSize: '0.82rem',
                marginBottom: '1rem',
              }}
            >
              FSA Elite Performance
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                marginBottom: '1.25rem',
                color: 'var(--color-text)',
              }}
            >
              Train like a closer.
              <br />
              <span style={{ color: 'var(--color-primary)' }}>Sell like one too.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: '#aaa',
                maxWidth: '680px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
            >
              FSA Elite is the only sales training platform built specifically for automotive closers —
              combining AI roleplay, structured curriculum, and closer certifications in one place.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="btn-primary"
                onClick={handleCheckout}
                disabled={loading}
                style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
              >
                {loading ? 'Redirecting…' : 'Get Early Access — $97'}
              </button>
              <Link href="/roleplay" className="btn-secondary">
                Try AI Trainer Free →
              </Link>
            </div>

            {checkoutError && (
              <p
                style={{
                  color: '#ff6b6b',
                  fontSize: '0.88rem',
                  marginTop: '1rem',
                  background: '#1a0000',
                  border: '1px solid #550000',
                  borderRadius: 'var(--radius)',
                  padding: '0.6rem 1rem',
                  display: 'inline-block',
                }}
              >
                {checkoutError}
              </p>
            )}

            <p style={{ color: '#555', fontSize: '0.82rem', marginTop: '1rem' }}>
              One-time payment · Lifetime access · Founding member rate locked forever
            </p>
          </div>
        </section>

        {/* ── Social proof bar ── */}
        <section
          style={{
            background: '#111',
            padding: '1.25rem 1.5rem',
            textAlign: 'center',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', letterSpacing: '0.04em' }}>
            🚗&nbsp; Built for automotive sales professionals &nbsp;·&nbsp; 🤖&nbsp; Powered by GPT-4o &nbsp;·&nbsp; 🔒&nbsp; Secure Stripe checkout
          </p>
        </section>

        {/* ── Features ── */}
        <section style={{ padding: '5rem 1.5rem', background: '#0d0d0d' }}>
          <div className="container">
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                color: 'var(--color-text)',
              }}
            >
              Everything you need to dominate the floor
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: 'var(--color-muted)',
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              One membership. Every tool. No excuses.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: '#aaa', fontSize: '0.92rem', lineHeight: 1.65 }}>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section
          style={{
            background: 'var(--color-bg)',
            padding: '5rem 1.5rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                color: 'var(--color-text)',
              }}
            >
              Results from real closers
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: 'var(--color-muted)',
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              Automotive sales pros who invested in FSA Elite.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    padding: '1.75rem',
                  }}
                >
                  <p
                    style={{
                      color: 'var(--color-text)',
                      fontSize: '0.97rem',
                      lineHeight: 1.7,
                      marginBottom: '1.25rem',
                      fontStyle: 'italic',
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</p>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.82rem' }}>{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing CTA ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #1a0e00 0%, #0a0a0a 100%)',
            padding: '5rem 1.5rem',
            textAlign: 'center',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                color: 'var(--color-text)',
              }}
            >
              Join FSA Elite — Founding Member Pricing
            </h2>
            <p style={{ color: '#888', marginBottom: '2.5rem', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
              Get in now at the lowest price this program will ever be. One payment, lifetime access, and your rate never goes up.
            </p>

            <div
              style={{
                display: 'inline-block',
                background: 'var(--color-surface)',
                border: '2px solid var(--color-primary)',
                borderRadius: '12px',
                padding: '2.5rem 3rem',
                marginBottom: '2rem',
                maxWidth: '420px',
                width: '100%',
              }}
            >
              <p
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  marginBottom: '0.5rem',
                }}
              >
                Early Access — Founding Member
              </p>
              <p
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: 'var(--color-text)',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                $97
              </p>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                One-time · Lifetime access
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  textAlign: 'left',
                  color: '#ccc',
                  fontSize: '0.92rem',
                  marginBottom: '1.75rem',
                  lineHeight: 2.1,
                }}
              >
                <li>✅ Full AI Sales Roleplay Trainer</li>
                <li>✅ All Training Modules (current + future)</li>
                <li>✅ Bronze, Silver &amp; Gold Certifications</li>
                <li>✅ Closer Mindset Curriculum</li>
                <li>✅ Income Calculator</li>
                <li>✅ Founding member rate — locked for life</li>
              </ul>
              <button
                className="btn-primary"
                onClick={handleCheckout}
                disabled={loading}
                style={{ width: '100%', fontSize: '1.05rem', padding: '1rem' }}
              >
                {loading ? 'Redirecting…' : 'Get Instant Access →'}
              </button>
            </div>

            {checkoutError && (
              <p
                style={{
                  color: '#ff6b6b',
                  fontSize: '0.88rem',
                  marginTop: '0.75rem',
                  background: '#1a0000',
                  border: '1px solid #550000',
                  borderRadius: 'var(--radius)',
                  padding: '0.6rem 1rem',
                  display: 'inline-block',
                }}
              >
                {checkoutError}
              </p>
            )}

            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              Secure checkout powered by Stripe. Cancel anytime before 30 days for a full refund.
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: '#444',
            fontSize: '0.82rem',
          }}
        >
          <p>
            © {CURRENT_YEAR} FSA Elite Performance ·{' '}
            <Link href="/roleplay" style={{ color: '#666' }}>
              Try AI Trainer
            </Link>
          </p>
        </footer>
      </main>
    </>
  );
}
