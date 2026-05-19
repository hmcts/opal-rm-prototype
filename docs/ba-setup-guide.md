# OPAL BA setup guide

<div class="ba-guide-hero">
  <p class="prototype-eyebrow">Goal 2 - Prototyping</p>
  <h2>Set up the OPAL RM prototype and make your first safe change</h2>
  <p class="prototype-lede">This is the step-by-step path for business analysts, VAs, designers, and delivery colleagues who need to run the clickable OPAL RM prototype, use Codex safely, and produce outputs that developers can turn into accessible production work.</p>
  <div class="prototype-actions">
    <a href="#choose-your-path">Choose your path</a>
    <a href="#first-prototype-change-with-codex">First Codex change</a>
    <a href="#done-checklist">Done checklist</a>
  </div>
</div>

## What you will be able to do

By the end of this guide you should be able to:

<div class="prototype-grid ba-guide-grid-three">
  <div class="prototype-card">
    <span class="prototype-step">1</span>
    <h3>Run the prototype</h3>
    <p>Clone <code>hmcts/opal-rm-prototype</code>, install dependencies, and open the prototype at <code>http://localhost:3000</code>.</p>
  </div>
  <div class="prototype-card">
    <span class="prototype-step">2</span>
    <h3>Use Codex safely</h3>
    <p>Start Codex from the repository root, ask it to plan first, then review the files it changes before committing anything.</p>
  </div>
  <div class="prototype-card">
    <span class="prototype-step">3</span>
    <h3>Package the evidence</h3>
    <p>Create UAT, accessibility, developer handoff, and decision notes so the prototype is useful beyond a clickable demo.</p>
  </div>
</div>

You do not need to know production coding, databases, backend APIs, or deployment engineering to follow this guide.

## Before you start

Make sure you have:

| Need | Why it matters |
| --- | --- |
| HMCTS-managed Windows laptop or MacBook | Do not use a personal laptop for HMCTS prototype work. |
| GitHub access | You need access to `hmcts/opal-rm-prototype`. |
| Permission to install tools | First-time setup needs Git, Node.js, and usually VS Code. |
| Stable internet connection | `npm install` downloads the Prototype Kit dependencies. |
| VPN if your environment needs it | Some HMCTS or MoJ resources may require VPN. |
| Around 30 to 60 minutes | First-time setup takes longer than daily use. |

Keep the repository in a normal working folder:

- Windows: `C:\Users\<your-name>\Projects`
- Mac: `~/Projects`

Do not keep the repository in OneDrive, iCloud Drive, or a shared network folder. Those tools can change files while Git is using them and make simple prototype work confusing.

## Choose your path

<div class="example-split">
  <div class="example-card ba-platform-card">
    <h3>Windows</h3>
    <p>Use <strong>Git Bash</strong> for the commands in this guide unless a step explicitly says PowerShell.</p>
    <p>Install VS Code, Git for Windows, Node.js 24, then set up SSH for GitHub.</p>
  </div>
  <div class="example-card ba-platform-card">
    <h3>Mac</h3>
    <p>Use the built-in <strong>Terminal</strong> app.</p>
    <p>Install Xcode Command Line Tools, Homebrew, Git, VS Code, Node.js 24 with <code>nvm</code>, then set up SSH for GitHub.</p>
  </div>
</div>

Both paths finish with the same success checks:

```bash
git --version
node --version
npm --version
ssh -T git@github.com-hmcts
npm run dev
```

## Windows setup step by step

Use `Git Bash` for these commands.

### 1. Install Visual Studio Code

1. Open <https://code.visualstudio.com/>.
2. Download the Windows installer.
3. Install it with the default options.
4. Open VS Code once so Windows finishes registering it.

### 2. Install Git for Windows

1. Open <https://git-scm.com/download/win>.
2. Download and run the installer.
3. Keep the default options unless your team tells you otherwise.
4. When installation finishes, open `Git Bash`.

Check Git:

```bash
git --version
```

Success looks like:

```text
git version 2.x.x
```

### 3. Set beginner-safe Git defaults

Run these commands in `Git Bash`.

