# Architecture

## Current State

The repository now has a first real application shell: a CodeMirror editor pane, a live markdown preview, persisted workspace preferences, and local draft autosave. The next step is to deepen this structure rather than falling back into a single-file app shell.

## Guiding Architecture Principles

- Keep the editor core isolated from presentation chrome.
- Separate document state, UI preferences, and rendering concerns.
- Build around reusable primitives so customization does not become tangled.
- Prefer local-first persistence now, but keep abstractions ready for future file or cloud backends.

## Proposed Source Structure

```text
src/
  app/
    AppShell.tsx
    sampleDocument.ts
    storageKeys.ts
    types.ts
  components/
    editor/
      EditorPane.tsx
    layout/
      WorkspaceHeader.tsx
    preview/
      PreviewPane.tsx
    toolbar/
      FormattingToolbar.tsx
  features/
    document/
      document.ts
      useDocumentState.ts
    theme/
      theme.ts
    workspace/
      useWorkspacePreferences.ts
  lib/
    editor/
      markdownCommands.ts
    persistence/
      localStorage.ts
```

## Core Domains

### Document Domain

Owns markdown content, dirty state, last saved timestamp, draft restoration, and document metadata.

Suggested state:

- `content`
- `title`
- `isDirty`
- `lastSavedAt`
- `activeDocumentId`

### Workspace Domain

Owns layout mode, panel visibility, pane sizes, focused mode, and UI preferences.

Suggested state:

- `layoutMode` (`editor`, `split`, `preview`)
- `sidebarOpen`
- `toolbarVisible`
- `focusMode`
- `paneSizes`

### Theme Domain

Owns theme tokens, typography choices, density, and future user customization.

Suggested state:

- `themeId`
- `fontScale`
- `fontFamilyBody`
- `fontFamilyMono`
- `density`
- `radiusScale`

## Suggested Implementation Layers

- UI shell: top-level frame, layout containers, navigation, and settings surfaces
- Editing layer: CodeMirror integration and markdown command helpers
- Rendering layer: markdown parsing and preview component composition
- Persistence layer: local storage or IndexedDB adapters and migration helpers
- Preference layer: theme and workspace settings persistence

## Persistence Strategy

Start simple:

- `localStorage` for theme and workspace preferences
- `localStorage` or `IndexedDB` for draft content

Recommended progression:

1. `localStorage` for MVP simplicity
2. move documents to `IndexedDB` when multi-document support arrives
3. add import/export adapters before any sync features

## Styling Strategy

- Use `sass` for tokens, theme maps, and layout styles
- Define CSS custom properties from theme tokens at the app root
- Separate semantic tokens from raw palette values
- Treat markdown content styles as a first-class module, not generic prose defaults

## State Management Recommendation

Begin with React state and context split by domain. If complexity grows, introduce a lightweight store only after the boundaries are clear.

Recommended next shared boundaries:

- `DocumentProvider` when commands, title editing, or multi-document state grows
- `WorkspaceProvider` when panel sizing or focus mode moves beyond local shell state
- `ThemeProvider` when token authoring becomes richer than persisted presets

## Key Early Components

- `AppShell`
- `WorkspaceHeader`
- `EditorPane`
- `PreviewPane`
- `FormattingToolbar`
- `LayoutSwitcher`
- `ThemePanel`

## Near-Term Risks

- Overbuilding before the first usable editor exists
- Letting theme logic sprawl across components
- Mixing markdown rendering concerns directly into editor code
- Designing for plugins too early instead of creating clean boundaries first

## Recommended Build Order

1. Strengthen the current shell into reusable primitives
2. Add richer markdown rendering and editor ergonomics
3. Introduce provider boundaries when cross-component state actually emerges
4. Add focus mode, outline, and export workflows
5. Grow persistence from single draft to multi-document storage
6. Expand theme customization beyond presets and scale
