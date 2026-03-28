import Head from 'next/head';
import Link from 'next/link';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Checkout Cancelled — FSA Elite</title>
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
          background: '#0a0a0a',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>↩️</div>
        <h1
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: '#f0f0f0',
            marginBottom: '1rem',
          }}
        >
          No worries — you&apos;re still in the game.
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
          Your checkout was cancelled and no charge was made. Whenever you&apos;re ready, the early
          access rate is still waiting for you.
        </p>
        <Link href="/" className="btn-primary">
          Return to FSA Elite →
        </Link>
      </main>
    </>
  );
}
