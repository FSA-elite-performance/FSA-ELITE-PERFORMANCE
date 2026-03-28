# Page Agent

> The GUI agent living in your webpage.

This repository now points developers to **[alibaba/page-agent](https://github.com/alibaba/page-agent)** instead of the previous starter-project placeholder content.

## Key links

- **GitHub repository:** `https://github.com/alibaba/page-agent`
- **Interactive demo:** `https://alibaba.github.io/page-agent/`
- **Documentation:** `https://alibaba.github.io/page-agent/docs/introduction/overview`
- **npm package:** `https://www.npmjs.com/package/page-agent`

## What Page Agent provides

- In-page JavaScript integration without requiring a browser extension, Python runtime, or headless browser
- Text-based DOM manipulation instead of screenshot-driven automation
- Bring-your-own-LLM support
- A human-in-the-loop UI for guided automation
- Optional Chrome extension support for multi-page tasks

## Typical use cases

- SaaS copilots embedded directly into existing products
- Smart form filling for repetitive ERP, CRM, and admin workflows
- Accessibility improvements through natural-language interaction
- Multi-page browser workflows with the optional extension

## Local development

All app code lives in `next-app/`.

```bash
cd next-app
npm ci
npm run dev
```

Open `http://localhost:3000` to view the local landing page.

## Build validation

The repository uses Next.js builds as its primary validation:

```bash
cd next-app
npm run build
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
    │   ├── index.tsx           # Page Agent landing page
    │   ├── roleplay.tsx        # Sample interactive page
    │   └── api/                # Example API routes
    └── styles/
        └── globals.css
```
