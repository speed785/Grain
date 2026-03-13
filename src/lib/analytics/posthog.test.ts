import { bootAnalytics, registerErrorTracking, resetAnalyticsForTests, trackEvent, trackRuntimeError } from './posthog';

const mockedPostHog = {
  init: vi.fn(),
  capture: vi.fn(),
};

vi.mock('posthog-js', () => ({
  default: mockedPostHog,
}));

describe('posthog analytics', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_POSTHOG_KEY', 'phc_test_key');
    vi.stubEnv('VITE_POSTHOG_HOST', 'https://us.i.posthog.com');
    resetAnalyticsForTests();
    mockedPostHog.init.mockClear();
    mockedPostHog.capture.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetAnalyticsForTests();
  });

  it('boots PostHog once when configured', () => {
    return bootAnalytics().then(async (firstResult) => {
      const secondResult = await bootAnalytics();

      expect(firstResult).toBe(true);
      expect(secondResult).toBe(true);
      expect(mockedPostHog.init).toHaveBeenCalledTimes(1);
      expect(mockedPostHog.init).toHaveBeenCalledWith('phc_test_key', expect.objectContaining({ api_host: 'https://us.i.posthog.com' }));
    });
  });

  it('captures events only after analytics boots', async () => {
    trackEvent('app_loaded', { source: 'main' });
    expect(mockedPostHog.capture).not.toHaveBeenCalled();

    await bootAnalytics();
    trackEvent('theme_changed', { theme: 'spruce' });

    expect(mockedPostHog.capture).toHaveBeenCalledWith('app_loaded', { source: 'main' });
    expect(mockedPostHog.capture).toHaveBeenCalledWith('theme_changed', { theme: 'spruce' });
  });

  it('captures runtime errors with safe context', async () => {
    await bootAnalytics();
    document.body.dataset.theme = 'spruce';
    document.body.dataset.layout = 'split';
    document.body.dataset.focus = 'on';

    trackRuntimeError('react', new Error('Exploded'));

    expect(mockedPostHog.capture).toHaveBeenCalledWith(
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

  it('registers a global error listener', async () => {
    await bootAnalytics();
    const dispose = registerErrorTracking();

    window.dispatchEvent(new ErrorEvent('error', { message: 'Window crash', error: new Error('Window crash') }));

    expect(mockedPostHog.capture).toHaveBeenCalledWith(
      'runtime_error',
      expect.objectContaining({ source: 'window', message: 'Window crash' }),
    );

    dispose();
  });
});
