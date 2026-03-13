const goatCounterScriptId = 'grain-goatcounter';

export function bootAnalytics() {
  if (typeof document === 'undefined') {
    return;
  }

  const domain = import.meta.env.VITE_GOATCOUNTER_DOMAIN;

  if (!domain || document.getElementById(goatCounterScriptId)) {
    return;
  }

  const normalizedDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const script = document.createElement('script');

  script.id = goatCounterScriptId;
  script.async = true;
  script.dataset.goatcounter = `https://${normalizedDomain}/count`;
  script.src = 'https://gc.zgo.at/count.js';

  document.head.appendChild(script);
}
