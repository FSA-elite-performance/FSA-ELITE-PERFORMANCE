import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const PRODUCT_NAME = 'FSA Elite — Early Access';
const TAGLINE = 'Sales training. Closer mindset. Real growth.';
const DESCRIPTION =
  'Built for hungry salespeople who want to level up and win. From objection handling to closing psychology, FSA Elite gives you the edge every deal requires.';
const LIVE_STORE_NOTE = 'Use the live store link below.';
const DEFAULT_STORE_URL = 'https://fsaeliteperformance.com';
const ALLOWED_STORE_HOSTS = new Set(['fsaeliteperformance.com']);
const CURRENT_YEAR = new Date().getFullYear();
const formatStoreError = (prefix: string) => {
  const trimmed = prefix.trim();
  const endsWithPunctuation = /[.!?]$/.test(trimmed);
  return `${trimmed}${endsWithPunctuation ? '' : '.'} ${LIVE_STORE_NOTE}`;
};
const LIVE_STORE_URL = (() => {
  const candidate = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    if (!candidate) return DEFAULT_STORE_URL;
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'https:') return DEFAULT_STORE_URL;
    const hostname = parsed.hostname.replace(/^www\./, '');
    if (!ALLOWED_STORE_HOSTS.has(hostname)) return DEFAULT_STORE_URL;
    return `https://${hostname}`;
  } catch {
    return DEFAULT_STORE_URL;
  }
})();

const FEATURES = [
  {
    icon: '🔥',
    title: 'Real-World Objection Handling',
    body: 'Practice live objections from real deal scenarios — not textbook fluff. Handle money, time, and competitor objections like a pro.',
  },
  {
    icon: '🏆',
    title: 'Closer Mindset Training',
    body: 'Rewire how you think about sales. Build confidence, consistency, and the relentless hunger that separates top performers.',
  },
  {
    icon: '📈',
    title: 'Process Mastery',
    body: 'Learn the FSA Elite framework — a battle-tested sales process refined over hundreds of deals and 25 consecutive sales-of-the-month wins.',
  },
  {
    icon: '📱',
    title: 'Any Device, Any Time',
    body: 'Pick it up on your phone between ups. Put it down and come back later. Your training moves with you.',
  },
  {
    icon: '🎓',
    title: 'Certifications & Badges',
    body: 'Earn verifiable credentials that prove your skill level. Stand out to dealerships and clients looking for elite closers.',
  },
  {
    icon: '💡',
    title: 'AI-Powered Roleplay',
    body: 'Practice with an AI that plays a real customer — tough, skeptical, and ready to push back. Level up before you hit the floor.',
    href: '/roleplay',
  },
];

