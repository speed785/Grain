const wordsPerMinute = 220;

export function countWords(content: string): number {
  const words = content.trim().match(/\S+/g);

  return words ? words.length : 0;
}

export function estimateReadMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function deriveDocumentTitle(content: string): string {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();

  if (heading) {
    return heading;
  }

  const firstLine = content
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean);

  return firstLine ? firstLine.slice(0, 48) : 'Untitled draft';
}

export function formatSaveLabel(savedAt: Date, saveState: 'saving' | 'saved'): string {
  if (saveState === 'saving') {
    return 'Saving draft...';
  }

  return `Autosaved ${savedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
}
