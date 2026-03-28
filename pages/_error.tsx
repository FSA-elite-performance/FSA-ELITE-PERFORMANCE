import type { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type ErrorProps = {
  statusCode?: number;
};

export default function ErrorPage({ statusCode }: ErrorProps) {
  const is404 = statusCode === 404;
  const title = is404 ? 'Page Not Found' : 'Server Error';
  const heading = is404 ? '404' : '500';

  return (
    <>
      <Head>
        <title>{title} | FSA Elite</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-bg, #0a0a0a)',
          color: 'var(--color-text, #f5f5f5)',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '480px' }}>
          <p
            style={{
              fontSize: '4rem',
              fontWeight: 800,
              color: 'var(--color-primary, #c9a84c)',
              marginBottom: '0.25rem',
              lineHeight: 1,
            }}
          >
            {heading}
          </p>
          <h1
            style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: 'var(--color-text, #f5f5f5)',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              marginBottom: '2rem',
              color: 'var(--color-muted, #888)',
              lineHeight: 1.6,
            }}
          >
            {is404
              ? "The page you're looking for doesn't exist or has been moved."
              : 'Something went wrong on our end. Please try again in a moment.'}
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: 'var(--color-primary, #c9a84c)',
              color: '#0a0a0a',
              padding: '0.75rem 2rem',
              borderRadius: 'var(--radius, 8px)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};
