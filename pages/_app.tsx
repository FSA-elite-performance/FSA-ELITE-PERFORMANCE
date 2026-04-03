import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AppLayout from '../components/AppLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import OliveWidget from '../components/OliveWidget';
import '../styles/globals.css';

/** Routes that get the sidebar app layout. */
const APP_LAYOUT_ROUTES = new Set(['/welcome', '/roleplay', '/olive', '/store', '/legal']);

function routeToPageContext(pathname: string): string {
  const basePathSegment = pathname.replace(/^\//, '').split('/')[0] || 'home';
  return basePathSegment;
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
      <ErrorBoundary>
        {useAppLayout ? (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ErrorBoundary>
      <OliveWidget pageContext={pageContext} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
