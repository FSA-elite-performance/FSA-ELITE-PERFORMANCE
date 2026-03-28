import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import OliveWidget from '../components/OliveWidget';
import '../styles/globals.css';

function routeToPageContext(pathname: string): string {
  const clean = pathname.replace(/^\//, '').split('/')[0] || 'home';
  return clean;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageContext = routeToPageContext(router.pathname);

  return (
    <>
      <Component {...pageProps} />
      <OliveWidget pageContext={pageContext} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
