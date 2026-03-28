import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CHECKOUT_CONTEXT_KEY } from '../lib/accessKeys';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../lib/businessDetails';
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
  const [checkoutKind, setCheckoutKind] = useState<'membership' | 'merch' | null>(null);
  const [activationError, setActivationError] = useState('');
  const [activatingMembership, setActivatingMembership] = useState(false);

  useEffect(() => {
    try {
      const fromQuery = new URLSearchParams(window.location.search).get('checkout');
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      const context = window.localStorage.getItem(CHECKOUT_CONTEXT_KEY);
      const resolvedKind =
        fromQuery === 'membership' || fromQuery === 'merch'
          ? fromQuery
          : context === 'membership' || context === 'merch'
            ? context
            : null;

      if (resolvedKind) {
        setCheckoutKind(resolvedKind);
      }

      if (resolvedKind === 'membership' && sessionId) {
        setActivatingMembership(true);
        void fetch('/api/activate-membership', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
          .then(async (response) => {
            const data = (await response.json()) as { active?: boolean; error?: string };
            if (!response.ok || !data.active) {
              throw new Error(data.error ?? 'Membership activation failed.');
            }
          })
          .catch((error: unknown) => {
            const message = error instanceof Error ? error.message : 'Membership activation failed.';
            setActivationError(message);
          })
          .finally(() => {
            setActivatingMembership(false);
          });
      }

      window.localStorage.removeItem(CHECKOUT_CONTEXT_KEY);

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
        {checkoutKind === 'merch' ? (
          <p>Your payment was successful. Your merch order is confirmed and your member access remains available.</p>
        ) : (
          <p>
            {activatingMembership
              ? `Your payment was successful. Activating your ${SUBSCRIPTION_NAME} access now…`
              : `Your payment was successful. Your ${SUBSCRIPTION_NAME} full course access is now active and your training and member store access are ready.`}
          </p>
        )}
        {activationError && <p className="home-error">{activationError}</p>}
        {snapshot && (
          <>
            <p className="status-muted">Merch order captured: {formatUsd(snapshot.totalCents)}</p>
            {snapshotLines.length > 0 && (
              <p className="status-muted">{snapshotLines.join(' · ')}</p>
            )}
          </>
        )}
        <p className="status-muted">
          {checkoutKind === 'merch'
            ? 'Next step: return to the member store or continue inside the training area.'
            : activatingMembership
              ? 'Please wait while access is confirmed, then continue into the AI Roleplay Lab.'
              : 'Next step: start with the AI Roleplay Lab and complete your first objection drill.'}
        </p>
        <Link href={checkoutKind === 'merch' ? '/store' : '/roleplay'} className="btn-primary">
          {checkoutKind === 'merch' ? 'Return to Member Store' : 'Start AI Roleplay Training'}
        </Link>
        <Link href="/" className="btn-secondary" style={{ marginTop: '0.75rem' }}>
          Return to Home
        </Link>
        <p className="policy-inline-links" style={{ marginTop: '1rem' }}>
          Need help? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
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
