# Motion Specification: Zomato / Swiggy / Airbnb Grade In-App Micro-Interactions

Use this specification whenever building mobile apps, PWAs, super-apps, food/commerce apps, or interactive web apps so every tap, popup, skeleton loader, and checkout transition feels tactile and alive.

## 1. Add-to-Cart Button -> Stepper Morph + Floating Cart Pill (`TactileCartCounterPill.tsx`)
- **Rest State**: Compact `ADD +` button (`min-h-[44px] min-w-[104px]`).
- **First Tap (`0 -> 1`)**:
  - Button scales `0.93 -> 1.0` (`320ms`, `elastic.out(1.1, 0.5)`) and morphs background to `bg-accent-primary`.
  - Bottom Floating Checkout Bar (`View Cart ->`) slides up from `yPercent: 120` to `yPercent: 0` (`420ms`, `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Increment / Decrement (`1 -> 2 -> 3`)**:
  - Numbers roll vertically like a mechanical odometer (`yPercent: 90 -> 0` on increment, `yPercent: -90 -> 0` on decrement, `240ms`, `back.out(2)`) with `tabular-nums` so button width never jitters.

## 2. Velocity-Aware Spring Bottom Sheets & Popup Modals (`SpringBottomSheetModal.tsx`)
- **Mobile (`<640px`)**: Slides up from bottom edge (`yPercent: 100 -> 0`, `520ms`, `back.out(1.15)`). Supports touch-drag down: if released past `110px` threshold, dismisses at `260ms`; if released early, snaps back with `elastic.out(1, 0.55)`.
- **Desktop (`>=640px`)**: Morphs in from `scale(0.96)` and `opacity: 0` while backdrop dims smoothly over `280ms`.

## 3. Choreographed Shimmer Skeletons -> Staggered Unmask (`ChoreographedSkeletonLoader.tsx`)
- **Never show a blank screen or raw browser spinner**: Render structural skeleton cards matching the exact geometry of the incoming content.
- **Unmask Transition**: When data resolves, cross-fade and slide content up `14px -> 0px` over `480ms` (`expo.out`).

## 4. Dynamic Status Island & Live Order Tracker (`DynamicStatusIslandToast.tsx`)
- **State Transitions (`Order Placed` -> `Kitchen Preparing` -> `Rider Arriving`)**:
  - Pill container springs from `scale(0.9)` to `scale(1)` (`420ms`, `back.out(1.6)`) while updating the right-hand tabular ETA badge (`14 MINS`).
