import { render } from '@testing-library/react';
import { useLegacyStorageMigration } from './useLegacyStorageMigration';
import {
  contentStorageKey,
  fontScaleStorageKey,
  layoutStorageKey,
  legacyContentStorageKey,
  legacyFontScaleStorageKey,
  legacyLayoutStorageKey,
  legacyThemeStorageKey,
  themeStorageKey,
} from './storageKeys';

function MigrationHarness() {
  useLegacyStorageMigration();

  return null;
}

describe('useLegacyStorageMigration', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('moves legacy markdown-editor keys to Grain keys', () => {
    window.localStorage.setItem(legacyContentStorageKey, '# Legacy draft');
    window.localStorage.setItem(legacyLayoutStorageKey, 'preview');
    window.localStorage.setItem(legacyThemeStorageKey, 'spruce');
    window.localStorage.setItem(legacyFontScaleStorageKey, 'presentation');

    render(<MigrationHarness />);

    expect(window.localStorage.getItem(contentStorageKey)).toBe('# Legacy draft');
    expect(window.localStorage.getItem(layoutStorageKey)).toBe('preview');
    expect(window.localStorage.getItem(themeStorageKey)).toBe('spruce');
    expect(window.localStorage.getItem(fontScaleStorageKey)).toBe('presentation');
    expect(window.localStorage.getItem(legacyContentStorageKey)).toBeNull();
  });
});
