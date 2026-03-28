import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Head>
        <title>Access Granted — FSA Elite Sales Training</title>
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
          Welcome to FSA Elite
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
          You&apos;re in. <strong style={{ color: 'var(--color-primary)' }}>FSA Elite Sales Training</strong> is
          now unlocked — modules, AI roleplay, certifications, and the full closer mindset curriculum.
          Check your email for access details.
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Your founding member rate is locked in for life. Welcome to the top 1%.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/roleplay" className="btn-primary">
            Start AI Trainer →
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
