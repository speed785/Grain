import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { WorkspaceHeader } from '../components/layout/WorkspaceHeader';
import { FormattingToolbar } from '../components/toolbar/FormattingToolbar';
import { useDocumentState } from '../features/document/useDocumentState';
import { useWorkspacePreferences } from '../features/workspace/useWorkspacePreferences';
import { trackEvent } from '../lib/analytics/posthog';
import { sampleDocument } from './sampleDocument';
import { useLegacyStorageMigration } from './useLegacyStorageMigration';

const EditorPane = lazy(() => import('../components/editor/EditorPane').then((module) => ({ default: module.EditorPane })));
const PreviewPane = lazy(() => import('../components/preview/PreviewPane').then((module) => ({ default: module.PreviewPane })));

function downloadMarkdownFile(content: string, title: string) {
  const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'untitled-draft';
  const file = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${safeTitle}.md`;
  link.click();
  window.URL.revokeObjectURL(url);
}

function PanelFallback({ label }: { label: string }) {
  return (
    <section className="panel panel-loading" aria-label={`${label} loading`}>
      <div className="panel-header">
        <div>
          <h2 className="panel-title">{label}</h2>
          <p className="panel-copy">Loading workspace surface...</p>
        </div>
      </div>
      <div className="panel-surface panel-skeleton" />
    </section>
  );
}

function triggerDevRuntimeError() {
  window.setTimeout(() => {
    throw new Error('Grain dev runtime error');
  }, 0);
}

export function AppShell() {
  useLegacyStorageMigration();

  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const { layoutMode, setLayoutMode, themeId, setThemeId, fontScale, setFontScale, isFocusMode, setIsFocusMode } = useWorkspacePreferences();
  const { content, setContent, wordCount, readMinutes, title, saveLabel } = useDocumentState(sampleDocument);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        setIsFocusMode((value) => !value);
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setIsFocusMode]);

  return (
    <div className="app-shell">
      <motion.div
        className="shell-card"
        data-focus={isFocusMode}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {!isFocusMode && <WorkspaceHeader title={title} wordCount={wordCount} readMinutes={readMinutes} saveLabel={saveLabel} />}

        <FormattingToolbar
          getEditorView={() => editorRef.current?.view}
          layoutMode={layoutMode}
          onLayoutModeChange={setLayoutMode}
          themeId={themeId}
          onThemeChange={setThemeId}
          fontScale={fontScale}
          onFontScaleChange={setFontScale}
          isFocusMode={isFocusMode}
          onFocusModeChange={setIsFocusMode}
          onTriggerDevError={import.meta.env.DEV ? triggerDevRuntimeError : undefined}
          onExportMarkdown={() => {
            trackEvent('markdown_exported', {
              wordCount,
              readMinutes,
              layout: layoutMode,
              theme: themeId,
              focusMode: isFocusMode,
            });
            downloadMarkdownFile(content, title);
          }}
        />

        <main className="workspace" data-layout={layoutMode}>
          {layoutMode !== 'preview' && (
            <Suspense fallback={<PanelFallback label="Editor" />}>
              <EditorPane editorRef={editorRef} content={content} themeId={themeId} onChange={setContent} />
            </Suspense>
          )}

          {layoutMode !== 'editor' && (
            <Suspense fallback={<PanelFallback label="Preview" />}>
              <PreviewPane content={content} />
            </Suspense>
          )}
        </main>
      </motion.div>
    </div>
  );
}
