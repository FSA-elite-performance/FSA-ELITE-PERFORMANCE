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

### Install the CLI

```bash
pnpm i -g vercel
```

### Update the CLI

```bash
pnpm i -g vercel@latest
```

### Check the installed version

```bash
vercel --version
```

### Use Vercel CLI in CI/CD

Interactive login (`vercel login`) is suitable for local terminals. For CI/CD, create a token from your Vercel account and pass it with `--token`:

```bash
vercel --token "$VERCEL_TOKEN"
```

### Common commands

- `vercel` / `vercel deploy` / `vercel deploy --prod`
- `vercel build` / `vercel build --prod`
- `vercel dev` / `vercel dev --port 3000`
- `vercel env ls`
- `vercel env add [name] [environment]`
- `vercel env update [name] [environment]`
- `vercel env rm [name] [environment]`
- `vercel env pull [file]`
- `vercel env run -- <command>`
- `vercel alias set [deployment-url] [custom-domain]`
- `vercel alias rm [custom-domain]`
- `vercel alias ls`
- `vercel dns ls [domain]`
- `vercel dns add [domain] [name] [type] [value]`
- `vercel dns rm [record-id]`
- `vercel domains ls`
- `vercel domains add [domain] [project]`
- `vercel domains rm [domain]`
- `vercel domains buy [domain]`
- `vercel certs ls`
- `vercel certs issue [domain]`
- `vercel certs rm [certificate-id]`
- `vercel api [endpoint]`
- `vercel bisect`
- `vercel blob list`
- `vercel cache purge`
- `vercel curl [path]`

## Environment variables

See `next-app/.env.example` for the currently supported variables used by the sample app.

## Thank you

Thank you.
