import logoUrl from "../../assets/mudrek-graduation-logo.png";

export function LoginPanelLogo() {
  return (
    <div className="auth-split__logo-wrap">
      <img
        className="auth-split__logo"
        src={logoUrl}
        alt="شعار مشروع التخرج"
        width={200}
        height={90}
        decoding="async"
      />
    </div>
  );
}
