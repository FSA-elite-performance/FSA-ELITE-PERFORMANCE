import Head from 'next/head';
import Link from 'next/link';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Checkout Cancelled — FSA Elite 🔥</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.icon}>🚪</div>
          <h1 style={styles.heading}>No worries — the door&apos;s still open.</h1>
          <p style={styles.body}>
            You cancelled your checkout. Nothing was charged to your card.
          </p>
          <p style={styles.note}>
            When you&apos;re ready to level up, FSA Elite will be here. Closers don&apos;t quit —
            they regroup and come back stronger.
          </p>
          <Link href="/" style={styles.ctaLink}>
            Try again →
          </Link>
        </div>
      </main>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    background: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  card: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '16px',
    padding: '3rem 2.5rem',
    maxWidth: '540px',
    width: '100%',
    textAlign: 'center',
    color: '#f5f5f5',
  },
  icon: { fontSize: '3.5rem', marginBottom: '1rem' },
  heading: {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: 900,
    color: '#f5f5f5',
    marginBottom: '1rem',
  },
  body: {
    fontSize: '1rem',
    color: '#aaa',
    lineHeight: 1.7,
    marginBottom: '1.25rem',
  },
  note: {
    fontSize: '0.9rem',
    color: '#888',
    lineHeight: 1.6,
    marginBottom: '2rem',
    background: '#111',
    borderRadius: '8px',
    padding: '0.875rem 1rem',
  },
  ctaLink: {
    display: 'inline-block',
    background: '#c9a84c',
    color: '#0a0a0a',
    textDecoration: 'none',
    fontWeight: 800,
    fontSize: '1rem',
    padding: '0.85rem 2.2rem',
    borderRadius: '6px',
  },
};
