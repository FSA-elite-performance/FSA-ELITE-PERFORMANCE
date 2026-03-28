import Head from "next/head";
import Link from "next/link";

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Checkout Cancelled — FSA Elite</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <main className="hero">
        <div className="container" style={{ gridTemplateColumns: "1fr", maxWidth: 640 }}>
          <div className="content" style={{ textAlign: "center" }}>
            <span style={{ fontSize: 64 }}>😔</span>
            <h1 style={{ fontSize: 36, marginTop: 16 }}>Checkout Cancelled</h1>
            <p className="lead">No worries — nothing was charged. Your spot is still waiting.</p>
            <p className="lead">
              When you're ready, come back and get early access to FSA Elite Sales Performance
              Training. Train harder. Close smarter.
            </p>
            <Link href="/" className="btn-primary" style={{ display: "inline-block", marginTop: 24 }}>
              ← Try Again
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
