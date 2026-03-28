import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Head>
        <title>Payment Successful — FSA Elite 🔥</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.icon}>🏆</div>
          <h1 style={styles.heading}>You&apos;re in. Let&apos;s get to work.</h1>
          <p style={styles.body}>
            Your payment was received. Welcome to FSA Elite — the training built for closers who
            refuse to settle.
          </p>
          <p style={styles.note}>
            <strong>Next step:</strong> Check your email for your access details. If you don&apos;t
            see it within a few minutes, check your spam folder.
          </p>
          <p style={styles.webhookNote}>
            🔒 <em>
              Payments are verified server-side via Stripe webhooks. If you have any issues with
              access, contact support with your order confirmation.
            </em>
          </p>
          <Link href="/" style={styles.link}>
            ← Back to home
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
    fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
    fontWeight: 900,
    color: '#c9a84c',
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
    marginBottom: '1.25rem',
    background: '#111',
    borderRadius: '8px',
    padding: '0.875rem 1rem',
  },
  webhookNote: {
    fontSize: '0.8rem',
    color: '#555',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  link: {
    display: 'inline-block',
    color: '#c9a84c',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
};
