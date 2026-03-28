import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Head>
        <title>You&apos;re In — FSA Elite</title>
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
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏆</div>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--color-primary)',
            marginBottom: '1rem',
          }}
        >
          You&apos;re In, Closer.
        </h1>
        <p
          style={{
            color: '#ccc',
            fontSize: '1.1rem',
            maxWidth: '520px',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          Welcome to <strong style={{ color: 'var(--color-primary)' }}>FSA Elite</strong>. Your
          founding member access is confirmed. You&apos;ve locked in the lowest rate ever offered —
          full platform access is yours for life.
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Start with the AI Roleplay Trainer to sharpen your close right now.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/roleplay" className="btn-primary">
            Launch AI Trainer →
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
