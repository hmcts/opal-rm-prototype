#!/bin/bash
# Pulls changes from the Confluence functional spec into the prototype codebase.
#
# Run on a schedule (e.g. daily cron) or manually: bash scripts/sync-from-confluence.sh
#
# What it does:
#   1. Reads the Confluence spec (page ID 953090050)
#   2. Compares it to the current state of the codebase
#   3. If spec changes imply code changes (new fields, changed labels, changed
#      validation, etc.), creates a branch and implements them
#   4. Logs output to scripts/confluence-sync.log
#
# Requirements:
#   - claude CLI in PATH with Atlassian MCP configured

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG="$REPO_ROOT/scripts/confluence-sync.log"
STATE="$REPO_ROOT/scripts/confluence-sync-state.json"

echo "" >> "$LOG"
echo "=== Confluence sync run: $(date -u +"%Y-%m-%dT%H:%M:%SZ") ===" >> "$LOG"

cd "$REPO_ROOT"

CURRENT_BRANCH=$(git branch --show-current)

claude --dangerously-skip-permissions -p "
You are synchronising a GOV.UK Prototype Kit prototype codebase with its Confluence functional specification.

## Your task

1. Read the Confluence functional specification page:
   - Page ID: 953090050
   - Cloud ID: cogworx.atlassian.net
   - Use mcp__claude_ai_Atlassian__getConfluencePage

2. Read the current state of the relevant prototype source files:
   - app/views/create-a-case/ (all .html files)
   - app/views/resulting/ (all .html files)
   - app/routes.js
   - app/data/session-data-defaults.js

3. Compare the spec to the code. Look specifically for:
   - Field labels in the spec that differ from the label text in the Nunjucks templates
   - Hint text in the spec that differs from hint text in templates
   - Error messages in the spec that differ from error messages set in routes.js
   - Accepted formats described in the spec (e.g. inputmode, type attributes) that are missing from the code
   - Character limits in the spec that differ from maxlength in templates
   - Required fields listed in the spec that lack server-side validation in routes.js

4. If there are NO discrepancies: print 'SYNC OK — no changes needed' and stop.

5. If there ARE discrepancies:
   a. Create a new git branch named 'spec-sync/$(date +%Y-%m-%d)' from the current HEAD
   b. Make the minimum code changes needed to align the prototype with the spec
   c. Prefer editing existing files (not creating new ones)
   d. Commit the changes with message: 'Sync prototype with Confluence spec ($(date +%Y-%m-%d))'
   e. Print a summary of what changed

## Rules
- Do NOT change the overall structure or flow of the prototype
- Do NOT add features that are not already partially present in the code
- Only correct mismatches between what the spec documents and what the code does
- Do not push the branch — leave it for human review
- If in doubt about a discrepancy, skip it and mention it in the summary
" 2>&1 | tee -a "$LOG"

echo "=== Sync complete ===" >> "$LOG"
