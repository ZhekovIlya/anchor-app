---
name: ship-task
description: Squash-merge the current task branch into main, push (which deploys to Vercel) and clean up. Only for when the user has reviewed the branch and said to merge, deploy or ship.
disable-model-invocation: true
argument-hint: "[commit title]"
---

# Ship the current task branch

Pushing `main` deploys the app to the learner's phone. This runs only on the user's explicit command,
and stops at the first thing that is not as expected.

Commit title, if the user gave one: $ARGUMENTS

## Preconditions — check all, stop and report if any fails

1. `git branch --show-current` is a `task/…` (or `feature/…`) branch, not `main`.
2. `git status --short` is clean apart from files the user has said to leave untracked
   (`workbook/` is a separate project). Uncommitted work on the branch: ask before committing it.
3. `npm test` and `npm run build` pass on the branch.
4. `AGENTS_LOG.md` has an entry for this branch.

## Steps

Run one at a time and read each result (PowerShell 5.1 has no `&&`).

1. `git fetch origin`
2. `git checkout main`
3. `git pull --ff-only origin main` — if this is not a fast-forward, stop: `main` moved and the user
   must decide how to reconcile.
4. `git merge --squash <branch>` — on conflicts, stop and show them; do not resolve by taking one side
   wholesale.
5. Write one commit: a conventional title (`feat: …`, `fix: …`) and a body that lists what changed,
   grouped, in plain language. End with the attribution line the session specifies, if any.
6. `npm test` and `npm run build` again, on `main`. If either fails, do not push: `git reset --hard
   origin/main` would discard the squash — ask the user first.
7. `git push origin main`
8. Delete the branch: `git branch -D <branch>`; if it exists on the remote, `git push origin --delete <branch>`.
9. In `AGENTS_LOG.md`, mark the entry as merged with the commit hash (commit that change with a
   `docs:` message and push it, or include it before step 5).

## After the push

Vercel builds `main` automatically. Tell the user:

- the commit hash — it also appears in the page footer once the deploy is live, which is how to
  confirm the phone has the new version;
- anything that needs action outside the repo (new environment variables, `npm run telegram:setup`
  after a webhook change, the smoke test in `docs/telegram-bot/SETUP.md` §9);
- that an installed PWA picks the update up on its next online launch.

Never force-push `main`, never rewrite published history, never run the `vercel` CLI.
