import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>FSA Elite — Built for the Elite Mindset</title>
        <meta
          name="description"
          content="FSA Elite is sales performance training for closers who want more — more confidence, more skill, more production, and more results."
        />
        <meta property="og:title" content="FSA Elite — Built for the Elite Mindset" />
        <meta
          property="og:description"
          content="AI-powered objection training. Train anywhere. Close smarter."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      <main className="hero">
        <div className="container">
          <div className="content">
            <span className="badge">🔥 EARLY ACCESS</span>
            <h1>
              FSA Elite
              <br />
              <span className="subtitle">Built for the Elite Mindset</span>
            </h1>
            <p className="lead">
              FSA Elite is not just another sales course. It's a performance-driven training
              platform built for closers who want to dominate their craft. Whether you're in
              automotive sales or any high-pressure sales environment, FSA Elite helps you build
              the mindset, habits, and skill set required to perform at a higher level.
            </p>
            <p className="lead">
              Train anywhere — on your phone, tablet, or any device. Pick it up, put it down,
              jump back in. This is practical sales training built for real closers.
            </p>
            <div className="cta-group">
              <button
                className="btn-primary"
                onClick={handleCheckout}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Redirecting…" : "Get Early Access →"}
              </button>
            </div>
            {error && <p className="error-msg" role="alert">{error}</p>}
          </div>

          <aside className="card">
            <h3>Built by Kaygun Fontenot</h3>
            <p>
              23 years old. 25× Salesman of the Month in a row. Building FSA Elite for closers
              who refuse to be average — and for his son Oliver.
            </p>
            <hr />
            <p>
              <strong>No more lazy selling.</strong> No more weak follow-up. No more letting
              customers control the whole conversation. FSA Elite trains you to think better,
              communicate better, and close better.
            </p>
            <p className="tagline">"Train harder. Close smarter."</p>
          </aside>
        </div>
      </main>
    </>
  );
}
