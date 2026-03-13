import { EditorSelection } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';

export function wrapSelection(view: EditorView, prefix: string, suffix: string, fallbackText: string) {
  const { state } = view;
  const selection = state.selection.main;
  const selectedText = state.sliceDoc(selection.from, selection.to);
  const text = selectedText || fallbackText;
  const insert = `${prefix}${text}${suffix}`;
  const anchor = selection.from + prefix.length;
  const head = anchor + text.length;

  view.dispatch({
    changes: { from: selection.from, to: selection.to, insert },
    selection: EditorSelection.single(anchor, head),
    userEvent: 'input',
  });

  view.focus();
}

export function prefixSelectedLines(view: EditorView, prefix: string) {
  const { state } = view;
  const selection = state.selection.main;
  const fromLine = state.doc.lineAt(selection.from);
  const toLine = state.doc.lineAt(selection.to);
  const start = fromLine.from;
  const end = toLine.to;
  const block = state.sliceDoc(start, end);
  const insert = block
    .split('\n')
    .map((line: string) => `${prefix}${line}`)
    .join('\n');

  view.dispatch({
    changes: { from: start, to: end, insert },
    selection: EditorSelection.single(start, start + insert.length),
    userEvent: 'input',
  });

  view.focus();
}
