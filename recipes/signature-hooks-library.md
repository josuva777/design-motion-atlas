# Signature Visual & Interactive Hooks Library (16 Anti-Slop Centerpieces)

Every award-winning website or app has **at least one signature interactive detail** rooted in its subject matter—not generic floating blobs or stock card grids. Pick 1 or 2 hooks from this catalog for every project's `recipes/ui-recipe.yaml`:

## A. Art, Editorial, Architecture & Portfolio Hooks
1. **Render-to-CAD Blueprint Loupe**: Hovering over an architectural or product photo reveals the underlying SVG wireframe/CAD elevation inside a smooth cursor-tracked circular SVG `<mask>` (`gsap.quickTo`).
2. **Archival Index-to-Canvas Curtain Preview**: A crisp tabular list of works where hovering any row unmasks a floating image plate (`clip-path: inset(0% 0% 0% 0%)`) that trails pointer velocity with subtle tilt.
3. **Variable Font Weight Scroll Scrub**: Linking `font-variation-settings: 'wght'` on a free variable display font (from [Fontshare](https://www.fontshare.com/) or [UNCUT.wtf](https://uncut.wtf/)) directly to [Lenis](https://lenis.dev/) scroll velocity or pointer X/Y coordinates.
4. **Exhibition Lightbox View-Transition Morph**: Clicking a gallery thumbnail invokes `document.startViewTransition()` to morph the image seamlessly into a full-bleed curatorial reading view with zero layout jump.

## B. SaaS, Fintech, DevTools & Data Precision Hooks
5. **Cross-Card Telemetry Hairline Sync**: Hovering a timestamp in one chart draws a 1px vertical hairline across all stacked metric cards and updates their tabular numerals (`tabular-nums`) in lockstep.
6. **Interactive Latency / Pricing Scrubber**: Instead of a static 3-tier pricing row, provide a tactile drag scrubber with haptic-style tick marks that dynamically recalculates architecture nodes and costs in real time.
7. **Live AST / Code-to-UI Split Lens**: For developer tools, hovering a line of configuration code highlights the exact corresponding live UI element on the adjacent stage with a 1px accent bounding box and coordinate badge.
8. **Keyboard-First Shortcut HUD**: Holding `Alt` or `Cmd` illuminates subtle `[1]`, `[2]`, `[K]` monospace keycap badges across interactive controls for instant power-user navigation.

## C. WebGL, 3D, Gaming & Flagship Launch Hooks
9. **Scroll-Scrubbed All-Intra Frame Sequence**: Pinning an HTML5 `<canvas>` via GSAP `ScrollTrigger` (`start: "top top"`, `scrub: 0.5`) to scrub through 90 compressed `.webp` product frames at 60fps on both desktop and mobile.
10. **Pointer-Reactive Chromatic Displacement Shader**: Using Three.js / React Three Fiber to apply subtle refraction and chromatic aberration only around the cursor's velocity vector while keeping rest states razor-sharp.
11. **Diegetic Telemetry Cipher Decode**: Triggering a 200ms monospace character-scramble reveal (using [React Bits](https://reactbits.dev/) or [Motion Primitives](https://github.com/ibelick/motion-primitives)) when technical specifications enter the 85% viewport threshold.
12. **3D Exploded Hardware Assembly**: Scrubbing scroll progress separates a 3D GLTF model's layers along the Z-axis while anchoring HTML callout lines to projected 3D bone coordinates.

## D. Consumer Apps, E-Commerce & Integrated AI Agent Hooks
13. **Liquid-Glass `Cmd+K` Intent Bar (Zero Corner Chat Bubbles)**: Replacing the floating bottom-right chatbot icon with a centered, keyboard-first command bar (`blocks/agentic-ui/LiquidCommandBar.tsx`) that streams inline [AG-UI](https://docs.ag-ui.com/introduction) state cards directly into the workspace.
14. **Tactile Material Swatch Ambient Shift**: Clicking a product swatch (e.g., Brushed Titanium, Espresso Leather, Raw Linen) updates CSS root OKLCH surface tokens so the entire page's ambient light adapts to the material.
15. **Magnetic Spring Action Dock**: A bottom or side tool dock where icons scale and pull magnetically toward the pointer within a `64px` radius using spring physics (`stiffness: 400, damping: 28`).
16. **Inline Human-in-the-Loop Diff Approval Card**: When an integrated AI agent proposes an edit or action, it renders an interactive side-by-side diff card with instant `[Approve ↵]` and `[Modify ⌘E]` keyboard actions.
