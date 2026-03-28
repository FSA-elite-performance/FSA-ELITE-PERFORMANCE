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

## Fork Pull Request Reviews

Workflow runs triggered by a contributor's pull request from a fork require
manual approval from a maintainer with write access before any CI jobs execute.

**How it works:**

1. A fork PR triggers the `Fork PR Approval` workflow, which uses the
   `fork-pr-approval` GitHub environment.
2. The environment is configured with required reviewers, so the workflow
   pauses and waits for a maintainer to approve.
3. Workflow runs awaiting approval for more than 30 days are automatically
   deleted by GitHub.

**Approving a fork PR workflow run:**

1. Navigate to the pull request and click **Files changed**.
2. Inspect the proposed changes — pay special attention to modifications in
   `.github/workflows/` or any file that could affect CI behavior.
3. Return to the **Conversation** tab.
4. In the "workflow(s) awaiting approval" banner, click **Approve and run**.

> **Environment setup:** A repository owner must create a `fork-pr-approval`
> environment under **Settings → Environments** with at least one required
> reviewer. See `.github/workflows/fork-pr-approval.yml` for details.

## Automated Security Controls

This repository uses:

- Secret pattern scanning workflow
- CodeQL analysis workflow
- Dependabot updates for npm and GitHub Actions
- Fork PR approval gate (environment-based)
