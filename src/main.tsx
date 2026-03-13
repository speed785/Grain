import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { bootAnalytics } from './lib/analytics/goatCounter';
import { grainConfig } from './config/grain.config';

bootAnalytics();
document.title = grainConfig.appName;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
