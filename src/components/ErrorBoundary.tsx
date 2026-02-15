import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-medium"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
