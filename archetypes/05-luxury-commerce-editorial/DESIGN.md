# DESIGN.md — Luxury E-Commerce, High Fashion & Bespoke Objects (`05-luxury-commerce-editorial`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `05-luxury-commerce-editorial`
- **Grid Architecture**: Editorial lookbook split (7-column vertical photography stream + 5-column sticky atelier specification & bag drawer).
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `35%`
- **Maximum Allowed Border Radius**: `2px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Sentient` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `General Sans` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Necto Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.95 0.01 75)`
- `--color-surface-elevated`: `oklch(0.98 0.005 75)`
- `--color-ink-primary`: `oklch(0.14 0.01 50)`
- `--color-ink-muted`: `oklch(0.45 0.01 50)`
- `--color-accent-primary`: `oklch(0.35 0.08 45)`
- `--color-border-hairline`: `oklch(0.86 0.01 75)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `lenis + view-transitions-api`
- **Duration Envelope**: `450ms` to `850ms`
- **Primary Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/smooth-scroll/SmoothScrollProvider.tsx`
  - `blocks/in-app-sheets/SpringBottomSheetModal.tsx`

## 5. Domain Component Blueprints
- **LookbookHero**: Full-bleed portrait editorial framing with subtle `scale(1.06 -> 1.0)` curtain unmask.
- **MaterialSelector**: Tactile swatch pills that shift ambient `--color-surface-canvas` tint and cross-fade macro texture plates.
- **AtelierBagDrawer**: Slide-over specification & checkout drawer with odometer subtotal updates.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never use cheap e-commerce urgency gimmicks (flashing red timers, spinning prize wheels); never crowd product photography with overlapping badges.
