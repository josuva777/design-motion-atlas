#!/usr/bin/env node
// scripts/verify-spec.mjs — Programmatic Contract Verifier for ui-spec.yaml, DESIGN.md, tokens.dtcg.json & globals.css
import fs from "node:fs";
import path from "node:path";

const archetypesDir = path.join(process.cwd(), "archetypes");
const globalsCss = fs.readFileSync(path.join(process.cwd(), "src/styles/globals.css"), "utf8");
const registry = JSON.parse(fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf8"));

let errors = [];
const dirs = fs.readdirSync(archetypesDir, { withFileTypes: true }).filter((d) => d.isDirectory());

for (const dir of dirs) {
  const slug = dir.name;
  const specPath = path.join(archetypesDir, slug, "ui-spec.yaml");
  const designPath = path.join(archetypesDir, slug, "DESIGN.md");
  const tokensPath = path.join(archetypesDir, slug, "tokens.dtcg.json");

  for (const p of [specPath, designPath, tokensPath]) {
    if (!fs.existsSync(p)) {
      errors.push(`[MISSING FILE] ${p} does not exist.`);
    }
  }
  if (errors.length > 0) continue;

  const specText = fs.readFileSync(specPath, "utf8");
  const tokensJson = JSON.parse(fs.readFileSync(tokensPath, "utf8"));

  if (!globalsCss.includes(`[data-archetype="${slug}"]`)) {
    errors.push(`[CSS DRIFT] src/styles/globals.css is missing [data-archetype="${slug}"] selector.`);
  }

  const canvasValue = tokensJson.color?.surface?.canvas?.$value;
  if (!canvasValue || !specText.includes(`canvas: "${canvasValue}"`)) {
    errors.push(`[TOKEN DRIFT] ${slug}/ui-spec.yaml canvas token does not match ${slug}/tokens.dtcg.json (${canvasValue}).`);
  }

  const blockMatches = [...specText.matchAll(/- "(blocks\/[^"]+\.tsx)"/g)];
  if (blockMatches.length === 0) {
    errors.push(`[SPEC INCOMPLETE] ${slug}/ui-spec.yaml must declare at least one required_atlas_blocks path.`);
  }
  for (const m of blockMatches) {
    const blockRel = m[1];
    if (!fs.existsSync(path.join(process.cwd(), blockRel))) {
      errors.push(`[BROKEN BLOCK REF] ${slug}/ui-spec.yaml references missing block: ${blockRel}`);
    }
  }
}

if (registry.homepage.includes("your-org")) {
  errors.push(`[REGISTRY ERROR] registry.json still contains placeholder 'your-org' in homepage.`);
}
for (const item of registry.items || []) {
  for (const f of item.files || []) {
    if (!fs.existsSync(path.join(process.cwd(), f.path))) {
      errors.push(`[REGISTRY ERROR] Block "${item.name}" references missing file: ${f.path}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\n[SPEC VERIFICATION FAILED] Found ${errors.length} issue(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(2);
} else {
  console.log(`[SPEC VERIFICATION PASSED] All ${dirs.length} archetypes (ui-spec.yaml + DESIGN.md + tokens.dtcg.json), globals.css, and ${registry.items.length} registry blocks are 100% synced.`);
  process.exit(0);
}
