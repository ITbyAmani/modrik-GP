import type { ReactNode } from "react";
import panelLogoUrl from "../../assets/mudrek-project-logo-panel.png";

type Props = {
  children: ReactNode;
};

export function AuthSplitShell({ children }: Props) {
  return (
    <div className="auth-split">
      <div className="auth-split__wrap">
        <div className="auth-split__frame">
          <aside className="auth-split__logo-side" aria-label="شعار المنصة">
            <div className="auth-split__logo-side-inner">
              <img
                className="auth-split__logo-side-img"
                src={panelLogoUrl}
                alt="مُدرك — شعار مشروع التخرج"
                width={400}
                height={400}
                decoding="async"
              />
            </div>
          </aside>
          <div className="auth-split__form-side">
            <div className="auth-split__form-side-glow" aria-hidden />
            <main className="auth-split__form-main" dir="rtl">
              <div className="auth-split__form-card">
                <div className="auth-split__panel-inner">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
