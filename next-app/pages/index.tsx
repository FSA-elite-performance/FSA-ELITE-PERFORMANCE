import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>FSA Elite 🔥 Sales Performance Training</title>
        <meta name="description" content="Sales training. Closer mindset. Real growth. Built for hungry salespeople who want to level up and win." />
        <meta property="og:title" content="FSA Elite 🔥 Sales Performance Training" />
        <meta property="og:description" content="Built for closers who want more — more confidence, more skill, more production, and more results." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="main">
        <div className="hero">
          <div className="badge">Early Access — Limited Spots</div>
          <h1 className="headline">
            FSA <span className="gold">Elite</span> 🔥
          </h1>
          <p className="subheadline">
            Sales training. Closer mindset. Real growth.
          </p>
          <p className="body-copy">
            FSA Elite is built for salespeople who want more — more confidence, more skill,
            more production, and more results. From training to branding, FSA Elite helps
            closers level up their mindset, master the process, and stand out in a competitive
            world. Whether you&apos;re on the showroom floor, behind a phone, or building your
            own book of business — FSA Elite gives you the tools and the mindset to dominate.
          </p>

          {error && <p className="error-msg">⚠️ {error}</p>}

          <button
            className="cta-btn"
            onClick={handleCheckout}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Redirecting to checkout…' : 'Get Early Access — $97'}
          </button>

          <p className="guarantee">
            🔒 Secure checkout via Stripe &nbsp;·&nbsp; 30-day satisfaction guarantee
          </p>
        </div>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Objection Handling</h3>
            <p>Master the real objections thrown at you every day — price, timing, trust — with proven rebuttals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Closer Mindset</h3>
            <p>Train your brain to perform under pressure. Sales is 80% mental — we train the 80%.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Real Results</h3>
            <p>Built by a 25-time consecutive Sales of the Month champion. This is proven, not theoretical.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Any Device</h3>
            <p>Phone, tablet, desktop — train anywhere, put it down, pick it back up. Built for the floor.</p>
          </div>
        </section>

        <section className="social-proof">
          <blockquote>
            &ldquo;No more will we let the customer run the show.&rdquo;
            <cite>— Kaygun Fontenoti, Founder FSA Elite</cite>
          </blockquote>
        </section>
      </main>

      <footer className="footer">
        <p>FSA Elite Sales Performance Training &copy; {new Date().getFullYear()}</p>
        <p className="footer-sub">
          Secure payment processing by Stripe. Your info is never stored on our servers.
        </p>
      </footer>

      <style jsx>{`
        .main {
          min-height: 100vh;
          background: #0a0a0a;
          color: #f5f5f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .hero {
          max-width: 720px;
          margin: 0 auto;
          padding: 5rem 2rem 3rem;
          text-align: center;
        }
        .badge {
          display: inline-block;
          background: #c9a84c;
          color: #0a0a0a;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
        }
        .headline {
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }
        .gold { color: #c9a84c; }
        .subheadline {
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          color: #aaa;
          margin-bottom: 1.25rem;
        }
        .body-copy {
          font-size: 1rem;
          color: #888;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .cta-btn {
          display: inline-block;
          background: #c9a84c;
          color: #0a0a0a;
          font-size: 1.1rem;
          font-weight: 800;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          letter-spacing: 0.01em;
        }
        .cta-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .cta-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .guarantee {
          margin-top: 1rem;
          font-size: 0.82rem;
          color: #666;
        }
        .error-msg {
          background: #2a1111;
          border: 1px solid #7a2020;
          color: #f88;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .features {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 1.75rem;
        }
        .feature-icon { font-size: 2rem; margin-bottom: 0.75rem; }
        .feature-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .feature-card p { font-size: 0.875rem; color: #888; line-height: 1.6; }
        .social-proof {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
          text-align: center;
        }
        blockquote {
          font-size: 1.25rem;
          font-style: italic;
          color: #ccc;
          line-height: 1.6;
        }
        cite {
          display: block;
          margin-top: 1rem;
          font-style: normal;
          font-size: 0.875rem;
          color: #c9a84c;
          font-weight: 600;
        }
        .footer {
          background: #0a0a0a;
          border-top: 1px solid #1a1a1a;
          padding: 2rem;
          text-align: center;
          font-size: 0.8rem;
          color: #555;
        }
        .footer-sub { margin-top: 0.35rem; }
      `}</style>
    </>
  );
}
