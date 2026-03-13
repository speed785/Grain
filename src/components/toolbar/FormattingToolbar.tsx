import * as Toolbar from '@radix-ui/react-toolbar';
import {
  CodeIcon,
  ColumnsIcon,
  DownloadIcon,
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  ListBulletIcon,
  Pencil1Icon,
  QuoteIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';
import type { EditorView } from '@codemirror/view';
import type { FontScale, LayoutMode, ThemeId } from '../../app/types';
import { themeLabels, fontScaleLabels } from '../../features/theme/theme';
import { prefixSelectedLines, wrapSelection } from '../../lib/editor/markdownCommands';

type FormattingToolbarProps = {
  getEditorView: () => EditorView | undefined;
  layoutMode: LayoutMode;
  onLayoutModeChange: (value: LayoutMode) => void;
  themeId: ThemeId;
  onThemeChange: (value: ThemeId) => void;
  fontScale: FontScale;
  onFontScaleChange: (value: FontScale) => void;
  isFocusMode: boolean;
  onFocusModeChange: (value: boolean) => void;
  onExportMarkdown: () => void;
  onTriggerDevError?: () => void;
};

function runCommand(getEditorView: () => EditorView | undefined, command: (view: EditorView) => void) {
  const view = getEditorView();

  if (!view) {
    return;
  }

  command(view);
}

export function FormattingToolbar({
  getEditorView,
  layoutMode,
  onLayoutModeChange,
  themeId,
  onThemeChange,
  fontScale,
  onFontScaleChange,
  isFocusMode,
  onFocusModeChange,
  onExportMarkdown,
  onTriggerDevError,
}: FormattingToolbarProps) {
  return (
    <div className="toolbar-strip">
      <Toolbar.Root aria-label="Formatting toolbar" className="toolbar-group">
        <Toolbar.Button className="toolbar-button" onClick={() => runCommand(getEditorView, (view) => wrapSelection(view, '**', '**', 'strong text'))}>
          <FontBoldIcon /> Bold
        </Toolbar.Button>
        <Toolbar.Button className="toolbar-button" onClick={() => runCommand(getEditorView, (view) => wrapSelection(view, '*', '*', 'emphasis'))}>
          <FontItalicIcon /> Italic
        </Toolbar.Button>
        <Toolbar.Button className="toolbar-button" onClick={() => runCommand(getEditorView, (view) => wrapSelection(view, '`', '`', 'inline code'))}>
          <CodeIcon /> Code
        </Toolbar.Button>
        <Toolbar.Button className="toolbar-button" onClick={() => runCommand(getEditorView, (view) => prefixSelectedLines(view, '## '))}>
          <HeadingIcon /> Heading
        </Toolbar.Button>
        <Toolbar.Button className="toolbar-button" onClick={() => runCommand(getEditorView, (view) => prefixSelectedLines(view, '> '))}>
          <QuoteIcon /> Quote
        </Toolbar.Button>
        <Toolbar.Button className="toolbar-button" onClick={() => runCommand(getEditorView, (view) => prefixSelectedLines(view, '- '))}>
          <ListBulletIcon /> List
        </Toolbar.Button>
        <Toolbar.Button className="toolbar-button" onClick={onExportMarkdown}>
          <DownloadIcon /> Export
        </Toolbar.Button>
      </Toolbar.Root>

      <div className="toolbar-group toolbar-controls">
        <Toolbar.Root aria-label="Layout switcher" className="toolbar-group">
          <Toolbar.ToggleGroup type="single" value={layoutMode} onValueChange={(value) => value && onLayoutModeChange(value as LayoutMode)}>
            <Toolbar.ToggleItem className="layout-item" value="editor" aria-label="Editor only">
              <Pencil1Icon /> Editor
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem className="layout-item" value="split" aria-label="Split view">
              <ColumnsIcon /> Split
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem className="layout-item" value="preview" aria-label="Preview only">
              <ReaderIcon /> Preview
            </Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
        </Toolbar.Root>

        <label className="control-field">
          <span className="control-label">Scale</span>
          <select className="control-select" value={fontScale} onChange={(event) => onFontScaleChange(event.target.value as FontScale)}>
            {(Object.keys(fontScaleLabels) as FontScale[]).map((scale) => (
              <option key={scale} value={scale}>
                {fontScaleLabels[scale]}
              </option>
            ))}
          </select>
        </label>

        <div className="theme-group" aria-label="Theme presets">
          {(Object.keys(themeLabels) as ThemeId[]).map((theme) => (
            <button
              key={theme}
              type="button"
              className="theme-chip"
              data-active={themeId === theme}
              onClick={() => onThemeChange(theme)}
            >
              {themeLabels[theme]}
            </button>
          ))}
        </div>

        <button type="button" className="theme-chip" data-active={isFocusMode} onClick={() => onFocusModeChange(!isFocusMode)}>
          Focus
        </button>

        {import.meta.env.DEV && onTriggerDevError ? (
          <button type="button" className="theme-chip" onClick={onTriggerDevError}>
            Test Error
          </button>
        ) : null}
      </div>
    </div>
  );
}
