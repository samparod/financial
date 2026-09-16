"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  body: string;
  reload: string;
  details: string;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Shell crashed:", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-ink">
        <div className="card p-6 max-w-lg w-full">
          <h1 className="text-lg font-extrabold text-danger">{this.props.title}</h1>
          <p className="text-sm text-mute mt-2 leading-relaxed">{this.props.body}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border border-gold/40 bg-gold/15 text-gold rounded-lg px-4 py-2 text-sm mt-4"
          >
            {this.props.reload}
          </button>
          <details className="mt-4">
            <summary className="cursor-pointer text-[11px] text-gold">
              {this.props.details}
            </summary>
            <pre
              className="mt-2 text-[11px] bg-[#0b1220] border border-line rounded-lg p-3 overflow-x-auto whitespace-pre-wrap"
              dir="ltr"
            >
              {error.message}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}
