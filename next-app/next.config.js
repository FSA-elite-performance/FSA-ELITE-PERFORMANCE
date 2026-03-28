/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images.unoptimized is required for static export (next export / GitHub Pages)
  images: {
    unoptimized: true,
  },
  // Enable static export when NEXT_EXPORT=1 (e.g., GitHub Pages deployment).
  // Note: static export disables serverless API routes — use Vercel for Stripe checkout.
  ...(process.env.NEXT_EXPORT === '1' && { output: 'export' }),
};

module.exports = nextConfig;
