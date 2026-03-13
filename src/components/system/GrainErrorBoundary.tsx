import { Component, type ErrorInfo, type ReactNode } from 'react';
import { grainConfig } from '../../config/grain.config';
import { trackRuntimeError } from '../../lib/analytics/posthog';

type GrainErrorBoundaryProps = {
  children: ReactNode;
};

type GrainErrorBoundaryState = {
  hasError: boolean;
};

export class GrainErrorBoundary extends Component<GrainErrorBoundaryProps, GrainErrorBoundaryState> {
  state: GrainErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const enrichedError = new Error(error.message);
    enrichedError.name = error.name;
    enrichedError.stack = `${error.stack || error.message}\n${errorInfo.componentStack}`;
    trackRuntimeError('react', enrichedError, 'React render error');
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="error-state">
        <div className="error-card">
          <p className="eyebrow">Something broke</p>
          <h1>{grainConfig.appName} hit a runtime error.</h1>
          <p className="subtitle">
            The error has been captured for debugging. Refresh the page to try again. If the problem keeps happening,
            open a GitHub issue with what you were doing right before it failed.
          </p>
          <button type="button" className="toolbar-button" onClick={() => window.location.reload()}>
            Reload Grain
          </button>
        </div>
      </main>
    );
  }
}
