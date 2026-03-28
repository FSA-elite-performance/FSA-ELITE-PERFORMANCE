import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PUBLIC_SEO_KEYWORDS, PUBLIC_SITE_URL } from '../lib/businessDetails';

interface RouteAliasPageProps {
  title: string;
  description: string;
  target: string;
}

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

export default function RouteAliasPage({ title, description, target }: RouteAliasPageProps) {
  const router = useRouter();

  useEffect(() => {
    void router.replace(target);
  }, [router, target]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}${target === '/' ? '' : target}`} />
      </Head>

      <main className="welcome-page">
        <section className="welcome-card">
          <p className="welcome-kicker">FSA Elite</p>
          <h1 className="welcome-title">Redirecting to FSA</h1>
          <p className="welcome-copy">
            This shortcut stays active so simple routes keep pointing back to the right FSA ELITE page.
          </p>
          <div className="welcome-actions">
            <Link href={target} className="btn-primary">
              Continue
            </Link>
            <Link href="/" className="btn-secondary">
              Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}