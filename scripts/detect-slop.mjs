#!/usr/bin/env node
// scripts/detect-slop.mjs — Enterprise 15-Rule P0/P1/P2 AI Slop Scanner (v4.0)
// Scans every target file and reports EVERY single match across all 15 rules.

import fs from "node:fs";
import path from "node:path";

const cliTargets = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const TARGET_DIRS = cliTargets.length > 0 ? cliTargets : ["src", "app", "components", "blocks"];
const EXTENSIONS = new Set([".tsx", ".jsx", ".ts", ".js", ".css"]);

export const SLOP_RULES = [
  {
    id: "RULE-01-P0-TAILWIND-PURPLE-FUCHSIA-LINEAGE",
    severity: "P0",
    regex: /\b(bg|text|border|ring|from|via|to|fill|stroke)-(indigo|violet|purple|fuchsia)-(50|100|200|300|400|500|600|700|800|900|950)\b/g,
    message: "Banned default Tailwind indigo/violet/purple/fuchsia utility. Use semantic tokens (bg-accent-primary, bg-surface-elevated)."
  },
  {
    id: "RULE-02-P0-GRADIENT-TEXT-CLICHE",
    severity: "P0",
    regex: /(?:bg-clip-text[^"'`\n]{0,120}text-transparent|text-transparent[^"'`\n]{0,120}bg-clip-text|bg-gradient-to-(?:r|l|t|b|tr|tl|br|bl)[^"'`\n]{0,120}bg-clip-text|bg-clip-text[^"'`\n]{0,120}bg-gradient-to-(?:r|l|t|b|tr|tl|br|bl))/g,
    message: "Banned AI cliché: gradient-clipped text (bg-clip-text + text-transparent / bg-gradient-to-*). Use solid high-contrast typography (text-ink-primary)."
  },
  {
    id: "RULE-03-P0-GENERIC-FONT-DECLARATION",
    severity: "P0",
    regex: /(?:font-family\s*:\s*['"]?(?:Inter|Roboto|Arial|Open Sans|Montserrat)\b|font-\[['"]?(?:Inter|Roboto|Arial|Open_Sans|Montserrat)['"]?\]|import\s*\{[^}]*\b(?:Inter|Roboto|Open_Sans|Montserrat)\b[^}]*\}\s*from\s*['"]next\/font\/google['"])/gi,
    message: "Banned P0 font (Inter/Roboto/Arial/Open Sans/Montserrat via CSS, Tailwind arbitrary class, or next/font/google). Load free commercial fonts from Fontshare or UNCUT.wtf via var(--font-display) / var(--font-sans)."
  },
  {
    id: "RULE-04-P0-HARDCODED-HEX-COLOR-IN-COMPONENTS",
    severity: "P0",
    fileFilter: (file) => file.endsWith(".tsx") || file.endsWith(".jsx"),
    regex: /(?:\b(?:bg|text|border|from|via|to|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]|(?:color|background|backgroundColor|borderColor|fill|stroke)\s*:\s*['"]#[0-9a-fA-F]{3,8}['"]|['"]#[0-9a-fA-F]{6}['"])/g,
    message: "Banned hardcoded hex color inside component file. Consume semantic OKLCH CSS variables (bg-surface-canvas, text-ink-primary, border-border-hairline)."
  },
  {
    id: "RULE-05-P1-CREAM-TERRACOTTA-CLICHE",
    severity: "P1",
    regex: /(?:#F5F2EB|#D97757|#E8E2D5|#C86446|oklch\(0\.5[0-4]\s+0\.1[5-8]\s+3[0-8]\))/gi,
    message: "Banned P1 second-order AI tell: Cream + Terracotta default palette. Use crisp gallery alabaster + ultramarine or obsidian + cobalt."
  },
  {
    id: "RULE-06-P1-FAKE-MACOS-WINDOW-DOTS",
    severity: "P1",
    regex: /bg-red-(?:400|500)[\s\S]{0,180}bg-(?:yellow|amber)-(?:400|500)[\s\S]{0,180}bg-(?:green|emerald)-(?:400|500)/g,
    message: "Banned P1 tell: Fake macOS red/yellow/green window dots on cards."
  },
  {
    id: "RULE-07-P1-REFLEXIVE-GLASS-CARD",
    severity: "P1",
    regex: /^(?=[^\n]*\brounded-(?:2xl|3xl)\b)(?=[^\n]*\bshadow-(?:lg|xl|2xl)\b)(?=[^\n]*\bbackdrop-blur(?:-[a-z0-9]+)?\b)[^\n]+$/gm,
    message: "Banned P1 tell: Reflexive rounded-2xl + shadow-lg + backdrop-blur combo on a single element. Follow ui-spec.yaml border and elevation rules."
  },
  {
    id: "RULE-08-P1-DECORATIVE-CARD-NUMBERING",
    severity: "P1",
    regex: />\s*01\s*<\/[a-zA-Z0-9]+>[\s\S]{0,500}>\s*02\s*<\/[a-zA-Z0-9]+>[\s\S]{0,500}>\s*03\s*<\//g,
    message: "Banned P1 tell: Decorative 01 / 02 / 03 card numbering cliché."
  },
  {
    id: "RULE-09-P1-MIDDLE-DOT-EYEBROW",
    severity: "P1",
    regex: /[A-Z]{2,}\s*(?:·|•|\|)\s*[A-Z]{2,}\s*(?:·|•|\|)\s*[A-Z]{2,}/g,
    message: "Banned P1 tell: Tracked all-caps eyebrow with middle dots or pipes (A · B · C)."
  },
  {
    id: "RULE-10-P1-TRANSITION-ALL-JANK",
    severity: "P1",
    regex: /(?:\btransition-all\b|transition\s*:\s*all\b)/g,
    message: "Banned transition-all (causes main-thread layout/paint jank). Specify exact compositor properties (transition-transform, transition-opacity)."
  },
  {
    id: "RULE-11-P1-RAW-USEEFFECT-GSAP",
    severity: "P1",
    regex: /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]{0,350}\bgsap\.(?:to|from|fromTo|timeline)\b/g,
    message: "Banned raw useEffect for GSAP animations (leaks ScrollTriggers on unmount). Always use useGSAP() from @gsap/react."
  },
  {
    id: "RULE-12-P2-LAYOUT-THRASHING-KEYFRAMES",
    severity: "P2",
    regex: /gsap\.(?:to|from|fromTo)\s*\([^)]+\{[\s\S]{0,180}\b(?:top|left|right|bottom|width|height|margin|padding)\s*:/g,
    message: "Banned layout-thrashing GSAP tween animating top/left/width/height/margin. Animate transform (x, y, xPercent, yPercent, scale) or clipPath instead."
  },
  {
    id: "RULE-13-P1-LOREM-IPSUM-PLACEHOLDER",
    severity: "P1",
    regex: /\blorem\s+ipsum\b/gi,
    message: "Banned Lorem Ipsum placeholder copy. Write authentic, domain-specific product copy and real metric labels."
  },
  {
    id: "RULE-14-P1-PLAIN-TEXT-LOADING-SPINNER",
    severity: "P1",
    fileFilter: (file) => file.endsWith(".tsx") || file.endsWith(".jsx"),
    regex: />\s*Loading\.\.\.\s*</g,
    message: "Banned plain 'Loading...' text state. Use ChoreographedSkeletonLoader.tsx or DynamicStatusIslandToast.tsx."
  },
  {
    id: "RULE-15-P2-DEPRECATED-LOCOMOTIVE-SCROLL",
    severity: "P2",
    regex: /\blocomotive-scroll\b/gi,
    message: "Banned legacy locomotive-scroll package (~28KB + iOS bugs). Use Lenis via SmoothScrollProvider.tsx."
  }
];

export function scanContent(content, filePath = "inline.tsx") {
  const hits = [];
  for (const rule of SLOP_RULES) {
    if (rule.fileFilter && !rule.fileFilter(filePath)) continue;
    rule.regex.lastIndex = 0;
    let match;
    while ((match = rule.regex.exec(content)) !== null) {
      const upToMatch = content.slice(0, match.index);
      const lineNum = upToMatch.split("\n").length;
      const snippet = match[0].replace(/\s+/g, " ").slice(0, 75);
      hits.push({
        file: filePath,
        line: lineNum,
        id: rule.id,
        severity: rule.severity,
        snippet,
        message: rule.message
      });
      if (match.index === rule.regex.lastIndex) {
        rule.regex.lastIndex++;
      }
    }
  }
  return hits;
}

function walkDir(targetPath, fileList = []) {
  if (!fs.existsSync(targetPath)) return fileList;
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    if (EXTENSIONS.has(path.extname(targetPath))) fileList.push(targetPath);
    return fileList;
  }
  for (const entry of fs.readdirSync(targetPath, { withFileTypes: true })) {
    const fullPath = path.join(targetPath, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      walkDir(fullPath, fileList);
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let violations = [];
  for (const dir of TARGET_DIRS) {
    for (const file of walkDir(dir)) {
      const content = fs.readFileSync(file, "utf8");
      violations.push(...scanContent(content, file));
    }
  }

  if (violations.length > 0) {
    console.error(`\n[ANTI-SLOP GATE FAILED] Found ${violations.length} AI slop violation(s) across ${SLOP_RULES.length} active rules:\n`);
    for (const v of violations) {
      console.error(`  [${v.severity}] ${v.id} at ${v.file}:${v.line}`);
      console.error(`       Matched: "${v.snippet}"`);
      console.error(`       Fix:     ${v.message}\n`);
    }
    process.exit(2);
  } else {
    console.log(`[ANTI-SLOP GATE PASSED] Zero AI slop tells detected across ${SLOP_RULES.length} active rules.`);
    process.exit(0);
  }
}
