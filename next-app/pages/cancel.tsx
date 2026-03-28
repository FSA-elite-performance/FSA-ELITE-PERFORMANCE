import Head from 'next/head';
import Link from 'next/link';
import CenteredPage from '../components/CenteredPage';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Setup Paused — Kubiks Next.js Starter</title>
      </Head>
      <CenteredPage>
        <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>↩️</div>
        <h1
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: '#f0f0f0',
            marginBottom: '1rem',
          }}
        >
          Setup paused
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
          No problem. You can return to the starter overview whenever you&apos;re ready to clone the
          upstream repository or create your private project repository.
        </p>
        <Link href="/" className="btn-primary">
          Return to the starter →
        </Link>
      </CenteredPage>
    </>
  );
}
