import Head from "next/head";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <Head>
        <title>Welcome to FSA Elite 🔥</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <main className="hero">
        <div className="container" style={{ gridTemplateColumns: "1fr", maxWidth: 640 }}>
          <div className="content" style={{ textAlign: "center" }}>
            <span style={{ fontSize: 64 }}>🎉</span>
            <h1 style={{ fontSize: 36, marginTop: 16 }}>Payment Received!</h1>
            <p className="lead">
              Thank you for joining FSA Elite Early Access. You're on the list.
            </p>
            <p className="lead">
              <strong>Next step:</strong> We'll send your access details by email once your
              payment is confirmed via Stripe webhook. If you don't hear from us within 24
              hours, contact us at{" "}
              <a href="mailto:support@fsaelite.com" style={{ color: "#ff7a5c" }}>
                support@fsaelite.com
              </a>
              .
            </p>
            <p style={{ color: "#c9c9c9", fontSize: 14, marginTop: 24 }}>
              💡 <em>For the site owner:</em> Configure a Stripe Webhook for{" "}
              <code>checkout.session.completed</code> to automatically record purchases and
              grant access. See <strong>README.md → Stripe Setup</strong> for instructions.
            </p>
            <Link href="/" className="btn-primary" style={{ display: "inline-block", marginTop: 24 }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
