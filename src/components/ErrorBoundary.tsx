import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };

type State = { error: Error | null; info: string | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
    this.setState({ info: info.componentStack ?? null });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary" dir="rtl">
          <h1>تعذّر عرض الصفحة</h1>
          <p>
            حدث خطأ في الواجهة. افتح <strong>أدوات المطوّر ← Console</strong> لمعرفة
            التفاصيل، أو تأكد أنك تفتح الرابط الصحيح مع المنفذ، مثلاً:{" "}
            <code>http://localhost:5173</code>
          </p>
          <pre className="error-boundary__msg">{this.state.error.message}</pre>
          {this.state.info ? (
            <pre className="error-boundary__stack">{this.state.info}</pre>
          ) : null}
        </div>
      );
    }
    return this.props.children;
  }
}
