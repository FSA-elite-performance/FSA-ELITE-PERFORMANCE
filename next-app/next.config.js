/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Required for `next export` static builds — disables Image Optimization API
    unoptimized: true,
  },
  // Uncomment the line below ONLY when running `npm run export` for static hosting.
  // Static export does NOT support serverless API routes (e.g. /api/create-checkout-session).
  // For Stripe Checkout to work, deploy to Vercel or another platform that supports
  // serverless functions. GitHub Pages serves the static export as a fallback only.
  // output: 'export',
};

module.exports = nextConfig;
