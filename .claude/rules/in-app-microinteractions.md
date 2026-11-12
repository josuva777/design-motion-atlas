---
paths:
  - "src/**/*.tsx"
  - "app/**/*.tsx"
  - "components/**/*.tsx"
  - "blocks/**/*.tsx"
---

# In-App Consumer Micro-Interactions, Popups & Loading Choreography Rules

Whenever building a mobile app, consumer web app, e-commerce flow (like Zomato, Swiggy, Airbnb, or Uber), or interactive SaaS product:

1. **Ban Dead Spinners & Abrupt Popups**:
   - NEVER render a plain `"Loading..."` text label or an unstyled spinning circle for page/feed loads. Always use `blocks/in-app-loaders/ChoreographedSkeletonLoader.tsx`.
   - NEVER mount modals or drawers with instant `display: block` jumps. Always use `blocks/in-app-sheets/SpringBottomSheetModal.tsx` with spring entrance and swipe-to-dismiss physics.
2. **Tactile Commerce & Counter Physics**:
   - Every counter, cart button, or rating action must provide immediate `<16ms` tactile press feedback (`scale(0.94)`) and odometer-style vertical digit transitions (`blocks/in-app-commerce/TactileCartCounterPill.tsx`) with `tabular-nums`.
3. **Self-Growing Block Library (`npm run add:block`)**:
   - Whenever you create a new high-craft hero, popup modal, sheet, or loader component for a project, save a clean, token-based copy into `blocks/<category>/<ComponentName>.tsx` and run `npm run add:block -- --name "<slug>" --path "blocks/<category>/<ComponentName>.tsx"` so `registry.json` indexes it for all future projects.
