import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type PreviewPaneProps = {
  content: string;
};

export function PreviewPane({ content }: PreviewPaneProps) {
  return (
    <motion.section
      className="panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut', delay: 0.04 }}
    >
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Preview</h2>
          <p className="panel-copy">Readable markdown rendering with tables, task lists, and long-form typography.</p>
        </div>
      </div>
      <div className="panel-surface preview-surface">
        {content.trim() ? (
          <article className="preview-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        ) : (
          <div className="preview-empty">
            <div>
              <strong>Start writing to see the preview.</strong>
              The reading pane updates live and is now wired for common GitHub-flavored markdown patterns.
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
