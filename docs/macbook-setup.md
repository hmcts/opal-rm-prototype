# MacBook setup from scratch

These instructions assume:

- you are using a new or reset MacBook
- you have not set up Git before
- you want a simple, repeatable setup

## Before you install anything

Make sure you have:

1. Access to GitHub.
2. Access to the `hmcts/opal-rm-prototype` repository.
3. Permission to install software.
4. A normal working folder, for example `~/Projects`.

Do not keep the repository in iCloud Drive.

## Install the tools

### Xcode Command Line Tools

Open `Terminal` and run:

```bash
xcode-select --install
```

### Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If Homebrew prints extra commands to add it to your shell profile, run them before continuing.

Check Homebrew:

```bash
brew --version
```

### Git and Visual Studio Code

```bash
brew install git
brew install --cask visual-studio-code
```

Check Git:

```bash
git --version
```

### Node.js 24 with nvm

```bash
brew install nvm
mkdir -p ~/.nvm
```

Resolve the correct Homebrew path first. This works on both Apple Silicon and Intel Macs:

```bash
NVM_PREFIX="$(brew --prefix nvm)"
```

Add this to `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
export NVM_PREFIX="$(brew --prefix nvm)"
[ -s "$NVM_PREFIX/nvm.sh" ] && \. "$NVM_PREFIX/nvm.sh"
[ -s "$NVM_PREFIX/etc/bash_completion.d/nvm" ] && \. "$NVM_PREFIX/etc/bash_completion.d/nvm"
```

Restart Terminal, then run:

```bash
nvm install 24
nvm use 24
node --version
npm --version
```

## Set your Git identity and safe defaults

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

Copy the key:

```bash
pbcopy < ~/.ssh/id_ed25519_hmcts.pub
```

Add it in GitHub under `Settings` -> `SSH and GPG keys`.

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

Open:

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
