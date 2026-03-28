import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const checkoutApiUrl =
    `${(process.env.NEXT_PUBLIC_CHECKOUT_ORIGIN || '').replace(/\/+$/, '')}` +
    '/api/create-checkout-session';

  const handleEnroll = async () => {
    try {
      const res = await fetch(checkoutApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Something went wrong. Please try again.');
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('No checkout URL returned. Check your Stripe configuration.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Network error — please check your connection and try again.');
    }
  };

  return (
    <>
      <Head>
        <title>FSA Elite 🔥 — Sales Performance Training</title>
        <meta
          name="description"
          content="FSA Elite is built for salespeople who want more — more confidence, more skill, more production, and more results. Sales training. Closer mindset. Real growth."
        />
        <meta property="og:title" content="FSA Elite 🔥 — Sales Performance Training" />
        <meta
          property="og:description"
          content="Built for closers who want more — more confidence, more skill, more production, and more results."
        />
        <meta property="og:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <div className="badge">Early Access — Limited Spots</div>

        <h1>
          Level Up.<br />
          <span className="gold">Close More.</span><br />
          Win Every Day.
        </h1>

        <p className="tagline">
          FSA Elite is built for salespeople who want more — more confidence, more skill,
          more production, and more results. From training to branding, FSA Elite helps
          closers level up their mindset, master the process, and stand out in a competitive world.
        </p>

        <p className="sub-tagline">
          Sales training. Closer mindset. Real growth.<br />
          Built for hungry salespeople who want to level up and win.
        </p>

        <div className="pillars">
          <div className="pillar">🧠 Closer Mindset</div>
          <div className="pillar">🎯 Objection Mastery</div>
          <div className="pillar">📈 Real Production</div>
          <div className="pillar">🏆 Certifications</div>
          <div className="pillar">📱 Any Device</div>
          <div className="pillar">🤖 AI Training</div>
        </div>

        <button className="cta-btn" onClick={handleEnroll}>
          🔥 Get Early Access Now
        </button>

        <p className="security-note">
          Secure checkout powered by Stripe &bull; One-time payment &bull; No fluff, just results
        </p>

        <section className="social-proof">
          <p>
            Built by a closer. <strong>25-time Sales of the Month</strong> — 23 years old — LLC founder.
            This is real training from someone who&apos;s lived it.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} FSA Elite Performance LLC &bull; Built by closers, for closers.</p>
      </footer>

      <style jsx>{`
        .container {
          max-width: 680px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .badge {
          display: inline-block;
          background: var(--gold);
          color: var(--dark);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
        }
        h1 {
          font-size: clamp(2.4rem, 7vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        .gold { color: var(--gold); }
        .tagline {
          font-size: 1.1rem;
          color: #aaa;
          line-height: 1.7;
          margin-bottom: 0.75rem;
          max-width: 560px;
        }
        .sub-tagline {
          font-size: 1rem;
          color: #777;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .pillar {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 0.6rem 1.1rem;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .cta-btn {
          background: var(--gold);
          color: var(--dark);
          border: none;
          border-radius: 8px;
          font-size: 1.15rem;
          font-weight: 800;
          padding: 1rem 2.5rem;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 24px rgba(245, 197, 24, 0.35);
          transition: transform 0.15s, box-shadow 0.15s;
          margin-bottom: 1rem;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(245, 197, 24, 0.5);
        }
        .cta-btn:active { transform: translateY(0); }
        .security-note {
          font-size: 0.82rem;
          color: #555;
          margin-bottom: 3rem;
        }
        .social-proof {
          background: #111;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          padding: 1.25rem 1.75rem;
          font-size: 0.95rem;
          color: #ccc;
          line-height: 1.6;
          max-width: 480px;
        }
        .social-proof strong { color: var(--gold); }
        .footer {
          text-align: center;
          padding: 2rem;
          color: #444;
          font-size: 0.8rem;
          border-top: 1px solid #1a1a1a;
        }
      `}</style>
    </>
  );
};

export default Home;
