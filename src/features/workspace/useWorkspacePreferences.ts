import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { focusModeStorageKey, fontScaleStorageKey, layoutStorageKey, themeStorageKey } from '../../app/storageKeys';
import type { FontScale, LayoutMode, ThemeId } from '../../app/types';
import { getStoredValue, setStoredValue } from '../../lib/persistence/localStorage';
import { grainConfig } from '../../config/grain.config';
import { trackEvent } from '../../lib/analytics/posthog';
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
  const previousLayoutMode = useRef(layoutMode);
  const previousThemeId = useRef(themeId);
  const previousFontScale = useRef(fontScale);
  const previousFocusMode = useRef(isFocusMode);

  useEffect(() => {
    document.body.dataset.theme = themeId;
    document.body.dataset.scale = fontScale;
    document.body.dataset.focus = isFocusMode ? 'on' : 'off';
    applyThemeAppearance(themeId);
    setStoredValue(themeStorageKey, themeId);
  }, [isFocusMode, themeId, fontScale]);

  useEffect(() => {
    setStoredValue(layoutStorageKey, layoutMode);

    if (previousLayoutMode.current !== layoutMode) {
      trackEvent('layout_changed', { layout: layoutMode });
      previousLayoutMode.current = layoutMode;
    }
  }, [layoutMode]);

  useEffect(() => {
    setStoredValue(fontScaleStorageKey, fontScale);

    if (previousFontScale.current !== fontScale) {
      trackEvent('font_scale_changed', { scale: fontScale });
      previousFontScale.current = fontScale;
    }
  }, [fontScale]);

  useEffect(() => {
    setStoredValue(focusModeStorageKey, isFocusMode ? 'on' : 'off');

    if (previousFocusMode.current !== isFocusMode) {
      trackEvent('focus_mode_toggled', { enabled: isFocusMode });
      previousFocusMode.current = isFocusMode;
    }
  }, [isFocusMode]);

  useEffect(() => {
    if (previousThemeId.current !== themeId) {
      trackEvent('theme_changed', { theme: themeId });
      previousThemeId.current = themeId;
    }
  }, [themeId]);

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
