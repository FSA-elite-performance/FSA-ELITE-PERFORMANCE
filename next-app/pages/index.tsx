import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const CURRENT_YEAR = new Date().getFullYear();

const FEATURES = [
  {
    icon: '🧠',
    title: 'Closer Mindset Curriculum',
    body: 'Build the mental framework of elite closers. Learn how to stay confident, handle rejection, and approach every deal with purpose.',
  },
  {
    icon: '🤖',
    title: 'AI Sales Roleplay Trainer',
    body: 'Practice live objection handling with an AI customer that reacts like a real buyer — price shoppers, thinkers, researchers, and more.',
  },
  {
    icon: '📚',
    title: 'Step-by-Step Training Modules',
    body: 'Follow a structured path from greeting to close. Every module is built for the automotive floor and real-world selling situations.',
  },
  {
    icon: '🏆',
    title: 'Certifications & Milestones',
    body: 'Earn your FSA Elite certification as you complete each level. Prove your skills and track your progress from green pea to top closer.',
  },
  {
    icon: '💰',
    title: 'Objection-Handling Playbook',
    body: '"I need to think about it." "The payment is too high." Master the exact scripts that turn stalls into signed deals.',
  },
  {
    icon: '⚡',
    title: 'Founding Member Rate — Locked In',
    body: 'Early access members lock in the lowest rate ever offered. Full platform access at $97 — price increases when the doors close.',
  },
];

export default function Home() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  async function handleCheckout() {
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? 'Unable to start checkout. Please try again.');
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutError('Network error — please check your connection and try again.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>FSA Elite — Sales Training for Closers</title>
        <meta
          name="description"
          content="FSA Elite is a premium automotive sales training platform. AI roleplay, objection-handling playbooks, certifications, and the closer mindset curriculum — all in one place."
        />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>
        {/* ── Hero ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-bg) 60%, #1a1000 100%)',
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
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}
            >
              FSA Elite Performance
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                color: 'var(--color-text)',
              }}
            >
              Master the Art
              <br />
              <span style={{ color: 'var(--color-primary)' }}>of the Close.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'var(--color-muted)',
                maxWidth: '680px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
            >
              The only sales training program built specifically for automotive closers. AI-powered
              roleplay, battle-tested scripts, and a certification path that separates the best from
              everyone else.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '0.75rem',
              }}
            >
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="btn-primary"
                style={{ fontSize: '1.1rem', padding: '1rem 2.6rem' }}
              >
                {checkoutLoading ? 'Redirecting…' : 'Get Early Access — $97'}
              </button>
              <Link className="btn-secondary" href="/roleplay">
                Try the AI Trainer Free →
              </Link>
            </div>

            {checkoutError && (
              <p
                style={{
                  color: '#ff6b6b',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                }}
              >
                {checkoutError}
              </p>
            )}

            <p style={{ color: 'var(--color-muted)', fontSize: '0.82rem', marginTop: '0.5rem' }}>
              One-time payment · Founding member rate · Instant access
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
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', letterSpacing: '0.04em' }}>
            🔒 Secure checkout via Stripe &nbsp;·&nbsp; ✅ Instant access after purchase &nbsp;·&nbsp; 🚗 Built for automotive sales professionals
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
              Everything you need to close more deals
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: 'var(--color-muted)',
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              FSA Elite packages the full closer toolkit into one structured, practitioner-built program.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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

        {/* ── CTA / Pricing ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #1a0e00 0%, var(--color-bg) 100%)',
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
              Early access — founding member rate
            </h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
              Lock in full platform access at the lowest price ever offered. This rate closes when early
              access ends.
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
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  marginBottom: '0.5rem',
                }}
              >
                FSA Elite — Early Access
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
              <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                one-time · founding member rate
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  textAlign: 'left',
                  color: '#ccc',
                  fontSize: '0.92rem',
                  marginBottom: '1.75rem',
                  lineHeight: 2,
                }}
              >
                <li>✅ All training modules</li>
                <li>✅ AI sales roleplay trainer</li>
                <li>✅ Objection-handling playbook</li>
                <li>✅ Certifications &amp; milestones</li>
                <li>✅ Closer mindset curriculum</li>
                <li>✅ Lifetime access — price locked in</li>
              </ul>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="btn-primary"
                style={{ width: '100%', fontSize: '1.05rem' }}
              >
                {checkoutLoading ? 'Redirecting…' : 'Claim Your Spot →'}
              </button>
              {checkoutError && (
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                  {checkoutError}
                </p>
              )}
            </div>

            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Secure checkout powered by Stripe. No subscription — one-time payment only.
            </p>
          </div>
        </section>

        {/* ── AI Trainer CTA ── */}
        <section
          style={{
            background: '#0d0d0d',
            padding: '4rem 1.5rem',
            textAlign: 'center',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                fontWeight: 800,
                color: 'var(--color-text)',
                marginBottom: '0.75rem',
              }}
            >
              Not sure yet? Try the AI Trainer first.
            </h2>
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: '1rem',
                maxWidth: '560px',
                margin: '0 auto 1.75rem',
              }}
            >
              Jump into a live roleplay session with our AI customer — no account needed. Handle
              objections, get coaching feedback, and see the platform for yourself.
            </p>
            <Link href="/roleplay" className="btn-secondary">
              Launch the AI Roleplay Trainer →
            </Link>
          </div>
        </section>

        <footer
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: '#444',
            fontSize: '0.82rem',
          }}
        >
          <p>© {CURRENT_YEAR} FSA Elite Performance · <a href="https://fsaelite.org" style={{ color: '#666' }}>fsaelite.org</a></p>
        </footer>
      </main>
    </>
  );
}
