# DESIGN.md — Editorial Journalism, Audio/Video Media & Scrollytelling (`10-creator-media-scrollytelling`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `10-creator-media-scrollytelling`
- **Grid Architecture**: Two-column sticky scrollytelling (5-column scrolling narrative essay driving a 7-column pinned interactive media/chart stage).
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `30%`
- **Maximum Allowed Border Radius**: `4px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Young Serif` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `Satoshi` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Commit Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.13 0.008 40)`
- `--color-surface-elevated`: `oklch(0.18 0.01 40)`
- `--color-ink-primary`: `oklch(0.94 0.008 80)`
- `--color-ink-muted`: `oklch(0.65 0.01 60)`
- `--color-accent-primary`: `oklch(0.75 0.16 70)`
- `--color-border-hairline`: `oklch(0.25 0.01 40)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `lenis + gsap-scrolltrigger-pin`
- **Duration Envelope**: `400ms` to `900ms`
- **Primary Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/smooth-scroll/SmoothScrollProvider.tsx`
  - `blocks/hero-stage/ScrollPinnedHeroStage.tsx`

## 5. Domain Component Blueprints
- **ChapterOpener**: `ScrollPinnedHeroStage.tsx` introducing each investigative chapter with full-bleed documentary framing.
- **ScrollyStage**: Pinned right-hand graphic stage that zooms and highlights specific regions as narrative paragraphs cross `50%` viewport height.
- **AudioWaveformBar**: Persistent bottom chapter scrubber with synchronized transcript highlighting.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never let narrative line measure exceed `65ch`; never desynchronize scroll chapter markers from the pinned visual stage.
