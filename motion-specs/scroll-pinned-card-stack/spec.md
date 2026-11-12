# Motion Specification: Lenis + GSAP ScrollTrigger Pinned Card Stack

1. **Layout & Structure**:
   - Outer stage (`min-h-screen`) pinned via GSAP `ScrollTrigger` while 3–4 asymmetric domain cards stack progressively along the Y-axis with `1px` hairline borders (`border-border-hairline`).
2. **Motion Math**:
   - Scroll distance: `+=${cards.length * 85}%`.
   - Scrub smoothing: `scrub: 0.6` synced to `Lenis` (`lerp: 0.085`).
   - Background cards scale down subtly (`scale: 0.96`, `opacity: 0.65`) as the next card enters from `yPercent: 100`.
3. **Accessibility (`prefers-reduced-motion: reduce`)**:
   - Unpin the stage via `gsap.matchMedia()` and render the cards in a clean static vertical editorial grid.
