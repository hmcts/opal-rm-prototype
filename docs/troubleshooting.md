# Troubleshooting

## `git clone` says permission denied

Check:

```bash
ssh -T git@github.com-hmcts
```

If it fails:

1. Confirm your public key was added to GitHub.
2. Confirm `~/.ssh/config` contains the `github.com-hmcts` host alias.
3. Confirm the repository access was granted to your GitHub account.

## `node` or `npm` is not recognised

Your terminal cannot find Node.js.

Fix:

1. Close and reopen the terminal.
2. Re-run your Node setup steps.
3. Check:

```bash
node --version
npm --version
```

## `npm install` fails

Try:

```bash
npm cache verify
npm install
```

If it still fails:

1. Make sure you are in the repository root.
2. Make sure your internet connection is stable.
3. Make sure you installed Node 24, not an older version.

## `npm run dev` starts but the browser page does not load

Check the terminal for the local URL and open it manually:

```text
http://localhost:3000
```

If it still does not load:

1. Stop the server with `Ctrl+C`.
2. Start it again with `npm run dev`.
3. Confirm nothing else is already using port `3000`.

## I am on the wrong branch

Check your branch:

```bash
git branch --show-current
```

Switch to the branch you want:

```bash
git checkout branch-name
```

## I changed files and want to keep them safe before switching branch

Commit them before switching:

```bash
git add .
git commit -m "wip: save current work"
```

If you do not want to commit yet, use `git stash` only if someone on your team has shown you how it works.

## The docs preview did not appear on my pull request

Check these points:

1. The PR must come from a branch in this repository, not a fork.
2. GitHub Pages must be enabled in `Settings` -> `Pages` using `Deploy from a branch`, with `gh-pages` and `/ (root)` selected.
3. The workflow run must be green in the `Actions` tab.
