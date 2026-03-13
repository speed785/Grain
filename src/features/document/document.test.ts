import { countWords, deriveDocumentTitle, estimateReadMinutes, formatSaveLabel } from './document';

describe('document helpers', () => {
  it('counts words from markdown content', () => {
    expect(countWords('# Hello world\n\nThis is a draft.')).toBe(7);
  });

  it('derives a title from the first heading', () => {
    expect(deriveDocumentTitle('# Field Notes\n\nBody copy')).toBe('Field Notes');
  });

  it('falls back to untitled draft for empty content', () => {
    expect(deriveDocumentTitle('   \n')).toBe('Untitled draft');
  });

  it('estimates read time with a minimum of one minute', () => {
    expect(estimateReadMinutes(10)).toBe(1);
    expect(estimateReadMinutes(221)).toBe(2);
  });

  it('formats the save label for saving and saved states', () => {
    expect(formatSaveLabel(new Date('2026-03-12T09:15:00'), 'saving')).toBe('Saving draft...');
    expect(formatSaveLabel(new Date('2026-03-12T09:15:00'), 'saved')).toContain('Autosaved');
  });
});
