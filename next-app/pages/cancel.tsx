import Head from 'next/head';
import Link from 'next/link';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Order Cancelled — FSA Elite Sales Training</title>
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
          No worries — come back when you&apos;re ready
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
          Your order was not completed. The founding member price of{' '}
          <strong style={{ color: 'var(--color-primary)' }}>$97</strong> is still waiting for you —
          but it won&apos;t last forever. Return whenever you&apos;re ready to level up.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn-primary">
            Return to FSA Elite →
          </Link>
          <Link href="/roleplay" className="btn-secondary">
            Try AI Trainer Free
          </Link>
        </div>
      </main>
    </>
  );
}
