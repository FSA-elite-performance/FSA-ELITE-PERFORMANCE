import Head from 'next/head';
import Link from 'next/link';

export default function Welcome() {
  return (
    <>
      <Head>
        <title>Welcome | FSA Elite Sales Training</title>
        <meta
          name="description"
          content="Welcome page for the FSA Elite Sales Training platform."
        />
      </Head>

      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        <section
          style={{
            width: '100%',
            maxWidth: '32rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            padding: 'clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 1.5rem 3rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <p
            style={{
              color: 'var(--color-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            FSA Elite
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            Welcome!
          </h1>
          <p
            style={{
              color: 'var(--color-muted)',
              fontSize: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            Your greeting is ready at <strong style={{ color: 'var(--color-text)' }}>/welcome</strong>.
          </p>
          <Link className="btn-primary" href="/">
            Back to home
          </Link>
        </section>
      </main>
    </>
  );
}
