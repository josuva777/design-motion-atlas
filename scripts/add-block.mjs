#!/usr/bin/env node
// scripts/add-block.mjs — Register any new .tsx UI/animation component into registry.json so all AI engines can reuse it!
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function getArg(flag, fallback = "") {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const name = getArg("--name");
const title = getArg("--title");
const filePath = getArg("--path");
const description = getArg("--desc", "Custom reusable UI & motion block registered in Design Motion Atlas.");
const depsRaw = getArg("--deps", "gsap,@gsap/react");

if (!name || !filePath) {
  console.log(`
Register Your Own .tsx UI Block into Design Motion Atlas
--------------------------------------------------------
Whenever you build a hero, popup modal, mobile sheet, or loader you love, copy the .tsx file into \`blocks/\` and run:

  npm run add:block -- --name "my-hero-block" --title "Custom 3D Hero" --path "blocks/heroes/MyHero.tsx" --desc "Pinned scroll hero with shader" --deps "gsap,@gsap/react,lenis"
`);
  process.exit(1);
}

const registryFile = path.join(process.cwd(), "registry.json");
const registry = JSON.parse(fs.readFileSync(registryFile, "utf8"));
const deps = depsRaw.split(",").map((d) => d.trim()).filter(Boolean);

const existingIdx = registry.items.findIndex((item) => item.name === name);
const newItem = {
  name,
  type: "registry:block",
  title: title || name,
  description,
  dependencies: deps,
  files: [
    {
      path: filePath,
      type: "registry:component"
    }
  ]
};

if (existingIdx !== -1) {
  registry.items[existingIdx] = newItem;
  console.log(`[ATLAS UPDATED] Updated existing block "${name}" (${filePath}) in registry.json!`);
} else {
  registry.items.push(newItem);
  console.log(`[ATLAS UPDATED] Registered new block "${name}" (${filePath}) in registry.json!`);
}

fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2) + "\n", "utf8");
console.log("Run `npm run audit:all` to verify your new block passes all Anti-Slop & Spec checks.");
