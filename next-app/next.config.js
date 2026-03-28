/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Enable static HTML export when NEXT_STATIC_EXPORT=true (used by the
  // GitHub Pages workflow). API routes are removed before that build because
  // they require a server runtime and are not supported in static exports.
  // For full functionality (Stripe checkout), deploy to Vercel or Render.
  ...(process.env.NEXT_STATIC_EXPORT === "true" ? { output: "export" } : {}),
};

module.exports = nextConfig;
