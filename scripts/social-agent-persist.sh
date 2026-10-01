#!/usr/bin/env bash
set -euo pipefail

state_source="${1:?Pass the generated social state directory}"
worktree="${RUNNER_TEMP:-/tmp}/hgs-social-agent-ledger"
remote_branch="social-agent-ledger"

git fetch --no-tags origin "$remote_branch" >/dev/null 2>&1 || true
if git show-ref --verify --quiet "refs/remotes/origin/$remote_branch"; then
  git worktree add --detach "$worktree" "origin/$remote_branch" >/dev/null
else
  git worktree add --detach "$worktree" "$GITHUB_SHA" >/dev/null
  git -C "$worktree" switch --orphan "$remote_branch" >/dev/null
  git -C "$worktree" rm -rf . >/dev/null 2>&1 || true
fi

mkdir -p "$worktree/data/social-agent" "$worktree/assets"
cp -a "$state_source"/. "$worktree/data/social-agent/"
if [[ -d "$state_source/assets" ]]; then cp -a "$state_source/assets"/. "$worktree/assets/"; fi

git -C "$worktree" config user.name "github-actions[bot]"
git -C "$worktree" config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git -C "$worktree" add -A data/social-agent assets
if ! git -C "$worktree" diff --cached --quiet; then
  git -C "$worktree" commit -m "social-agent: record daily queue and publication audit"
  git -C "$worktree" push origin "HEAD:$remote_branch"
fi
git worktree remove --force "$worktree"
