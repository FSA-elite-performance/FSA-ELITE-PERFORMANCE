import Head from 'next/head';

const PRODUCT_NAME = 'Kubiks Next.js Starter';
const TAGLINE = 'A minimal Next.js starter demonstrating how to integrate and extend Kubiks in your own applications.';
const DESCRIPTION =
  'Clone the upstream starter, create your own private Git repository, and keep every deployment connected to version control from day one.';
const SOURCE_REPO_URL = 'https://github.com/kubiks-inc/nextjs-starter-kubiks';
const TARGET_REPO_URL = 'https://github.com/fsaeliteperformance-arch/kubiks-next-js-starter';
const SOURCE_BRANCH = 'main';
const CURRENT_YEAR = new Date().getFullYear();

const FEATURES = [
  {
    icon: '⚡',
    title: 'Minimal Next.js Foundation',
    body: 'Start from a lean pages-router setup that is easy to read, customize, and extend for your own Kubiks-powered product.',
  },
  {
    icon: '🧩',
    title: 'Kubiks-Ready Extension Point',
    body: 'Use this starter as a clean base for adding Kubiks integrations, custom UI, and domain-specific workflows without extra scaffolding.',
  },
  {
    icon: '🔐',
    title: 'Private Repository Ownership',
    body: 'Create your own private repository under fsaeliteperformance-arch so future updates, deployments, and access control stay in your hands.',
  },
  {
    icon: '🚀',
    title: 'Automatic Deployments',
    body: 'Every push to your Git repository can trigger a deployment automatically, making it simple to iterate after launch.',
  },
  {
    icon: '🌿',
    title: 'Upstream Starter Reference',
    body: 'Keep the original kubiks-inc/nextjs-starter-kubiks repository handy as your reference point while tailoring the project to your needs.',
  },
  {
    icon: '🛠️',
    title: 'Ready to Customize',
    body: 'Swap in your own branding, environment variables, and integrations while preserving a straightforward TypeScript + Next.js workflow.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Kubiks Next.js Starter</title>
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
              Kubiks Inc.
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
              Launch your
              <br />
              <span style={{ color: '#f5a623' }}>Kubiks Next.js Starter.</span>
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
                href={SOURCE_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.05rem', padding: '1rem 2.4rem' }}
              >
                Clone from GitHub →
              </a>
              <a className="btn-secondary" href={TARGET_REPO_URL} target="_blank" rel="noopener noreferrer">
                View target repo path
              </a>
            </div>

            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.85rem' }}>
              Source repo: <strong style={{ color: '#ccc' }}>kubiks-inc/nextjs-starter-kubiks</strong> · Branch:{' '}
              <strong style={{ color: '#ccc' }}>{SOURCE_BRANCH}</strong>
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
            Create a Git repository after deploying so every push can ship automatically. Recommended destination:{' '}
            <strong style={{ color: '#f5a623' }}>fsaeliteperformance-arch/kubiks-next-js-starter</strong>
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
              What this starter gives you
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: '#888',
                marginBottom: '3rem',
                fontSize: '1rem',
              }}
            >
              {PRODUCT_NAME} keeps the foundation simple so you can focus on integrating Kubiks and shipping your own product.
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
              Repository setup
            </h2>
            <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1rem' }}>
              Clone the upstream project, then create your own private GitHub repository so deployment stays connected to your changes.
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
                Recommended GitHub repo
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
                kubiks-next-js-starter
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
                <li>✅ Git scope: fsaeliteperformance-arch</li>
                <li>✅ Visibility: private</li>
                <li>✅ Upstream source: kubiks-inc/nextjs-starter-kubiks</li>
                <li>✅ Default branch: main</li>
                <li>✅ Automatic deploys from every push</li>
              </ul>
              <a className="btn-primary" href={TARGET_REPO_URL} target="_blank" rel="noopener noreferrer">
                Open repo destination →
              </a>
            </div>

            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              After import, keep pushing to your repository to update the deployment automatically.
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
            © {CURRENT_YEAR} {PRODUCT_NAME} · Source starter:{' '}
            <a href={SOURCE_REPO_URL} style={{ color: '#666' }}>
              kubiks-inc/nextjs-starter-kubiks
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