Replace `Your Full Name` and `your.name@justice.gov.uk` with your own details:

```bash
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global core.autocrlf input
git config --global core.eol lf
git config --global user.name "Your Full Name"
git config --global user.email "your.name@justice.gov.uk"
```

These settings help Git behave predictably and keep line endings safe for a shared repository.

### 4. Install Node.js 24

This repository deploys with Node.js 24, so use Node.js 24 locally.

Recommended option for Windows:

1. Open <https://github.com/coreybutler/nvm-windows/releases>.
2. Download the latest `nvm-setup.exe`.
3. Install it with default options.
4. Close and reopen `Git Bash`.

Install and use Node.js 24:

```bash
nvm install 24.0.0
nvm use 24.0.0
node --version
npm --version
```

Success looks like:

```text
v24.0.0
```

The `npm` version can vary. Use the `npm` version that comes with Node.js 24.

If `nvm-windows` is blocked on your laptop, install Node.js 24 directly from <https://nodejs.org/> and then run:

```bash
node --version
npm --version
```

### 5. Create an SSH key for GitHub

This repository uses the HMCTS SSH alias:

```text
git@github.com-hmcts:hmcts/opal-rm-prototype.git
```

Create a key in `Git Bash`.

Replace the email address with your own:

```bash
mkdir -p ~/.ssh
ssh-keygen -t ed25519 -C "your.name@justice.gov.uk" -f ~/.ssh/id_ed25519_hmcts
```

Press `Enter` when asked where to save the key. Use a passphrase if your team policy requires it.

Add the HMCTS GitHub alias to your SSH config.

This command checks whether the alias already exists before adding it, so it is safe to copy and paste:

```bash
touch ~/.ssh/config
if grep -q "^Host github.com-hmcts$" ~/.ssh/config; then
  echo "github.com-hmcts is already in ~/.ssh/config"
else
  cat >> ~/.ssh/config <<'EOF'
Host github.com-hmcts
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_hmcts
  AddKeysToAgent yes
  IdentitiesOnly yes
EOF
fi
```

Success looks like either:

```text
github.com-hmcts is already in ~/.ssh/config
```

or no message, because the block was added.

Copy your public key:

```bash
cat ~/.ssh/id_ed25519_hmcts.pub | clip
```

Then add it in GitHub:

1. Open GitHub in your browser.
2. Go to `Settings` -> `SSH and GPG keys`.
3. Select `New SSH key`.
4. Paste the copied key.
5. Save it.

Test the connection:

```bash
ssh -T git@github.com-hmcts
```

The first time, type `yes` if Git asks whether you trust GitHub's host key.

Success looks like:

```text
Hi <your-github-username>! You've successfully authenticated, but GitHub does not provide shell access.
```

### 6. Clone and run the repository

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone git@github.com-hmcts:hmcts/opal-rm-prototype.git
cd opal-rm-prototype
npm install
npm run dev
```

When `npm run dev` succeeds, leave that terminal running and open:

```text
http://localhost:3000
```

You can also open the Prototype Kit manage page:

```text
http://localhost:3000/manage-prototype
```

Stop the local server with `Ctrl+C` in the terminal.

### Windows PowerShell note

The repository includes `start-local.ps1`, but first-time BAs should follow the `Git Bash` route above because it matches the rest of the setup and Git commands.

Use the PowerShell script only if your team specifically asks you to run it.

## Mac setup step by step

Use the built-in `Terminal` app for these commands.

### 1. Install Xcode Command Line Tools

```bash
xcode-select --install
```

Follow the prompts until installation finishes.

### 2. Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If Homebrew prints extra commands to add it to your shell profile, run those commands before continuing.

Check Homebrew:

```bash
brew --version
```

Success looks like:

```text
Homebrew 4.x.x
```

### 3. Install Git and VS Code

```bash
brew install git
brew install --cask visual-studio-code
git --version
```

Success looks like:

```text
git version 2.x.x
```

### 4. Install Node.js 24 with nvm

```bash
brew install nvm
mkdir -p ~/.nvm
```

Resolve the Homebrew path:

```bash
NVM_PREFIX="$(brew --prefix nvm)"
```

Add the `nvm` setup block to `~/.zshrc`.

This command checks whether the block already exists before adding it, so it is safe to copy and paste:

```bash
touch ~/.zshrc
if grep -q 'NVM_DIR="$HOME/.nvm"' ~/.zshrc; then
  echo "nvm setup is already in ~/.zshrc"
