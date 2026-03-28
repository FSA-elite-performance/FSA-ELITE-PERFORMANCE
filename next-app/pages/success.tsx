import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { MERCH_PRODUCTS } from '../lib/merchCatalog';
import { SUBSCRIPTION_NAME } from '../lib/subscriptionPlan';

type LastCheckoutSnapshot = {
  items: Array<{ productId: string; quantity: number }>;
  totalCents: number;
  at: string;
};

const LAST_CHECKOUT_KEY = 'fsaelite:last-checkout:v1';

function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function Success() {
  const [snapshot, setSnapshot] = useState<LastCheckoutSnapshot | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LAST_CHECKOUT_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as LastCheckoutSnapshot;
      if (!parsed || !Array.isArray(parsed.items) || typeof parsed.totalCents !== 'number') return;

      setSnapshot(parsed);
      window.localStorage.removeItem(LAST_CHECKOUT_KEY);
    } catch {
      window.localStorage.removeItem(LAST_CHECKOUT_KEY);
    }
  }, []);

  const snapshotLines = useMemo(() => {
    if (!snapshot) return [];

    return snapshot.items
      .map((line) => {
        const product = MERCH_PRODUCTS.find((item) => item.id === line.productId);
        if (!product) return null;

        return `${product.name} x${line.quantity}`;
      })
      .filter((line): line is string => Boolean(line));
  }, [snapshot]);

  return (
    <>
      <Head>
        <title>Payment Successful | FSA ELITE Sales Training</title>
      </Head>
      <main className="status-page">
        <div className="status-icon" aria-hidden="true">
          ✓
        </div>
        <h1>Welcome to FSA ELITE</h1>
        <p>
          Your payment was successful. Your {SUBSCRIPTION_NAME} full course access is now active and
          your training access is ready.
        </p>
        {snapshot && (
          <>
            <p className="status-muted">Merch order captured: {formatUsd(snapshot.totalCents)}</p>
            {snapshotLines.length > 0 && (
              <p className="status-muted">{snapshotLines.join(' · ')}</p>
            )}
          </>
        )}
        <p className="status-muted">Next step: start with the AI Roleplay Lab and complete your first objection drill.</p>
        <Link href="/roleplay" className="btn-primary">
          Start AI Roleplay Training
        </Link>
        <Link href="/" className="btn-secondary" style={{ marginTop: '0.75rem' }}>
          Return to Home
        </Link>
      </main>
    </>
  );
}
