import { motion } from 'framer-motion';
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import type { RefObject } from 'react';
import type { ThemeId } from '../../app/types';

type EditorPaneProps = {
  editorRef: RefObject<ReactCodeMirrorRef | null>;
  content: string;
  themeId: ThemeId;
  onChange: (value: string) => void;
};

export function EditorPane({ editorRef, content, themeId, onChange }: EditorPaneProps) {
  return (
    <motion.section
      className="panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Editor</h2>
          <p className="panel-copy">Keyboard-first markdown input with quick formatting actions and a syntax-aware surface.</p>
        </div>
      </div>
      <div className="panel-surface editor-surface">
        <CodeMirror
          ref={editorRef}
          className={`editor-root editor-root-${themeId}`}
          value={content}
          height="100%"
          extensions={[markdown()]}
          basicSetup={{
            foldGutter: false,
            highlightActiveLine: false,
            lineNumbers: false,
          }}
          onChange={onChange}
        />
      </div>
    </motion.section>
  );
}
