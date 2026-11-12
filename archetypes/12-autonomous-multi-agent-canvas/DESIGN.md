# Archetype 12 — Autonomous Multi-Agent Canvas (AG-UI + Google A2UI + XYFlow)
## 1. Domain Vernacular & Materiality
Built for visual multi-agent DAG orchestration (`@xyflow/react`), live `AG-UI` event streaming, declarative Google `A2UI` native widget rendering, and sandboxed `MCP Apps` (`ui://`) surfaces. Inspired by industrial control rooms and circuit schematics with 1px structural hairlines and zero chat-bubble clutter.
## 2. Color Palette (OKLCH Semantic Roles)
- **Surface Canvas**: `oklch(0.12 0.010 260)` (Schematic Carbon)
- **Surface Elevated**: `oklch(0.17 0.012 260)` (Node Surface Slate)
- **Ink Primary**: `oklch(0.96 0.005 90)` (Signal Alabaster)
- **Ink Secondary**: `oklch(0.74 0.010 260)` (Edge Telemetry Gray)
- **Ink Muted**: `oklch(0.54 0.012 260)` (Idle Node Label)
- **Accent Primary**: `oklch(0.72 0.170 152)` (Verified Execution Emerald)
- **Border Hairline**: `oklch(0.24 0.012 260)` (1px DAG Conduit Rule)
## 3. Typography & Scannable Hierarchy
- **Display Font**: `Space Grotesk` (600/700 weight for surface headers and node titles)
- **Sans Font**: `Plus Jakarta Sans` (declarative widget labels and approval copy)
- **Mono Font**: `JetBrains Mono` (`tabular-nums` on token latency, cost counters, and JSONL surface IDs)
## 4. Layout & Spatial Architecture
- **Viewport Budget**: Infinite pan/zoom node canvas or split-pane declarative surface inspector with 1px exposed borders.
- **Border Radius**: `2px` technical precision corners.
- **Whitespace Budget**: Minimum 28% open schematic canvas around active agent nodes.
## 5. Signature Visual Detail & Motion Physics
- **Declarative A2UI Surface Morph & Diff Gate**: Backend agents stream JSONL adjacency lists (`A2UISurfaceRenderer.tsx`) and pause on destructive tool calls with inline human-in-the-loop diff cards (`InlineDiffApprovalCard.tsx`).
