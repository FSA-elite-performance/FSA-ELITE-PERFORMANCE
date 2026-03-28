const { withBotId } = require('botid/next/config');

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

  env: {
    NEXT_PUBLIC_BOTID_ENABLED: isStaticExport ? '0' : '1',
  },
};

module.exports = isStaticExport ? nextConfig : withBotId(nextConfig);
