export default function Cancel() {
  return (
    <main style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      background: '#071018',
      color: '#fff',
      minHeight: '100vh',
      padding: '72px 24px',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>↩️</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>
          Checkout Canceled
        </h1>
        <p style={{ color: '#c9c9c9', lineHeight: 1.7, marginBottom: 24 }}>
          No charge was made. Head back whenever you&apos;re ready — your spot is waiting.
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
