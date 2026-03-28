import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed. See console for details.');
        console.error('Checkout error:', data);
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
      <main style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        background: '#071018',
        color: '#fff',
        minHeight: '100vh',
        padding: '48px 24px',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          {/* Header */}
          <header style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              FSA Elite 🔥
            </h1>
            <p style={{ color: '#ffd4c9', fontSize: '1.1rem', marginTop: 8, fontStyle: 'italic' }}>
              Built for the Elite Mindset
            </p>
          </header>

          {/* Hero + Sidebar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: 40,
          }}>

            {/* Main content */}
            <section>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 16px' }}>
                Close More. Earn More. Train Smarter.
              </h2>
              <p style={{ color: '#c9c9c9', lineHeight: 1.7, marginBottom: 16 }}>
                FSA Elite is sales performance training for closers who want <strong style={{ color: '#fff' }}>more</strong> —
                more confidence, more skill, more production, and more results.
                Train anywhere. Sharpen your mindset. Master the process. Dominate your market.
              </p>

              <ul style={{ color: '#c9c9c9', paddingLeft: 20, lineHeight: 2 }}>
                <li>🔥 AI-powered objection training — real scenarios, real feedback</li>
                <li>📱 Mobile-first — train between calls, on your schedule</li>
                <li>🏆 Built by a 25× top performer for top performers</li>
                <li>💰 Results-driven — track progress, own your growth</li>
              </ul>

              {/* CTA */}
              <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  style={{
                    background: loading ? '#7a2210' : '#ff4b2b',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {loading ? 'Redirecting to checkout…' : 'Buy Early Access — $19.99'}
                </button>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                  Secure checkout via Stripe
                </span>
              </div>

              <hr style={{ margin: '36px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)' }} />

              {/* AI Training */}
              <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Train like it&apos;s real</h3>
              <p style={{ color: '#c9c9c9', lineHeight: 1.7 }}>
                Our AI objection trainer puts you in the seat. Real customer objections. Real-time coaching.
                No fluff — just reps that sharpen your edge. Pick it up on any device. Practice, step away,
                come back sharper. The AI adapts to your weak spots and drills you until the objections stop landing.
              </p>
            </section>

            {/* Sidebar */}
            <aside style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: 28,
              borderRadius: 14,
              alignSelf: 'start',
            }}>
              <h4 style={{ margin: '0 0 12px', fontWeight: 700, fontSize: '1.05rem' }}>
                Built by Kaygun Fontenot
              </h4>
              <p style={{ color: '#c9c9c9', lineHeight: 1.6, marginBottom: 16, fontSize: '0.95rem' }}>
                23 years old. 25× Salesman of the Month in a row. FSA Elite is the system he built
                for closers who refuse to be average — and for his son.
              </p>
              <blockquote style={{
                color: '#ffd4c9',
                fontStyle: 'italic',
                borderLeft: '3px solid #ff4b2b',
                paddingLeft: 14,
                margin: '16px 0 0',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}>
                &ldquo;Stop leaving money on the table.&rdquo;
              </blockquote>

              <div style={{
                marginTop: 24,
                padding: '16px',
                background: 'rgba(255,75,43,0.08)',
                borderRadius: 8,
                fontSize: '0.85rem',
                color: '#c9c9c9',
              }}>
                <strong style={{ color: '#ffd4c9' }}>Early Access Includes:</strong>
                <ul style={{ paddingLeft: 18, marginTop: 8, lineHeight: 1.8 }}>
                  <li>Full training platform access</li>
                  <li>AI objection practice sessions</li>
                  <li>Performance tracking</li>
                  <li>Lifetime early-backer pricing</li>
                </ul>
              </div>
            </aside>
          </div>

          {/* Footer */}
          <footer style={{ marginTop: 64, color: '#555', fontSize: '0.8rem', textAlign: 'center' }}>
            Fontenot&apos;s Sales Association LLC · FSA Elite Performance Training
          </footer>
        </div>
      </main>
    </>
  );
}
