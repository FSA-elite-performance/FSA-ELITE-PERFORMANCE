# Vercel Deployment Runbook

Use this runbook to keep deployment one-click and avoid broken checkout redirects.

## One-Project Rule

- Keep a single Vercel project connected to this repository and `next-app` as root directory.
- Do not split runtime traffic across multiple projects for the same production domain.

## Required Vercel Environment Variables

Set the following in Vercel Project Settings -> Environment Variables.

### Required in Production, Preview, and Development

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `OPENAI_API_KEY`

### Required in Production (recommended in Preview/Development)

- `NEXT_PUBLIC_BASE_URL`

### Optional but recommended in all environments

- `OPENAI_PROJECT_ID`
- `OLIVE_ASSISTANT_NAME`
- `STRIPE_TRAINING_PRICE_ID`
- `MEMBERSHIP_SIGNING_SECRET`
- `BOTID_EXTRA_ALLOWED_HOSTS`
- `BOTID_ALLOWED_VERIFIED_BOT_NAMES`
- `BOTID_ALLOWED_VERIFIED_BOT_CATEGORIES`

## Environment Value Plan

Use these values exactly while migrating domains.

### Production

- `NEXT_PUBLIC_BASE_URL=https://v0-elite-performance-academy-8fns.vercel.app`
- After domain cutover: `NEXT_PUBLIC_BASE_URL=https://fsaeliteperformance.com`
- `BOTID_EXTRA_ALLOWED_HOSTS=fsaeliteperformance.com,store.fsaeliteperformance.com,v0-elite-performance-academy-8fns.vercel.app,fsaelite.org`

### Preview

- Leave `NEXT_PUBLIC_BASE_URL` unset, or set to a stable preview domain if required.
- Keep required secrets present so API routes work in previews.

### Development

- `NEXT_PUBLIC_BASE_URL=http://localhost:3000` for local runs.
- Keep required secrets present for full checkout/AI testing.

## OLIVE OpenAI Project

- Set `OPENAI_PROJECT_ID=proj_giuCPJ5mn3eEL5zqHUVWTgTV` to bind OLIVE requests to the FSA OpenAI project.
- Leave `OLIVE_ASSISTANT_NAME=OLIVE` unless you want the assistant name changed in AI prompt context.

## Domain Cutover Plan (No Broken Redirects)

1. Verify production is healthy on Vercel domain:
   - `https://v0-elite-performance-academy-8fns.vercel.app` (Project ID: `prj_TDkuFH0blw4uMSWmNGBC2MIILRK1`)
2. In Vercel Project Settings -> Domains, attach `fsaeliteperformance.com` to this same project.
3. Remove any external redirect from `fsaeliteperformance.com` to another Vercel app.
4. Confirm DNS points to Vercel for apex and `www` records.
5. Redeploy production after domain attachment.
6. Update `NEXT_PUBLIC_BASE_URL` to `https://fsaeliteperformance.com`.
7. Redeploy production again.
8. Smoke test:
   - `GET /api/create-checkout-session` should return `405` on direct browser GET (route exists and is protected by method).
   - Membership checkout from `/checkout-preview` should redirect to Stripe.
   - Merch checkout from `/store` should redirect to Stripe for active members.

## IONOS DNS Settings

Configure these records in your IONOS domain management panel for each domain.
Log in → Domains & SSL → click the domain → DNS → Manage DNS records.

### fsaeliteperformance.com → Vercel

| Type  | Host | Points to / Value               | TTL  |
|-------|------|---------------------------------|------|
| A     | @    | `76.76.21.21`                   | 3600 |
| CNAME | www  | `cname.vercel-dns.com`          | 3600 |

### store.fsaeliteperformance.com → Vercel (Store subdomain)

| Type  | Host  | Points to / Value               | TTL  |
|-------|-------|----------------------------------|------|
| CNAME | store | `cname.vercel-dns.com`           | 3600 |

> Add the subdomain `store.fsaeliteperformance.com` in **Vercel Project Settings → Domains** so
> Vercel provisions a TLS certificate and routes traffic to this project. The middleware will
> redirect visitors landing on the root of this subdomain to `/store`.

> Vercel may display an additional **TXT** verification record when you first add the domain in
> **Vercel Project Settings → Domains**. Copy the exact `Name` and `Value` from that screen and
> add a TXT record in IONOS with those values.

After adding the records, go to **Vercel Project Settings → Domains**, add `fsaeliteperformance.com`,
and Vercel will confirm propagation (usually within a few minutes; up to 48 hours for full propagation).

### fsaelite.org → GitHub Pages

| Type  | Host | Points to / Value                         | TTL  |
|-------|------|-------------------------------------------|------|
| A     | @    | `185.199.108.153`                         | 3600 |
| A     | @    | `185.199.109.153`                         | 3600 |
| A     | @    | `185.199.110.153`                         | 3600 |
| A     | @    | `185.199.111.153`                         | 3600 |
| AAAA  | @    | `2606:50c0:8000::153`                     | 3600 |
| AAAA  | @    | `2606:50c0:8001::153`                     | 3600 |
| AAAA  | @    | `2606:50c0:8002::153`                     | 3600 |
| AAAA  | @    | `2606:50c0:8003::153`                     | 3600 |
| CNAME | www  | `fsaeliteperformance-arch.github.io`      | 3600 |

After DNS propagates, go to **GitHub repository → Settings → Pages → Custom domain**,
enter `fsaelite.org`, and enable **Enforce HTTPS**.
The static export is deployed via the `pages-deploy.yml` workflow (manual `workflow_dispatch`).

## One-Click Reliability Checklist

1. Vercel project root directory is `next-app`.
2. Build command is `npm run build`.
3. Install command is `npm ci`.
4. Required env vars are set in all three environments.
5. Production domain is mapped to the same project that builds this repository.
6. IONOS DNS records are configured for both `fsaeliteperformance.com` (Vercel) and `fsaelite.org` (GitHub Pages) per the section above.
