import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Success: NextPage = () => {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <>
      <Head>
        <title>Payment Successful — FSA Elite</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--gold)' }}>
          You&apos;re In!
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#aaa', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Welcome to <strong style={{ color: '#fff' }}>FSA Elite</strong> — your early access is confirmed.
          Get ready to level up your mindset, master your process, and close more deals.
        </p>

        {session_id && (
          <p style={{ fontSize: '0.82rem', color: '#555', marginBottom: '2rem' }}>
            Session reference: <code style={{ color: '#888' }}>{session_id}</code>
          </p>
        )}

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
            ⚠️ Important: Verify Your Payment
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: 1.6 }}>
            Your payment has been submitted. For security, purchases are verified via Stripe
            webhooks before access is provisioned. If you do not receive a confirmation email
            within a few minutes, please contact support.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.75rem' }}>
            <strong>Developers:</strong> This success page confirms the Stripe redirect is working.
            Always verify payments server-side via{' '}
            <code>checkout.session.completed</code> webhook events before granting access —
            never rely solely on this redirect.
          </p>
        </div>

        <Link href="/" style={{ color: 'var(--gold)', fontSize: '0.95rem' }}>
          ← Back to FSA Elite
        </Link>
      </main>
    </>
  );
};

export default Success;
