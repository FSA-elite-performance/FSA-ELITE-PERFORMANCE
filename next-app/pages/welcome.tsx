import Head from 'next/head';

export default function Welcome() {
  return (
    <>
      <Head>
        <title>Welcome — FSA Elite Sales Training</title>
        <meta
          name="description"
          content="Fallback welcome route for static export when middleware is unavailable."
        />
      </Head>
      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        <div
          style={{
            maxWidth: '36rem',
            padding: '2rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            background: 'var(--color-surface)',
            textAlign: 'center',
          }}
        >
          <h1 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Welcome</h1>
          <p style={{ color: 'var(--color-text)' }}>
            This route is served by Edge Config middleware in supported deployments.
          </p>
          <p style={{ marginTop: '1rem', color: 'var(--color-muted)' }}>
            Static exports do not run middleware, so this fallback page keeps the route available.
          </p>
        </div>
      </main>
    </>
  );
}
