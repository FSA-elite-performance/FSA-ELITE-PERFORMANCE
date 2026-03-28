# Kubiks Next.js Starter

> A minimal Next.js starter demonstrating how to integrate and extend Kubiks in your own applications.

This repository has been updated to present the project as the **Kubiks Next.js Starter**. The intended flow is:

1. Clone the upstream starter from **`kubiks-inc/nextjs-starter-kubiks`**
2. Use the **`main`** branch as your starting point
3. Create your own private GitHub repository at **`fsaeliteperformance-arch/kubiks-next-js-starter`**
4. Keep that repository connected to deployment so **every push deploys automatically**

## Source and target repositories

- **Upstream starter:** `https://github.com/kubiks-inc/nextjs-starter-kubiks`
- **Recommended private repository:** `https://github.com/fsaeliteperformance-arch/kubiks-next-js-starter`
- **Branch:** `main`
- **Visibility:** `private`

## Local development

All app code lives in `next-app/`.

```bash
git clone https://github.com/kubiks-inc/nextjs-starter-kubiks.git
cd nextjs-starter-kubiks/next-app
npm ci
npm run dev
```

Open `http://localhost:3000` to view the starter locally.

## Build validation

The primary validation command for this repository is:

```bash
cd next-app
npm run build
```

There is no separate test script configured in `next-app/package.json`.

## Project structure

```text
FSA-ELITE-SALES-TRAINING/
├── README.md
├── index.html                  # Static fallback landing page
└── next-app/
    ├── package.json
    ├── next.config.js
    ├── pages/
    │   ├── index.tsx           # Starter landing page
    │   ├── roleplay.tsx        # Sample interactive page
    │   └── api/                # Example API routes
    └── styles/
        └── globals.css
```

## Deployment notes

- Create a Git repository after deploying so you can keep updating the project easily.
- Every push to that Git repository can be deployed automatically by your hosting provider.
- This repository already includes a GitHub Pages workflow and can also be deployed to platforms such as Vercel.

## Vercel CLI quick reference

Use the Vercel CLI to deploy, manage environments, inspect logs, and automate deployments in CI/CD.

### Install

```bash
pnpm i -g vercel
```

### Update

```bash
pnpm i -g vercel@latest
```

### Check version

```bash
vercel --version
```

### CI/CD authentication (non-interactive)

In local terminals, use `vercel login`. In CI/CD, generate a token from the Vercel dashboard and pass it with `--token`.

```bash
vercel pull --yes --environment=preview --token "$VERCEL_TOKEN"
```

### Common commands

- `vercel deploy --prod` — deploy project
- `vercel build --prod` — run a production build in CI
- `vercel dev --port 3000` — run local Vercel-like environment
- `vercel env ls` / `vercel env pull .env.local` — inspect and sync environment variables
- `vercel alias ls` / `vercel alias set [deployment-url] [custom-domain]` — manage aliases
- `vercel dns ls [domain]` / `vercel dns add [domain] [name] [type] [value]` — manage DNS
- `vercel domains ls` / `vercel domains add [domain] [project]` — manage domains
- `vercel certs ls` / `vercel certs issue [domain]` — manage TLS certificates
- `vercel cache purge` — purge CDN or data cache
- `vercel logs [deployment-url]` — inspect runtime logs
- `vercel api /v2/user` — authenticated API call from terminal

## Environment variables

See `next-app/.env.example` for the currently supported variables used by the sample app.

## Thank you

Thank you.
