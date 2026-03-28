import Head from 'next/head';

const PRODUCT_NAME = 'FSA Elite Sales Training';
const TAGLINE = 'A high-performance sales training platform for automotive closers.';
const DESCRIPTION =
  'Train objection handling with AI roleplay, unlock $97 early access through Stripe, and prepare for upcoming modules, certifications, and calculators.';
const PROJECT_REPO_URL = 'https://github.com/fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING';
const CURRENT_YEAR = new Date().getFullYear();

const FEATURES = [
  {
    icon: '⚡',
    title: 'AI Sales Roleplay',
    body: 'Practice real objection-handling conversations against an AI customer simulator built for automotive sales.',
  },
  {
    icon: '🧩',
    title: 'Objection-Handling Reps',
    body: 'Use guided scenarios to sharpen rapport, price presentation, and commitment skills before the next showroom conversation.',
  },
  {
    icon: '🔐',
    title: 'Stripe Early Access',
    body: 'Secure paid access through Stripe and keep checkout tied to your training offer with clean redirect flows.',
  },
  {
    icon: '🚀',
    title: 'Closer Development Roadmap',
    body: 'The platform roadmap includes training modules, certifications, and tools designed to level up daily performance.',
  },
  {
    icon: '🌿',
    title: 'Sales Calculators',
    body: 'Planned calculator workflows will support desk conversations, payment framing, and value-driven presentations.',
  },
  {
    icon: '🛠️',
    title: 'Built to Extend',
    body: 'The app keeps a straightforward Next.js pages-router foundation for adding more training content and automation over time.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>FSA Elite Sales Training</title>
        <meta name="description" content={`${TAGLINE} ${DESCRIPTION}`} />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>
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
              FSA Elite
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
              Train your team with
              <br />
              <span style={{ color: '#f5a623' }}>FSA Elite Sales Training.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: '#aaa',
                maxWidth: '700px',
                margin: '0 auto 2.5rem',
              }}
            >
              {TAGLINE} {DESCRIPTION}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                className="btn-primary"
                href="/roleplay"
                style={{ fontSize: '1.05rem', padding: '1rem 2.4rem' }}
              >
                Start AI Roleplay →
              </a>
              <a className="btn-secondary" href={PROJECT_REPO_URL} target="_blank" rel="noopener noreferrer">
                View GitHub repo
              </a>
            </div>

            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.85rem' }}>
              Built with <strong style={{ color: '#ccc' }}>Next.js pages router</strong> ·{' '}
              <strong style={{ color: '#ccc' }}>Stripe checkout</strong> ·{' '}
              <strong style={{ color: '#ccc' }}>OpenAI roleplay</strong>
            </p>
          </div>
        </section>

        <section
          style={{
            background: '#111',
            padding: '1.5rem',
            textAlign: 'center',
            borderBottom: '1px solid #2a2a2a',
          }}
        >
          <p style={{ color: '#888', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
            Early access is powered by Stripe at <strong style={{ color: '#f5a623' }}>$97</strong>, with AI roleplay
            available inside the training experience.
          </p>
        </section>

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
              What FSA Elite gives you
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: '#888',
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              {PRODUCT_NAME} helps closers practice consistently while the rest of the training platform continues to expand.
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
                    background: '#141414',
                    border: '1px solid #2a2a2a',
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
                      color: '#f5a623',
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
              Platform roadmap
            </h2>
            <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1rem' }}>
              FSA Elite combines live AI practice with a paid-access training offer and an expanding library of closer tools.
            </p>

            <div
              style={{
                display: 'inline-block',
                background: '#141414',
                border: '2px solid #f5a623',
                borderRadius: '12px',
                padding: '2.5rem 3rem',
                marginBottom: '2rem',
                maxWidth: '420px',
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
                 Inside early access
              </p>
              <p
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: '#f0f0f0',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                 FSA Elite
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
                <li>✅ AI objection-handling roleplay</li>
                <li>✅ Stripe-powered checkout flow</li>
                <li>✅ Training modules in development</li>
                <li>✅ Certifications on the roadmap</li>
                <li>✅ Sales calculators coming soon</li>
              </ul>
              <a className="btn-primary" href="/roleplay">
                Open roleplay trainer →
              </a>
            </div>

            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              Use the roleplay trainer today, then grow into modules, certifications, and calculator workflows as the platform expands.
            </p>
          </div>
        </section>

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
            © {CURRENT_YEAR} {PRODUCT_NAME} ·{' '}
            <a href={PROJECT_REPO_URL} style={{ color: '#666' }}>
              fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
