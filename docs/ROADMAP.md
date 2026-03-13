# Roadmap

## Phase 0 - Foundation

Goal: replace the starter scaffold with a project structure and toolchain that match the product vision.

- Define vision, architecture, and agent workflow
- Build a real app shell with header, workspace, and panels
- Add design tokens and theme primitives
- Move to a faster modern toolchain for development and testing

Owners: Product Agent, Architecture Agent, Design Agent

## Phase 1 - MVP Editor

Goal: deliver a strong first writing experience.

- Integrate CodeMirror as the editing surface
- Add markdown preview with `react-markdown`
- Support split view and single-pane modes
- Add a formatting toolbar for common markdown actions
- Add local autosave and restore last draft

Owners: Editor Agent, Preview Agent, Storage Agent, UX Agent

## Phase 2 - Writing Quality

Goal: make the editor feel deliberate and enjoyable for sustained use.

- Improve typography and document styling
- Add resizable panes and layout persistence
- Add document outline/headings navigation
- Add code block polish, tables, task lists, and footnotes
- Add focused writing mode and distraction reduction tools

Owners: Design Agent, UX Agent, Preview Agent, Storage Agent

## Phase 3 - Power Features

Goal: move from capable editor to serious writing workspace.

- Add command palette
- Add customizable shortcuts and toolbar configuration
- Add theme presets and user-defined theme tokens
- Add export paths for HTML and Markdown packages
- Add multi-document support and document switching

Owners: Product Agent, Editor Agent, Design Agent, Storage Agent

## Phase 4 - Advanced Workspace

Goal: rival established editors on flexibility and depth.

- Add plugin or extension-friendly APIs
- Add publish/export workflows
- Add desktop packaging readiness
- Add sync-ready abstractions for future cloud/file integrations
- Add performance tuning for very large documents

Owners: Architecture Agent, Performance Agent, Release Agent

## Definition Of MVP Done

- App shell is no longer starter content
- Development and test workflow uses modern tooling
- User can write markdown in a professional editor surface
- User can preview rendered markdown live
- Workspace supports at least two layout modes
- Draft content persists locally and restores reliably
- Theme system exists as tokens, not ad hoc colors

## Immediate Next Steps

1. Build the app shell and design token foundation
2. Integrate editor and preview panes
3. Add autosave and layout persistence
4. Refine visual system and keyboard workflows
