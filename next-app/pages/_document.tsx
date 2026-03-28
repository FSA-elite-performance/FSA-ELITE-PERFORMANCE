import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts — preconnect first to start DNS/TLS early, then load stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
        />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FSA Elite" />
        <meta property="og:title" content="FSA Elite — Sales Training for Closers" />
        <meta
          property="og:description"
          content="Sales training. Closer mindset. Real growth. Built for hungry salespeople who want to level up and win."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
