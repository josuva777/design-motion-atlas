# Motion Specification: Tactile Magnetic Pointer & Spring Dock

1. **Layout & Structure**:
   - Interactive button or dock item with `min-h-[44px] min-w-[44px]` touch target and inner label/icon wrapper.
2. **Design Tokens**:
   - Active Pull Physics: `gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" })` and `gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" })`.
   - Elastic Snap-Back on Leave: `duration: 600ms`, `ease: "elastic.out(1, 0.4)"`.
3. **Component States (8-State Matrix)**:
   - `default`: `translate3d(0, 0, 0) scale(1)`.
   - `hover`: Pulls up to `28%` of pointer offset from center (`max ±12px`); background transitions to `bg-surface-elevated`.
   - `focus-visible`: `2px solid var(--color-accent-primary)` outline with `2px` offset.
   - `active`: `scale(0.96)` over `90ms`.
   - `disabled`: `opacity-40 pointer-events-none`.
4. **Accessibility (`prefers-reduced-motion: reduce`)**:
   - Disable pointer coordinate tracking; retain instant color and focus-ring state transitions.
