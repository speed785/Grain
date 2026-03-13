# Grain

Grain is a premium markdown editor in progress: Typora-like writing flow, Atom-like customization, and a deliberate visual system.

## Current Status

The repository is now in an MVP foundation stage. The app has a real editor shell with:

- CodeMirror-based markdown editing
- live preview with GitHub-flavored markdown tables and task lists
- split, editor-only, and preview-only layouts
- local autosave and draft restore
- persisted theme and reading scale preferences
- markdown export for the active draft

## Vision

- fast, focused markdown writing
- beautiful preview and typography
- split, editor-only, and preview-first layouts
- local-first persistence and draft recovery
- strong theming and workspace customization
- room to grow into command palette, plugins, and desktop packaging

## Project Docs

- `AGENTS.md` - project roles and collaboration workflow
- `docs/VISION.md` - product vision and quality bar
- `docs/ROADMAP.md` - phased implementation plan
- `docs/ARCHITECTURE.md` - proposed source structure and technical direction
- `docs/DEPLOYMENT.md` - production verification and static host setup

## Scripts

In the project directory, you can run:

### `npm run dev`

Starts the Vite development server.

### `npm start`

Alias for `npm run dev`.

### `npm test`

Runs Vitest.

### `npm run build`

Type-checks the app and builds it for production into `dist/`.

### `npm run preview`

Serves the production build locally for verification.

## Tech Stack

- React 19
- TypeScript with Vite
- `@uiw/react-codemirror` for the editing surface
- `react-markdown` for preview rendering
- Radix UI primitives for editor controls
- `framer-motion` for interaction polish
- `sass` for styling and theming
- Vitest for fast testing

## Quality Checks

- `npm run lint` for static analysis
- `npm test -- --run` for one-off Vitest runs
- `npm run build` for type-checking and production bundling
- GitHub Actions CI at `.github/workflows/ci.yml` runs both on pushes and pull requests

## GitHub Automation

- `.github/workflows/ci.yml` runs lint, tests, and build on `main`, `master`, `develop`, and pull requests
- `.github/workflows/branch-checks.yml` validates pull request branch naming
- `.github/workflows/deploy-pages.yml` deploys the production build to GitHub Pages from `main`
- `VITE_BASE_PATH` is supported for static deployments that need a repository subpath

## Brand Migration

- Grain now uses `grain.*` local storage keys
- A one-time migration moves saved drafts and workspace preferences from legacy `markdown-editor.*` keys on first load

## Suggested Next Step

Build on the current shell with focus mode, document outline, command palette, and multi-document persistence.
