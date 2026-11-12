# DESIGN.md — Tactile Consumer Web & Mobile Super-App (Zomato / Swiggy / Airbnb Grade) (`04-tactile-consumer-app`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `04-tactile-consumer-app`
- **Grid Architecture**: Mobile-first 4-column thumb-zone layout (`max-w-md` on mobile, split feed + sticky map/cart drawer on desktop) with strict `44x44px` minimum touch targets.
- **Column Count**: `4` columns
- **Minimum Open Canvas / Whitespace Ratio**: `20%`
- **Maximum Allowed Border Radius**: `16px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Cabinet Grotesk` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `Switzer` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Commit Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.975 0.004 100)`
- `--color-surface-elevated`: `oklch(1 0 0)`
- `--color-ink-primary`: `oklch(0.16 0.01 260)`
- `--color-ink-muted`: `oklch(0.50 0.01 260)`
- `--color-accent-primary`: `oklch(0.58 0.20 265)`
- `--color-border-hairline`: `oklch(0.90 0.005 100)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `native-momentum-with-spring-sheets`
- **Duration Envelope**: `180ms` to `520ms`
- **Primary Easing Curve**: `back.out(1.4)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/in-app-commerce/TactileCartCounterPill.tsx`
  - `blocks/in-app-sheets/SpringBottomSheetModal.tsx`
  - `blocks/in-app-loaders/ChoreographedSkeletonLoader.tsx`
  - `blocks/in-app-feedback/DynamicStatusIslandToast.tsx`

## 5. Domain Component Blueprints
- **ItemCard**: High-contrast dish/product card with `TactileCartCounterPill.tsx` (`ADD +` morphing into `− / 1 / +` odometer stepper).
- **DetailPopup**: `SpringBottomSheetModal.tsx` supporting velocity-aware touch drag-to-dismiss (`>110px` threshold) and elastic snap-back.
- **LiveOrderBar**: `DynamicStatusIslandToast.tsx` + floating bottom checkout pill (`1 ITEM ADDED • View Cart →`).

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never show a blank white screen or raw spinning circle during API fetches (always render `ChoreographedSkeletonLoader.tsx`); never mount popups without spring entrance and swipe-down dismissal.
