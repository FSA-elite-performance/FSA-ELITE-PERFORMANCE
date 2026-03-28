import Head from 'next/head';
import Link from 'next/link';

const BRAND = 'FSA Elite Performance';
const TITLE = `${BRAND} Store — Coming Soon`;
const DESCRIPTION =
  'The FSA Elite Performance store is not open yet. Exclusive branded gear, sales tools, and professional merchandise for elite closers — launching soon.';
const SUPPORT_EMAIL = 'support@fsaeliteperformance.com';

export default function Store() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>
        {/* ── HERO ── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 60%, #1a1000 100%)',
            padding: '7rem 1.5rem 6rem',
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
              {BRAND}
            </p>

            {/* "Coming Soon" badge */}
            <div
              style={{
                display: 'inline-block',
                background: '#1a1000',
                border: '1px solid #f5a623',
                borderRadius: '999px',
                padding: '0.35rem 1.1rem',
                color: '#f5a623',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
              }}
            >
              🔒 Store Not Open Yet
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                color: '#f0f0f0',
              }}
            >
              The Store Is{' '}
              <span style={{ color: '#f5a623' }}>Coming Soon</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: '#aaa',
                maxWidth: '600px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.75,
              }}
            >
              Exclusive branded gear, sales tools, and professional merchandise
              built for elite closers. The {BRAND} store is not open yet —
              but it&apos;s coming.
            </p>

            <Link href="/" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
              ← Back to Training
            </Link>
          </div>
        </section>

        {/* ── WHAT'S COMING ── */}
        <section style={{ padding: '5rem 1.5rem', background: '#0d0d0d' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: 800,
                color: '#f0f0f0',
                marginBottom: '0.75rem',
              }}
            >
              What&apos;s Coming to the Store
            </h2>
            <p style={{ color: '#888', marginBottom: '3rem', fontSize: '1rem' }}>
              We&apos;re working on something built for winners.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                maxWidth: '780px',
                margin: '0 auto',
              }}
            >
              {[
                { icon: '👕', label: 'Branded Apparel' },
                { icon: '🏆', label: 'Elite Sales Tools' },
                { icon: '📓', label: 'Training Notebooks' },
                { icon: '🎽', label: 'Closer Gear' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    background: '#141414',
                    border: '1px solid #2a2a2a',
                    borderRadius: '10px',
                    padding: '2rem 1.5rem',
                    color: '#ccc',
                    fontSize: '0.95rem',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
                  <p style={{ fontWeight: 600 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOTIFY PLACEHOLDER ── */}
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
                fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                fontWeight: 800,
                color: '#f0f0f0',
                marginBottom: '1rem',
              }}
            >
              Get Notified at Launch
            </h2>
            <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1rem' }}>
              Be the first to know when the {BRAND} store goes live.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Notify%20me%20when%20the%20store%20opens`}
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}
            >
              📩 Notify Me
            </a>
            <p style={{ color: '#444', fontSize: '0.8rem', marginTop: '1rem' }}>
              Sends an email to our team — no form required.
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
            © {new Date().getFullYear()} FSA Elite Performance LLC · All rights reserved ·{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#666' }}>
              support@fsaeliteperformance.com
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
