---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# Free Commercial Typography & Asymmetric Spatial Grid Rules

1. **100% Free Commercial Foundry Requirement**:
   - Load fonts exclusively from [Fontshare](https://www.fontshare.com/), [UNCUT.wtf](https://uncut.wtf/), or [Velvetyne](https://velvetyne.fr/) as defined in the active archetype's `DESIGN.md`.
   - Never fall back to `Inter`, `Roboto`, `Arial`, or `system-ui` for primary headlines or body text.
2. **Modular Scale & Measure**:
   - Keep body copy between `55ch` and `68ch` (`max-w-[65ch]`).
   - Apply `tabular-nums` (`font-variant-numeric: tabular-nums`) on all numbers, prices, counters, and table cells.
3. **Anti-Template Grid Geometry**:
   - Avoid uniform 3-column icon-card rows. Use asymmetric splits (`4:8`, `5:7`), exposed `1px` structural hairlines (`border-border-hairline`), or sticky index rails that pass the 25% grayscale Silhouette Test.
