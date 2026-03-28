# FSA Elite — Sales Training for Closers 🔥

> **Sales training. Closer mindset. Real growth.**  
> Built for hungry salespeople who want to level up and win.

FSA Elite is built for salespeople who want **more** — more confidence, more skill, more production,
and more results. From training to branding, FSA Elite helps closers level up their mindset, master
the process, and stand out in a competitive world.

Founded by **Kaygun Fontenot** — 25× consecutive Sales of the Month, 23 years old, car-industry
veteran, LLC registered — FSA Elite is the training program Kaygun always wished existed.

---

## ✅ Fastest Way to Start Earning (Right Now)

### 1. Create your Stripe product
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → **Products → Add product**
2. Name it **"FSA Elite — Early Access"**
3. Description: _"Full access to FSA Elite Sales Training: modules, AI roleplay, certifications, and closer mindset curriculum. Founding member rate — locked in for life."_
4. Pricing: **$97.00 one-time** (or choose your own; $47, $97, and $197 are proven conversion price points)
5. Click **Save product**
6. Copy your **Publishable key** and **Secret key** from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)

> 💡 To switch to a **monthly subscription** later, create a recurring Price in Stripe and update `STRIPE_PRICE_ID` in your env. The API route is already documented for this.

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ ([nodejs.org](https://nodejs.org))
- A Stripe account (free at [stripe.com](https://stripe.com))

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING.git
cd FSA-ELITE-SALES-TRAINING

# 2. Move into the Next.js app
cd next-app

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
#    Open .env.local and fill in your Stripe keys and base URL

# 5. Start the dev server
npm run dev
#    → http://localhost:3000
```

### Required Environment Variables

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Your Stripe **secret** key (`sk_live_...` or `sk_test_...` for testing) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe **publishable** key (`pk_live_...` or `pk_test_...`) |
| `NEXT_PUBLIC_BASE_URL` | Full URL of your deployment (e.g. `https://fsaeliteperformance.com` or `http://localhost:3000`) |
| `NODE_ENV` | `development` locally, `production` on Vercel/Pages |
| `OPENAI_API_KEY` | Your OpenAI API key — required for the AI sales roleplay feature (`sk-...`) |

See `next-app/.env.example` for a copy-paste template.

---

## 🤖 AI Sales Roleplay

FSA Elite includes a built-in AI roleplay trainer at `/roleplay`. It simulates a tough, skeptical car-buying customer powered by **OpenAI GPT-4o mini**, so you can practice:

- Handling live objections (price, payment, "I need to think about it", competitor comparisons)
- Building rapport and trust
- Guiding customers through the decision process without pressure

### Setup

1. Create an API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Add it to your environment:
   ```env
   OPENAI_API_KEY=sk-...
   ```
3. The roleplay is available at `/roleplay` when the app is running.

> **Note:** The roleplay route is a server-side API route and is not available in the static GitHub Pages export. It requires a Vercel (or similar) deployment with serverless functions.

### Coaching

During any roleplay session, type `/help` to pause the simulation and receive AI coaching feedback on your technique.

---

## 🌐 Domain Setup — IONOS + Dual-Domain Architecture

FSA Elite uses **two domains** with separate purposes:

| Domain | Purpose | Platform |
|---|---|---|
| **fsaeliteperformance.com** | Store — Stripe checkout & payments | Vercel |
| **fsaelite.org** | Training platform — courses & modules | Vercel (separate project) |

### Step 1 — Point Both Domains to Vercel in IONOS

1. Log in to your **IONOS account** at [my.ionos.com](https://my.ionos.com)
2. Go to **Domains & SSL → Manage Domains**
3. Click on **fsaeliteperformance.com** → **DNS**

Add the following DNS records for **fsaeliteperformance.com**:

| Type | Host | Points To | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

4. Repeat the same process for **fsaelite.org** — click that domain → **DNS** and add the same record values.

> **Note:** DNS changes can take up to 48 hours to propagate worldwide, though they often take effect within minutes.

### Step 2 — Add Custom Domains in Vercel

**For fsaeliteperformance.com (store):**
1. Go to [vercel.com](https://vercel.com) → your FSA Elite store project
2. Click **Settings → Domains**
3. Type `fsaeliteperformance.com` → **Add**
4. Type `www.fsaeliteperformance.com` → **Add**
5. Vercel will verify the DNS records automatically

**For fsaelite.org (training):**
1. Create a **separate Vercel project** for the training platform
2. Go to that project → **Settings → Domains**
3. Type `fsaelite.org` → **Add**
4. Type `www.fsaelite.org` → **Add**

### Step 3 — Set Environment Variables in Vercel

**Store project (fsaeliteperformance.com):**
- `NEXT_PUBLIC_BASE_URL` → `https://fsaeliteperformance.com`
- `STRIPE_SECRET_KEY` → your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → your Stripe publishable key

**Training project (fsaelite.org):**
- `NEXT_PUBLIC_BASE_URL` → `https://fsaelite.org`

### Verify the Connection

Once DNS has propagated:
- `https://fsaeliteperformance.com` → Stripe-powered store (checkout, payments)
- `https://www.fsaeliteperformance.com` → same (www redirect)
- `https://fsaelite.org` → training portal
- `https://www.fsaelite.org` → same (www redirect)

---

## 🚀 Deployment

### ⭐ Recommended: Vercel (supports serverless Stripe API)

Vercel is the **recommended deployment platform** because it natively supports the
`/api/create-checkout-session` serverless route that processes Stripe payments.

```bash
# Option A: Deploy via Vercel CLI
npm i -g vercel
cd next-app
vercel

# Option B: Connect via GitHub (easier)
# 1. Go to https://vercel.com/new
# 2. Import your GitHub repo
# 3. Set Root Directory to: next-app
# 4. Add environment variables (see table above)
# 5. Click Deploy
```

**Vercel Environment Variables** — add these in the Vercel dashboard under
Project → Settings → Environment Variables:

- `STRIPE_SECRET_KEY` → your secret key (mark as **Sensitive**)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → your publishable key
- `NEXT_PUBLIC_BASE_URL` → your production domain (e.g. `https://fsaeliteperformance.com`)

### Alternative: GitHub Pages (static only — no Stripe API)

GitHub Pages hosts **static files only** and does **not** support serverless functions.
The checkout CTA button will not work on Pages alone. Use this as a marketing/landing
page fallback and point the CTA to your Vercel URL.

The included `.github/workflows/pages-deploy.yml` will:
1. Build and export the Next.js app as static HTML
2. Upload the output to GitHub Pages automatically on every push to `main`

To enable GitHub Pages:
1. Go to your repo → **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Add `NEXT_PUBLIC_BASE_URL` as a GitHub repository variable (Settings → Variables)
4. Push to `main` — the workflow will deploy automatically

> **Note:** Uncomment `output: 'export'` in `next-app/next.config.js` for static export builds.

### Retrieve a deploy key (GitHub REST API)

Use the helper script below to fetch a specific deploy key from a repository:

```bash
export GITHUB_TOKEN=your_token_here
./scripts/get-deploy-key.sh <owner> <repo> <key_id>
```

For fine-grained personal access tokens, grant **repository Administration (read)** permission.

---

## 🔑 GitHub Deploy Keys via REST API

Use GitHub deploy keys when a server or CI host needs SSH access to a **single** repository.
GitHub stores the public key on the repo and your server keeps the private key.

### List deploy keys

- **Endpoint:** `GET /repos/{owner}/{repo}/keys`
- **Recommended header:** `Accept: application/vnd.github+json`
- **Token types supported:** GitHub App user access token, GitHub App installation token, or fine-grained personal access token
- **Required permission:** Repository **Administration** (read)
- **Query params:** `per_page` (default `30`, max `100`), `page` (default `1`)
- **Success status:** `200 OK`

```bash
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  https://api.github.com/repos/<OWNER>/<REPO>/keys
```

### Deploy key lifecycle notes

- If a deploy key was created with a **personal access token**, deleting that token also deletes the deploy key.
- If a deploy key was created with an **OAuth app token**, revoking the token also deletes the deploy key.
- If a deploy key was created with a **GitHub App** token, revoking/uninstalling the app token does **not** delete the deploy key.
- Regenerating a personal access token does **not** delete an existing deploy key.

---

## 🧪 Testing Stripe Checkout Locally

1. Use your **test keys** (`sk_test_...` / `pk_test_...`) in `.env.local`
2. Start dev server: `npm run dev`
3. Click "Get Early Access" on the homepage — you'll be redirected to Stripe Checkout
4. Use Stripe test card: `4242 4242 4242 4242` · any future date · any CVC
5. Check your Stripe Dashboard → Payments for the test charge

**Testing with a public URL (for webhooks later):**
```bash
npx ngrok http 3000
# Copy the https://... ngrok URL and set it as NEXT_PUBLIC_BASE_URL in .env.local
```

---

## 📁 Project Structure

```
FSA-ELITE-SALES-TRAINING/
├── index.html                          # Static landing page (GitHub Pages fallback)
├── README.md                           # This file
├── .gitignore                          # Node, Next, secrets ignored
├── .github/
│   └── workflows/
│       └── pages-deploy.yml            # GitHub Actions → GitHub Pages (static export)
└── next-app/                           # Next.js app (pages-based)
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── .env.example                    # Environment variable template
    ├── pages/
    │   ├── _app.tsx
    │   ├── _document.tsx
    │   ├── index.tsx                   # Homepage with Stripe Checkout CTA
    │   ├── success.tsx                 # Post-payment confirmation
    │   ├── cancel.tsx                  # Checkout cancelled
    │   └── api/
    │       └── create-checkout-session.ts  # Serverless Stripe API route
    ├── public/
    │   ├── favicon.ico
    │   └── og-image.png
    └── styles/
        └── globals.css
```

---

## 🔮 Next Steps & Roadmap

### Immediate (before production)
- [ ] Add Stripe **webhook endpoint** (`/api/webhook`) to verify payment completion and provision access
- [ ] Set up **Supabase** (or Firebase) for user authentication and records
- [ ] Add **analytics** (Vercel Analytics, Posthog, or Plausible)
- [ ] Write integration tests for the checkout API route

### Short-term
- [ ] Build out **training module viewer** (video + text lessons)
- [ ] **AI objection-handling roleplay** (OpenAI / Anthropic integration)
- [ ] **Certifications & badges** system after module completion
- [ ] **Sales calculators** (gross profit, close rate, income projections)

### Mobile
- [ ] Create **Expo (React Native)** app pointing to the same API endpoints
- [ ] Apple Developer account + Google Play account required for store submission
- [ ] Use Expo EAS Build for CI/CD

---

## 🔐 Security Notes

- **NEVER** commit `.env.local` or any real API keys to version control
- All Stripe keys must be set as environment variables (Vercel secrets or GitHub Secrets)
- The `STRIPE_SECRET_KEY` is server-side only — it never reaches the browser
- Firebase admin SDK JSON files are covered by `.gitignore` — do not commit them
- If a Firebase service-account key is ever exposed, revoke/rotate it in Google Cloud immediately and replace it outside the repo
- Private SSL/TLS `.key` files are covered by `.gitignore`

---

## 📬 Contact

- **Email:** support@fsaeliteperformance.com  
- **Web:** [fsaeliteperformance.com](https://fsaeliteperformance.com) · [fsaelite.org](https://fsaelite.org)

---

*FSA Elite Performance LLC — All rights reserved.*