else
  cat >> ~/.zshrc <<'EOF'
export NVM_DIR="$HOME/.nvm"
export NVM_PREFIX="$(brew --prefix nvm)"
[ -s "$NVM_PREFIX/nvm.sh" ] && \. "$NVM_PREFIX/nvm.sh"
[ -s "$NVM_PREFIX/etc/bash_completion.d/nvm" ] && \. "$NVM_PREFIX/etc/bash_completion.d/nvm"
EOF
fi
```

Load the updated shell settings and check `nvm` is available:

```bash
source ~/.zshrc
command -v nvm
```

Success looks like:

```text
nvm
```

Then install and use Node.js 24:

```bash
nvm install 24
nvm use 24
node --version
npm --version
```

Success looks like:

```text
v24.x.x
```

The `npm` version can vary. Use the `npm` version that comes with Node.js 24.

### 5. Set beginner-safe Git defaults

Replace `Your Full Name` and `your.name@justice.gov.uk` with your own details:

```bash
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global core.autocrlf input
git config --global core.eol lf
git config --global user.name "Your Full Name"
git config --global user.email "your.name@justice.gov.uk"
```

### 6. Create an SSH key for GitHub

Create a key:

```bash
mkdir -p ~/.ssh
ssh-keygen -t ed25519 -C "your.name@justice.gov.uk" -f ~/.ssh/id_ed25519_hmcts
```

Press `Enter` when asked where to save the key. Use a passphrase if your team policy requires it.

Add the HMCTS GitHub alias to your SSH config.

This command checks whether the alias already exists before adding it, so it is safe to copy and paste:

```bash
touch ~/.ssh/config
if grep -q "^Host github.com-hmcts$" ~/.ssh/config; then
  echo "github.com-hmcts is already in ~/.ssh/config"
else
  cat >> ~/.ssh/config <<'EOF'
Host github.com-hmcts
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_hmcts
  AddKeysToAgent yes
  IdentitiesOnly yes
EOF
fi
```

Success looks like either:

```text
github.com-hmcts is already in ~/.ssh/config
```

or no message, because the block was added.

Copy your public key:

```bash
pbcopy < ~/.ssh/id_ed25519_hmcts.pub
```

Then add it in GitHub:

1. Open GitHub in your browser.
2. Go to `Settings` -> `SSH and GPG keys`.
3. Select `New SSH key`.
4. Paste the copied key.
5. Save it.

Test the connection:

```bash
ssh -T git@github.com-hmcts
```

Success looks like:

```text
Hi <your-github-username>! You've successfully authenticated, but GitHub does not provide shell access.
```

### 7. Clone and run the repository

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone git@github.com-hmcts:hmcts/opal-rm-prototype.git
cd opal-rm-prototype
npm install
npm run dev
```

When `npm run dev` succeeds, leave that terminal running and open:

```text
http://localhost:3000
```

You can also open the Prototype Kit manage page:

```text
http://localhost:3000/manage-prototype
```

Stop the local server with `Ctrl+C` in the terminal.

## First local run checklist

You are set up correctly when all of these are true:

| Check | Command | What good looks like |
| --- | --- | --- |
| Git works | `git --version` | Prints a Git version. |
| Node works | `node --version` | Prints `v24.x.x`. |
| npm works | `npm --version` | Prints an npm version. |
| GitHub SSH works | `ssh -T git@github.com-hmcts` | Says you successfully authenticated. |
| Repository is cloned | `pwd` | Ends with `opal-rm-prototype`. |
| Prototype runs | `npm run dev` | Terminal stays running and shows a local URL. |
| Browser opens prototype | `http://localhost:3000` | You can see the OPAL RM prototype start page. |

