# GitHub Pages publishing

This repository has two separate delivery paths:

1. Azure App Service deployment for the prototype application
2. GitHub Pages deployment for documentation

They are intentionally separate.

## What gets published

The documentation workflow publishes to three stable URL patterns:

- `latest/` for the current `main` branch documentation
- `branches/<branch-name>/` for branch previews
- `pulls/pr-<number>/` for pull request previews

Examples:

- `https://hmcts.github.io/opal-rm-prototype/latest/`
- `https://hmcts.github.io/opal-rm-prototype/branches/readme_update/`
- `https://hmcts.github.io/opal-rm-prototype/pulls/pr-123/`

## One-time GitHub setup

A maintainer must do this once:

1. Open the repository in GitHub.
2. Go to `Settings` -> `Pages`.
3. Choose `Deploy from a branch`.
4. Select the `gh-pages` branch.
5. Select the `/ (root)` folder.
6. Save the setting.

## Local preview for maintainers

If you want to preview the docs site locally before pushing:

```bash
python -m venv .venv
. .venv/bin/activate
python -m pip install -r docs/requirements.txt
mkdocs serve
```

Then open:

```text
http://127.0.0.1:8000
```

## Safety rule for pull requests

PR previews are only published when the PR branch lives inside this repository.

Fork pull requests are excluded on purpose so the publishing workflow does not grant write-capable deployment behavior to untrusted branches.

## Why this repository uses `gh-pages`

This repository uses a workflow that writes static files to the `gh-pages` branch.

That approach is intentional because it allows multiple versions of the documentation to coexist at the same time:

- `latest/`
- `branches/<branch-name>/`
- `pulls/pr-<number>/`

That is what makes branch and PR preview URLs possible without waiting for a merge to `main`.