function LiveStoreLink() {
  return (
    <div style={{ marginTop: '1.25rem' }}>
      <a
        href={LIVE_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
        aria-label="Go to the FSA Elite live store at fsaeliteperformance.com"
      >
        🛒 Go to the Live Store →
      </a>
      <p style={{ color: '#555', fontSize: '0.82rem', marginTop: '0.5rem' }}>
        fsaeliteperformance.com
      </p>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFallbackLink, setShowFallbackLink] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    setError('');
    setShowFallbackLink(false);

    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' });
      if (!res.ok) {
        // In static/GitHub Pages previews the API route doesn't exist (404).
        // Send the user straight to the live store instead of showing an error.
        if (res.status === 404) {
          window.location.href = LIVE_STORE_URL;
          return;
        }
        const data = await res.json().catch(() => ({}));
        const message = data.error ?? `Server error ${res.status}`;
        setShowFallbackLink(true);
        throw new Error(message);
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
      else {
        setShowFallbackLink(true);
        throw new Error(formatStoreError('Checkout link unavailable right now'));
      }
    } catch (err: unknown) {
      if (err instanceof TypeError) {
        // Network failure — redirect to the live store so the user isn't stuck.
        window.location.href = LIVE_STORE_URL;
        return;
      }
      setShowFallbackLink(true);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const fallbackCta = showFallbackLink ? (
    <div className="fallback-wrap">
      <a
        className="btn-secondary"
        href={LIVE_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the live store in a new window"
      >
        Open the live store →
      </a>
      <p className="fallback-message">
        Visit our live store to complete your purchase.
      </p>
    </div>
  ) : null;

  return (
    <>
      <Head>
        <title>FSA Elite — Sales Training for Closers</title>
        <meta name="description" content={DESCRIPTION} />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>
        {/* ── HERO ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 60%, #1a1000 100%)',
            padding: '6rem 1.5rem 5rem',
            textAlign: 'center',
            borderBottom: '1px solid #2a2a2a',
          }}
        >
          <div className="container">
            <p
              style={{
                color: '#f5a623',
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
                color: '#f0f0f0',
              }}
            >
              Stop Letting the Customer<br />
              <span style={{ color: '#f5a623' }}>Run the Deal.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: '#aaa',
                maxWidth: '620px',
                margin: '0 auto 2.5rem',
              }}
            >
              {TAGLINE} {DESCRIPTION}
            </p>

            {error && (
              <p
                style={{
                  color: '#ff6b6b',
                  background: '#1a0000',
                  border: '1px solid #550000',
                  borderRadius: '6px',
                  padding: '0.75rem 1.25rem',
                  marginBottom: '1.25rem',
                  display: 'inline-block',
                }}
              >
                {error}
              </p>
            )}

            <button
              className="btn-primary"
              onClick={handleCheckout}
              disabled={loading}
              style={{ fontSize: '1.15rem', padding: '1rem 2.8rem' }}
            >
              {loading ? 'Redirecting…' : `🚀 Get Early Access — Join Now`}
            </button>

            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.85rem' }}>
              One-time payment · Instant access · No subscription required to start
            </p>

            <div style={{ marginTop: '1.25rem' }}>
              <LiveStoreLink />
            </div>

            {fallbackCta}
          </div>
        </section>

        {/* ── CREDIBILITY STRIP ── */}
        <section
          style={{
            background: '#111',
            padding: '1.5rem',
            textAlign: 'center',
            borderBottom: '1px solid #2a2a2a',
          }}
        >
          <p style={{ color: '#888', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
            Founded by{' '}
            <strong style={{ color: '#f5a623' }}>Kaygun Fontenot</strong> ·{' '}
            <strong style={{ color: '#f0f0f0' }}>25× Sales of the Month</strong> · 23 years old ·{' '}
            Car industry veteran turned sales coach · LLC registered
          </p>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ padding: '5rem 1.5rem', background: '#0d0d0d' }}>
          <div className="container">
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                color: '#f0f0f0',
              }}
            >
              What You Get with Early Access
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: '#888',
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              {PRODUCT_NAME} — everything you need to close more deals, right now.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  style={{
                    background: '#141414',
                    border: '1px solid #2a2a2a',
                    borderRadius: '10px',
                    padding: '1.75rem',
                    transition: 'border-color 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#f5a623',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: '#aaa', fontSize: '0.92rem', lineHeight: 1.65, flex: 1 }}>{f.body}</p>
                  {'href' in f && f.href && (
                    <Link
                      href={f.href}
                      style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        color: '#f5a623',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                      }}
                    >
                      Try it →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING CTA ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #1a0e00 0%, #0a0a0a 100%)',
            padding: '5rem 1.5rem',
            textAlign: 'center',
            borderTop: '1px solid #2a2a2a',
          }}
        >
          <div className="container">
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                color: '#f0f0f0',
              }}
            >
              Early Access Pricing
            </h2>
            <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1rem' }}>
              Lock in the founding member rate before we go public.
            </p>

            {/* Pricing card */}
            <div
              style={{
                display: 'inline-block',
                background: '#141414',
                border: '2px solid #f5a623',
                borderRadius: '12px',
                padding: '2.5rem 3rem',
                marginBottom: '2rem',
                maxWidth: '380px',
                width: '100%',
              }}
            >
              <p
                style={{
                  color: '#f5a623',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  marginBottom: '0.5rem',
                }}
              >
                Founding Member
              </p>
              <p
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: '#f0f0f0',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                $97
              </p>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                one-time · full early access
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
                <li>✅ Full training module library</li>
                <li>✅ AI objection-handling roleplay</li>
                <li>✅ Closer mindset curriculum</li>
                <li>✅ Certifications &amp; badges</li>
                <li>✅ Sales calculator tools</li>
                <li>✅ Lifetime updates (founding rate)</li>
              </ul>
              <button
                className="btn-primary"
                onClick={handleCheckout}
                disabled={loading}
                style={{ width: '100%', fontSize: '1rem' }}
              >
                {loading ? 'Redirecting…' : 'Get Early Access →'}
              </button>
            </div>

            {error && (
              <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '1rem' }}>{error}</p>
            )}

            {fallbackCta}

            <div style={{ marginTop: '1.5rem' }}>
              <LiveStoreLink />
            </div>

            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              Secure payment via Stripe · 30-day satisfaction guarantee
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            borderTop: '1px solid #2a2a2a',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: '#444',
            fontSize: '0.82rem',
          }}
        >
          <p>
            © {CURRENT_YEAR} FSA Elite Performance LLC · All rights reserved ·{' '}
            <a href="mailto:support@fsaeliteperformance.com" style={{ color: '#666' }}>
              support@fsaeliteperformance.com
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
