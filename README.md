# FSA Elite Performance

Official repository for FSAElitePerformance.com.
High-performance training, development, and elite optimization platform.

---

## Overview

FSA Elite Performance is a sales performance company under Fontenots Sales Association LLC, focused on increasing business revenue through sales training, systems, and talent development. This full-scale digital platform delivers advanced performance training, structured optimization programs, and professional development systems designed to elevate sales rep effectiveness and professional image.

This repository contains source code, assets, branding elements, and deployment configurations required to run and scale the application.

---

## Features

- AI-powered sales training and roleplay systems
- Real-time objection handling practice with scoring
- Professional branding and self-promotion tools
- Data-driven performance tracking
- Fully responsive web application
- Integrated member store for professional gear
- Optimized for fast deployment and scalability

---

## Tech Stack

- Frontend: React / Next.js (Pages Router)
- Backend: Node.js / Next.js API routes
- Styling: Global CSS / Custom UI
- Deployment: Vercel (recommended), static export support
- Version Control: Git + GitHub

---

## Responsible AI Contribution Guidance

- For repository-specific guidance on safe and effective use of GitHub Copilot coding agent, see:
  - `docs/copilot-coding-agent-responsible-use.md`
 - For repository consolidation execution guidance, see:
   - `docs/platform-consolidation-plan.md`

---

## Project Structure

```text
pages/            # Next.js page routes
pages/api/        # Serverless API routes (Stripe, OpenAI, auth)
components/       # Reusable React components
lib/              # Shared utilities (auth, membership, AI, bot-protection)
styles/           # Global CSS
public/           # Static assets (favicons, logos, OG images)
middleware.ts     # Edge middleware (membership gating, BotID)
next.config.js    # Next.js configuration
.env.example      # Environment variable documentation
```

---

## Branding and Assets

Official FSA Elite Performance visual assets are stored in:

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
# Edit .env.local and fill in your Stripe, OpenAI, and Firebase credentials

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

Build commands:

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

- `DEPLOYMENT.md` includes required env vars by environment, domain cutover steps, and one-click reliability checks.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```env
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_BASE_URL=
OPENAI_API_KEY=
STRIPE_TRAINING_PRICE_ID=
MEMBERSHIP_SIGNING_SECRET=
```

See `.env.example` for the full list of available variables and inline documentation.

### AI Roleplay Setup

- Obtain an OpenAI API key at: <https://platform.openai.com/account/api-keys>
- Add the key to `.env.local` as `OPENAI_API_KEY=` (do NOT commit this file).
- The server API route `pages/api/ai-chat.ts` reads `process.env.OPENAI_API_KEY` and will return an error if unset.

### Security & key rotation

- If an API key is exposed, revoke it immediately in the OpenAI dashboard and create a new one.
- Avoid committing keys. To remove a leaked key from git history, use `git-filter-repo` or the BFG (force-push required).
- `.env.local` is already in `.gitignore`. Use platform secrets (Vercel / GitHub Actions) for production.

### Making the Roleplay Lab public

- The Roleplay UI (`pages/roleplay.tsx`) can be gated behind membership checks. The default branch currently has the Roleplay Lab open to all visitors; to re-enable gating, restore the client membership check that calls `/api/membership-status`.
- To toggle access, set `NEXT_PUBLIC_ROLEPLAY_PUBLIC=true` in `.env.local` (or leave unset/false to require membership).

### OpenAI prompt library integration

- You can configure a server-side Prompt Library ID to centrally manage the system prompt the AI uses.
- Add `OPENAI_PROMPT_ID=pmpt_...` to `.env.local` to enable. When set, `/api/ai-chat` will call the Responses API with that prompt ID and pass the conversation as input. If unset, the API will use the local `SYSTEM_PROMPT` defined in `pages/api/ai-chat.ts`.

## CI / Safety

- A GitHub Action `secret-scan.yml` runs on PRs and pushes to `main` to detect common secret patterns (OpenAI keys, Stripe live keys, AWS credentials, private key blocks) and fail the check if found.
- A GitHub Action `link-check.yml` runs a static export and validates internal links using `linkinator` to prevent broken-link regressions.
- CodeQL analysis runs on pushes to `main` and weekly on a schedule.

## Access Control

- Membership activation now happens server-side after Stripe checkout success.
- `pages/api/activate-membership.ts` verifies the Stripe Checkout Session and issues a signed HttpOnly membership cookie.
- `pages/api/membership-status.ts` lets the client determine whether member access is active.
- `middleware.ts` protects `/roleplay` and `/store` on runtime deployments.
- Static export builds still render pages, but runtime-only protections depend on Vercel or another Next.js server deployment.

---

## Vision

FSA Elite Performance is built to become a premier digital ecosystem for sales training excellence, revenue growth, and professional development — empowering sales professionals to reach elite performance levels through cutting-edge training systems and talent development.

---

## Espanol

### Descripcion General

FSA Elite Performance es una empresa de rendimiento en ventas bajo Fontenots Sales Association LLC, enfocada en aumentar los ingresos empresariales a través de capacitación en ventas, sistemas y desarrollo de talento. Esta plataforma digital ofrece entrenamiento avanzado de rendimiento, desarrollo profesional y sistemas de optimización estructurados diseñados para elevar la efectividad de los representantes de ventas y su imagen profesional.

Este repositorio contiene el codigo fuente, recursos visuales y configuraciones necesarias para ejecutar y escalar la aplicacion.

### Funcionalidades

- Sistemas de entrenamiento en ventas impulsados por IA
- Práctica de manejo de objeciones en tiempo real con puntuación
- Herramientas de marca profesional y autopromoción
- Seguimiento de rendimiento basado en datos
- Aplicacion web totalmente adaptable
- Tienda de miembros integrada para equipo profesional
- Alto rendimiento y escalabilidad

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

FSA Elite Performance esta disenado para convertirse en una plataforma lider en excelencia en capacitación de ventas, crecimiento de ingresos y desarrollo profesional — empoderando a los profesionales de ventas para alcanzar niveles de rendimiento elite a través de sistemas de entrenamiento de vanguardia y desarrollo de talento.

---

## License

MIT License

---

## Contribution

Pull requests are welcome. For major changes, open an issue first to discuss the proposal.

---

## Live Site

<https://fsaeliteperformance.com>
