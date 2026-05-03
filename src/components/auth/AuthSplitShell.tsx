import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function AuthSplitShell({ children }: Props) {
  return (
    <div className="auth-split">
      <aside className="auth-split__hero" aria-hidden="true">
        <div className="auth-split__hero-img" />
      </aside>
      <main className="auth-split__panel" dir="rtl">
        <div className="auth-split__panel-inner">{children}</div>
      </main>
    </div>
  );
}
