# DESIGN.md — Spatial WebGL, 3D Product & AI Flagship Launch (`03-spatial-webgl-flagship`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `03-spatial-webgl-flagship`
- **Grid Architecture**: Full-viewport pinned `<canvas>` stage (`100dvh`) with overlaid semantic HTML narrative beats and corner HUD coordinate callouts.
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `32%`
- **Maximum Allowed Border Radius**: `2px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Clash Display` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `General Sans` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Fragment Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.10 0.01 265)`
- `--color-surface-elevated`: `oklch(0.15 0.014 265)`
- `--color-ink-primary`: `oklch(0.96 0.005 90)`
- `--color-ink-muted`: `oklch(0.62 0.01 265)`
- `--color-accent-primary`: `oklch(0.74 0.17 55)`
- `--color-border-hairline`: `oklch(0.23 0.015 265)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `lenis + gsap-scrolltrigger-scrub`
- **Duration Envelope**: `500ms` to `1100ms`
- **Primary Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/smooth-scroll/SmoothScrollProvider.tsx`
  - `blocks/hero-stage/ScrollPinnedHeroStage.tsx`

## 5. Domain Component Blueprints
- **Navbar**: Floating translucent technical header with FPS/scroll-depth readout and audio/motion toggle.
- **PrimaryStage**: `ScrollPinnedHeroStage.tsx` scrubbing clip-path expansion and 3D/canvas shader uniforms over `+=140%` scroll distance.
- **SpecBreakdown**: Pinned exploded hardware/architecture callout cards triggered at `start: 'top 85%'`.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never import Three.js without `next/dynamic({ ssr: false })`; never exceed `dpr={[1, 1.5]}`; never leave canvas animations running when scrolled off-screen.
