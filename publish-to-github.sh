#!/usr/bin/env bash
set -euo pipefail

repository="${1:-JeffreySanford/angular-signals-map-join}"
visibility="${2:-public}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI is not installed: https://cli.github.com/" >&2
  exit 1
fi

gh auth status

if [ ! -d .git ]; then
  git init -b main
  git add .
  git commit -m 'Create Angular signals Map join example'
fi

gh repo create "$repository" "--$visibility" --source . --remote origin --push

echo "Published: https://github.com/$repository"
