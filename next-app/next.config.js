/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Set OUTPUT_EXPORT=1 (or NEXT_EXPORT=1) when building for GitHub Pages static export.
  // Vercel does NOT need this — it will use the serverless build automatically.
  // Static export disables API routes; use Vercel or another Node host for Stripe Checkout.
  ...(process.env.OUTPUT_EXPORT === '1' ? { output: 'export' } : {}),
  images: { unoptimized: true },
};

module.exports = nextConfig;
