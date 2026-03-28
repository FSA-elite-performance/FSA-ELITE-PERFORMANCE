# Copilot Instructions for FSA Elite Sales Training

## Project Overview

FSA Elite is a Next.js sales-training platform for closers. It provides:
- A Stripe-powered training checkout (one-time $12.99 full course access)
- A separate Stripe-powered merch store with product-specific pricing
- An AI sales roleplay trainer that uses OpenAI GPT-4o-mini for objection-handling practice
- Planned training modules, certifications, and sales calculators

The Next.js app lives in the `next-app/` directory and uses the **pages router** (not App Router).

## Code Review Instructions

When performing a code review, ensure that no secrets, API keys, or credentials are hard-coded — all sensitive values must come from environment variables via `process.env`.

When performing a code review, verify that API routes in `next-app/pages/api/` validate request methods, sanitize inputs, and return appropriate HTTP status codes.

When performing a code review, confirm that new pages follow the existing pages router pattern using functional components with TypeScript — do not accept class components or App Router conventions.

When performing a code review, check that CSS changes use the existing design tokens (`var(--color-primary)`, `var(--color-bg)`, `var(--color-surface)`, etc.) defined in `next-app/styles/globals.css` rather than hard-coded color values.

When performing a code review, flag any use of the TypeScript `any` type and suggest a specific type or generic instead.

When performing a code review, verify that the static export path (`NEXT_EXPORT=1`) is not broken — pages must not import server-only modules at the top level, and API routes must not be referenced in statically exported pages.

## Coding Conventions

- Use **TypeScript** for all new files; avoid `any` types.
- Follow the existing **pages router** pattern — do not migrate to the App Router.
- API routes go in `next-app/pages/api/` and must use Next.js `NextApiRequest`/`NextApiResponse` types.
- Keep components and pages functional (no class components).
- Use `async/await` rather than promise chains or callbacks.
- Match the existing file naming style: lowercase with hyphens for pages (`/roleplay`), PascalCase for component files.

## Environment Variables & Secrets

- Never commit secrets, API keys, or credentials to the repository.
- Firebase service-account JSON files are blocked by `.gitignore`; never bypass this.
- Use `.env.example` to document required environment variables without real values.
- Required env vars include `STRIPE_SECRET_KEY`, `OPENAI_API_KEY`, and Stripe public keys — always read them from `process.env` at runtime.

## Tech Stack

- **Framework:** Next.js 15 (pages router), React 18, TypeScript 5
- **Payments:** Stripe (server-side API routes in `next-app/pages/api/`)
- **AI:** OpenAI SDK (`openai` npm package) — used for the `/roleplay` page
- **Styling:** Global CSS (`next-app/styles/`)
- **Deployment:** Vercel (recommended); GitHub Pages static export via `NEXT_EXPORT=1`

## Repository Structure

```
next-app/          # Next.js application (all code changes go here)
  pages/           # Next.js pages and API routes
  lib/             # Shared utility/library code
  public/          # Static assets
  styles/          # Global CSS
  next.config.js   # Conditional static export config
.github/
  workflows/       # CI workflows
  instructions/    # Path-specific Copilot review instructions
```

## Development Setup

Before making any changes, install dependencies from the `next-app/` directory:

```bash
cd next-app
npm ci            # Install exact dependency versions from package-lock.json
cp .env.example .env.local   # .env.example already exists; fill in your real values
```

Required environment variables (see `next-app/.env.example` for full list):
- `STRIPE_SECRET_KEY` — Stripe secret key (server-side only)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `NEXT_PUBLIC_BASE_URL` — App base URL (e.g. `http://localhost:3000` locally)
- `OPENAI_API_KEY` — OpenAI API key for the `/roleplay` page

## Build & Validation

All commands must be run from the `next-app/` directory.

**Standard (Vercel) build:**
```bash
cd next-app
npm run build     # Validates TypeScript, compiles pages and API routes
```

**Static export build (GitHub Pages):**
```bash
cd next-app
NEXT_EXPORT=1 npm run build   # Produces next-app/out/ for static hosting
```

Always run **both** build commands after making changes that affect routing, pages, API routes, or static generation — to confirm neither deployment path is broken. There is no separate test script — `npm run build` is the primary validation step.

**Local dev server:**
```bash
cd next-app
npm run dev       # Starts on http://localhost:3000
```

## Code Formatting

There is no automated formatter configured. Follow these conventions manually:
- Use 2-space indentation in TypeScript/TSX and CSS files.
- TypeScript strict mode is enforced by the compiler (`npm run build` will catch type errors).
- Keep import statements at the top of each file, grouped: React/Next → third-party → local.

## Dual-Domain Architecture

- `fsaeliteperformance.com` → Store (Stripe checkout)
- `fsaelite.org` → Training platform

Keep this separation in mind when adding new pages or routing logic.

## GitHub Actions / CI

- **copilot-setup-steps.yml** — Pre-installs Node.js dependencies in Copilot's ephemeral environment so it can build and validate changes immediately.
- **pages-deploy.yml** — Builds a static export (`NEXT_EXPORT=1`, no API routes) and deploys to GitHub Pages.
- **secret-scan.yml** — Scans for accidentally committed secrets.

Do not disable or weaken these workflows.

## Pull Request Guidelines

- Keep PRs focused and minimal — one logical change per PR.
- Run `npm run build` before opening a PR to confirm the build passes.
- Document any new environment variables in `.env.example`.
- Do not include build artifacts (`next-app/.next/`, `next-app/out/`) or `node_modules/` in commits.
