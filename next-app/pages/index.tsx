import Head from 'next/head';

const PRODUCT_NAME = 'Page Agent';
const TAGLINE = 'The GUI agent living in your webpage.';
const DESCRIPTION =
  'Control web interfaces with natural language using in-page JavaScript, without a browser extension, Python runtime, or headless browser.';
const REPO_URL = 'https://github.com/alibaba/page-agent';
const DEMO_URL = 'https://alibaba.github.io/page-agent/';
const DOCS_URL = 'https://alibaba.github.io/page-agent/docs/introduction/overview';
const NPM_URL = 'https://www.npmjs.com/package/page-agent';
const CURRENT_YEAR = new Date().getFullYear();

const COLORS = {
  background: 'var(--color-bg)',
  surface: 'var(--color-surface)',
  border: 'var(--color-border)',
  primary: 'var(--color-primary)',
  text: 'var(--color-text)',
  muted: 'var(--color-muted)',
} as const;

const FEATURES = [
  {
    icon: '🎯',
    title: 'Easy Integration',
    body: 'Add Page Agent directly in the page with JavaScript instead of wiring up a browser extension, Python worker, or headless browser stack.',
  },
  {
    icon: '📖',
    title: 'Text-Based DOM Control',
    body: 'Drive web interfaces from page structure and text, avoiding screenshot-driven automation and multimodal model requirements.',
  },
  {
    icon: '🧠',
    title: 'Bring Your Own LLM',
    body: 'Connect the agent to the model provider that fits your product, deployment, and cost constraints.',
  },
  {
    icon: '🎨',
    title: 'Human-in-the-Loop UI',
    body: 'Keep users in control with a polished interface that makes automation visible and easy to supervise.',
  },
  {
    icon: '♿',
    title: 'Accessibility-Friendly',
    body: 'Open up complex interfaces to natural-language and voice-style commands so workflows become easier to complete.',
  },
  {
    icon: '🐙',
    title: 'Optional Chrome Extension',
    body: 'Extend the agent across tabs for multi-page tasks when a single-page integration is not enough.',
  },
] as const;

const QUICK_START = [
  'Install with npm install page-agent',
  'Configure your model, base URL, API key, and language',
  'Execute instructions such as “Click the login button” directly in the page',
  'Use the optional extension for multi-page tasks',
] as const;

export default function Home() {
  return (
    <>
      <Head>
        <title>{PRODUCT_NAME}</title>
        <meta name="description" content={`${TAGLINE} ${DESCRIPTION}`} />
        <meta property="og:title" content={PRODUCT_NAME} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>
        <section
          style={{
            background: `linear-gradient(135deg, ${COLORS.background} 60%, ${COLORS.surface} 100%)`,
            padding: '6rem 1.5rem 5rem',
            textAlign: 'center',
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div className="container">
            <p
              style={{
                color: COLORS.primary,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}
            >
              Alibaba Open Source
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                color: COLORS.text,
              }}
            >
              Meet
              <br />
              <span style={{ color: COLORS.primary }}>{PRODUCT_NAME}.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: COLORS.muted,
                maxWidth: '43.75rem',
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
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.05rem', padding: '1rem 2.4rem' }}
              >
                View GitHub repo →
              </a>
              <a className="btn-secondary" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                Read documentation
              </a>
              <a className="btn-secondary" href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                Try the demo
              </a>
            </div>

            <p style={{ color: COLORS.muted, fontSize: '0.85rem', marginTop: '0.85rem' }}>
              Open source on GitHub: <strong style={{ color: COLORS.text }}>alibaba/page-agent</strong>
            </p>
          </div>
        </section>

        <section
          style={{
            background: COLORS.surface,
            padding: '1.5rem',
            textAlign: 'center',
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <p style={{ color: COLORS.muted, fontSize: '0.95rem', letterSpacing: '0.03em' }}>
            Page Agent runs inside the browser page itself, making it a strong fit for SaaS copilots, form automation, and accessibility flows.
          </p>
        </section>

        <section style={{ padding: '5rem 1.5rem', background: COLORS.background }}>
          <div className="container">
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                color: COLORS.text,
              }}
            >
              Why teams use Page Agent
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: COLORS.muted,
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              The project focuses on client-side web enhancement, so you can bring natural-language automation into existing interfaces without a major rewrite.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
                gap: '1.5rem',
              }}
            >
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 'var(--radius)',
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
                      color: COLORS.primary,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: COLORS.muted, fontSize: '0.92rem', lineHeight: 1.65 }}>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.background} 100%)`,
            padding: '5rem 1.5rem',
            textAlign: 'center',
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <div className="container">
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                color: COLORS.text,
              }}
            >
              Quick start
            </h2>
            <p style={{ color: COLORS.muted, marginBottom: '2rem', fontSize: '1rem' }}>
              Start with the GitHub repo, then follow the docs to embed Page Agent or install the npm package in your app.
            </p>

            <div
              style={{
                display: 'inline-block',
                background: COLORS.surface,
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 'calc(var(--radius) * 1.5)',
                padding: '2.5rem 3rem',
                marginBottom: '2rem',
                maxWidth: '30rem',
                width: '100%',
              }}
            >
              <p
                style={{
                  color: COLORS.primary,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  marginBottom: '0.5rem',
                }}
              >
                Get started
              </p>
              <p
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: COLORS.text,
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                page-agent
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  textAlign: 'left',
                  color: COLORS.text,
                  fontSize: '0.95rem',
                  marginBottom: '1.75rem',
                  lineHeight: 1.9,
                }}
              >
                {QUICK_START.map((item) => (
                  <li key={item}>✅ {item}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a className="btn-primary" href={NPM_URL} target="_blank" rel="noopener noreferrer">
                  Open npm package →
                </a>
                <a className="btn-secondary" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                  Explore docs
                </a>
              </div>
            </div>

            <p style={{ color: COLORS.muted, fontSize: '0.85rem', marginTop: '0.75rem' }}>
              Best suited for client-side web enhancement rather than server-side automation.
            </p>
          </div>
        </section>

        <footer
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: COLORS.muted,
            fontSize: '0.82rem',
          }}
        >
          <p>
            © {CURRENT_YEAR} {PRODUCT_NAME} · Source:{' '}
            <a href={REPO_URL} style={{ color: COLORS.primary }}>
              alibaba/page-agent
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
