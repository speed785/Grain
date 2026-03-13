import posthog from 'posthog-js';

const defaultPostHogHost = 'https://us.i.posthog.com';

type AnalyticsEventMap = {
  app_loaded: {
    source: 'main';
  };
  layout_changed: {
    layout: string;
  };
  theme_changed: {
    theme: string;
  };
  font_scale_changed: {
    scale: string;
  };
  focus_mode_toggled: {
    enabled: boolean;
  };
  markdown_exported: {
    documentTitle: string;
    wordCount: number;
  };
};

let analyticsReady = false;

function getAnalyticsConfig() {
  return {
    key: import.meta.env.VITE_POSTHOG_KEY,
    host: import.meta.env.VITE_POSTHOG_HOST || defaultPostHogHost,
  };
}

export function bootAnalytics() {
  if (typeof window === 'undefined' || analyticsReady) {
    return false;
  }

  const { key, host } = getAnalyticsConfig();

  if (!key) {
    return false;
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    capture_pageleave: true,
    person_profiles: 'identified_only',
    autocapture: false,
  });

  analyticsReady = true;

  return true;
}

export function trackEvent<EventName extends keyof AnalyticsEventMap>(
  eventName: EventName,
  properties: AnalyticsEventMap[EventName],
) {
  if (!analyticsReady) {
    return;
  }

  posthog.capture(eventName, properties);
}

export function resetAnalyticsForTests() {
  analyticsReady = false;
}
