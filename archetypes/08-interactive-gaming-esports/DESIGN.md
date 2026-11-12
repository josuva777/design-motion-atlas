# DESIGN.md — Interactive Gaming, Worldbuilding & Esports HUD (`08-interactive-gaming-esports`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `08-interactive-gaming-esports`
- **Grid Architecture**: Diegetic HUD viewport frame with corner telemetry readouts, chamfered `clip-path` cards, and layered parallax depth planes.
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `24%`
- **Maximum Allowed Border Radius**: `2px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Panchang` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `General Sans` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Steps-Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.09 0.015 240)`
- `--color-surface-elevated`: `oklch(0.14 0.02 240)`
- `--color-ink-primary`: `oklch(0.96 0.01 200)`
- `--color-ink-muted`: `oklch(0.60 0.02 240)`
- `--color-accent-primary`: `oklch(0.78 0.18 145)`
- `--color-border-hairline`: `oklch(0.26 0.03 220)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `lenis + gsap-scrolltrigger`
- **Duration Envelope**: `140ms` to `420ms`
- **Primary Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/hero-stage/ScrollPinnedHeroStage.tsx`
  - `blocks/in-app-feedback/DynamicStatusIslandToast.tsx`

## 5. Domain Component Blueprints
- **HudFrame**: Fixed viewport perimeter reticle with live coordinates, server ping badge, and keybind hints (`[ESC]`, `[TAB]`).
- **LoadoutStage**: Interactive roster/loadout selector with `180ms` monospace cipher-decode text transitions.
- **MatchTicker**: `DynamicStatusIslandToast.tsx` streaming live tournament scores and map states.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never use flat corporate SaaS cards inside a game HUD; keep all numerical stats in `tabular-nums` monospace.
