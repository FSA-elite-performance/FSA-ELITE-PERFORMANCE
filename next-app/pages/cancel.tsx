import Head from 'next/head';
import Link from 'next/link';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>No Problem — FSA Elite</title>
      </Head>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem 1.5rem',
          background: 'var(--color-bg)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>↩️</div>
        <h1
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--color-text)',
            marginBottom: '1rem',
          }}
        >
          No problem.
        </h1>
        <p
          style={{
            color: '#aaa',
            fontSize: '1rem',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          You can return whenever you&apos;re ready. The founding member rate is still available — but
          it won&apos;t last forever. In the meantime, try the AI Roleplay Trainer for free.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/roleplay" className="btn-secondary">
            Try the AI Trainer Free →
          </Link>
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </main>
    </>
  );
}
