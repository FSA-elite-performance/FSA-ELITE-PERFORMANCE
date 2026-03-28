const { withBotId } = require('botid/next/config');
const { withWorkflow } = require('workflow/next');
const fs = require('node:fs');
const path = require('node:path');

const isStaticExport = process.env.NEXT_EXPORT === '1';

if (isStaticExport) {
  fs.rmSync(path.join(__dirname, 'app', '.well-known'), { recursive: true, force: true });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages: set NEXT_EXPORT=1 in the build environment.
  // For Vercel (recommended), leave NEXT_EXPORT unset — serverless functions work there.
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),

  // Disable image optimization for static export compatibility
  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_BOTID_ENABLED: isStaticExport ? '0' : '1',
  },
};

const configWithBotId = isStaticExport ? nextConfig : withBotId(nextConfig);

module.exports = isStaticExport ? configWithBotId : withWorkflow(configWithBotId);
