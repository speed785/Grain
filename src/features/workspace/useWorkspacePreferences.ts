import { useEffect, useState } from 'react';
import { fontScaleStorageKey, layoutStorageKey, themeStorageKey } from '../../app/storageKeys';
import type { FontScale, LayoutMode, ThemeId } from '../../app/types';
import { getStoredValue, setStoredValue } from '../../lib/persistence/localStorage';

type WorkspacePreferences = {
  layoutMode: LayoutMode;
  setLayoutMode: (value: LayoutMode) => void;
  themeId: ThemeId;
  setThemeId: (value: ThemeId) => void;
  fontScale: FontScale;
  setFontScale: (value: FontScale) => void;
};

export function useWorkspacePreferences(): WorkspacePreferences {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => getStoredValue(layoutStorageKey, 'split'));
  const [themeId, setThemeId] = useState<ThemeId>(() => getStoredValue(themeStorageKey, 'linen'));
  const [fontScale, setFontScale] = useState<FontScale>(() => getStoredValue(fontScaleStorageKey, 'comfortable'));

  useEffect(() => {
    document.body.dataset.theme = themeId;
    document.body.dataset.scale = fontScale;
    setStoredValue(themeStorageKey, themeId);
  }, [themeId, fontScale]);

  useEffect(() => {
    setStoredValue(layoutStorageKey, layoutMode);
  }, [layoutMode]);

  useEffect(() => {
    setStoredValue(fontScaleStorageKey, fontScale);
  }, [fontScale]);

  return {
    layoutMode,
    setLayoutMode,
    themeId,
    setThemeId,
    fontScale,
    setFontScale,
  };
}
