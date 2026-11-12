# DESIGN.md — Kinetic Brutalism, Indie Culture & Music/Festival (`07-kinetic-brutalist-experimental`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `07-kinetic-brutalist-experimental`
- **Grid Architecture**: Exposed `2px solid` high-contrast structural grid (`0px` radius) with oversized display typography and hard-cut hover inversions.
- **Column Count**: `8` columns
- **Minimum Open Canvas / Whitespace Ratio**: `18%`
- **Maximum Allowed Border Radius**: `0px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Outward` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `Uncut Sans` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Martian Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.97 0.005 95)`
- `--color-surface-elevated`: `oklch(0.12 0.005 95)`
- `--color-ink-primary`: `oklch(0.11 0.005 95)`
- `--color-ink-muted`: `oklch(0.42 0.005 95)`
- `--color-accent-primary`: `oklch(0.62 0.24 28)`
- `--color-border-hairline`: `oklch(0.11 0.005 95)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `lenis-velocity-skew`
- **Duration Envelope**: `80ms` to `220ms`
- **Primary Easing Curve**: `cubic-bezier(0.25, 1, 0.5, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/smooth-scroll/SmoothScrollProvider.tsx`
  - `blocks/text-reveal/EditorialCurtainTitle.tsx`

## 5. Domain Component Blueprints
- **MarqueeHeader**: Velocity-reactive kinetic ticker that accelerates with Lenis scroll speed.
- **LineupGrid**: Interactive cells that hard-invert background and ink colors (`0ms–80ms`) on pointer enter while playing preview loops.
- **TicketDrawer**: `SpringBottomSheetModal.tsx` styled with `2px solid` stark borders and monospace barcode stubs.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never use soft blurred shadows or pastel gradients; never soften edges with border-radius.
