const STORE_HOST = 'fsaeliteperformance.com';
const LEGACY_HOSTS = ['fsaelite.org', 'www.fsaelite.org'];
const isStaticExport = process.env.NEXT_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages: set NEXT_EXPORT=1 in the build environment.
  // For Vercel (recommended), leave NEXT_EXPORT unset — serverless functions work there.
  ...(isStaticExport ? { output: 'export' } : {}),

  // Disable image optimization for static export compatibility
  images: {
    unoptimized: true,
  },
  ...(!isStaticExport
    ? {
        async redirects() {
          return LEGACY_HOSTS.map((host) => ({
            source: '/:path*',
            has: [{ type: 'host', value: host }],
            destination: `https://${STORE_HOST}/:path*`,
            permanent: true,
          }));
        },
      }
    : {}),
};

module.exports = nextConfig;
