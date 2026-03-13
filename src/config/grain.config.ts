import type { ThemeId } from '../app/types';

type ThemeTokens = {
  pageBg: string;
  pagePanel: string;
  pagePanelStrong: string;
  pagePanelMuted: string;
  pageBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
  editorBg: string;
  previewBg: string;
  codeBg: string;
  heroGlow: string;
  themeColor: string;
};

type ThemeDefinition = {
  label: string;
  tokens: ThemeTokens;
};

export const grainConfig: {
  appName: string;
  description: string;
  defaultTheme: ThemeId;
  fonts: {
    body: string;
    ui: string;
    mono: string;
  };
  header: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  themes: Record<ThemeId, ThemeDefinition>;
} = {
  appName: 'Grain',
  description: 'Grain is a premium markdown writing workspace with live preview, autosave, and a deliberate visual system.',
  defaultTheme: 'linen',
  fonts: {
    body: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
    ui: "'Avenir Next', 'Segoe UI', sans-serif",
    mono: "'SFMono-Regular', 'SF Mono', 'Roboto Mono', Consolas, monospace",
  },
  header: {
    eyebrow: 'Foundation build',
    title: 'Write with flow. Shape the workspace.',
    subtitle:
      'A focused markdown workspace with live preview, saved preferences, and a visual system that already feels like a product instead of a scaffold.',
  },
  themes: {
    linen: {
      label: 'Linen',
      tokens: {
        pageBg: 'linear-gradient(180deg, #efe5d2 0%, #e8ddca 100%)',
        pagePanel: 'rgba(253, 249, 240, 0.9)',
        pagePanelStrong: 'rgba(255, 252, 246, 0.96)',
        pagePanelMuted: 'rgba(245, 237, 224, 0.82)',
        pageBorder: 'rgba(133, 109, 79, 0.16)',
        textPrimary: '#2e241a',
        textSecondary: 'rgba(59, 45, 32, 0.72)',
        textMuted: 'rgba(88, 69, 48, 0.52)',
        accent: '#8f5f34',
        accentStrong: '#6f4727',
        accentSoft: 'rgba(143, 95, 52, 0.12)',
        editorBg: 'rgba(255, 251, 244, 0.96)',
        previewBg: 'rgba(252, 247, 239, 0.92)',
        codeBg: '#f2eadc',
        heroGlow: 'rgba(188, 138, 73, 0.2)',
        themeColor: '#efe5d2',
      },
    },
    graphite: {
      label: 'Graphite',
      tokens: {
        pageBg: 'linear-gradient(180deg, #d9e0e4 0%, #c8d0d4 100%)',
        pagePanel: 'rgba(243, 247, 249, 0.9)',
        pagePanelStrong: 'rgba(249, 251, 252, 0.96)',
        pagePanelMuted: 'rgba(228, 236, 240, 0.84)',
        pageBorder: 'rgba(48, 69, 82, 0.18)',
        textPrimary: '#1f2c34',
        textSecondary: 'rgba(33, 49, 58, 0.72)',
        textMuted: 'rgba(54, 76, 89, 0.52)',
        accent: '#285c78',
        accentStrong: '#183f54',
        accentSoft: 'rgba(40, 92, 120, 0.12)',
        editorBg: 'rgba(248, 251, 252, 0.96)',
        previewBg: 'rgba(239, 245, 247, 0.92)',
        codeBg: '#e2eaee',
        heroGlow: 'rgba(70, 124, 154, 0.18)',
        themeColor: '#d9e0e4',
      },
    },
    spruce: {
      label: 'Spruce',
      tokens: {
        pageBg: 'linear-gradient(180deg, #dce6df 0%, #cbd9d0 100%)',
        pagePanel: 'rgba(244, 249, 245, 0.9)',
        pagePanelStrong: 'rgba(249, 252, 249, 0.96)',
        pagePanelMuted: 'rgba(232, 239, 234, 0.86)',
        pageBorder: 'rgba(58, 92, 72, 0.18)',
        textPrimary: '#203027',
        textSecondary: 'rgba(33, 54, 43, 0.74)',
        textMuted: 'rgba(55, 82, 68, 0.54)',
        accent: '#2f6a4d',
        accentStrong: '#1f4e38',
        accentSoft: 'rgba(47, 106, 77, 0.12)',
        editorBg: 'rgba(248, 251, 248, 0.96)',
        previewBg: 'rgba(239, 246, 241, 0.92)',
        codeBg: '#e5eee8',
        heroGlow: 'rgba(68, 122, 93, 0.18)',
        themeColor: '#dce6df',
      },
    },
  },
};
