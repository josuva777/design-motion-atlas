---
paths:
  - "src/**/*.tsx"
  - "src/**/*.ts"
  - "src/**/*.glsl"
  - "blocks/**/*.tsx"
---

# Choreographed Motion, Smooth Scroll & WebGL Engineering Rules

1. **Single Scroller Sync (`Lenis` + `GSAP ScrollTrigger`)**:
   - Always wrap scrolling pages in `blocks/smooth-scroll/SmoothScrollProvider.tsx`.
   - Never run multiple independent scroll listeners or legacy Locomotive Scroll.
2. **The 85% Viewport Trigger Rule**:
   - Set `start: "top 85%"` on all `ScrollTrigger` reveals so elements begin animating smoothly as they enter the bottom of the viewport.
3. **React Lifecycle Cleanup**:
   - Always use `@gsap/react` `useGSAP()` paired with `gsap.matchMedia()` so animations clean up on unmount and fall back to a `<=150ms` opacity fade when `(prefers-reduced-motion: reduce)` is active.
4. **WebGL & Three.js Guardrails**:
   - Isolate Three.js / React Three Fiber canvases in `"use client"` components imported via `next/dynamic({ ssr: false })`.
   - Cap `dpr={[1, 1.5]}` and mutate shader uniforms inside `useFrame` via `ref.current` (never trigger React state re-renders at 60fps).
