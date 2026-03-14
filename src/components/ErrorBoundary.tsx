import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong. Please try refreshing the page.";
      
      try {
        // Check if it's a Firestore JSON error
        const parsed = JSON.parse(this.state.error?.message || "");
        if (parsed.error && parsed.operationType) {
          errorMessage = `Database Error: ${parsed.error} during ${parsed.operationType} on ${parsed.path || 'unknown path'}.`;
        }
      } catch (e) {
        // Not a JSON error, use the raw message if it's user-friendly
        if (this.state.error?.message && !this.state.error.message.includes('Firebase')) {
          errorMessage = this.state.error.message;
        }
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200 m-4">
          <div className="bg-red-100 p-4 rounded-full mb-6">
            <AlertTriangle className="text-red-600" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-stone-600 max-w-md mb-8 leading-relaxed">
            {errorMessage}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-emerald-800 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} />
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
