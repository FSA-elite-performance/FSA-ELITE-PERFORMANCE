import Head from 'next/head';
import Link from 'next/link';

export default function Welcome() {
  return (
    <>
      <Head>
        <title>Welcome | FSA Elite Sales Training</title>
        <meta
          name="description"
          content="Welcome page for the FSA Elite Sales Training platform."
        />
      </Head>

      <main className="welcome-page">
        <section className="welcome-card">
          <p className="welcome-kicker">FSA Elite</p>
          <h1 className="welcome-title">Welcome!</h1>
          <p className="welcome-copy">
            Your greeting route is active at <strong>/welcome</strong>. Continue to the homepage or jump into roleplay.
          </p>
          <div className="welcome-actions">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/roleplay" className="btn-secondary">
              Open Roleplay
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
