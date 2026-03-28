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

## Deploying to Vercel (recommended)

Vercel is the recommended deployment target because it supports the full feature set — including the Stripe Checkout API routes and the AI roleplay endpoint — unlike the GitHub Pages static export.

A `vercel.json` at the repository root pre-configures the build so **no Vercel dashboard tweaks are needed**:

```json
{
  "framework": "nextjs",
  "buildCommand": "cd next-app && npm run build",
  "installCommand": "cd next-app && npm ci",
  "outputDirectory": "next-app/.next",
  "devCommand": "cd next-app && npm run dev"
}
```

### One-time setup steps

1. Push this repository to GitHub (if you haven't already).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Leave **Root Directory** as the repository root — the `vercel.json` handles the `next-app/` subdirectory automatically.
4. Add the following environment variables in the Vercel project settings:

   | Variable | Description |
   |---|---|
   | `STRIPE_SECRET_KEY` | Your Stripe secret key |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key |
   | `NEXT_PUBLIC_BASE_URL` | Your production URL (e.g. `https://fsaeliteperformance.com`) |
   | `OPENAI_API_KEY` | Your OpenAI API key |

5. Click **Deploy**. Every subsequent push to `main` will trigger an automatic re-deploy.

### Pull Vercel env vars locally

After linking the project with `npx --yes vercel link`, sync Vercel's environment variables into `.env.local`:

```bash
cd next-app
npm run env:pull
```

## Deployment notes

- This repository includes a GitHub Pages workflow (`pages-deploy.yml`) for static-only deployments, but **API routes do not work on GitHub Pages**. Use Vercel for full functionality.
- Every push to `main` deploys automatically on Vercel once the project is linked.

## Environment variables

See `next-app/.env.example` for the full list of required variables.

## Thank you

Thank you.
