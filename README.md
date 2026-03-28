# FSA Elite Performance

Official repository for FSAElitePerformance.com.
High-performance training, development, and elite optimization platform.

---

## Overview

FSA Elite Performance is a full-scale digital platform designed to deliver advanced performance training, athlete development systems, and structured optimization programs.

This repository contains source code, assets, branding elements, and deployment configurations required to run and scale the application.

---

## Features

- Elite performance training systems
- Data-driven athlete tracking
- Mental and physical optimization modules
- Fully responsive web application
- Integrated branding, logos, and UI assets
- Optimized for fast deployment and scalability

---

## Tech Stack

- Frontend: React / Next.js (Pages Router)
- Backend: Node.js / Next.js API routes
- Styling: Global CSS / Custom UI
- Deployment: Vercel (recommended), static export support
- Version Control: Git + GitHub

---

## Project Structure

```text
next-app/
  pages/
  pages/api/
  styles/
  lib/
  public/
  next.config.js
README.md
```

---

## Branding and Assets

Official FSA Elite Performance visual assets are stored in:

```text
next-app/public/
```

Use branding consistently across all pages and components.

---

## Installation and Setup

```bash
# Clone repository
git clone https://github.com/yourusername/fsa-elite-performance.git

# Navigate into project root
cd fsa-elite-performance

# Install dependencies
cd next-app
npm ci

# Configure environment
cp .env.example .env.local

# Run development server
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Deployment

This app is optimized for modern deployment platforms:

- Vercel (recommended)
- Static export hosting (with API limitations)
- Cloud hosting

Bot and abuse protection notes:

- On Vercel builds, BotID is enabled for high-risk API routes:
  - `/api/ai-chat` (basic check level)
  - `/api/create-checkout-session` (deep analysis check level)
- On `NEXT_EXPORT=1` static builds, BotID rewrites and API runtime protections are not active because static export does not run API routes.

Build commands (run from `next-app/`):

```bash
npm run build
NEXT_EXPORT=1 npm run build
```

GitHub Actions Vercel deployment:

- Workflows:
  - `.github/workflows/vercel-preview.yml`
  - `.github/workflows/vercel-production.yml`
- Required repository secrets:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`

Deployment runbook:

- `next-app/DEPLOYMENT.md` includes required env vars by environment, domain cutover steps, and one-click reliability checks.

---

## Environment Variables

Create `.env.local` in `next-app/` and include required values documented in `next-app/.env.example`:

```env
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_BASE_URL=
OPENAI_API_KEY=
STRIPE_TRAINING_PRICE_ID=
MEMBERSHIP_SIGNING_SECRET=

## AI Roleplay Setup

- Obtain an OpenAI API key at: https://platform.openai.com/account/api-keys
- Add the key to `next-app/.env.local` as `OPENAI_API_KEY=` (do NOT commit this file).
- The server API route `next-app/pages/api/ai-chat.ts` reads `process.env.OPENAI_API_KEY` and will return an error if unset.

Security & key rotation

- If an API key is exposed, revoke it immediately in the OpenAI dashboard and create a new one.
- Avoid committing keys. To remove a leaked key from git history, use `git-filter-repo` or the BFG (force-push required).
- Add `.env.local` to `.gitignore` (already included) and use platform secrets (Vercel/GH Actions) for production.

Making the Roleplay Lab public

- The Roleplay UI (`next-app/pages/roleplay.tsx`) can be gated behind membership checks. This repository's default branch currently has the Roleplay Lab open to all visitors; to re-enable gating, restore the client membership check that calls `/api/membership-status`.

If you want, I can add a small admin page to toggle public vs members-only access at runtime.
 
CI / Safety additions

- A GitHub Action `secret-scan.yml` runs on PRs and pushes to `main` to detect common secret patterns (including `sk-` OpenAI keys) and fail the check if found.
- A GitHub Action `link-check.yml` runs a static export and validates internal links using `linkinator` to prevent HTML-Proofer failures on deployment.

Local admin toggle

- To make the Roleplay Lab public or members-only, set `NEXT_PUBLIC_ROLEPLAY_PUBLIC=true` in `next-app/.env.local` (or leave unset/false to require membership).

OpenAI prompt library integration

- You can configure a server-side Prompt Library ID to centrally manage the system prompt the AI uses.
- Add `OPENAI_PROMPT_ID=pmpt_...` to `next-app/.env.local` to enable. When set, `/api/ai-chat` will call the Responses API with that prompt ID and pass the conversation as input. If unset, the API will use the local `SYSTEM_PROMPT` defined in `next-app/pages/api/ai-chat.ts`.
```

## Access Control

- Membership activation now happens server-side after Stripe checkout success.
- `next-app/pages/api/activate-membership.ts` verifies the Stripe Checkout Session and issues a signed HttpOnly membership cookie.
- `next-app/pages/api/membership-status.ts` lets the client determine whether member access is active.
- `next-app/middleware.ts` protects `/roleplay` and `/store` on runtime deployments.
- Static export builds still render pages, but runtime-only protections depend on Vercel or another Next.js server deployment.

---

## Vision

FSA Elite Performance is built to become a premier digital ecosystem for elite training, performance tracking, and next-level athlete development.

---

## Espanol

### Descripcion General

FSA Elite Performance es una plataforma digital disenada para ofrecer entrenamiento de alto rendimiento, desarrollo de atletas y sistemas avanzados de optimizacion.

Este repositorio contiene el codigo fuente, recursos visuales y configuraciones necesarias para ejecutar y escalar la aplicacion.

### Funcionalidades

- Sistemas de entrenamiento de elite
- Seguimiento de rendimiento basado en datos
- Optimizacion mental y fisica
- Aplicacion web totalmente adaptable
- Integracion completa de marca y diseno
- Alto rendimiento y escalabilidad

### Instalacion

```bash
git clone https://github.com/yourusername/fsa-elite-performance.git
cd fsa-elite-performance/next-app
npm ci
cp .env.example .env.local
npm run dev
```

### Despliegue

Compatible con:

- Vercel (recomendado)
- Static export hosting
- Servicios en la nube

### Vision (Espanol)

FSA Elite Performance esta disenado para convertirse en una plataforma lider en entrenamiento, rendimiento y desarrollo de atletas de alto nivel.

---

## License

MIT License

---

## Contribution

Pull requests are welcome. For major changes, open an issue first to discuss the proposal.

---

## Live Site

<https://fsaeliteperformance.com>
