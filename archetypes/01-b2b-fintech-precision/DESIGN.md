# DESIGN.md — B2B, Fintech & Institutional Precision (`01-b2b-fintech-precision`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `01-b2b-fintech-precision`
- **Grid Architecture**: 12-col 1px structural hairline matrix (`border-border-hairline`) with sticky left command rail (240px) and dense multi-pane telemetry canvas.
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `22%`
- **Maximum Allowed Border Radius**: `4px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Clash Grotesk` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `Satoshi` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Commit Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.985 0.003 250)`
- `--color-surface-elevated`: `oklch(1 0 0)`
- `--color-ink-primary`: `oklch(0.14 0.015 255)`
- `--color-ink-muted`: `oklch(0.48 0.012 255)`
- `--color-accent-primary`: `oklch(0.46 0.18 250)`
- `--color-border-hairline`: `oklch(0.89 0.006 250)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `native-overflow-with-lenis-optional`
- **Duration Envelope**: `120ms` to `240ms`
- **Primary Easing Curve**: `cubic-bezier(0.22, 1, 0.36, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/in-app-loaders/ChoreographedSkeletonLoader.tsx`
  - `blocks/agentic-ui/LiquidCommandBar.tsx`

## 5. Domain Component Blueprints
- **Navbar**: Top 48px high-density bar with breadcrumb path, live environment badge (`PROD`), and `⌘K` trigger.
- **PrimaryStage**: Split 8:4 ledger and chart stage with synchronized crosshair hairlines and `tabular-nums` on every figure.
- **InteractiveTable**: Row height 36px, keyboard arrow-key navigation, sticky column headers, inline diff sparklines.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never use bouncy spring physics on financial tables; never center-align multi-line body copy; never hide critical filter controls inside nested hamburger menus on desktop.
