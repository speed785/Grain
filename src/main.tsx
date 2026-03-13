import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { bootAnalytics, trackEvent } from './lib/analytics/posthog';
import { grainConfig } from './config/grain.config';

if (bootAnalytics()) {
  trackEvent('app_loaded', { source: 'main' });
}
document.title = grainConfig.appName;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
