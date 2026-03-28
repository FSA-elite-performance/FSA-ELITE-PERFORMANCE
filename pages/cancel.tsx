import Head from 'next/head';
import Link from 'next/link';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../lib/businessDetails';

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
        <p className="status-muted">Training and member store access unlock after the one-time payment is completed.</p>
        <Link href="/checkout-preview" className="btn-primary">
          Return to Checkout Preview
        </Link>
        <p className="policy-inline-links" style={{ marginTop: '1rem' }}>
          Questions before you retry? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
        </p>
        <p className="policy-inline-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>•</span>
          <Link href="/refund-policy">Refund Policy</Link>
          <span>•</span>
          <Link href="/terms">Terms</Link>
        </p>
      </main>
    </>
  );
}
