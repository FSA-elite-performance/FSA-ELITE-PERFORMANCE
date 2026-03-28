# Security Policy

## Supported Versions

Security updates are applied to the `main` branch.

## Reporting a Vulnerability

Do not open a public issue for sensitive reports.

1. Email: `fsaeliteperformance@gmail.com`
2. Include reproduction steps, impact, and affected endpoints/pages.
3. If known, include mitigation guidance.

We will acknowledge receipt and prioritize triage based on severity.

## Security Checklist for Changes

Before merging:

- No secrets, API keys, or credentials are committed.
- New API routes validate request methods and inputs.
- Sensitive endpoints return generic error messages (no internals leaked).
- Environment variables are documented in `next-app/.env.example`.
- `npm run build` passes in `next-app/`.
- `NEXT_EXPORT=1 npm run build` also passes for static-export compatibility.
- New dependencies are reviewed and minimized.
- Any auth/payment/AI route changes include abuse protection checks.

## Automated Security Controls

This repository uses:

- Secret pattern scanning workflow
- CodeQL analysis workflow
- Dependabot updates for npm and GitHub Actions
