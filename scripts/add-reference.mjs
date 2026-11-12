#!/usr/bin/env node
// scripts/add-reference.mjs — YAML-Safe CLI to append new reference websites to reference-index/custom-sources.yaml
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function getArg(flag, fallback = "") {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const name = getArg("--name");
const url = getArg("--url");
const domain = getArg("--domain", "02-art-editorial-atelier");
const extract = getArg("--extract", "Spatial grid proportions, typography hierarchy, and runtime motion curves.");

if (!name || !url) {
  console.log(`
Usage:
  node scripts/add-reference.mjs --name "Site or Studio Name" --url "https://example.com" [--domain "02-art-editorial-atelier"] [--extract "What DNA to extract"]
`);
  process.exit(1);
}

// JSON.stringify produces a valid, properly escaped YAML double-quoted scalar for any string (handling ", \, colons, &, and control chars)
function yamlSafeString(val) {
  return JSON.stringify(String(val));
}

const customFile = path.join(process.cwd(), "reference-index", "custom-sources.yaml");
const today = new Date().toISOString().slice(0, 10);

const entry = [
  "",
  `  - added_at: ${yamlSafeString(today)}`,
  `    name: ${yamlSafeString(name)}`,
  `    url: ${yamlSafeString(url)}`,
  `    domain_archetype: ${yamlSafeString(domain)}`,
  `    cost: "free"`,
  `    extract_dna: ${yamlSafeString(extract)}`,
  ""
].join("\n");

fs.appendFileSync(customFile, entry, "utf8");
console.log(`[ATLAS UPDATED] Safely added ${yamlSafeString(name)} (${url}) under archetype "${domain}" in reference-index/custom-sources.yaml!`);
console.log(`Next step: Run \`node scripts/extract-free.mjs "${url}"\` to pull its live tokens and motion curves.`);
