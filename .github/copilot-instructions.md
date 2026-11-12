# GitHub Copilot Anti-Slop Design & Motion Instructions

Always read and obey [AGENTS.md](../AGENTS.md) at the root of this repository before creating or modifying any UI, CSS, React, Three.js, or animation files.
- Never use P0 or P1 AI slop patterns (`Inter`/`Roboto`, `bg-indigo-*`/`bg-purple-*`/`bg-fuchsia-*`, `bg-clip-text` gradient text, hardcoded hex colors in `.tsx`, centered hero over 3 icon cards, fake macOS window dots, or `transition-all`).
- Always route new projects through one of the 10 Domain Archetypes in `archetypes/` and generate a 4-source `recipes/ui-recipe.yaml`.
- Run `npm run audit:all` to verify zero violations before completing any task.
