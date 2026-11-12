# DESIGN.md — Art Gallery, Creative Atelier & Cultural Exhibition (`02-art-editorial-atelier`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `02-art-editorial-atelier`
- **Grid Architecture**: Asymmetric 4:8 or 5:7 Swiss exhibition grid with >38% open museum chalk canvas, zero border-radius (`0px` sharp photographic plates), and sticky catalog index.
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `38%`
- **Maximum Allowed Border Radius**: `0px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Zodiak` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `Cabinet Grotesk` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Necto Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.985 0.002 240)`
- `--color-surface-elevated`: `oklch(0.955 0.004 240)`
- `--color-ink-primary`: `oklch(0.12 0.005 240)`
- `--color-ink-muted`: `oklch(0.45 0.01 240)`
- `--color-accent-primary`: `oklch(0.42 0.23 262)`
- `--color-border-hairline`: `oklch(0.86 0.005 240)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `lenis + gsap-scrolltrigger`
- **Duration Envelope**: `600ms` to `950ms`
- **Primary Easing Curve**: `cubic-bezier(0.76, 0, 0.24, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/smooth-scroll/SmoothScrollProvider.tsx`
  - `blocks/text-reveal/EditorialCurtainTitle.tsx`

## 5. Domain Component Blueprints
- **Navbar**: Minimal corner-anchored exhibition index (`[01] Works`, `[02] Monograph`, `[03] Archive`) with zero background fill.
- **PrimaryStage**: Asymmetric full-bleed plate paired with curatorial catalog metadata (`Medium`, `Dimensions`, `Year`) in `Necto Mono`.
- **ArchiveIndex**: Full-width tabular row list where hovering a title unmasks a floating `clip-path` image plate.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never use Cream + Terracotta palettes (a known P1 AI tell); never round image corners (`rounded-xl` is strictly banned in this archetype); never add SaaS badge pills or drop shadows.
