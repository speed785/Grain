## Mission

Build Grain, a best-in-class markdown editor that combines Typora's writing flow, Atom's flexibility, and a modern, customizable visual system.

## Product Principles

- Writing comes first: fast, stable, keyboard-friendly, and pleasant for long sessions.
- Beautiful by default: polished typography, layout, and motion without feeling generic.
- Customizable on purpose: themes, layout modes, toolbar options, and keybindings should be first-class features.
- Progressive complexity: start with a strong editor core, then add advanced workspace features.
- Web-first architecture: keep the app browser-native now, but avoid choices that block a later desktop wrapper.

## Working Rules For Agents

- Prefer TypeScript and explicit types over implicit behavior.
- Keep state predictable and composable; avoid hidden cross-component coupling.
- Build reusable primitives before adding one-off UI.
- Preserve responsiveness on desktop and mobile, but optimize primarily for desktop writing.
- Favor accessible keyboard interactions and clear focus states.
- Run `npm test` and `npm run build` after meaningful code changes when feasible.
- Do not add heavy dependencies without a clear architectural reason.
- Treat theming, typography, and layout tokens as part of the core architecture, not garnish.

## Agent Startup Checklist

Before making changes, agents should:

1. Read `docs/VISION.md` for product intent and `docs/ARCHITECTURE.md` for structure.
2. Inspect the current source map in `src/app`, `src/components`, `src/features`, and `src/lib`.
3. Preserve the split between document state, workspace preferences, rendering, and shell composition.
4. Prefer extending existing primitives before introducing new top-level patterns.
5. Run `npm test -- --run` and `npm run build` after meaningful work.

## Current Source Map

- `src/app/AppShell.tsx` - top-level composition and export action
- `src/components/editor` - editor pane primitives
- `src/components/preview` - preview pane primitives
- `src/components/toolbar` - formatting and workspace controls
- `src/components/layout` - shell header and layout chrome
- `src/features/document` - draft state, save status, reading metrics
- `src/features/workspace` - persisted layout, theme, and scale preferences
- `src/features/theme` - preset labels and theme-facing metadata
- `src/lib/editor` - markdown command helpers for the editor surface
- `src/lib/persistence` - storage access helpers

## Agent Roster

### 1. Product Agent

Owns product direction, feature prioritization, and scope control.

- Inputs: user goals, inspiration apps, feature requests, constraints
- Outputs: roadmap updates, feature briefs, MVP definitions
- Non-goals: implementation details unless they affect product scope

### 2. Architecture Agent

Owns application structure, state boundaries, extensibility, and long-term maintainability.

- Inputs: product requirements, current codebase, performance needs
- Outputs: folder structure, data flow, module contracts, technical decisions
- Non-goals: visual styling except where architecture affects UI composition

### 3. Editor Agent

Owns the writing surface and markdown authoring experience.

- Inputs: editor requirements, keyboard behaviors, markdown feature set
- Outputs: editor integration, commands, shortcuts, selection logic, editing affordances
- Non-goals: global app shell and unrelated persistence logic

### 4. Preview Agent

Owns markdown rendering quality and reading experience.

- Inputs: markdown syntax support, typography goals, rendering rules
- Outputs: preview rendering pipeline, code block rendering, tables, task lists, footnotes
- Non-goals: document storage or editor command system

### 5. Design Agent

Owns the visual system and customization framework.

- Inputs: product vision, inspiration references, layout constraints
- Outputs: theme tokens, typography scale, spacing, motion, layout modes, component styling direction
- Non-goals: low-level editor behavior unless it affects UX quality

### 6. UX Agent

Owns interaction quality, usability, and accessibility.

- Inputs: workflows, feature prototypes, user friction points
- Outputs: command palette behavior, keyboard flows, focus management, empty states, onboarding patterns
- Non-goals: implementation mechanics unrelated to usability

### 7. Storage Agent

Owns persistence, recovery, import/export, and document lifecycle.

- Inputs: data model, offline requirements, export/import needs
- Outputs: autosave strategy, local persistence, draft recovery, file abstractions
- Non-goals: markdown rendering decisions

### 8. Performance Agent

Owns scalability for long documents and a responsive UI.

- Inputs: render patterns, state usage, profiling findings
- Outputs: optimization plans, render isolation, lazy loading, memoization strategy
- Non-goals: feature prioritization

### 9. QA Agent

Owns verification strategy and regression prevention.

- Inputs: implemented features, acceptance criteria, bug reports
- Outputs: test plans, edge-case lists, manual QA checklists, coverage priorities
- Non-goals: defining product scope

### 10. Release Agent

Owns build reliability and delivery readiness.

- Inputs: scripts, environment needs, deployment goals
- Outputs: release checklist, deployment setup, CI suggestions, packaging readiness
- Non-goals: feature design

## Current Priorities

1. Replace the starter scaffold with a real editor application shell.
2. Establish a clean architecture for editor, preview, theming, and persistence.
3. Deliver a high-quality MVP: editor pane, preview pane, toolbar, autosave, and theme foundation.
4. Add premium workflows: command palette, layout modes, typography controls, export.
5. Expand toward advanced customization and extensibility.

## Handoff Expectations

- Product Agent defines the target.
- Architecture Agent translates it into a structure.
- Design and UX Agents shape the experience before broad feature expansion.
- Editor, Preview, and Storage Agents implement the core writing loop.
- Performance, QA, and Release Agents validate readiness before large milestones.

## Definition Of A Good Change

- Improves the writing experience, customization depth, or architectural clarity.
- Fits the long-term editor vision rather than patching the starter scaffold.
- Leaves the codebase easier to extend than before.
