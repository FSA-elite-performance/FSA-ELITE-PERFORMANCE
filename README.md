# FSA Elite Sales Training

> A Next.js sales-training platform for closers featuring Stripe-powered early access and AI roleplay practice.

This repository contains the FSA Elite sales-training app. The current product focus includes:

1. A **$97 early-access checkout** powered by Stripe
2. An **AI sales roleplay trainer** for objection-handling practice
3. A roadmap for **training modules, certifications, and calculators**

## Repository

- **GitHub repository:** `https://github.com/fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING`
- **Primary app directory:** `next-app/`
- **Framework:** Next.js 15 with the pages router

## Local development

All app code lives in `next-app/`.

```bash
git clone https://github.com/fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING.git
cd FSA-ELITE-SALES-TRAINING/next-app
npm ci
npm run dev
```

Open `http://localhost:3000` to view the app locally.

## Build validation

The primary validation command for this repository is:

```bash
cd next-app
npm run build
```

For the GitHub Pages export path, also validate:

```bash
cd next-app
NEXT_EXPORT=1 npm run build
```

There is no separate test script configured in `next-app/package.json`.

## Project structure

```text
FSA-ELITE-SALES-TRAINING/
├── README.md
├── index.html                  # Static fallback landing page
└── next-app/
    ├── package.json
    ├── next.config.js
    ├── pages/
    │   ├── index.tsx           # FSA Elite landing page
    │   ├── roleplay.tsx        # AI sales roleplay trainer
    │   └── api/                # Stripe and AI API routes
    └── styles/
        └── globals.css
```

## Environment variables

See `next-app/.env.example` for the currently supported variables, including:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_BASE_URL`
- `OPENAI_API_KEY`

## Notes

- The Next.js app uses the **pages router**, not the App Router.
- Keep secrets in environment variables and never commit real credentials.
- Do not commit build artifacts such as `next-app/.next/` or `next-app/out/`.
