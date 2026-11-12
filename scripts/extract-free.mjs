#!/usr/bin/env node
// scripts/extract-free.mjs — 100% Free Live URL & Video-to-Spec Extraction Wrapper (Shell-Safe)
// Runs with shell: false so URLs containing '&', '?', or '#' query parameters never split or fail.

import { spawnSync } from "node:child_process";
import fs from "node:fs";

const target = process.argv[2];
if (!target) {
  console.log(`
100% Free Live Design & Motion Extractor (Shell-Safe v3.0)
----------------------------------------------------------
Usage:
  1. Extract live website DOM tokens, interactions & runtime animations (via designlang & dembrandt):
     node scripts/extract-free.mjs "https://example-site.com?theme=dark&view=grid"

  2. Extract 10fps state keyframes from a screen recording (via ffmpeg):
     node scripts/extract-free.mjs path/to/recording.mp4
`);
  process.exit(0);
}

const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";

if (target.startsWith("http://") || target.startsWith("https://")) {
  try {
    new URL(target);
  } catch {
    console.error(`[ERROR] Invalid URL provided: ${target}`);
    process.exit(1);
  }

  console.log(`\n[1/2] Running designlang@13.3.2 on ${target} (shell: false)...`);
  const dlResult = spawnSync(
    npxBin,
    ["-y", "designlang@13.3.2", target, "--interactions", "--motion-runtime", "--emit-agent-rules"],
    { stdio: "inherit", shell: false }
  );

  if (dlResult.status !== 0) {
    console.warn(`[WARN] designlang exited with code ${dlResult.status}. Continuing to dembrandt...`);
  }

  console.log(`\n[2/2] Running dembrandt@1.4.0 DTCG & shadcn token extractor on ${target} (shell: false)...`);
  const dbResult = spawnSync(
    npxBin,
    ["-y", "dembrandt@1.4.0", target, "--dtcg", "--shadcn"],
    { stdio: "inherit", shell: false }
  );

  if (dbResult.status !== 0) {
    console.warn(`[WARN] dembrandt exited with code ${dbResult.status}.`);
  }
} else if (target.endsWith(".mp4") || target.endsWith(".mov") || target.endsWith(".webm")) {
  console.log(`\n[VIDEO-TO-SPEC] Extracting 10fps state keyframes from ${target} using ffmpeg (shell: false)...`);
  fs.mkdirSync("motion-specs/extracted-frames", { recursive: true });
  const ffResult = spawnSync(
    "ffmpeg",
    ["-i", target, "-vf", "fps=10", "motion-specs/extracted-frames/frame_%03d.png"],
    { stdio: "inherit", shell: false }
  );
  if (ffResult.status === 0) {
    console.log("\nSaved numbered keyframes to motion-specs/extracted-frames/!");
  }
} else {
  console.error("Provide a valid http(s):// URL or a .mp4/.mov/.webm video path.");
  process.exit(1);
}
