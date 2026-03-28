import { Html, Head, Main, NextScript } from 'next/document';
import { PUBLIC_SITE_URL } from '../lib/businessDetails';

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        {/* Google Fonts preconnect and stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Sora:wght@500;700;800&display=swap"
        />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FSA ELITE Sales Training" />
        <meta property="og:title" content="FSA ELITE Sales Training" />
        <meta
          property="og:description"
          content="Sales training for closers in any industry with AI roleplay and practical objection handling drills."
        />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
