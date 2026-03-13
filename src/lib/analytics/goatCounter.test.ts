import { bootAnalytics } from './goatCounter';

describe('bootAnalytics', () => {
  const originalDomain = import.meta.env.VITE_GOATCOUNTER_DOMAIN;

  beforeEach(() => {
    document.head.innerHTML = '';
    vi.stubEnv('VITE_GOATCOUNTER_DOMAIN', 'grain.goatcounter.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();

    if (originalDomain) {
      vi.stubEnv('VITE_GOATCOUNTER_DOMAIN', originalDomain);
    }
  });

  it('injects the GoatCounter script once when configured', () => {
    bootAnalytics();
    bootAnalytics();

    const script = document.head.querySelector('#grain-goatcounter');

    expect(script).not.toBeNull();
    expect(script?.getAttribute('src')).toBe('https://gc.zgo.at/count.js');
    expect(script?.getAttribute('data-goatcounter')).toBe('https://grain.goatcounter.com/count');
    expect(document.head.querySelectorAll('#grain-goatcounter')).toHaveLength(1);
  });
});
