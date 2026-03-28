import React from 'react';

type Props = {
  children: React.ReactNode;
  /** Optional custom fallback UI. If omitted, the default FSA Elite error card is shown. */
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * React error boundary that catches unhandled errors in its subtree and
 * renders a styled fallback instead of a blank screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <MyComponent />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    console.error('[ErrorBoundary] Unhandled error:', error, info.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg, #0a0a0a)',
            color: 'var(--color-text, #f5f5f5)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '480px' }}>
            <p style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚠️</p>
            <h1
              style={{
                fontSize: '1.75rem',
                marginBottom: '1rem',
                color: 'var(--color-primary, #c9a84c)',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                marginBottom: '1.75rem',
                color: 'var(--color-muted, #888)',
                lineHeight: 1.6,
              }}
            >
              An unexpected error occurred. Please try again or refresh the page.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: 'var(--color-primary, #c9a84c)',
                color: '#0a0a0a',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: 'var(--radius, 8px)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
