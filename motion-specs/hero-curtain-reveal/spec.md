# Motion Specification: Editorial Curtain & Headline Reveal

1. **Layout & Structure**:
   - Headline lines are wrapped in `<span class="block overflow-hidden"><span class="block will-change-transform">...</span></span>`.
   - Hero artwork sits inside a container with `clip-path: inset(100% 0% 0% 0%)`.
2. **Design Tokens**:
   - Easing: `var(--ease-in-out-curtain)` (`cubic-bezier(0.76, 0, 0.24, 1)`) for image mask; `var(--ease-out-expo)` (`cubic-bezier(0.16, 1, 0.3, 1)`) for typography.
   - Duration: `680ms` for text lines; `920ms` for hero artwork mask.
3. **Component States**:
   - **Initial (Pre-Reveal)**: Text inner span at `translate3d(0, 110%, 0) rotate(1.5deg)`; image container at `clip-path: inset(100% 0% 0% 0%)` and inner image at `scale(1.12)`.
   - **Settled (Post-Reveal)**: Text inner span at `translate3d(0, 0%, 0) rotate(0deg)`; image container at `clip-path: inset(0% 0% 0% 0%)` and inner image at `scale(1.0)`.
4. **Motion Choreography & Stagger**:
   - Line stagger: `55ms` between consecutive headline lines.
   - Artwork curtain starts `120ms` after the first headline line begins.
5. **Triggers & Interruptions**:
   - Above-the-fold hero fires on mount inside `useGSAP()`.
   - Below-the-fold sections fire via `ScrollTrigger` at `start: "top 85%"`, `once: true`.
6. **Accessibility (`prefers-reduced-motion: reduce`)**:
   - Bypass `translate3d`, `rotate`, and `clip-path` animations; execute a single `120ms` opacity fade from `0` to `1`.
7. **Acceptance Criteria**:
   - Zero layout shift (`CLS = 0.00`); animations run strictly on the GPU compositor thread at 60fps.
