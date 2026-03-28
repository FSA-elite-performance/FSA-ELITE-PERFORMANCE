import Head from 'next/head';
import Link from 'next/link';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Checkout Canceled | FSA ELITE Sales Training</title>
      </Head>
      <main className="status-page">
        <div className="status-icon" aria-hidden="true">
          !
        </div>
        <h1>Checkout canceled</h1>
        <p>
          No charge was made. You can return to the order preview when you are ready to start your
          FSA ELITE full training course access.
        </p>
        <p className="status-muted">Need to practice first? Jump into roleplay mode and come back when you are ready.</p>
        <Link href="/checkout-preview" className="btn-primary">
          Return to Checkout Preview
        </Link>
      </main>
    </>
  );
}
