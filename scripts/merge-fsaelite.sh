#!/usr/bin/env bash
# merge-fsaelite.sh — Merge the FSA-ELITE training platform repo into this store repo.
#
# Usage:
#   ./scripts/merge-fsaelite.sh <fsaelite-repo-url>
#
# Example:
#   ./scripts/merge-fsaelite.sh https://github.com/YOUR-USERNAME/FSA-ELITE.git
#
# The script will:
#   1. Create a safety backup branch from the current HEAD.
#   2. Add the FSA-ELITE repo as a temporary remote named "fsaelite".
#   3. Fetch all branches and tags from that remote.
#   4. Create a merge branch and merge fsaelite/main with --allow-unrelated-histories.
#   5. Remove the temporary remote.
#
# After the script completes, resolve any merge conflicts, review the combined
# tree, then open a pull request from the merge branch into main.

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <fsaelite-repo-url>" >&2
  exit 1
fi

FSAELITE_URL="$1"
BACKUP_BRANCH="backup-before-merge-$(date +%Y%m%d%H%M%S)"
MERGE_BRANCH="merge-fsaelite"
REMOTE_NAME="fsaelite"

# ── 1. Safety backup ──────────────────────────────────────────────────────────
echo "==> Creating safety backup branch: ${BACKUP_BRANCH}"
git checkout -b "${BACKUP_BRANCH}"

# ── 2. Return to main ─────────────────────────────────────────────────────────
echo "==> Returning to main"
git checkout main

# ── 3. Add remote ─────────────────────────────────────────────────────────────
if git remote get-url "${REMOTE_NAME}" &>/dev/null; then
  echo "==> Remote '${REMOTE_NAME}' already exists — updating URL"
  git remote set-url "${REMOTE_NAME}" "${FSAELITE_URL}"
else
  echo "==> Adding remote '${REMOTE_NAME}': ${FSAELITE_URL}"
  git remote add "${REMOTE_NAME}" "${FSAELITE_URL}"
fi

# ── 4. Fetch ──────────────────────────────────────────────────────────────────
echo "==> Fetching from ${REMOTE_NAME}"
git fetch "${REMOTE_NAME}"

# ── 5. Create merge branch ────────────────────────────────────────────────────
echo "==> Creating merge branch: ${MERGE_BRANCH}"
if git show-ref --verify --quiet "refs/heads/${MERGE_BRANCH}"; then
  echo "    Branch '${MERGE_BRANCH}' already exists — checking it out"
  git checkout "${MERGE_BRANCH}"
else
  git checkout -b "${MERGE_BRANCH}"
fi

# ── 6. Merge with unrelated histories ────────────────────────────────────────
echo "==> Merging ${REMOTE_NAME}/main (--allow-unrelated-histories)"
if ! git merge "${REMOTE_NAME}/main" --allow-unrelated-histories; then
  echo ""
  echo "WARNING: The merge produced conflicts."
  echo "Resolve them, then run:"
  echo "  git add ."
  echo "  git commit"
  echo ""
fi

# ── 7. Remove temporary remote ───────────────────────────────────────────────
echo "==> Removing temporary remote '${REMOTE_NAME}'"
git remote remove "${REMOTE_NAME}"

echo ""
echo "Done. Branch '${MERGE_BRANCH}' is ready."
echo ""
echo "Next steps:"
echo "  1. Resolve any remaining merge conflicts (see 'git status')."
echo "  2. Run: npm ci && npm run build"
echo "  3. Run: NEXT_EXPORT=1 npm run build"
echo "  4. Open a pull request from '${MERGE_BRANCH}' into main."
