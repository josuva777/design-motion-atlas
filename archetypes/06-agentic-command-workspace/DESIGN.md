# DESIGN.md — Integrated AI Agent & Autonomous Command Workspace (`06-agentic-command-workspace`)

## 1. Domain Vernacular, Spatial Grid & Proportions
- **Archetype ID**: `06-agentic-command-workspace`
- **Grid Architecture**: Canvas-first multi-pane artifact stage + centered `Cmd+K` `LiquidCommandBar.tsx` + inline AG-UI / A2UI streaming state cards.
- **Column Count**: `12` columns
- **Minimum Open Canvas / Whitespace Ratio**: `25%`
- **Maximum Allowed Border Radius**: `6px`

## 2. 100% Free Commercial Typography Scale
- **Display Headline (`--font-display`)**: `Uncut Sans` (`clamp(2.5rem, 5vw, 5.25rem)`, line-height `0.95`, letter-spacing `-0.03em`)
- **UI & Body Copy (`--font-sans`)**: `Satoshi` (`1rem–1.125rem`, line-height `1.6`, max measure `65ch`)
- **Technical / Tabular Data (`--font-mono`)**: `Fragment Mono` (`0.75rem–0.875rem`, `font-variant-numeric: tabular-nums`)

## 3. Semantic OKLCH Color Tokens (Synced with `src/styles/globals.css`)
- `--color-surface-canvas`: `oklch(0.12 0.01 255)`
- `--color-surface-elevated`: `oklch(0.17 0.012 255)`
- `--color-ink-primary`: `oklch(0.95 0.005 255)`
- `--color-ink-muted`: `oklch(0.64 0.01 255)`
- `--color-accent-primary`: `oklch(0.70 0.16 195)`
- `--color-border-hairline`: `oklch(0.25 0.012 255)`

## 4. Motion Physics & Required Atlas Blocks
- **Scroll & Choreography Engine**: `native-pane-scroll`
- **Duration Envelope**: `160ms` to `380ms`
- **Primary Easing Curve**: `cubic-bezier(0.22, 1, 0.36, 1)`
- **Required Atlas `.tsx` Blocks**:
  - `blocks/agentic-ui/LiquidCommandBar.tsx`
  - `blocks/in-app-feedback/DynamicStatusIslandToast.tsx`

## 5. Domain Component Blueprints
- **CommandBar**: `LiquidCommandBar.tsx` (`⌘K`) dispatching typed intents and showing live agent execution status.
- **ToolCallTimeline**: Collapsible step-by-step trace showing tool inputs, latency (`142ms`), and inline `[Approve ↵]` diff gates.
- **GenerativeStage**: Controlled Generative UI surface rendering typed React cards instead of walls of chat text.

## 6. Domain-Specific Anti-Patterns (Strictly Banned)
- Never bolt a generic bottom-right chatbot bubble onto the screen; never let the runtime LLM inject raw unstyled HTML.
