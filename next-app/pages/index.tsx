import Head from 'next/head';

const PRODUCT_NAME = 'Vercel Sandbox';
const TAGLINE = 'Safely run untrusted or user-generated code in isolated Vercel sandboxes.';
const DESCRIPTION =
  'Use the Sandbox SDK or CLI to create sandboxes, run commands, inspect logs and file edits, preview apps, and support AI agents, code generation, and developer experimentation.';
const CURRENT_YEAR = new Date().getFullYear();

const FEATURES = [
  {
    icon: '🛡️',
    title: 'Execute untrusted code safely',
    body: 'Run AI agent output, user uploads, and third-party scripts without exposing your production systems.',
  },
  {
    icon: '🧰',
    title: 'Build interactive tools',
    body: 'Power code playgrounds, AI UI builders, and developer sandboxes with isolated compute on demand.',
  },
  {
    icon: '🧪',
    title: 'Test in isolation',
    body: 'Preview how user-submitted or agent-generated code behaves with access to logs, file edits, and live previews.',
  },
  {
    icon: '🚀',
    title: 'Run development servers',
    body: 'Spin up and test applications inside a sandbox when you need real-time previews or short-lived environments.',
  },
  {
    icon: '⚙️',
    title: 'SDK-first workflow',
    body: 'Use the @vercel/sandbox SDK for programmatic workflows and the sandbox CLI for manual testing, debugging, and agentic tasks.',
  },
  {
    icon: '⚡',
    title: 'Fast startup and snapshotting',
    body: 'Sandboxes start in milliseconds and support snapshotting so you can resume work without reinstalling dependencies.',
  },
];

const QUICK_REFERENCE = [
  {
    title: 'Authentication',
    items: [
      'Vercel OIDC tokens are recommended and are automatic in production on Vercel.',
      'For local development, run vercel link and vercel env pull to get a development token.',
      'Use access tokens when VERCEL_OIDC_TOKEN is unavailable, such as in external CI/CD or non-Vercel environments.',
    ],
  },
  {
    title: 'System specifications',
    items: [
      'Sandboxes run on Amazon Linux 2023 with node24, node22, and python3.13 runtimes.',
      'The default runtime is node24.',
      'Each sandbox runs as the vercel-sandbox user with sudo access and a working directory of /vercel/sandbox.',
    ],
  },
  {
    title: 'Resources',
    items: [
      'Start with Quickstart, then use Working with Sandbox guides for common tasks.',
      'Read Concepts to understand the architecture, then use the SDK Reference or CLI Reference for API details.',
      'Pricing and the Sandbox Repo round out the docs for limits, costs, and source code.',
    ],
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Vercel Sandbox</title>
        <meta name="description" content={`${TAGLINE} ${DESCRIPTION}`} />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-bg) 60%, var(--color-surface) 100%)',
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
              Vercel
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
              Safe execution for
              <br />
              <span style={{ color: 'var(--color-primary)' }}>{PRODUCT_NAME}.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'var(--color-muted)',
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
              <a className="btn-primary" href="#features" style={{ fontSize: '1.05rem', padding: '1rem 2.4rem' }}>
                Explore capabilities →
              </a>
              <a className="btn-secondary" href="#quick-reference">
                Read quick reference
              </a>
            </div>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.85rem' }}>
              Recommended integration path: <strong style={{ color: 'var(--color-text)' }}>@vercel/sandbox</strong> for
              automation, with the CLI available for debugging and one-off workflows.
            </p>
          </div>
        </section>

        <section
          style={{
            background: 'var(--color-surface)',
            padding: '1.5rem',
            textAlign: 'center',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
            Each sandbox runs in a secure Firecracker microVM with its own filesystem and network, making it a strong fit
            for AI agents, user-submitted code, and preview environments.
          </p>
        </section>

        <section id="features" style={{ padding: '5rem 1.5rem', background: 'var(--color-bg)' }}>
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
              What you can do with Vercel Sandbox
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: 'var(--color-muted)',
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              {PRODUCT_NAME} is built for dynamic, real-time workloads where you need isolation, observability, and fast
              startup.
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
                      color: 'var(--color-primary)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="quick-reference"
          style={{
            background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 100%)',
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
              Authentication, runtimes, and resources
            </h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
              Keep this quick reference handy when choosing an auth strategy, selecting a runtime, or deciding where to
              dive deeper in the docs.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                textAlign: 'left',
              }}
            >
              {QUICK_REFERENCE.map((section) => (
                <div
                  key={section.title}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'calc(var(--radius) + 4px)',
                    padding: '1.75rem',
                  }}
                >
                  <p
                    style={{
                      color: 'var(--color-primary)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '0.8rem',
                      letterSpacing: '0.15em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {section.title}
                  </p>
                  <ul
                    style={{
                      paddingLeft: '1.1rem',
                      color: 'var(--color-text)',
                      fontSize: '0.92rem',
                      lineHeight: 1.8,
                    }}
                  >
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              Need deeper implementation detail? Start with the SDK, then move to CLI, Concepts, Pricing, or the Sandbox
              Repo depending on your use case.
            </p>
          </div>
        </section>

        <footer
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: 'var(--color-muted)',
            fontSize: '0.82rem',
          }}
        >
          <p>
            © {CURRENT_YEAR} {PRODUCT_NAME} · Secure, isolated compute for user-generated and AI-generated workloads.
          </p>
        </footer>
      </main>
    </>
  );
}
