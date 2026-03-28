# Vercel CLI Overview Reference

This repository currently exposes a Vercel CLI overview reference on both the Next.js home page and the root `index.html` fallback page.

## Included reference topics

- Installing Vercel CLI with `pnpm i -g vercel`
- Updating the CLI with `pnpm i -g vercel@latest`
- Checking the installed version with `vercel --version`
- Authenticating in CI/CD with a Vercel token and the `--token` option
- Reviewing commonly used commands for aliases, API access, build, cache, certificates, curl, deploy, dev, DNS, domains, and environment variables

## Local development

All app code lives in `next-app/`.

```bash
cd next-app
npm ci
npm run dev
```

Open `http://localhost:3000` to view the Next.js version of the page locally.

## Build validation

Validate the Next.js app from `next-app/` with:

```bash
npm run build
NEXT_EXPORT=1 npm run build
```

There is no separate test script configured in `next-app/package.json`.

## Project structure

```text
FSA-ELITE-SALES-TRAINING/
├── README.md
├── index.html                  # Static fallback version of the Vercel CLI overview
└── next-app/
    ├── package.json
    ├── next.config.js
    ├── pages/
    │   ├── index.tsx           # Next.js Vercel CLI overview page
    │   ├── roleplay.tsx        # Sales training roleplay page
    │   └── api/                # API routes
    └── styles/
        └── globals.css
```
