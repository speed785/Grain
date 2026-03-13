import { useEffect, useMemo, useState } from 'react';
import { contentStorageKey } from '../../app/storageKeys';
import type { SaveState } from '../../app/types';
import { getStoredDocument, setStoredValue } from '../../lib/persistence/localStorage';
import { countWords, deriveDocumentTitle, estimateReadMinutes, formatSaveLabel } from './document';

type DocumentState = {
  content: string;
  setContent: (value: string) => void;
  wordCount: number;
  readMinutes: number;
  title: string;
  saveLabel: string;
  saveState: SaveState;
};

export function useDocumentState(initialContent: string): DocumentState {
  const [content, setContent] = useState<string>(() => getStoredDocument(contentStorageKey, initialContent));
  const [savedAt, setSavedAt] = useState<Date>(new Date());
  const [saveState, setSaveState] = useState<SaveState>('saved');

  useEffect(() => {
    setSaveState('saving');

    const timeout = window.setTimeout(() => {
      setStoredValue(contentStorageKey, content);
      setSavedAt(new Date());
      setSaveState('saved');
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [content]);

  const wordCount = useMemo(() => countWords(content), [content]);
  const readMinutes = useMemo(() => estimateReadMinutes(wordCount), [wordCount]);
  const title = useMemo(() => deriveDocumentTitle(content), [content]);
  const saveLabel = useMemo(() => formatSaveLabel(savedAt, saveState), [savedAt, saveState]);

  return {
    content,
    setContent,
    wordCount,
    readMinutes,
    title,
    saveLabel,
    saveState,
  };
}
