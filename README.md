# Opal RM Prototype

This repository contains a GOV.UK Prototype Kit prototype for an `Opal RM` case creation journey.

It uses:

- [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/)
- [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/)
- [GOV.UK Prototype Components](https://govuk-prototype-components.x-govuk.org/)
- [MOJ Frontend](https://design-patterns.service.justice.gov.uk/)

## Who this guide is for

This README is written for business analysts and other non-developers who may be:

- setting up a Windows laptop or MacBook from scratch
- new to the terminal
- new to Git and GitHub
- using this repository for the first time

If that is you, follow the steps in order and do not skip the access or SSH setup sections.

## What this prototype does

The prototype demonstrates a multi-page flow for creating and reviewing a case, including:

- case type selection
- applicant and respondent details
- order and application details
- hearing details
- review and submission pages

Prototype data is stored in the session only. There is no database or persistent backend.

## Read this first

Before you install anything, make sure you have:

1. An HMCTS-managed laptop with permission to install software.
2. Access to GitHub and permission to the `hmcts/opal-rm-prototype` repository.
3. A stable internet connection. If HMCTS access requires VPN for your environment, connect first.
4. About 30 to 60 minutes for first-time setup.

Golden rules for beginners:

1. On Windows, use `Git Bash` for the commands in this README unless the guide explicitly says otherwise.
2. On Mac, use the built-in `Terminal` app.
3. Run one command at a time. Wait for it to finish before running the next one.
4. Keep the repository in a normal folder such as `Documents` or `Projects`. Do not use OneDrive, iCloud Drive, or a shared network drive.
5. If a command fails, stop and read the error. Do not keep typing random commands.

## Quick links

- Full documentation site source: [docs/](docs/)
- Windows setup guide: [docs/windows-setup.md](docs/windows-setup.md)
- Mac setup guide: [docs/macbook-setup.md](docs/macbook-setup.md)
- Git and GitHub basics: [docs/git-and-github.md](docs/git-and-github.md)
- Using Codex for prototyping: [docs/using-codex.md](docs/using-codex.md)
- Troubleshooting: [docs/troubleshooting.md](docs/troubleshooting.md)
- GitHub Pages publishing and preview rules: [docs/github-pages.md](docs/github-pages.md)

When GitHub Pages is enabled for this repository, the published documentation URLs are:

- Latest docs from `main`: `https://hmcts.github.io/opal-rm-prototype/latest/`
- Branch preview: `https://hmcts.github.io/opal-rm-prototype/branches/<branch-name>/`
- Pull request preview: `https://hmcts.github.io/opal-rm-prototype/pulls/pr-<number>/`

## Windows setup from scratch

These steps assume a brand new Windows laptop and no previous Git experience.

### 1. Install Visual Studio Code

1. Go to <https://code.visualstudio.com/>.
2. Download the Windows installer.
3. Install it using the default options.
4. Open VS Code once so Windows finishes registering it.

### 2. Install Git for Windows

1. Go to <https://git-scm.com/download/win>.
2. Download and run the installer.
3. During setup:
   - keep the default editor unless you want to choose VS Code
   - allow Git to be used from the command line
   - use the bundled OpenSSH
   - use the bundled OpenSSL library
4. When installation completes, open `Git Bash`.

Check Git is installed:

```bash
git --version
```

### 3. Set beginner-safe Git defaults

Run these commands in `Git Bash`:

```bash
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global core.autocrlf input
git config --global core.eol lf
git config --global user.name "Your Full Name"
git config --global user.email "your.name@justice.gov.uk"
```

What these settings do:

- `pull.ff only` stops Git from creating unexpected merge commits when you pull
- `core.autocrlf input` helps keep line endings safe for a shared repository
- `user.name` and `user.email` make your commits show your name in GitHub

### 4. Install Node.js 24

This repository deploys with Node 24, so use the same major version locally.

Recommended option for beginners on Windows:

1. Go to <https://github.com/coreybutler/nvm-windows/releases>.
2. Download the latest `nvm-setup.exe`.
3. Install it with default options.
4. Close and reopen `Git Bash`.

Install Node 24:

```bash
nvm install 24.0.0
nvm use 24.0.0
node --version
npm --version
```

If your organisation blocks `nvm-windows`, install Node 24 directly from <https://nodejs.org/> and then confirm:

```bash
node --version
npm --version
```

### 5. Create your SSH key for GitHub

This repository uses the SSH remote:

```text
git@github.com-hmcts:hmcts/opal-rm-prototype.git
```

Create an SSH key in `Git Bash`:

```bash
mkdir -p ~/.ssh
ssh-keygen -t ed25519 -C "your.name@justice.gov.uk" -f ~/.ssh/id_ed25519_hmcts
```

Press `Enter` when asked where to save the key. You may set a passphrase if your team policy requires it.

Create the SSH host alias used by HMCTS repositories:

```bash
cat <<'EOF' > ~/.ssh/config
Host github.com-hmcts
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_hmcts
  AddKeysToAgent yes
  IdentitiesOnly yes
EOF
```

Copy your public key:

```bash
cat ~/.ssh/id_ed25519_hmcts.pub | clip
```

Then:

1. Open GitHub in your browser.
2. Go to `Settings` -> `SSH and GPG keys`.
3. Choose `New SSH key`.
4. Paste the copied key.
5. Save it.

Test the connection:

```bash
ssh -T git@github.com-hmcts
```

The first time, type `yes` if Git asks whether you trust GitHub's host key.

## MacBook setup from scratch

These steps assume a brand new MacBook and no previous Git experience.

### 1. Install Xcode Command Line Tools

Open `Terminal` and run:

```bash
xcode-select --install
```

Follow the prompts until installation finishes.

### 2. Install Homebrew

In `Terminal`, run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After the installer finishes, run any command it tells you to add Homebrew to your shell profile.

Check it works:

```bash
brew --version
```

### 3. Install Git and Visual Studio Code

```bash
brew install git
brew install --cask visual-studio-code
```

Check Git:

```bash
git --version
```

### 4. Set beginner-safe Git defaults

```bash
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global core.autocrlf input
git config --global core.eol lf
git config --global user.name "Your Full Name"
git config --global user.email "your.name@justice.gov.uk"
```

### 5. Install Node.js 24 with nvm

Install `nvm`:

```bash
brew install nvm
mkdir -p ~/.nvm
```

Resolve the correct Homebrew path first. This works on both Apple Silicon and Intel Macs:

```bash
NVM_PREFIX="$(brew --prefix nvm)"
```

Add the following lines to your shell profile. Use `~/.zshrc` if you use zsh, which is the Mac default:

```bash
export NVM_DIR="$HOME/.nvm"
export NVM_PREFIX="$(brew --prefix nvm)"
[ -s "$NVM_PREFIX/nvm.sh" ] && \. "$NVM_PREFIX/nvm.sh"
[ -s "$NVM_PREFIX/etc/bash_completion.d/nvm" ] && \. "$NVM_PREFIX/etc/bash_completion.d/nvm"
```

Close and reopen Terminal, then install Node 24:

```bash
nvm install 24
nvm use 24
node --version
npm --version
```

### 6. Create your SSH key for GitHub

```bash
mkdir -p ~/.ssh
ssh-keygen -t ed25519 -C "your.name@justice.gov.uk" -f ~/.ssh/id_ed25519_hmcts
```

Create the HMCTS SSH alias:

```bash
cat <<'EOF' > ~/.ssh/config
Host github.com-hmcts
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_hmcts
  AddKeysToAgent yes
  IdentitiesOnly yes
EOF
```

Copy the public key:

```bash
pbcopy < ~/.ssh/id_ed25519_hmcts.pub
```

Then add it in GitHub under `Settings` -> `SSH and GPG keys`.

Test the connection:

```bash
ssh -T git@github.com-hmcts
```

## Clone the repository for the first time

Choose a folder where you want to keep your work. Example:

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone git@github.com-hmcts:hmcts/opal-rm-prototype.git
cd opal-rm-prototype
```

Check you are in the right place:

```bash
pwd
git status
```

If `git clone` fails with a permissions error, go straight to [docs/troubleshooting.md](docs/troubleshooting.md).

## Install dependencies and run the prototype

From the repository root:

```bash
npm install
npm run dev
```

When the prototype starts successfully, you should see output similar to this:

```text
Prototype listening on http://localhost:3000
```

Open:

```text
http://localhost:3000
```

Useful local URLs:

- prototype home: `http://localhost:3000`
- manage prototype page: `http://localhost:3000/manage-prototype`

To stop the local server, return to the terminal and press `Ctrl+C`.

## Safe daily Git workflow for beginners

If you only learn one workflow, learn this one.

### 1. Start from the latest `main`

```bash
git checkout main
git pull --ff-only origin main
```

### 2. Create your own branch

Use a simple branch name. Example:

```bash
git checkout -b docs/setup-guide
```

### 3. Make your changes

Edit files in VS Code.

### 4. Check what changed

```bash
git status
git diff
```

### 5. Stage your changes

Example:

```bash
git add README.md docs/
```

If you want to stage everything:

```bash
git add .
```

### 6. Commit your changes

```bash
git commit -m "docs: improve onboarding guide"
```

### 7. Push your branch to GitHub

The first push for a new branch:

```bash
git push -u origin docs/setup-guide
```

After that, the shorter command works:

```bash
git push
```

## Git commands you will use most

### See which branch you are on

```bash
git branch --show-current
```

### See what files changed

```bash
git status
```

### Switch to an existing branch

```bash
git checkout branch-name
```

### Create and switch to a new branch

```bash
git checkout -b new-branch-name
```

### Download latest branch list from GitHub

```bash
git fetch origin
```

### Get the latest `main`

```bash
git checkout main
git pull --ff-only origin main
```

### Throw away local changes in one file that you have not committed

```bash
git restore path/to/file
```

### Show your commit history

```bash
git log --oneline --decorate -10
```

### Push your current branch

```bash
git push
```

## How to raise a pull request

1. Push your branch.
2. Open the repository in GitHub.
3. GitHub usually shows a `Compare & pull request` button. Click it.
4. Write a clear title and short summary.
5. Submit the pull request.

If your pull request was raised from a branch inside this repository, the new documentation workflow will publish:

- a branch preview for the branch
- a pull request preview for the PR

The workflow also adds a comment on the pull request with the preview link.

## Using Codex for prototyping

If you are a business analyst or designer, the most useful way to use Codex in this repository is to ask for very specific prototype changes.

### Start Codex in this repository

Use Codex from the repository root so it can see the right files.

1. Open `Terminal` on Mac or `Git Bash` on Windows.
2. Move into the repository folder:

```bash
cd ~/Projects/opal-rm-prototype
```

3. Check you are in the right place:

```bash
pwd
git status
```

4. If this is your first time using Codex on this machine, sign in:

```bash
codex login
```

5. Start Codex:

```bash
codex
```

6. Paste a clear prompt describing the change you want.
7. Let Codex make the change.
8. Review the result with:

```bash
git status
git diff
```

9. Run the prototype and check the page in the browser:

```bash
npm run dev
```

If `codex` says the command is not found, stop and ask your team how Codex is installed on your HMCTS machine before continuing.

Good requests are:

- "Add a new page after the hearing details step that asks whether an interpreter is required."
- "Update the review page to show a warning inset text when no respondent email is provided."
- "Change the case type page to use GOV.UK radios instead of a select."
- "Add a back link and make the continue button text say Save and continue."

Tell Codex what kind of change you want, and if possible also say where it belongs:

- page templates live in `app/views/`
- route and flow logic lives in `app/routes.js`
- session defaults live in `app/data/session-data-defaults.js`
- small client-side behaviour lives in `app/assets/javascripts/application.js`
- small style tweaks live in `app/assets/sass/application.scss`

Repository-specific rules for Codex in this prototype:

- prefer GOV.UK and MOJ components rather than custom HTML
- prefer Nunjucks macros rather than handwritten component markup
- keep this as a prototype, not a production backend service
- do not ask Codex to add a database or API unless you genuinely need that for the prototype

Prompt examples you can copy:

```text
Add a new page in the prototype journey to capture interpreter needs. Use GOV.UK radios, save the answer in session data, and wire the page into app/routes.js.
```

```text
Improve the review page so it clearly shows the applicant address and respondent address in separate summary cards using GOV.UK summary list components.
```

```text
Refactor this prototype page to use GOV.UK Prototype Components and keep the copy easy for user research participants to understand.
```

```text
Explain which files I need to change if I want to add a new step between the current page and the review page.
```

If you are unsure, start with:

```text
Explain this repository to me as a business analyst. Tell me which files to change for page content, journey logic, and styling.
```

If you want one safe first prompt that both explains the repo and makes a small prototype change, use:

```text
I am a business analyst working in this GOV.UK prototype. First explain which files control page content, journey logic, and styling. Then make the smallest change needed to add a short hint text below the main heading on the current page.
```

## GitHub Pages documentation publishing

This repository now supports two separate publishing routes:

1. Azure App Service deployment for the prototype itself on `main`
2. GitHub Pages publishing for documentation

The documentation workflow is designed to publish more than just the merged `main` version:

- `latest/` is updated from `main`
- `branches/<branch-name>/` is updated on branch pushes
- `pulls/pr-<number>/` is updated on pull request changes

One-time repository setup for maintainers:

1. Open the repository in GitHub.
2. Go to `Settings` -> `Pages`.
3. Set the site to `Deploy from a branch`.
4. Choose the `gh-pages` branch and the `/ (root)` folder.
5. Save the setting.

Important note:

- pull requests raised from forks do not auto-publish previews, because the workflow is intentionally limited to branches inside this repository for safety

## Where to make changes in the prototype

- Views: `app/views/`
- Routes and journey logic: `app/routes.js`
- Default session data: `app/data/session-data-defaults.js`
- Filters: `app/filters.js`
- Front-end JavaScript: `app/assets/javascripts/application.js`
- Styles: `app/assets/sass/application.scss`

## Working principles

- Prefer GOV.UK Design System, GOV.UK Prototype Components, and MOJ Design System components.
- Use Nunjucks macros instead of handwritten component markup where possible.
- Check GOV.UK Prototype Components before creating custom prototype-only UI patterns.
- Keep changes lightweight and easy to iterate on.
- Treat this as a prototype, not a production service.

## Useful scripts

- `npm run dev` - run the prototype in development mode
- `npm run serve` - serve the prototype
- `npm start` - start the prototype

## If something goes wrong

Start with these checks:

```bash
git --version
node --version
npm --version
git status
```

Then use the troubleshooting guide:

- [docs/troubleshooting.md](docs/troubleshooting.md)

## Licence

See `LICENCE.txt`.
