# DESIGN.md — Architecture, Industrial Design & Sustainable Engineering (`09-architecture-industrial-minimal`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `09-architecture-industrial-minimal`
- **Grid Architecture**: Swiss architectural blueprint grid with visible coordinate indices (`A1`, `B2`, `C3`), golden-ratio image frames, and CAD elevation dividers.
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `36%`
- **Maximum Allowed Border Radius**: `0px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Switzer` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `Switzer` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Azeret Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.94 0.01 85)`
- `--color-surface-elevated`: `oklch(0.97 0.006 85)`
- `--color-ink-primary`: `oklch(0.18 0.01 70)`
- `--color-ink-muted`: `oklch(0.47 0.01 70)`
- `--color-accent-primary`: `oklch(0.45 0.11 150)`
- `--color-border-hairline`: `oklch(0.82 0.012 80)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `lenis + gsap-scrolltrigger`
- **Duration Envelope**: `500ms` to `850ms`
- **Primary Easing Curve**: `cubic-bezier(0.25, 1, 0.5, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/smooth-scroll/SmoothScrollProvider.tsx`
  - `blocks/text-reveal/EditorialCurtainTitle.tsx`

## 5. Domain Component Blueprints
- **BlueprintHeader**: Coordinate-indexed navigation bar displaying project latitude/longitude, completion year, and structural area (`m²`).
- **ElevationLoupe**: Interactive split-slider or cursor loupe comparing finished architectural photography against vector CAD linework.
- **MaterialSpecTable**: Precision specification ledger with `1px` hairlines and downloadable CAD/BIM sheet drawer.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never use playful bounce easing on architectural elevations; never obscure structural photography with heavy gradients.
