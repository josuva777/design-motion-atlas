#!/usr/bin/env node
// scripts/install-hooks.mjs — Installs a Git pre-commit hook so Antigravity, Cursor, Windsurf, and Codex run the Anti-Slop & Spec gates automatically!
import fs from "node:fs";
import path from "node:path";

const gitHooksDir = path.join(process.cwd(), ".git", "hooks");
if (!fs.existsSync(gitHooksDir)) {
  console.log("[INFO] No .git/hooks directory found yet. Run `git init` first, then run `npm run install:hooks`.");
  process.exit(0);
}

const preCommitPath = path.join(gitHooksDir, "pre-commit");
const hookScript = `#!/bin/sh
echo "[Design Motion Atlas] Running pre-commit Anti-Slop & Spec Verification..."
node scripts/detect-slop.mjs && node scripts/verify-spec.mjs
`;

fs.writeFileSync(preCommitPath, hookScript, "utf8");
fs.chmodSync(preCommitPath, 0o755);
console.log("[HOOK INSTALLED] Git pre-commit hook installed at .git/hooks/pre-commit! Every commit in Antigravity, Cursor, Claude Code, or CLI will now auto-verify zero AI slop.");
