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
    wordCount: number;
    readMinutes: number;
    layout: string;
    theme: string;
    focusMode: boolean;
  };
  runtime_error: {
    source: 'window' | 'promise' | 'react';
    message: string;
    name?: string;
    stack?: string;
    path: string;
    layout?: string;
    theme?: string;
    focusMode?: boolean;
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

function getWorkspaceContext() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return { path: 'unknown' };
  }

  return {
    path: window.location.pathname,
    layout: document.body.dataset.layout,
    theme: document.body.dataset.theme,
    focusMode: document.body.dataset.focus === 'on',
  };
}

function sanitizeStack(stack?: string) {
  if (!stack) {
    return undefined;
  }

  return stack.split('\n').slice(0, 6).join('\n');
}

export function trackRuntimeError(source: 'window' | 'promise' | 'react', error: unknown, fallbackMessage?: string) {
  const parsedError = error instanceof Error ? error : undefined;

  trackEvent('runtime_error', {
    source,
    message: parsedError?.message || fallbackMessage || 'Unknown error',
    name: parsedError?.name,
    stack: sanitizeStack(parsedError?.stack),
    ...getWorkspaceContext(),
  });
}

export function registerErrorTracking() {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const onError = (event: ErrorEvent) => {
    trackRuntimeError('window', event.error, event.message);
  };

  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    const rejection = event.reason instanceof Error ? event.reason : undefined;
    trackRuntimeError('promise', rejection ?? event.reason, typeof event.reason === 'string' ? event.reason : 'Unhandled promise rejection');
  };

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onUnhandledRejection);
  };
}

export function resetAnalyticsForTests() {
  analyticsReady = false;
}
