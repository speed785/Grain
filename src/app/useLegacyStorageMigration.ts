import { useEffect } from 'react';
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
import { migrateStoredValue } from '../lib/persistence/localStorage';

export function useLegacyStorageMigration() {
  useEffect(() => {
    migrateStoredValue(contentStorageKey, legacyContentStorageKey);
    migrateStoredValue(layoutStorageKey, legacyLayoutStorageKey);
    migrateStoredValue(themeStorageKey, legacyThemeStorageKey);
    migrateStoredValue(fontScaleStorageKey, legacyFontScaleStorageKey);
  }, []);
}