Prototype data is session-only. There is no database. Refreshing, restarting, or clearing the browser session may remove test data.

## What the main files mean in plain English

Most BA-led prototype changes are wording, journey order, fake data, or evidence notes.

| File or folder | Plain-English meaning | Typical BA change |
| --- | --- | --- |
| `app/views/` | Screen templates | Change page text, hints, questions, buttons, and summary content. |
| `app/routes.js` | What happens after a user clicks continue | Change journey order or add a condition. |
| `app/data/session-data-defaults.js` | Fake/default data | Add safe example data for a prototype scenario. |
| `app/assets/sass/application.scss` | Small custom styling | Only use when GOV.UK or MOJ styles do not already solve it. |
| `app/assets/javascripts/application.js` | Small browser behaviour | Use sparingly for prototype-only interactions. |
| `docs/` | GitHub Pages documentation | Add guidance, examples, and handoff notes. |
| `.codex/skills/` | OPAL-specific Codex skills | Use these to plan, build, review, and package BA-led prototype work. |

If Codex wants to add a backend, database, API layer, large custom CSS framework, or production architecture, stop and ask the team to review the plan.

## Using Codex safely

Start Codex from the repository root so it can inspect the right files.

```bash
cd ~/Projects/opal-rm-prototype
pwd
git status
```

`pwd` should end with:

```text
opal-rm-prototype
```

`git status` should show which branch you are on and whether files have changed.

If this is your first Codex use on that machine:

```bash
codex login
```

Start Codex:

```bash
codex
```

If the terminal says `codex` is not recognised, stop and ask your team how Codex is installed on your HMCTS laptop. Do not install an unapproved personal tool to work around this.

### Local OPAL Codex skills

Use these from the repository root:

```text
$opal-prototype-planner
$opal-prototype-builder
$opal-prototype-accessibility-reviewer
$opal-prototype-uat-packager
```

| Skill | When to use it | What it should produce |
| --- | --- | --- |
| `$opal-prototype-planner` | Before editing anything | Prototype goal, assumptions, accessibility risks, UAT tasks, and open questions. |
| `$opal-prototype-builder` | When the plan is agreed | Prototype page, route, data, and small style changes. |
| `$opal-prototype-accessibility-reviewer` | Before UAT or PR review | Findings-first accessibility risk review. |
| `$opal-prototype-uat-packager` | Before sharing the branch | `UAT_SCRIPT.md`, `ACCESSIBILITY_NOTES.md`, `DEVELOPER_HANDOFF.md`, and `DECISIONS.md`. |

Plan first, edit second. This is especially important for accessibility because a visually plausible prototype can still have unclear labels, broken error recovery, or repeated links that make no sense to screen-reader users.

## First prototype change with Codex

Use this for a safe first practice change.

### 1. Start from the latest main branch

```bash
git checkout main
git pull --ff-only origin main
```

### 2. Create your own branch

Use a short branch name that describes the work:

```bash
git checkout -b ba/first-prototype-change
```

Check the branch:

```bash
git branch --show-current
```

Success looks like:

```text
ba/first-prototype-change
```

### 3. Ask Codex to explain before editing

Start Codex:

```bash
codex
```

Paste this:

```text
I am a business analyst working in this GOV.UK Prototype Kit repo.
First explain which files control page content, journey logic, fake data, and styling.
Then make one very small prototype-safe change: add a short hint text to the chosen page.
Use GOV.UK or MOJ patterns where possible.
Tell me exactly which files changed and how to check the result.
```

For a real prototype change, use the planner skill first:

```text
$opal-prototype-planner
We need to test whether caseworkers can add two creditors and one order term, recover from a validation error, then trust the check answers page.
Use fake data only.
Known accessibility risk: repeated creditor remove and change links need clear context.
Out of scope: login, real APIs, document upload, payment, and production validation.
Plan the prototype first. Do not edit files yet.
```

### 4. Review what changed

After Codex finishes, run:

```bash
git status
git diff
```

Look for:

- files you expected Codex to change
- no unrelated large rewrites
- no real names, case references, personal data, or client-sensitive data
- no backend, database, or API additions

