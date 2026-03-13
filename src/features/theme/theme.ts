import type { FontScale, ThemeId } from '../../app/types';
import { grainConfig } from '../../config/grain.config';

export const themeLabels: Record<ThemeId, string> = {
  linen: grainConfig.themes.linen.label,
  graphite: grainConfig.themes.graphite.label,
  spruce: grainConfig.themes.spruce.label,
};

export const fontScaleLabels: Record<FontScale, string> = {
  comfortable: 'Comfortable',
  focused: 'Focused',
  presentation: 'Presentation',
};

export function applyThemeAppearance(themeId: ThemeId) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const theme = grainConfig.themes[themeId];
  const entries = Object.entries(theme.tokens);

  root.style.setProperty('--font-body', grainConfig.fonts.body);
  root.style.setProperty('--font-ui', grainConfig.fonts.ui);
  root.style.setProperty('--font-mono', grainConfig.fonts.mono);

  entries.forEach(([key, value]) => {
    const cssVariable = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    root.style.setProperty(`--${cssVariable}`, value);
  });

  document.title = grainConfig.appName;
  document.documentElement.lang = 'en';

  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute('content', grainConfig.description);

  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute('content', theme.tokens.themeColor);
}
