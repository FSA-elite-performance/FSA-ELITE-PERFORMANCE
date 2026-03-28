// NOTE: This page is shown after Stripe redirects the customer back.
// Payment verification must be done server-side via a Stripe webhook
// (checkout.session.completed), not by trusting the session_id URL parameter.
// Do NOT grant entitlements or access based on this page alone.

export default function Success() {
  return (
    <main style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      background: '#071018',
      color: '#fff',
      minHeight: '100vh',
      padding: '72px 24px',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>
          Thank You — Order Received!
        </h1>
        <p style={{ color: '#c9c9c9', lineHeight: 1.7, marginBottom: 24 }}>
          Your payment is being processed. You will receive a receipt and next steps
          by email shortly. Welcome to FSA Elite — you&apos;re one step closer to
          dominating your market.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#ff4b2b',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Return Home
        </a>
      </div>
    </main>
  );
}
