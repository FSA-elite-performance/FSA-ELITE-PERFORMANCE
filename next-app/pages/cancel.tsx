import Head from 'next/head';
import Link from 'next/link';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Checkout Paused — FSA Elite Sales Training</title>
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
          Checkout paused
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
          No problem. You can return to the FSA Elite overview whenever you&apos;re ready to continue
          with early access or explore the AI roleplay trainer.
        </p>
        <Link href="/" className="btn-primary">
          Return to FSA Elite →
        </Link>
      </main>
    </>
  );
}
