# FSA Elite Performance

Official repository for [fsaeliteperformance.com](https://fsaeliteperformance.com).
Sales-training and personal-branding SaaS for salespeople who want more — more confidence, more skill, more production, and more results.

---

## Overview

FSA ELITE (operated by Fontenots Sales Association LLC) is a premium digital platform that helps sales professionals sharpen their craft and build a stronger personal brand — from first contact to closed deal.

From training to branding, FSA ELITE gives every rep the tools they need to walk into every room ready:

- **AI Roleplay Lab** — pressure-test your pitch against 5 tough AI buyer personas with real-time scoring across 6 core sales skills
- **OLIVE AI Coach** — 24/7 sales coaching, objection-handling help, script feedback, and pitch analysis
- **Member Store** — 17+ premium branded products: business cards, closer gear, desk tools, and rep-branding essentials
- **Performance Dashboard** — track skill trends, session scores, and daily drills in one view

One-time $12.99 membership. No subscription. Lifetime access to everything — current and future.

This repository contains the full source code, assets, branding elements, and deployment configurations.

---

## Features

- AI-powered objection-handling roleplay with 5 buyer personas
- Real-time scoring across 6 sales skills: Frame Control, Discovery Depth, Objection Isolation, Value Building, Next-Step Close, and Composure
- OLIVE AI assistant available 24/7 for coaching, pitch feedback, and script help
- Member store with 17+ rep-branding products
- Performance dashboard with skill breakdown and daily drills
- Membership-gated access via Stripe + server-side activation
- Fully responsive — mobile-first for reps on the go
- Static-export compatible for GitHub Pages hosting

---

## Tech Stack

- Frontend: React / Next.js 15 (Pages Router)
- Backend: Node.js / Next.js API routes
- AI: OpenAI API (OLIVE assistant + Roleplay Lab)
- Payments: Stripe (one-time checkout + membership activation)
- Auth: Firebase + signed HttpOnly membership cookie
- Styling: Dark-first global CSS design system with CSS custom properties
- Deployment: Vercel (recommended), static export support
- Version Control: Git + GitHub

---

## Project Structure

```text
pages/          — Next.js pages (index, roleplay, store, welcome, checkout-preview, etc.)
pages/api/      — API routes (checkout, membership, AI chat, auth)
lib/            — Shared logic (OLIVE persona, roleplay intelligence, merch catalog, etc.)
components/     — Reusable UI (Sidebar, OliveWidget, AppLayout, ThemeToggle)
styles/         — Global CSS design system (dark theme, design tokens)
public/         — Static assets (logo, OG image, etc.)
next.config.js  — Next.js configuration with BotID and static-export toggle
README.md
```

---

## Branding and Assets

Official FSA ELITE visual assets are stored in:

```text
public/
```

Use branding consistently across all pages and components.

---

## Installation and Setup

```bash
# Clone repository
git clone https://github.com/FSA-elite-performance/FSA-ELITE-PERFORMANCE.git

# Navigate into project root
cd FSA-ELITE-PERFORMANCE

# Install dependencies
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

Build commands (run from the project root):

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

Create `.env.local` in the project root and include required values documented in `.env.example`:

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

FSA ELITE is built to become the go-to training and branding platform for sales professionals across every industry — a place where reps come to get sharper, look more credible, and close more.

More confidence. More skill. More production. More results.

---

## Espanol

### Descripcion General

FSA Elite Performance es una plataforma digital de entrenamiento en ventas y marca personal para profesionales de ventas que quieren más — más confianza, más habilidad, más producción y más resultados.

Este repositorio contiene el código fuente, recursos visuales y configuraciones necesarias para ejecutar y escalar la aplicación.

### Funcionalidades

- Roleplay de manejo de objeciones con IA y 5 tipos de compradores
- Puntuación en tiempo real sobre 6 habilidades de ventas clave
- Asistente de ventas IA disponible las 24 horas
- Tienda de productos de marca personal para representantes
- Panel de rendimiento con seguimiento de habilidades y ejercicios diarios
- Aplicación completamente responsiva, prioridad móvil
- Compatible con exportación estática

### Instalacion

```bash
git clone https://github.com/FSA-elite-performance/FSA-ELITE-PERFORMANCE.git
cd FSA-ELITE-PERFORMANCE
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

FSA ELITE está diseñado para convertirse en la plataforma líder de entrenamiento y branding para profesionales de ventas en todas las industrias.

---

## License

MIT License

---

## Contribution

Pull requests are welcome. For major changes, open an issue first to discuss the proposal.

---

## Live Site

<https://fsaeliteperformance.com>
