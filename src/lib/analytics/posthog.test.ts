import posthog from 'posthog-js';
import { bootAnalytics, registerErrorTracking, resetAnalyticsForTests, trackEvent, trackRuntimeError } from './posthog';

vi.mock('posthog-js', () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
  },
}));

describe('posthog analytics', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_POSTHOG_KEY', 'phc_test_key');
    vi.stubEnv('VITE_POSTHOG_HOST', 'https://us.i.posthog.com');
    resetAnalyticsForTests();
    vi.mocked(posthog.init).mockClear();
    vi.mocked(posthog.capture).mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetAnalyticsForTests();
  });

  it('boots PostHog once when configured', () => {
    expect(bootAnalytics()).toBe(true);
    expect(bootAnalytics()).toBe(false);
    expect(posthog.init).toHaveBeenCalledTimes(1);
    expect(posthog.init).toHaveBeenCalledWith('phc_test_key', expect.objectContaining({ api_host: 'https://us.i.posthog.com' }));
  });

  it('captures events only after analytics boots', () => {
    trackEvent('app_loaded', { source: 'main' });
    expect(posthog.capture).not.toHaveBeenCalled();

    bootAnalytics();
    trackEvent('theme_changed', { theme: 'spruce' });

    expect(posthog.capture).toHaveBeenCalledWith('theme_changed', { theme: 'spruce' });
  });

  it('captures runtime errors with safe context', () => {
    bootAnalytics();
    document.body.dataset.theme = 'spruce';
    document.body.dataset.layout = 'split';
    document.body.dataset.focus = 'on';

    trackRuntimeError('react', new Error('Exploded'));

    expect(posthog.capture).toHaveBeenCalledWith(
      'runtime_error',
      expect.objectContaining({
        source: 'react',
        message: 'Exploded',
        theme: 'spruce',
        layout: 'split',
        focusMode: true,
      }),
    );
  });

  it('registers a global error listener', () => {
    bootAnalytics();
    const dispose = registerErrorTracking();

    window.dispatchEvent(new ErrorEvent('error', { message: 'Window crash', error: new Error('Window crash') }));

    expect(posthog.capture).toHaveBeenCalledWith(
      'runtime_error',
      expect.objectContaining({ source: 'window', message: 'Window crash' }),
    );

    dispose();
  });
});
