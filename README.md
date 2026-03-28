# FSA Elite — Sales Performance Training

> **Built for the Elite Mindset.**

![FSA Elite Performance Training Logo](https://github.com/user-attachments/assets/1726c62d-8a94-429f-861e-8d1820e97832)

---

## What Is FSA Elite?

FSA Elite is sales performance training for closers who want **more** — more confidence, more skill, more production, and more results.

Built by **Kaygun Fontenot** — 23 years old, 25× Salesman of the Month in a row — FSA Elite blends practical training, AI-powered objection handling, and mobile-first design to make practice feel real and results feel earned.

> *"This isn't a course. It's a system. Built for the grind. Built for my son. Built for closers who refuse to be average."*
> — Kaygun Fontenot, Founder, Fontenot's Sales Association LLC

---

## Hero Copy

**Close More. Earn More. Train Smarter.**

FSA Elite is the sales performance platform designed for closers who aren't satisfied with average. Train anywhere. Sharpen your mindset. Master the process. Dominate your market.

- 🔥 AI-powered objection handling — real-world scenarios, real feedback
- 📱 Mobile-first — train on your phone between calls
- 🏆 Built by a top performer for top performers
- 💰 Results-driven — track your progress, own your growth

---

## AI Training Copy

Our AI objection trainer puts you in the seat. Real customer objections. Real-time coaching. No fluff — just reps that sharpen your edge.

Pick it up on any device. Practice, step away, come back sharper. The AI adapts to your weak spots and drills you until the objections stop landing.

**Train like it's real. Because it will be.**

---

## Founder Story

Kaygun Fontenot started selling at 20 years old and never stopped winning. By 23, he had stacked 25 consecutive Salesman of the Month titles and built a training philosophy that turns raw talent into elite production.

FSA Elite is the system he wishes he had when he started — and the one he is building for his son.

> *"I built this for closers who know they have more in them. Stop leaving money on the table."*

---

## Built for the Elite Mindset

FSA Elite is not for everyone. It's for the closer who:

- Shows up every day regardless of yesterday's results
- Knows the difference between excuses and outcomes
- Is always sharpening the blade, never resting on past wins
- Wants a system, not just motivation

If that's you — **welcome home.**

---

## Fastest Way to Start Earning

1. **Create a Stripe product** named `FSA Elite — Early Access` with a one-time price (recommended: **$19.99**).
2. Set your `STRIPE_SECRET_KEY` (test key for dev, live key for production).
3. Deploy `next-app/` to **Vercel** — it takes 2 minutes (see [Vercel Deployment](#vercel-deployment-recommended)).
4. Share your live URL and start collecting payments.

---

## Quick Start (Local Dev)

```bash
# 1. Clone the repo
git clone git@github.com:fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING.git
cd FSA-ELITE-SALES-TRAINING/next-app

# 2. Install dependencies
npm install

# 3. Copy env example and fill in your keys
cp .env.example .env.local
# Edit .env.local — set STRIPE_SECRET_KEY and NEXT_PUBLIC_BASE_URL

# 4. Start the dev server
npm run dev
# Open http://localhost:3000
```

Test the checkout with Stripe test card: **4242 4242 4242 4242** (any future expiry, any CVC).

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (test or live) | `sk_test_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |
| `NEXT_PUBLIC_BASE_URL` | Base URL of your deployment | `https://fsaelite.org` |
| `PRICE_AMOUNT_CENTS` | Price in cents (default 1999 = $19.99) | `1999` |

> ⚠️ **Never commit secret keys.** Use `.env.local` for local dev and Vercel/GitHub Secrets for production.

---

## Vercel Deployment (Recommended)

Vercel is the recommended host because it supports **serverless API routes** required for Stripe Checkout.

1. Go to [vercel.com](https://vercel.com) and import your GitHub repository.
2. Set **Root Directory** to `next-app`.
3. Add all environment variables in the Vercel dashboard:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_BASE_URL` (your Vercel domain, e.g. `https://fsa-elite.vercel.app`)
   - `PRICE_AMOUNT_CENTS`
4. Deploy. Vercel runs `npm run build` automatically.
5. Test checkout with Stripe test card `4242 4242 4242 4242`.
6. Switch to live Stripe keys when ready.

---

## GitHub Pages (Static Fallback)

A GitHub Actions workflow (`.github/workflows/pages-deploy.yml`) is included to export the Next.js app as static HTML to GitHub Pages.

> ⚠️ **Important:** GitHub Pages is static-only. The serverless API route at `/api/create-checkout-session` **will not work** on GitHub Pages. Use Vercel for the full checkout flow. GitHub Pages is included only as a static landing page fallback.

To enable GitHub Pages:
1. Go to **Settings → Pages** in your repository.
2. Set source to **GitHub Actions**.
3. Push to `main` to trigger the workflow.

---

## Mobile / Expo Next Steps

Once your web checkout is live:

1. Scaffold an Expo React Native app:
   ```bash
   npx create-expo-app fsa-elite-mobile
   cd fsa-elite-mobile
   ```
2. Point the mobile app to your production API endpoints (same `NEXT_PUBLIC_BASE_URL`).
3. Implement in-app purchases for Apple App Store (StoreKit) and Google Play.
4. Add user authentication (Supabase Auth recommended).
5. Prepare app store assets: icons (1024×1024), screenshots, privacy policy, terms.
6. Enroll in Apple Developer Program ($99/yr) and Google Play Console ($25 one-time).

---

## Branding

**Brand taglines:**
- *Built for the Elite Mindset*
- *Close More. Earn More. Train Smarter.*
- *Train like it's real. Because it will be.*
- *Stop leaving money on the table.*

**Brand colors:** Black `#000000` · Deep Navy `#071018` · Fire Red-Orange `#ff4b2b` · White `#ffffff`

**Logo:** Fontenot's Sales Association LLC — FSA Elite Performance Training

![FSA Elite Logo](https://github.com/user-attachments/assets/1726c62d-8a94-429f-861e-8d1820e97832)

---

## Post-Launch Checklist

- [ ] Configure Stripe webhook (`checkout.session.completed`) to record purchases server-side
- [ ] Integrate Supabase for user accounts, auth, and purchase records
- [ ] Build Expo mobile app consuming the same API endpoints
- [ ] Prepare App Store and Google Play Store assets and listings
- [ ] Add server-side session verification on the `/success` page
- [ ] Add email delivery (Resend or SendGrid) for receipts and onboarding

---

## ⚠️ DO NOT MERGE to main until Stripe webhook is configured to record purchases.

---

*Fontenot's Sales Association LLC — All rights reserved.*
