import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { bootAnalytics, registerErrorTracking, trackEvent } from './lib/analytics/posthog';
import { GrainErrorBoundary } from './components/system/GrainErrorBoundary';
import { grainConfig } from './config/grain.config';

if (bootAnalytics()) {
  trackEvent('app_loaded', { source: 'main' });
}

registerErrorTracking();
document.title = grainConfig.appName;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <GrainErrorBoundary>
      <App />
    </GrainErrorBoundary>
  </React.StrictMode>,
);