### 5. Run and check the prototype

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Check the changed page with the keyboard:

1. Press `Tab` to move through links and fields.
2. Confirm focus is visible.
3. Confirm labels and hints make sense.
4. Try the journey path that the change affects.

### 6. Commit only after review

If the change is correct:

```bash
git add app/ docs/
git commit -m "prototype: add first BA journey change"
git push -u origin ba/first-prototype-change
```

If you are unsure, do not commit. Ask a developer, designer, accessibility specialist, or delivery lead to review the diff first.

## What BAs should give Codex

Good inputs make better prototypes.

| Input | Example |
| --- | --- |
| User role | `caseworker creating an OPAL RM case` |
| Journey area | `create case`, `search`, `resulting`, `review cases`, or `case enquiry` |
| UAT decision | `Can users add two creditors and recover from a validation error?` |
| Fake data | `Use fictional names and non-real case references only.` |
| Known risk | `Repeated change links may be unclear out of visual context.` |
| Source material | Jira story, Confluence note, Figma design, or workshop notes. |
| Out of scope | `No login, no real APIs, no payment, no document upload.` |

Weak prompt:

```text
Make the journey accessible.
```

Better prompt:

```text
We need a clickable OPAL RM prototype for caseworkers creating a case with two creditors and one order term.
UAT should tell us whether users can recover from a validation error and trust the check answers page.
Use fake data only.
Known risk: repeated creditor change and remove links must include clear context.
Out of scope: login, real APIs, document upload, payment, and production validation.
Plan first and ask me any questions before editing files.
```

## Accessibility expectations

Using GOV.UK and MOJ components helps, but it does not automatically stop accessibility problems. The prototype can still be wrong if labels, legends, error messages, repeated actions, journey order, or check answers links are unclear.

Before UAT, check:

| Area | BA question to ask |
| --- | --- |
| Labels and legends | Does every field or question make sense without relying on visual layout? |
| Hints | Are dates, money, and reference formats explained before the user makes a mistake? |
| Keyboard path | Can a keyboard-only user reach every field, link, and button in a sensible order? |
| Error summaries | Does each error link to the exact field or group that needs fixing? |
| Repeated actions | Do change and remove links say which creditor, order term, or item they affect? |
| Check answers | Do action links make sense out of context, for example `Change creditor Alex Smith`? |
| Fake data | Is all data fictional and safe to share in UAT notes? |
| Boundary | Are we clear that the prototype is not WCAG certified? |

OPAL RM hotspots:

- repeated creditors and minor creditors
- order terms
- hearing details
- central authority details
- check answers pages
- validation paths
- resulting and review flows

Use this prompt before UAT:

```text
$opal-prototype-accessibility-reviewer
Review the changed OPAL RM prototype pages before UAT.
Focus on keyboard flow, labels, legends, hints, error summaries, repeated creditor actions, check answers change links, and fake data.
Give findings first with P1, P2, or P3 priority.
Do not claim the prototype is WCAG certified.
```

## Developer handoff outputs

The clickable screens are not enough. A reviewable prototype branch should include:

| Output | Audience | Why it matters |
| --- | --- | --- |
| `UAT_SCRIPT.md` | BAs, VAs, UCD, users | Defines tasks, fake data, and what to observe. |
| `ACCESSIBILITY_NOTES.md` | Accessibility, UCD, developers | Captures early risks and manual review needs. |
| `DEVELOPER_HANDOFF.md` | Developers, testers, tech leads | Explains routes, behaviours, shortcuts, and decisions to preserve. |
| `DECISIONS.md` | Delivery team | Records decisions and open questions so they are not lost after UAT. |

Use this prompt when the prototype branch is ready to share:

```text
$opal-prototype-uat-packager
Prepare the prototype output pack for this branch.
Create or update UAT_SCRIPT.md, ACCESSIBILITY_NOTES.md, DEVELOPER_HANDOFF.md, and DECISIONS.md.
Use fake data.
Include what the prototype proves, what it does not prove, accessibility risks, developer decisions to preserve, and open questions for BA, UCD, accessibility, and developers.
```

