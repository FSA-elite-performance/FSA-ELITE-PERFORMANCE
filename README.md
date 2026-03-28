# FSA Elite 🔥 Sales Performance Training

> **Sales training. Closer mindset. Real growth.**
> Built for hungry salespeople who want to level up and win.

FSA Elite is built for salespeople who want more — more confidence, more skill, more production, and more results. From training to branding, FSA Elite helps closers level up their mindset, master the process, and stand out in a competitive world.

Whether you're on the showroom floor, behind a phone, or building your own book of business — FSA Elite gives you the tools, the training, and the mindset to dominate.

---

## What's Inside

| Feature | Status |
|---|---|
| Next.js checkout scaffold (Stripe) | ✅ Ready |
| Polished landing page | ✅ Ready |
| Serverless API route (`/api/create-checkout-session`) | ✅ Ready |
| GitHub Pages static fallback | ✅ Ready |
| Mobile/Expo next steps | 📋 Documented |

---

## 🚀 Fastest Way to Start Earning

1. **Clone & install**
   ```bash
   git clone https://github.com/fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING.git
   cd FSA-ELITE-SALES-TRAINING/next-app
   npm install
   ```

2. **Set up your environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and fill in your Stripe keys and base URL
   ```

3. **Run locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

5. **Export static (GitHub Pages fallback)**
   ```bash
   # In next-app/next.config.js, uncomment: output: 'export'
   npm run build
   # Static output in /out — deploy to any static host
   ```

---

## 🔑 Required Environment Variables

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Your Stripe secret key (starts with `sk_`) — **never commit this** |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (starts with `pk_`) |
| `NEXT_PUBLIC_BASE_URL` | Base URL of your deployed site (e.g. `https://fsaelite.vercel.app`) |
| `PRICE_AMOUNT_CENTS` | Price in cents (e.g. `9700` for $97.00) |

Set these in your **Vercel dashboard** under Project → Settings → Environment Variables, or in GitHub Secrets for CI.

For local testing:
```bash
cp next-app/.env.example next-app/.env.local
# Fill in test keys from https://dashboard.stripe.com/test/apikeys
```

---

## 💳 Stripe Setup

1. Create a free account at [stripe.com](https://stripe.com)
2. Go to **Developers → API Keys** and copy your **test** keys
3. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env.local`
4. To test checkout, use test card **4242 4242 4242 4242**, any future expiry, any CVC
5. When ready for production, swap to **live keys** from the Stripe dashboard

**Webhook setup (recommended for verifying payments server-side):**
1. In Stripe Dashboard → Developers → Webhooks → Add endpoint
2. Point to `https://your-domain.com/api/stripe-webhook`
3. Listen for `checkout.session.completed` event
4. Store confirmed purchases in your database (Supabase/Firebase)

---

## ☁️ Deploying to Vercel (Recommended)

Vercel is the **recommended deployment platform** for FSA Elite because it natively supports Next.js serverless API routes (required for Stripe Checkout).

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Set the **root directory** to `next-app`
4. Add all environment variables in the Vercel dashboard
5. Deploy — your API routes will work automatically

> ⚠️ **GitHub Pages is static-only** and cannot run serverless API routes. Stripe Checkout will NOT work on GitHub Pages. Use Vercel or a similar platform for production.

---

## 📱 Mobile / Expo Next Steps

FSA Elite's API routes are designed to be reused by a future mobile app:

1. **Create an Expo app** in a new `mobile/` directory
2. **Reuse the same Next.js API routes** — just point `NEXT_PUBLIC_BASE_URL` to your deployed Vercel URL
3. **Open a WebView** to the Stripe checkout URL returned by `/api/create-checkout-session`
4. **Handle deep links** for success/cancel redirects back into the app
5. **Share auth** via Supabase or Firebase between web and mobile

---

## 📋 Development Checklist / Next Steps

- [x] Next.js checkout scaffold with Stripe
- [x] Polished landing page
- [x] GitHub Actions workflow (static export)
- [ ] (A) Set up Stripe product and live keys
- [ ] (B) Add Stripe webhook and verify payments server-side
- [ ] (C) Integrate Supabase/Firebase for user accounts and purchase records
- [ ] (D) Create Expo mobile app and reuse API routes
- [ ] (E) Move to production keys and configure custom domain
- [ ] (F) Add training modules, objection-handling AI, and certifications

---

## 📁 Project Structure

```
FSA-ELITE-SALES-TRAINING/
├── index.html                          # Static landing page (GitHub Pages fallback)
├── README.md                           # This file
├── .gitignore
├── next-app/                           # Next.js application
│   ├── package.json
│   ├── next.config.js
│   ├── .env.example                    # Copy to .env.local for local dev
│   ├── pages/
│   │   ├── index.tsx                   # Landing/checkout page
│   │   ├── success.tsx                 # Post-payment success page
│   │   ├── cancel.tsx                  # Cancelled checkout page
│   │   └── api/
│   │       └── create-checkout-session.ts  # Stripe serverless API route
│   ├── styles/
│   │   └── globals.css
│   └── public/
│       ├── wallpaper.jpg
│       ├── favicon.png
│       └── og-image.png
└── .github/
    └── workflows/
        └── pages-deploy.yml            # GitHub Actions: static export to Pages
```

---

## ⚡ About FSA Elite

Founded by **Kaygun Fontenoti** — 25-time consecutive Sales of the Month at 23 years old. FSA Elite exists for the closers who refuse to settle, the salespeople who study the game, and the producers who want systems, mindset, and real results.

*"No more will we let the customer run the show."* — FSA Elite

---

*Built with Next.js · Powered by Stripe · Deploy on Vercel*
