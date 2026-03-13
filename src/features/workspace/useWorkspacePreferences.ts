import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { focusModeStorageKey, fontScaleStorageKey, layoutStorageKey, themeStorageKey } from '../../app/storageKeys';
import type { FontScale, LayoutMode, ThemeId } from '../../app/types';
import { getStoredValue, setStoredValue } from '../../lib/persistence/localStorage';
import { grainConfig } from '../../config/grain.config';
import { applyThemeAppearance } from '../theme/theme';

type WorkspacePreferences = {
  layoutMode: LayoutMode;
  setLayoutMode: (value: LayoutMode) => void;
  themeId: ThemeId;
  setThemeId: (value: ThemeId) => void;
  fontScale: FontScale;
  setFontScale: (value: FontScale) => void;
  isFocusMode: boolean;
  setIsFocusMode: Dispatch<SetStateAction<boolean>>;
};

export function useWorkspacePreferences(): WorkspacePreferences {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => getStoredValue(layoutStorageKey, 'split'));
  const [themeId, setThemeId] = useState<ThemeId>(() => getStoredValue(themeStorageKey, grainConfig.defaultTheme));
  const [fontScale, setFontScale] = useState<FontScale>(() => getStoredValue(fontScaleStorageKey, 'comfortable'));
  const [isFocusMode, setIsFocusMode] = useState<boolean>(() => getStoredValue<'on' | 'off'>(focusModeStorageKey, 'off') === 'on');

  useEffect(() => {
    document.body.dataset.theme = themeId;
    document.body.dataset.scale = fontScale;
    document.body.dataset.focus = isFocusMode ? 'on' : 'off';
    applyThemeAppearance(themeId);
    setStoredValue(themeStorageKey, themeId);
  }, [isFocusMode, themeId, fontScale]);

  useEffect(() => {
    setStoredValue(layoutStorageKey, layoutMode);
  }, [layoutMode]);

  useEffect(() => {
    setStoredValue(fontScaleStorageKey, fontScale);
  }, [fontScale]);

  useEffect(() => {
    setStoredValue(focusModeStorageKey, isFocusMode ? 'on' : 'off');
  }, [isFocusMode]);

  return {
    layoutMode,
    setLayoutMode,
    themeId,
    setThemeId,
    fontScale,
    setFontScale,
    isFocusMode,
    setIsFocusMode,
  };
}
