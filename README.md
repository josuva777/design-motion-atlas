# Design Motion Atlas (v4.0 — Enterprise Flagship Edition)

**A portable toolkit for distinctive interface design, expressive motion systems, Zomato/Airbnb-grade in-app micro-interactions, and agent-ready UI across Antigravity, Claude Code, OpenAI Codex/ChatGPT, Google Gemini CLI, Cursor, Windsurf, and GitHub Copilot.**

---

## Why Design Motion Atlas v4.0 Eliminates AI Slop Completely

| Capability Layer | What Generic AI Prompts Produce | What Design Motion Atlas v4.0 Enforces |
| :--- | :--- | :--- |
| **1. Compiler Color & Token Lock (`src/styles/globals.css`)** | `bg-indigo-500`, `bg-purple-200`, `bg-fuchsia-500`, or hardcoded `#hex` | Resets `--color-*: initial` in Tailwind v4 and provides **10 complete OKLCH domain themes** (`01` through `10`). |
| **2. 15-Rule Multi-Hit Slop Scanner (`scripts/detect-slop.mjs`)** | Misses `next/font` `Inter`, `font-['Inter']`, reordered `bg-clip-text`, or stops at first match | Scans every line & multiline block across **15 P0/P1/P2 rules**, backed by an automated regression test suite (`npm run test:scanner`). |
| **3. 1-Command Project Bootstrapper (`scripts/init-project.mjs`)** | Requires manual copying of archetype files when starting a new app | Run `npm run init:project -- --name "My App" --archetype art --secondary webgl` to compile root `DESIGN.md`, `ui-spec.yaml`, and `recipes/ui-recipe.yaml` in 1 second. |
| **4. 12 Production `.tsx` Motion & In-App Blocks (`blocks/` + `registry.json`)** | Static screenshots or broken raw `useEffect` animations | Includes **12 ready-to-use `.tsx` components**: WebGL 2 shader hero, GSAP scroll-pinned hero, art atelier curtain index, B2B crosshair telemetry matrix, Zomato-style odometer cart stepper, velocity bottom sheet, wave skeleton loader, dynamic status island, `Cmd+K` liquid command bar, and AG-UI inline diff approval card. |
| **5. 42+ Free Reference Sources + Self-Updating CLI (`reference-index/`)** | Reuses the same 1 or 2 templates forever | 42+ free galleries, open-source component registries, and free commercial font foundries ([Fontshare](https://www.fontshare.com/), [UNCUT.wtf](https://uncut.wtf/), [Velvetyne](https://velvetyne.fr/)) + `npm run add:ref` and `npm run extract:url` (shell-safe & YAML-safe). |
| **6. CI & Pre-Commit Enforcement (`.github/workflows/atlas-ci.yml`)** | Only checks rules in one editor | Ships with a GitHub Actions CI pipeline + `npm run install:hooks` Git pre-commit gate so Antigravity, Cursor, Claude Code, and terminal commits are verified automatically. |

---

## Replace v2 in Your GitHub Repo in 60 Seconds

Unzip `design-motion-atlas-v4.0.zip`, copy its contents directly into your local `design-motion-atlas` folder (replacing the old v2 files), and run:

```bash
# 1. Verify all 15 Anti-Slop rules, 10 Archetype Specs, and 15/15 Unit Tests pass
npm run audit:all && npm run test:scanner

# 2. Install the automatic Git pre-commit hook for Antigravity / Cursor / CLI
npm run install:hooks

# 3. Commit and push v4.0 to https://github.com/josuva777/design-motion-atlas
git add .
git commit -m "feat: upgrade to Design Motion Atlas v4.0 enterprise flagship edition"
git push origin main
```

---

## Complete CLI Command Reference (`package.json`)

```bash
# Bootstrap any new website or app project with a Primary + Secondary Archetype blend
npm run init:project -- --name "Kuro Atelier" --archetype art --secondary webgl --vision "Interactive 3D architectural monograph"

# Run the 15-rule P0/P1/P2 Anti-Slop Scanner
npm run audit:slop

# Run the Programmatic Spec, Token & Block Sync Verifier
npm run audit:spec

# Run the Automated 15-Rule Scanner Unit Test Suite
npm run test:scanner

# Add a new reference website to reference-index/custom-sources.yaml (100% YAML-safe)
npm run add:ref -- --name "Lusion" --url "https://lusion.co?ref=awwwards&mode=webgl" --domain "03-spatial-webgl-flagship" --extract "WebGL fluid transitions and scroll camera choreography"

# Register any new .tsx UI block you build into registry.json
npm run add:block -- --name "custom-promo-modal" --title "Spring Promo Modal" --path "blocks/in-app-sheets/SpringBottomSheetModal.tsx" --desc "Velocity-aware mobile bottom sheet" --deps "gsap,@gsap/react"

# Extract live design tokens & runtime animations from any URL (100% Free & Shell-safe)
npm run extract:url -- "https://minimal.gallery/websites/?cat=architecture"
```

---

## Complete 12-Block Component Registry (`blocks/` & `registry.json`)

| Block ID | File Path | Domain & Purpose |
| :--- | :--- | :--- |
| `smooth-scroll-provider` | `blocks/smooth-scroll/SmoothScrollProvider.tsx` | Single-scroller `Lenis` + `GSAP ScrollTrigger` provider with reduced-motion fallback. |
| `editorial-curtain-title` | `blocks/text-reveal/EditorialCurtainTitle.tsx` | Line-by-line masked headline reveal triggered at `start: "top 85%"`. |
| `scroll-pinned-hero-stage` | `blocks/hero-stage/ScrollPinnedHeroStage.tsx` | Pinned viewport hero scrubbing `clip-path` mask and staggered telemetry cards. |
| `interactive-shader-hero-canvas` | `blocks/shaders/InteractiveShaderHeroCanvas.tsx` | Zero-dependency WebGL 2 fragment shader hero with pointer ripples, DPR cap (`1.5`), and off-screen pause. |
| `archival-index-curtain-preview` | `blocks/art-atelier/ArchivalIndexCurtainPreview.tsx` | Minimal Gallery / Awwwards style monograph index with velocity-tracked floating image preview. |
| `crosshair-telemetry-matrix` | `blocks/b2b-telemetry/CrosshairTelemetryMatrix.tsx` | Institutional B2B/Fintech 1px hairline matrix with synchronized time-slice hover across all cards. |
| `spring-bottom-sheet-modal` | `blocks/in-app-sheets/SpringBottomSheetModal.tsx` | Zomato/Swiggy style touch-drag-to-dismiss mobile bottom sheet (`>110px` threshold) and desktop spring modal. |
| `tactile-cart-counter-pill` | `blocks/in-app-commerce/TactileCartCounterPill.tsx` | Morphs from `ADD +` into a `− / 1 / +` mechanical odometer stepper + floating bottom `"View Cart →"` bar. |
| `choreographed-skeleton-loader` | `blocks/in-app-loaders/ChoreographedSkeletonLoader.tsx` | Directional wave shimmer skeleton that smoothly cross-fades and unmasks loaded content. |
| `dynamic-status-island-toast` | `blocks/in-app-feedback/DynamicStatusIslandToast.tsx` | Dynamic Island live order/action status pill (`Order Placed` → `Kitchen Preparing` → `14 MINS`). |
| `liquid-command-bar` | `blocks/agentic-ui/LiquidCommandBar.tsx` | Keyboard-first `Cmd+K` command bar replacing corner chat bubbles with inline AG-UI intent execution. |
| `inline-diff-approval-card` | `blocks/agentic-ui/InlineDiffApprovalCard.tsx` | Human-in-the-loop before/after diff card with `[Approve ↵]` and `[Reject ESC]` actions. |
