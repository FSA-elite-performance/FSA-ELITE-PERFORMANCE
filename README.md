# FSA Elite Performance

FSA Elite Performance is the market-facing sales performance brand operated by **Fontenot Sales Association LLC**.

**Business in one sentence:** FSA Elite Performance helps businesses increase revenue with trained sales talent, repeatable sales systems, and performance coaching — then turns the proven method into software.

---

## What This Repo Represents

This repository is the flagship codebase for the FSA Elite Performance product surface. It powers the public website, AI roleplay experience, membership checkout, member store, and supporting sales-performance messaging.

Today the product includes:

- AI roleplay training with buyer personas and performance scoring
- A performance-oriented member dashboard and training flow
- A merch and self-branding store for reps
- Stripe-powered self-serve solo access checkout
- The brand, SEO, and operating story for the broader sales performance business

---

## Business Ladder

FSA Elite Performance is being organized around one clear growth path:

1. **Revenue-first services**
   - Launch the flagship offer as consulting, training, and done-with-you sales optimization
   - Use real client work to create proof, case studies, scorecards, and SOPs
2. **Rep network leverage**
   - Recruit and manage reps under a clear leadership structure
   - Measure performance with standards, KPIs, coaching cadence, and accountability
3. **Software after validation**
   - Productize the proven method into software only after the process is measurable and repeatable

This repo supports phase 1 and the early software layer that documents the method.

---

## Flagship Offer

The initial flagship offer is a **90-Day Sales Performance Sprint** for small and mid-sized businesses.

Core promise:

- tighten the offer
- train the reps
- improve objection handling and follow-up
- install measurable KPI scorecards
- systemize what works for future automation

The goal is to win 3–5 paying or pilot clients quickly, build proof, and turn delivery into a repeatable operating system.

---

## Pricing Direction

The platform is moving toward a clear pricing ladder:

- **Solo Access** — self-serve entry for individual reps
- **Team Performance Plan** — recurring coaching and KPI support for managers and teams
- **Enterprise Revenue System** — custom rollout, recruiting structure, licensing, and deeper implementation

The current live checkout in this repo supports the self-serve solo plan. Team and enterprise plans are positioned as higher-touch sales engagements.

---

## Tech Stack

- **Framework:** Next.js 15 (Pages Router)
- **Language:** TypeScript
- **Frontend:** React
- **Backend:** Next.js API routes
- **Payments:** Stripe
- **AI:** OpenAI-compatible integration
- **Deployment:** Vercel, with static-export validation support

---

## Project Structure

The active app lives at the repository root.

```text
components/
lib/
pages/
public/
styles/
middleware.ts
next.config.js
package.json
README.md
```

> Note: `next-app/` is not the active application root for this repository.

---

## Installation

Run commands from the repository root:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Build Validation

Primary validation commands:

```bash
npm run build
NEXT_EXPORT=1 npm run build
```

Use both before shipping changes that affect pages, routing, or static-export behavior.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values.

Important runtime variables include:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_BASE_URL`
- `OPENAI_API_KEY`
- `MEMBERSHIP_SIGNING_SECRET`
- Firebase client and admin credentials if auth flows are enabled

Never commit secrets.

---

## Deployment

This project is designed for:

- **Vercel** for runtime features such as API routes, auth, and Stripe checkout
- **Static export validation** for compatibility checks and limited hosting scenarios

See:

- `DEPLOYMENT.md`
- `SECURITY.md`

---

## Live Brand Surface

- `https://fsaeliteperformance.com`

---

## License

MIT License
