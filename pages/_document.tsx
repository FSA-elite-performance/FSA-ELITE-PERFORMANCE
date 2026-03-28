import { Html, Head, Main, NextScript } from 'next/document';
import {
  PUBLIC_BRAND_ALIASES,
  PUBLIC_SEO_KEYWORDS,
  PUBLIC_SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');
const SITE_DESCRIPTION =
  'FSA Elite Performance delivers AI sales training, objection handling drills, self-branding tools, and closer gear for reps who want stronger skills and stronger identity.';

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FSA Elite Performance Training',
  alternateName: [...PUBLIC_BRAND_ALIASES],
  url: SITE_URL,
  email: SUPPORT_EMAIL,
  telephone: SUPPORT_PHONE,
  description: SITE_DESCRIPTION,
  keywords: PUBLIC_SEO_KEYWORDS,
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FSA ELITE',
  alternateName: [...PUBLIC_BRAND_ALIASES],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  keywords: PUBLIC_SEO_KEYWORDS,
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="application-name" content="FSA ELITE Sales Training" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FSA ELITE" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-TileImage" content={`${SITE_URL}/android-chrome-192x192.png`} />
        <meta name="msapplication-config" content="none" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Favicon — multi-size ICO for legacy browsers */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        {/* Favicon — PNG for modern browsers (size-specific) */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        {/* Apple Touch Icon — home screen bookmark on iOS/macOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Google Fonts preconnect and stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;600;700&display=swap"
        />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FSA ELITE Sales Training" />
        <meta property="og:title" content="FSA ELITE Sales Training" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="FSA ELITE Sales Training" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FSA ELITE Sales Training" />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
