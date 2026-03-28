import Head from 'next/head';

type CommandGroup = {
  name: string;
  description: string;
  examples: string[];
};

type QuickStartStep = {
  title: string;
  body: string;
  command: string;
  note?: string;
};

const LAST_UPDATED = 'March 11, 2026';

const QUICK_START_STEPS: QuickStartStep[] = [
  {
    title: 'Installing Vercel CLI',
    body: 'To download and install Vercel CLI, run the following command:',
    command: 'pnpm i -g vercel',
  },
  {
    title: 'Updating Vercel CLI',
    body: 'When a new release is available, rerun the installation command to upgrade to the latest version.',
    command: 'pnpm i -g vercel@latest',
    note: "If you see permission errors, review npm's official permissions guide. Yarn depends on the same npm configuration.",
  },
  {
    title: 'Checking the version',
    body: 'Use the --version option to verify the Vercel CLI version currently installed on your machine.',
    command: 'vercel --version',
  },
];

const COMMAND_GROUPS: CommandGroup[] = [
  {
    name: 'alias',
    description: 'Apply custom domain aliases to your Vercel deployments.',
    examples: ['vercel alias set [deployment-url] [custom-domain]', 'vercel alias rm [custom-domain]', 'vercel alias ls'],
  },
  {
    name: 'api',
    description: 'Make authenticated HTTP requests to the Vercel API from your terminal. This is a beta command.',
    examples: ['vercel api [endpoint]', 'vercel api /v2/user', 'vercel api /v9/projects -X POST -F name=my-project'],
  },
  {
    name: 'bisect',
    description: 'Perform a binary search on your deployments to help surface issues.',
    examples: ['vercel bisect', 'vercel bisect --good [deployment-url] --bad [deployment-url]'],
  },
  {
    name: 'blob',
    description: 'Interact with Vercel Blob storage to upload, download, list, delete, and copy files.',
    examples: [
      'vercel blob list',
      'vercel blob put [path-to-file]',
      'vercel blob get [url-or-pathname]',
      'vercel blob del [url-or-pathname]',
      'vercel blob copy [from-url] [to-pathname]',
    ],
  },
  {
    name: 'build',
    description: 'Build a Vercel Project locally or in your own CI environment.',
    examples: ['vercel build', 'vercel build --prod'],
  },
  {
    name: 'cache',
    description: 'Manage cache for your project, including CDN cache and Data cache.',
    examples: [
      'vercel cache purge',
      'vercel cache purge --type cdn',
      'vercel cache purge --type data',
      'vercel cache invalidate --tag foo',
      'vercel cache dangerously-delete --tag foo',
    ],
  },
  {
    name: 'certs',
    description: 'Manage certificates for your domains.',
    examples: ['vercel certs ls', 'vercel certs issue [domain]', 'vercel certs rm [certificate-id]'],
  },
  {
    name: 'curl',
    description: 'Make HTTP requests to your Vercel deployments with automatic deployment protection bypass. This is a beta command.',
    examples: ['vercel curl [path]', 'vercel curl /api/hello', 'vercel curl /api/data --deployment [deployment-url]'],
  },
  {
    name: 'deploy',
    description: 'Deploy your Vercel projects. This is the default command when no subcommand is specified.',
    examples: ['vercel', 'vercel deploy', 'vercel deploy --prod'],
  },
  {
    name: 'dev',
    description: 'Replicate the Vercel deployment environment locally and test your project.',
    examples: ['vercel dev', 'vercel dev --port 3000'],
  },
  {
    name: 'dns',
    description: 'Manage your DNS records for your domains.',
    examples: ['vercel dns ls [domain]', 'vercel dns add [domain] [name] [type] [value]', 'vercel dns rm [record-id]'],
  },
  {
    name: 'domains',
    description: 'Buy, sell, transfer, and manage your domains.',
    examples: ['vercel domains ls', 'vercel domains add [domain] [project]', 'vercel domains rm [domain]', 'vercel domains buy [domain]'],
  },
  {
    name: 'env',
    description: 'Manage environment variables in your Vercel Projects.',
    examples: [
      'vercel env ls',
      'vercel env add [name] [environment]',
      'vercel env update [name] [environment]',
      'vercel env rm [name] [environment]',
      'vercel env pull [file]',
      'vercel env run --',
    ],
  },
];

const sectionTitleStyle = {
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 800,
  marginBottom: '0.75rem',
  color: 'var(--color-text)',
} as const;

