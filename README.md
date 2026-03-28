# Vercel Sandbox

> Safely run untrusted or user-generated code in isolated Vercel sandboxes.

Vercel Sandbox is a compute primitive designed for dynamic, real-time workloads such as AI agents, code generation, developer experimentation, and interactive previews.

## What you can build

Use sandboxes to:

- Execute untrusted code safely without exposing production systems
- Build interactive tools such as code playgrounds and AI-powered UI builders
- Test user-submitted or agent-generated code in isolation with logs, file edits, and live previews
- Run development servers inside short-lived environments

## Using Vercel Sandbox

The recommended integration path is the **`@vercel/sandbox`** SDK for TypeScript. It gives you a programmatic interface to create sandboxes, run commands, and manage files.

The Sandbox CLI is also available for manual testing, agentic workflows, debugging, and one-off operations.

## Authentication

Vercel Sandbox supports two authentication methods:

1. **Vercel OIDC tokens (recommended)**  
   Vercel generates the OIDC token for your linked Vercel project. For local development, run `vercel link` and `vercel env pull` to get a development token. In production on Vercel, authentication is automatic.
2. **Access tokens**  
   Use access tokens when `VERCEL_OIDC_TOKEN` is unavailable, such as in external CI/CD systems or non-Vercel environments.

## System specifications

- Amazon Linux 2023
- Available runtimes: `node24`, `node22`, and `python3.13`
- Default runtime: `node24`
- User: `vercel-sandbox`
- Working directory: `/vercel/sandbox`
- `sudo` access is available inside each sandbox

## Core features

- **Isolation** — Each sandbox runs in a secure Firecracker microVM with its own filesystem and network.
- **Node.js and Python runtimes** — Choose the runtime you need and install packages or binaries as required.
- **Fast startup** — Sandboxes start in milliseconds, making them suitable for latency-sensitive workflows.
- **Snapshotting** — Save and resume sandbox state to avoid repeating dependency installation.
- **CLI and SDK** — Use either workflow depending on whether you need automation or manual control.

## Resources

- Quickstart
- Working with Sandbox
- Concepts
- SDK Reference
- CLI Reference
- Pricing
- Sandbox Repo

## Local development

All application code lives in `next-app/`.

```bash
cd next-app
npm ci
npm run dev
```

Open `http://localhost:3000` to view the site locally.

## Build validation

Validate both deployment paths from `next-app`:

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
    │   ├── index.tsx           # Vercel Sandbox landing page
    │   ├── roleplay.tsx        # Existing interactive sample page
    │   └── api/                # Example API routes
    └── styles/
        └── globals.css
```