For templates and examples, read [Prototype output pack](prototype-output-pack.md).

## GitHub Pages and review links

This repository publishes documentation through GitHub Pages.

The useful documentation URLs are:

```text
https://hmcts.github.io/opal-rm-prototype/latest/
https://hmcts.github.io/opal-rm-prototype/branches/<branch-name>/
https://hmcts.github.io/opal-rm-prototype/pulls/pr-<number>/
```

Use these links like this:

| URL type | Use it when |
| --- | --- |
| `latest/` | You want the current documentation from `main`. |
| `branches/<branch-name>/` | You want to share docs for a branch before a PR exists. |
| `pulls/pr-<number>/` | You want reviewers to see the docs that match a pull request. |

Branch and PR previews publish only for branches inside this repository, not forks.

The clickable prototype application and the GitHub Pages documentation are separate. The prototype runs locally at `http://localhost:3000` during BA setup. Production-like deployment is handled separately through Azure App Service by the repository workflow.

### Optional local documentation preview

Most BAs do not need to run the documentation site locally. Use this only when you are changing the documentation pages and want to check the GitHub Pages view before pushing.

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

For a strict build check, run:

```bash
mkdocs build --strict
```

## Common problems

| Problem | What to do first |
| --- | --- |
| `git clone` says permission denied | Run `ssh -T git@github.com-hmcts` and check your GitHub SSH key. |
| `node` or `npm` is not recognised | Close and reopen the terminal, then re-check Node.js 24 setup. |
| `npm install` fails | Confirm you are in the repository root, on stable internet, and using Node.js 24. |
| Browser does not load | Open `http://localhost:3000` manually and check the terminal for the local URL. |
| Port `3000` is already in use | Stop the other server or ask a developer to help identify the process. |
| Codex is not recognised | Ask the team how Codex is installed on HMCTS laptops. Do not use an unapproved personal install. |
| You are on the wrong branch | Run `git branch --show-current`, then switch to the correct branch. |
| PR docs preview is missing | Check that the PR branch is inside this repo and the GitHub Actions workflow is green. |

For more detail, read [Troubleshooting](troubleshooting.md).

## Glossary

| Term | Plain-English meaning |
| --- | --- |
| Repository or repo | The project folder in GitHub and on your laptop. |
| Repo root | The top folder of the project, where `package.json` lives. |
| Branch | Your own working copy of the repository changes. |
| Commit | A saved set of changes with a message. |
| Pull request or PR | A request for other people to review and merge your branch. |
| Prototype Kit | The GOV.UK tool used to make clickable service prototypes. |
| Route | The code that decides what page opens next. |
| Session data | Temporary prototype data stored while you use the local site. |
| Nunjucks | The template language used by the Prototype Kit pages. |
| Macro | A reusable GOV.UK or MOJ component call, such as radios, inputs, or summary lists. |
| UAT | User acceptance testing: checking whether the journey supports the user task and business decision. |

## Done checklist

You are ready to share a prototype branch for review when:

- the journey runs locally with `npm run dev`
- the changed pages have been checked in the browser
- fake data only is used
- no real case data, personal data, or client-sensitive data is present
- keyboard navigation has been checked on the changed path
- labels, legends, hints, errors, and check answers links have been reviewed
- repeated change and remove actions include clear context
- `UAT_SCRIPT.md` exists for substantial UAT work
- `ACCESSIBILITY_NOTES.md` captures risks and manual review needs
- `DEVELOPER_HANDOFF.md` explains decisions developers should preserve
- `DECISIONS.md` records open questions and agreed decisions
- the prototype does not claim production WCAG certification

## Where to go next

- [Windows setup](windows-setup.md)
- [Mac setup](macbook-setup.md)
- [Git and GitHub basics](git-and-github.md)
- [Using Codex for prototyping](using-codex.md)
- [Accessible BA-led prototyping](accessible-prototyping.md)
- [Prototype output pack](prototype-output-pack.md)
- [GitHub Pages publishing](github-pages.md)
- [Troubleshooting](troubleshooting.md)
