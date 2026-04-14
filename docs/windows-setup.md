# Windows setup from scratch

These instructions assume:

- you are using an HMCTS-managed Windows laptop
- you have not set up Git before
- you want the safest path with the fewest surprises

## Before you install anything

Check that you have:

1. Access to GitHub.
2. Access to the `hmcts/opal-rm-prototype` repository.
3. Permission to install software.
4. A normal working folder, for example `C:\Users\<your-name>\Projects`.

Do not clone the repository into OneDrive or a shared network folder.

## Install the tools

### Visual Studio Code

1. Go to <https://code.visualstudio.com/>.
2. Download the Windows installer.
3. Install it using default options.

### Git for Windows

1. Go to <https://git-scm.com/download/win>.
2. Download and run the installer.
3. Keep the default options unless your team tells you otherwise.
4. Open `Git Bash` when the install finishes.

Check Git:

```bash
git --version
```

### Node.js 24

Recommended approach:

1. Install `nvm-windows` from <https://github.com/coreybutler/nvm-windows/releases>.
2. Open a new `Git Bash` window.
3. Run:

```bash
nvm install 24.0.0
nvm use 24.0.0
node --version
npm --version
```

If `nvm-windows` is blocked, install Node 24 directly from <https://nodejs.org/>.

## Set your Git identity and safe defaults

Open `Git Bash` and run:

```bash
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global core.autocrlf input
git config --global core.eol lf
git config --global user.name "Your Full Name"
git config --global user.email "your.name@justice.gov.uk"
```

## Set up SSH for GitHub

Create the key:

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
cat ~/.ssh/id_ed25519_hmcts.pub | clip
```

Then add it in GitHub under `Settings` -> `SSH and GPG keys`.

Test access:

```bash
ssh -T git@github.com-hmcts
```

## Clone and run the repository

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone git@github.com-hmcts:hmcts/opal-rm-prototype.git
cd opal-rm-prototype
npm install
npm run dev
```

Open the prototype:

```text
http://localhost:3000
```

## First-time success checklist

You are ready if all of these are true:

- `git --version` works
- `node --version` works
- `npm --version` works
- `ssh -T git@github.com-hmcts` works
- `npm run dev` starts the prototype
