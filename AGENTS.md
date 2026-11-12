# AGENTS.md — Universal Anti-Slop Design, Motion & Agentic UI Contract (v3.0)

## 1. Pre-Flight Protocol & Intent Discovery (Mandatory First Step)
Before writing any UI or frontend code, execute this exact sequence:
1. **Classify the Product Domain**: Match the user's request to a Primary + Secondary Archetype in `archetypes/` (`01-b2b-fintech-precision` through `10-creator-media-scrollytelling`).
2. **Read the Active Contracts**: Read the chosen archetype's `DESIGN.md` and `ui-spec.yaml`, plus `reference-index/curated-sources.yaml`, `reference-index/custom-sources.yaml`, `recipes/ui-recipe.template.yaml`, and `src/styles/globals.css`.
3. **Never Clone a Single Site 1:1**: Populate `recipes/ui-recipe.yaml` by mixing **4 Atomic Layers** from at least 3 distinct references:
   - **Layer 1 (Spatial Grid & Asymmetry)** from Reference A
   - **Layer 2 (Typography & Modular Scale)** from Reference B (using 100% free commercial fonts from [Fontshare](https://www.fontshare.com/), [UNCUT.wtf](https://uncut.wtf/), or [Velvetyne](https://velvetyne.fr/))
   - **Layer 3 (Motion Choreography & Easing)** from Reference C or `motion-specs/`
   - **Layer 4 (Interactive Primitives & Shaders)** from our local `registry.json` (`blocks/`) and open-source registries + 1 custom hook from `recipes/signature-hooks-library.md`.

## 2. Strictly Banned AI Slop Defaults (Enforced by `scripts/detect-slop.mjs`)
- **P0 Bans (First-Order AI Slop)**:
  - NEVER use `Inter`, `Roboto`, `Arial`, `Open Sans`, or `Montserrat` (whether via CSS `font-family`, Tailwind arbitrary `font-['Inter']`, or `next/font/google`).
  - NEVER use default Tailwind `indigo`, `violet`, `purple`, or `fuchsia` utilities (`50`–`950`) or gradient-clipped text (`bg-clip-text` + `text-transparent` in any class order).
  - NEVER hardcode raw hex colors (`#RRGGBB`, `bg-[#...]`, or inline hex styles) inside `.tsx` or `.jsx` components. Consume ONLY semantic CSS variables (`bg-surface-canvas`, `bg-surface-elevated`, `text-ink-primary`, `text-ink-secondary`, `text-ink-muted`, `border-border-hairline`, `bg-accent-primary`).
  - NEVER build a centered hero stacked directly over a symmetric 3-column icon-card row.
- **P1 Bans (Second-Order Vibe-Coded Tells)**:
  - NEVER use cream + terracotta (`#F5F2EB` + `#D97757`) or near-black + neon-acid-green palettes.
  - NEVER add decorative `01 / 02 / 03` card numbering, tracked middle-dot/pipe eyebrows (`A · B · C`), fake macOS red/yellow/green window dots, or `rounded-2xl shadow-lg backdrop-blur` combos.
  - NEVER drop in unmodified stock Aceternity UI, Magic UI, or 21st.dev components without mutating their colors, border-radii, and easing curves to match `src/styles/globals.css` and the active archetype's `ui-spec.yaml`.

## 3. Verified Extraction & Component Sourcing Hierarchy
1. **Free Live-Site Extraction**: When given a reference URL (from Awwwards, Godly, Minimal Gallery, Cosmos, Brutalist Websites, Land-book, Lapa Ninja, MaxiBestOf, or Refero), run `npm run extract:url -- "<url>"` (which runs `npx -y designlang@13.3.2 <url> --interactions --motion-runtime --emit-agent-rules` and `npx -y dembrandt@1.4.0 <url> --dtcg --shadcn` safely with `shell: false`) or call the `designlang` / `dembrandt` MCP tools.
2. **Local & Open-Source Component Registries**: Query our local `registry.json` (`blocks/`) via `shadcn` MCP, `@21st-dev/cli` MCP, [React Bits](https://reactbits.dev/), [Motion Primitives](https://github.com/ibelick/motion-primitives), [Origin UI](https://github.com/shadcn/originui), [Cult UI](https://www.cult-ui.com/docs), and [Fancy Components](https://www.fancycomponents.dev/) before writing complex shaders or interactive primitives from scratch.
3. **Self-Growing `.tsx` Block Library**: Whenever you build a new reusable `.tsx` hero, modal, loader, or micro-interaction, save it into `blocks/` and run `npm run add:block -- --name "<slug>" --path "blocks/<folder>/<File>.tsx"` so `registry.json` exposes it to all AI engines on every future build.

## 4. Motion, 3D, In-App Consumer Physics & Agentic UI Rules
- **Lenis + GSAP Sync**: Wrap scrolling views in `blocks/smooth-scroll/SmoothScrollProvider.tsx` (`Lenis` synced to `GSAP ScrollTrigger`). Trigger scroll reveals at `start: "top 85%"`. Always use `@gsap/react` `useGSAP()` with `gsap.matchMedia()` for automatic unmount cleanup and `prefers-reduced-motion: reduce` fallbacks. Never use raw `useEffect` for GSAP tweens.
- **60fps Compositor Discipline**: Animate ONLY `transform` (`x`, `y`, `xPercent`, `yPercent`, `scale`, `rotate`), `opacity`, and `clipPath`. Never animate `top`, `left`, `width`, `height`, `margin`, or `box-shadow`, and never use `transition-all`.
- **In-App Consumer Physics (Zomato / Airbnb Grade)**: Never use plain loading spinners or abrupt popups. Use `SpringBottomSheetModal.tsx` for popups/sheets, `TactileCartCounterPill.tsx` for odometer-style cart steppers, `ChoreographedSkeletonLoader.tsx` for shimmer loading states, and `DynamicStatusIslandToast.tsx` for live status pills.
- **Integrated AI Agents**: Never bolt a generic corner chat bubble onto an interface unless explicitly requested. Use Controlled Generative UI ([CopilotKit](https://github.com/CopilotKit/CopilotKit) / [AG-UI](https://docs.ag-ui.com/introduction) / [Google A2UI](https://github.com/a2ui-project/a2ui)) and `blocks/agentic-ui/LiquidCommandBar.tsx` (`Cmd+K`) to trigger inline, state-synced components.

## 5. Closed-Loop Verification Gate (Definition of Done)
1. Run `npm run audit:all` (`node scripts/detect-slop.mjs && node scripts/verify-spec.mjs`) after every UI edit (in Antigravity, Cursor, Windsurf, Codex, or Claude Code). Exit code `2` means AI slop tells or spec drift were found—fix every reported line before finishing.
2. Inspect the live rendered build using `chrome-devtools-mcp` across `360x800` (mobile) and `1440x900` (desktop) viewports, confirm zero console errors, and verify the 25% grayscale Silhouette Test.
