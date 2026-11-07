import { Component, type ReactNode } from "react";

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

/**
 * Isolates failures in lazily loaded page sections (e.g. a broken JS chunk
 * throwing during module evaluation) so one bad section renders a fallback
 * instead of unmounting the whole page.
 */
export default class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error("Section failed to render:", error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="w-full flex items-center justify-center py-16 px-4"
          role="alert"
        >
          <div className="text-center max-w-md">
            <p className="text-muted-foreground text-sm mb-4">
              {this.props.sectionName
                ? `The ${this.props.sectionName} section failed to load.`
                : "This section failed to load."}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
