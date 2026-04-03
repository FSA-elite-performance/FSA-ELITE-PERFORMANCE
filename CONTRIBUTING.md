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

## Merging the FSA-ELITE Training Platform Repo

If you need to bring changes from a separate `FSA-ELITE` repository into this
store repo, use the helper script in `scripts/merge-fsaelite.sh`.  It
automates the full safe-merge workflow:

```bash
# Make the script executable (first time only)
chmod +x scripts/merge-fsaelite.sh

# Run the merge — replace the URL with the actual FSA-ELITE repo URL
./scripts/merge-fsaelite.sh https://github.com/YOUR-USERNAME/FSA-ELITE.git
```

The script will:

1. Create a timestamped backup branch from the current `HEAD` so you can
   roll back if anything goes wrong.
2. Return to `main`.
3. Add the FSA-ELITE repository as a temporary remote named `fsaelite`.
4. Fetch all its branches and tags.
5. Create (or reuse) a local branch named `merge-fsaelite` and merge
   `fsaelite/main` with `--allow-unrelated-histories`.
6. Remove the temporary remote to keep the local config clean.

After the script completes:

1. Resolve any merge conflicts in your editor.
2. Validate the build:
   ```bash
   npm ci
   npm run build
   NEXT_EXPORT=1 npm run build
   ```
3. Open a pull request from `merge-fsaelite` into `main`.

> **Manual steps** (if you prefer not to use the script):
> ```bash
> git checkout -b backup-before-merge
> git checkout main
> git remote add fsaelite https://github.com/YOUR-USERNAME/FSA-ELITE.git
> git fetch fsaelite
> git checkout -b merge-fsaelite
> git merge fsaelite/main --allow-unrelated-histories
> git remote remove fsaelite
> ```

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability reporting process and the
change checklist that every PR must satisfy before merging.
