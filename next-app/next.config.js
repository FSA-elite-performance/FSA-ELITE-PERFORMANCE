const isStaticExport = process.env.NEXT_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages: set NEXT_EXPORT=1 in the build environment.
  // For Vercel (recommended), leave NEXT_EXPORT unset — serverless functions work there.
  ...(isStaticExport ? { output: 'export' } : {}),

  // Keep static export compatibility for GitHub Pages, but allow Vercel's
  // default image optimization pipeline when NEXT_EXPORT is unset.
  ...(isStaticExport
    ? {
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

module.exports = nextConfig;
