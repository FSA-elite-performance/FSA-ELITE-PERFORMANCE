import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AppLayout from '../components/AppLayout';
import '../styles/globals.css';

// Loaded lazily: OliveWidget is only interactive after user engagement and
// does not need to block the initial page render.
const OliveWidget = dynamic(() => import('../components/OliveWidget'), {
  ssr: false,
});

/** Routes that get the sidebar app layout. */
const APP_LAYOUT_ROUTES = new Set(['/welcome', '/roleplay', '/store', '/legal']);

function routeToPageContext(pathname: string): string {
  const clean = pathname.replace(/^\//, '').split('/')[0] || 'home';
  return clean;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageContext = routeToPageContext(router.pathname);
  const useAppLayout = APP_LAYOUT_ROUTES.has(router.pathname);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>
      {useAppLayout ? (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      ) : (
        <Component {...pageProps} />
      )}
      <OliveWidget pageContext={pageContext} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
