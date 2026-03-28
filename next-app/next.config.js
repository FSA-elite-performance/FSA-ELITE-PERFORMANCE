/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages: set NEXT_EXPORT=1 in the build environment.
  // For Vercel (recommended), leave NEXT_EXPORT unset — serverless functions work there.
  ...(process.env.NEXT_EXPORT === '1' ? { output: 'export' } : {}),

  // Disable image optimization for static export compatibility
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
