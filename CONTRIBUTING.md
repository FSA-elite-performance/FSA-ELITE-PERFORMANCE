# Contributing

Pull requests are welcome! For major changes, please open an issue first to
discuss what you would like to change.

## Getting Started

```bash
git clone https://github.com/<your-fork>/FSA-ELITE-PERFORMANCE.git
cd FSA-ELITE-PERFORMANCE
npm ci
cp .env.example .env.local   # fill in required values
npm run dev                   # http://localhost:3000
```

## Submitting a Pull Request

1. Fork the repository and create a feature branch from `main`.
2. Make your changes and verify they pass locally:
   ```bash
   npm run build
   NEXT_EXPORT=1 npm run build
   ```
3. Open a pull request against `main`.

### Fork PR Workflow Approval

Workflow runs triggered by pull requests from forks require manual approval
from a maintainer before CI jobs execute. After you open your PR:

- A maintainer will review the **Files changed** tab, paying special attention
  to any modifications in `.github/workflows/`.
- Once the maintainer is satisfied, they will approve the pending workflow
  run from the **Conversation** tab.
- Workflow runs awaiting approval for more than 30 days are automatically
  deleted by GitHub.

This is standard GitHub behavior for public fork contributions. You do not
need to take any extra action — just wait for a maintainer to review.

## Code Style

- TypeScript for all new code; avoid `any`.
- Functional components only (no class components).
- `async/await` instead of promise chains.
- 2-space indentation; lowercase-hyphenated page files, PascalCase components.
- Never commit secrets — use `process.env` and document new variables in
  `.env.example`.

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability reporting process and the
change checklist that every PR must satisfy before merging.
