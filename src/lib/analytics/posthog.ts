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

type PostHogClient = {
  init: (key: string, options: Record<string, unknown>) => void;
  capture: (event: string, properties?: Record<string, unknown>) => void;
};

let analyticsReady = false;
let analyticsBootPromise: Promise<boolean> | null = null;
let posthogClient: PostHogClient | null = null;
const pendingEvents: Array<{ eventName: keyof AnalyticsEventMap; properties: AnalyticsEventMap[keyof AnalyticsEventMap] }> = [];

function getAnalyticsConfig() {
  return {
    key: import.meta.env.VITE_POSTHOG_KEY,
    host: import.meta.env.VITE_POSTHOG_HOST || defaultPostHogHost,
  };
}

async function loadPostHogClient() {
  const module = await import('posthog-js');
  return module.default as PostHogClient;
}

function flushPendingEvents() {
  if (!posthogClient) {
    return;
  }

  while (pendingEvents.length > 0) {
    const nextEvent = pendingEvents.shift();

    if (!nextEvent) {
      return;
    }

    posthogClient.capture(nextEvent.eventName, nextEvent.properties as Record<string, unknown>);
  }
}

export function bootAnalytics() {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  if (analyticsReady) {
    return Promise.resolve(true);
  }

  if (analyticsBootPromise) {
    return analyticsBootPromise;
  }

  const { key, host } = getAnalyticsConfig();

  if (!key) {
    return Promise.resolve(false);
  }

  analyticsBootPromise = loadPostHogClient().then((client) => {
    posthogClient = client;
    posthogClient.init(key, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: 'identified_only',
      autocapture: false,
    });

    analyticsReady = true;
    flushPendingEvents();

    return true;
  });

  return analyticsBootPromise;
}

export function trackEvent<EventName extends keyof AnalyticsEventMap>(
  eventName: EventName,
  properties: AnalyticsEventMap[EventName],
) {
  if (!analyticsReady || !posthogClient) {
    pendingEvents.push({ eventName, properties });
    return;
  }

  posthogClient.capture(eventName, properties as Record<string, unknown>);
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
  analyticsBootPromise = null;
  posthogClient = null;
  pendingEvents.length = 0;
}
