# FSA Elite 🔥 — Sales Performance Training

> **FSA Elite is built for salespeople who want more — more confidence, more skill, more production, and more results.**
> From training to branding, FSA Elite helps closers level up their mindset, master the process, and stand out in a competitive world.
>
> _Sales training. Closer mindset. Real growth._
> Built for hungry salespeople who want to level up and win.

---

## 🚀 What is FSA Elite?

FSA Elite is a next-generation sales performance training platform designed for closers in any industry — built by a closer. Whether you're on the showroom floor, on the phone, or anywhere deals get done, FSA Elite gives you the tools, mindset drills, and real-world objection-handling practice to dominate.

- 📱 Works on any device — phone, tablet, desktop
- 🤖 AI-powered objection handling (not just theory — real reps)
- 🏆 Modules, certifications, and progress tracking
- 💰 Built with Stripe checkout for seamless early-access enrollment

---

## ⚡ Fastest Way to Start Earning

1. **Clone the repo** and `cd next-app`
2. **Copy env file**: `cp .env.example .env.local`
3. **Add your Stripe test keys** to `.env.local`
4. **Run**: `npm install && npm run dev`
5. **Test checkout** at `http://localhost:3000` — use Stripe test card `4242 4242 4242 4242`
6. **Deploy to Vercel** (see below) — live in minutes

> 🔑 As soon as your Stripe product is live and keys are in Vercel, you can start collecting early-access payments.

---

## 🛠 Quick Start (Local Dev)

### Prerequisites
- Node.js 18+
- A [Stripe account](https://stripe.com) (free)
- A [Vercel account](https://vercel.com) (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING.git
cd FSA-ELITE-SALES-TRAINING/next-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Stripe keys (see below)

# 4. Start the development server
npm run dev
# Open http://localhost:3000
```

### Build & Export (Static)

```bash
npm run build    # Build for production
npm run start    # Start production server (requires Node host, e.g. Vercel)
```

---

## 🔑 Required Environment Variables

| Variable | Description | Where to Get It |
|---|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_test_` or `sk_live_`) | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (starts with `pk_`) | Same as above |
| `NEXT_PUBLIC_BASE_URL` | Your site's base URL | `http://localhost:3000` for local, your Vercel URL in prod |
| `PRICE_AMOUNT_CENTS` | Price in cents (e.g. `9700` = $97.00) | Set to your desired early-access price |

**Local setup:**
```bash
cp next-app/.env.example next-app/.env.local
# Then edit next-app/.env.local
```

**Vercel setup:**
1. Go to your [Vercel project dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings → Environment Variables**
3. Add each variable above
4. Re-deploy

**GitHub Actions / GitHub Pages:**
- If you use **GitHub Actions** for server-side workflows (tests, deployments to a backend, etc.), add `STRIPE_SECRET_KEY` and other secrets under **Settings → Secrets and variables → Actions**.
- **GitHub Pages deployments are static-only** (no API routes / server-side code). Do **not** configure `STRIPE_SECRET_KEY` or other private keys for Pages; at most, only public values like `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` should be used there if needed.

> ⚠️ **Never commit `.env.local` or any file containing real Stripe keys to git.**

---

## 💳 Stripe Setup

### 1. Create a Stripe Account
Sign up at [stripe.com](https://stripe.com) — free to start.

### 2. Get Your API Keys
- Go to **Dashboard → Developers → API Keys**
- Copy your **Publishable key** and **Secret key**
- For testing, use the `sk_test_...` and `pk_test_...` keys

### 3. Test the Checkout
Use Stripe's test card to verify your checkout flow:
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g. `12/29`)
- CVC: Any 3 digits (e.g. `123`)
- ZIP: Any (e.g. `90210`)

### 4. Set Up a Stripe Webhook (Recommended for Production)
To reliably confirm payments and provision access:
1. Go to **Dashboard → Developers → Webhooks → Add endpoint**
2. Set the endpoint URL to: `https://yourdomain.com/api/stripe-webhook`
3. Listen for event: `checkout.session.completed`
4. Copy the **Webhook signing secret** and save it as `STRIPE_WEBHOOK_SECRET`

> ⚠️ Do NOT grant access or record purchases based only on the success page redirect. Always verify payment via webhook.

---

## ▲ Deploy to Vercel (Recommended)

Vercel is the recommended host because it supports **Next.js serverless API routes** (required for Stripe Checkout). GitHub Pages is static-only and cannot run the `/api/create-checkout-session` route.

### Steps
1. Push your branch to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Set **Root Directory** to `next-app`
5. Add all environment variables (see table above)
6. Click **Deploy**

Your Stripe checkout will be live. Update `NEXT_PUBLIC_BASE_URL` to your Vercel URL.

---

## 📄 GitHub Pages (Static Fallback)

A GitHub Actions workflow (`.github/workflows/pages-deploy.yml`) is included to deploy a static export to GitHub Pages on every push to `main`.

> ⚠️ **Important:** GitHub Pages is static-only. The Stripe Checkout API route (`/api/create-checkout-session`) **will not work** on GitHub Pages. Use this only as a landing page or documentation fallback. For live payments, deploy to Vercel.

---

## 📱 Mobile / Expo Next Steps

The roadmap includes a React Native (Expo) mobile app that reuses the same Next.js API routes:

1. Create an Expo app (`npx create-expo-app fsa-elite-mobile`)
2. Point checkout calls to your Vercel-hosted API
3. Use Expo's WebBrowser to handle Stripe Checkout redirect
4. Add push notifications for training reminders and new modules

Coming soon — the API is already being built to support mobile from day one.

---

## 📁 Project Structure

```
FSA-ELITE-SALES-TRAINING/
├── index.html                    # Static landing page (GitHub Pages fallback)
├── README.md                     # This file
├── .gitignore
├── next-app/                     # Next.js application (deploy to Vercel)
│   ├── package.json
│   ├── next.config.js
│   ├── .env.example              # Copy to .env.local and fill in
│   ├── pages/
│   │   ├── index.tsx             # Landing / enrollment page
│   │   ├── success.tsx           # Post-payment success page
│   │   ├── cancel.tsx            # Cancelled checkout page
│   │   └── api/
│   │       └── create-checkout-session.ts  # Stripe serverless API
│   ├── styles/
│   │   └── globals.css
│   └── public/
│       ├── favicon.png
│       └── og-image.png
└── .github/
    └── workflows/
        └── pages-deploy.yml      # GitHub Actions → GitHub Pages (static only)
```

---

## 🗺 Next Steps (Roadmap)

- [ ] **A** — Set up Stripe product, add test keys, verify checkout end-to-end
- [ ] **B** — Add Stripe webhook endpoint; verify payments server-side before granting access
- [ ] **C** — Integrate Supabase or Firebase for user accounts and purchase records
- [ ] **D** — Build AI-powered objection-handling roleplay module (OpenAI API)
- [ ] **E** — Add training modules, progress tracking, certifications
- [ ] **F** — Create Expo mobile app and reuse API routes
- [ ] **G** — Move to Stripe live keys and configure custom domain
- [ ] **H** — Launch manager training program

---

## 🙌 Built By

**Kaygun Fontenoti** — 25-time Sales of the Month, 23-year-old entrepreneur, LLC founder, and car industry closer turned training platform builder. This is built to give every hungry salesperson the tools that took years to earn.

For support: [fsaeliteperformance.org](https://fsaeliteperformance.org)

