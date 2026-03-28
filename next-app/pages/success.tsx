import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Head>
        <title>Starter Ready — Kubiks Next.js Starter</title>
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
          Starter Ready
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
          <strong style={{ color: '#f5a623' }}>Kubiks Next.js Starter</strong> is ready for your next
          step. Use this project as the foundation for your own Kubiks integration and tailor the
          experience to match your product.
        </p>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Keep your deployment connected to Git so every push updates the project automatically.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home →
        </Link>
      </main>
    </>
  );
}