export default function Home() {
  return (
    <>
      <Head>
        <title>Vercel CLI Overview</title>
        <meta
          name="description"
          content="Reference page covering Vercel CLI installation, version checks, CI/CD authentication, and commonly used commands."
        />
      </Head>

      <main style={{ fontFamily: 'var(--font-sans)' }}>
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-bg) 55%, var(--color-surface) 100%)',
            padding: '6rem 1.5rem 5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <p
              style={{
                color: 'var(--color-primary)',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}
            >
              Last updated {LAST_UPDATED}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 4.4rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: '1.25rem',
                color: 'var(--color-text)',
                maxWidth: '11ch',
              }}
            >
              Vercel CLI Overview
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
                color: 'var(--color-muted)',
                maxWidth: '46rem',
                marginBottom: '2rem',
              }}
            >
              Vercel gives you multiple ways to interact with and configure your projects. With the command-line
              interface you can work from a terminal or automation environment to retrieve logs, manage certificates,
              replicate deployment conditions locally, manage DNS records, and more.
            </p>
            <p
              style={{
                color: 'var(--color-muted)',
                maxWidth: '46rem',
                marginBottom: '2.5rem',
              }}
            >
              If you would rather integrate programmatically, use the Vercel REST API. If you are working in a
              terminal or CI/CD pipeline, the CLI is the fastest path for daily workflows.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <a className="btn-primary" href="#getting-started">
                Get started
              </a>
              <a className="btn-secondary" href="#commands">
                Browse commands
              </a>
            </div>
          </div>
        </section>

        <section
          id="getting-started"
          style={{
            padding: '4.5rem 1.5rem 2rem',
            background: 'var(--color-bg)',
          }}
        >
          <div className="container">
            <h2 style={sectionTitleStyle}>Getting started</h2>
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: '1rem',
                maxWidth: '42rem',
                marginBottom: '2rem',
              }}
            >
              Use these common commands to install, upgrade, and verify the CLI before working with projects.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {QUICK_START_STEPS.map((step) => (
                <article
                  key={step.title}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius)',
                    padding: '1.5rem',
                  }}
                >
                  <h3
                    style={{
                      color: 'var(--color-text)',
                      fontSize: '1.1rem',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-muted)',
                      marginBottom: '1rem',
                    }}
                  >
                    {step.body}
                  </p>
                  <pre
                    style={{
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius)',
                      color: 'var(--color-primary)',
                      fontSize: '0.95rem',
                      overflowX: 'auto',
                      padding: '0.9rem 1rem',
                      marginBottom: step.note ? '0.9rem' : 0,
                    }}
                  >
                    <code>{step.command}</code>
                  </pre>
                  {step.note ? (
                    <p
                      style={{
                        color: 'var(--color-muted)',
                        fontSize: '0.92rem',
                      }}
                    >
                      {step.note}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="ci-cd"
          style={{
            padding: '2rem 1.5rem 4.5rem',
            background: 'var(--color-bg)',
          }}
        >
          <div className="container">
            <div
              style={{
                background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 100%)',
                border: '1px solid var(--color-border)',
                borderRadius: 'calc(var(--radius) * 1.5)',
                padding: '2rem',
              }}
            >
              <p
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  marginBottom: '0.85rem',
                }}
              >
                CI/CD environments
              </p>
              <h2
                style={{
                  ...sectionTitleStyle,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                }}
              >
                Authenticate without manual login
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  maxWidth: '44rem',
                }}
              >
                Vercel CLI requires authentication before it can access resources or perform administrative tasks. In a
                local terminal you can use <code>vercel login</code> and complete the prompts manually. In CI/CD
                environments, create a token on your tokens page and pass it with the <code>--token</code> option
                because interactive input is not available.
              </p>
            </div>
          </div>
        </section>

        <section
          id="commands"
          style={{
            padding: '4.5rem 1.5rem 5rem',
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <h2 style={sectionTitleStyle}>Available commands</h2>
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: '1rem',
                maxWidth: '44rem',
                marginBottom: '2rem',
              }}
            >
              These commands cover common deployment, domain, DNS, storage, cache, and environment-variable workflows.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {COMMAND_GROUPS.map((command) => (
                <article
                  key={command.name}
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius)',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--color-surface)',
                      color: 'var(--color-primary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.35rem 0.75rem',
                      marginBottom: '0.9rem',
                    }}
                  >
                    {command.name}
                  </div>
                  <p
                    style={{
                      color: 'var(--color-muted)',
                      marginBottom: '1rem',
                    }}
                  >
                    {command.description}
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'grid',
                      gap: '0.65rem',
                    }}
                  >
                    {command.examples.map((example) => (
                      <li
                        key={example}
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius)',
                          padding: '0.8rem 0.9rem',
                          overflowX: 'auto',
                        }}
                      >
                        <code
                          style={{
                            color: 'var(--color-text)',
                            fontSize: '0.92rem',
                            whiteSpace: 'pre',
                          }}
                        >
                          {example}
                        </code>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
