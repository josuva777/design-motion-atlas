---
paths:
  - "src/**/agent*/**/*.tsx"
  - "src/**/copilot*/**/*.tsx"
  - "blocks/agentic-ui/**/*.tsx"
---

# Integrated Agentic UI & Controlled Generative UI Rules

1. **Ban Corner Chat-Bubble Slop**:
   - Never add a floating bottom-right chat widget unless explicitly requested by the user.
   - Use `blocks/agentic-ui/LiquidCommandBar.tsx` (`Cmd+K`) or an inline workspace rail.
2. **Controlled Generative UI (`CopilotKit` / `AG-UI` / `A2UI`)**:
   - The runtime LLM must never output raw unstyled HTML or arbitrary Tailwind classes.
   - Bind agent tool calls to pre-built, token-compliant React components in `blocks/` via typed JSON props.
3. **Human-in-the-Loop State Visibility**:
   - Visualize agent states (`idle`, `thinking`, `streaming-ui`, `awaiting-approval`) using subtle surface border pulses or inline diff cards rather than plain "Thinking..." text spinners.
