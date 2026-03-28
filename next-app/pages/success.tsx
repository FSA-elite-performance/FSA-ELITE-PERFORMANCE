import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Head>
        <title>Access Confirmed — FSA Elite Sales Training</title>
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
          Access Confirmed
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
          <strong style={{ color: '#f5a623' }}>FSA Elite Sales Training</strong> is ready for your next
          step. Jump into the roleplay trainer and get ready for upcoming modules, certifications,
          and sales tools.
        </p>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Your early-access checkout went through successfully.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home →
        </Link>
      </main>
    </>
  );
}
