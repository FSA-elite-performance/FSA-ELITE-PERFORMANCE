#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <owner> <repo> <key_id>" >&2
  exit 1
fi

owner="$1"
repo="$2"
key_id="$3"
token="${GITHUB_TOKEN:-}"

if [[ -z "$token" ]]; then
  echo "GITHUB_TOKEN is required." >&2
  echo "For fine-grained PATs, grant repository Administration permission (read)." >&2
  exit 1
fi

curl --fail --silent --show-error \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${token}" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  "https://api.github.com/repos/${owner}/${repo}/keys/${key_id}"
