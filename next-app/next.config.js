const { withBotId } = require('botid/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages: set NEXT_EXPORT=1 in the build environment.
  // For Vercel (recommended), leave NEXT_EXPORT unset — serverless functions work there.
  ...(process.env.NEXT_EXPORT === '1' ? { output: 'export' } : {}),
  env: {
    NEXT_PUBLIC_IS_STATIC_EXPORT: process.env.NEXT_EXPORT === '1' ? '1' : '0',
  },

  // Disable image optimization for static export compatibility
  images: {
    unoptimized: true,
  },
};

module.exports = process.env.NEXT_EXPORT === '1' ? nextConfig : withBotId(nextConfig);
