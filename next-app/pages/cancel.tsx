import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Cancel: NextPage = () => {
  return (
    <>
      <Head>
        <title>Checkout Cancelled — FSA Elite</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚪</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: '#fff' }}>
          No worries — you can come back anytime.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#aaa', lineHeight: 1.7, marginBottom: '2rem' }}>
          Your checkout was cancelled and you were not charged. Whenever you&apos;re ready to
          level up and join <strong style={{ color: 'var(--gold)' }}>FSA Elite</strong>, we&apos;ll
          be here.
        </p>

        <div
          style={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: 10,
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left',
          }}
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>
            🔥 Still thinking about it?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: 1.6 }}>
            Early access spots are limited. FSA Elite is the only sales training platform built
            by someone who has actually been in the trenches — 25-time Sales of the Month,
            23 years old, LLC founder. This is real training from a real closer.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.75rem' }}>
            <strong>Developers:</strong> This page confirms the Stripe cancel redirect is working correctly.
            The user was not charged. No webhook event is fired on cancellation.
          </p>
        </div>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: 'var(--gold)',
            color: 'var(--dark)',
            padding: '0.85rem 2rem',
            borderRadius: 8,
            fontWeight: 800,
            textDecoration: 'none',
            marginRight: '1rem',
          }}
        >
          🔥 Try Again
        </Link>
        <Link href="/" style={{ color: '#666', fontSize: '0.9rem' }}>
          ← Back to Home
        </Link>
      </main>
    </>
  );
};

export default Cancel;
