import { Html, Head, Main, NextScript } from 'next/document';
import { PUBLIC_SITE_URL } from '../lib/businessDetails';

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="application-name" content="FSA ELITE Sales Training" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="FSA ELITE" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-config" content="none" />
        <link rel="canonical" href="/" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
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
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:alt" content="FSA ELITE Sales Training" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE Sales Training" />
        <meta
          name="twitter:description"
          content="Sales training for closers in any industry with AI roleplay and practical objection handling drills."
        />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
