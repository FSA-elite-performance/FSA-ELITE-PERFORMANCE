import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Head>
        <title>Welcome to FSA Elite 🔥</title>
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
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏆</div>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900,
            color: '#f5a623',
            marginBottom: '1rem',
          }}
        >
          You&apos;re In!
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
          Welcome to <strong style={{ color: '#f5a623' }}>FSA Elite</strong>. Your early access is
          confirmed. Get ready to level up your mindset, master the process, and close more deals
          than ever before.
        </p>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          A confirmation email is on its way. If you have questions, reach us at{' '}
          <a href="mailto:support@fsaeliteperformance.com">support@fsaeliteperformance.com</a>.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home →
        </Link>
      </main>
    </>
  );
}
