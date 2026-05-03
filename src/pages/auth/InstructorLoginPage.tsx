import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { AuthSplitShell } from "../../components/auth/AuthSplitShell";

export function InstructorLoginPage() {
  const { role, loginAsInstructor } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (role === "instructor") {
    return <Navigate to="/" replace />;
  }
  if (role === "student") {
    return <Navigate to="/student" replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    loginAsInstructor();
    navigate("/", { replace: true });
  }

  return (
    <AuthSplitShell>
      <h1 className="auth-split__signin-title">تسجيل الدخول</h1>
      <p className="auth-split__role-tag">بوابة المحاضرين</p>

      <form className="auth-split-form" onSubmit={handleSubmit}>
        <label className="auth-split-field">
          <span className="auth-split-field__label visually-hidden">
            البريد الجامعي
          </span>
          <input
            className="auth-split-input auth-split-input--line"
            type="email"
            name="email"
            autoComplete="username"
            placeholder="someone@example.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </label>
        <label className="auth-split-field">
          <span className="auth-split-field__label visually-hidden">
            كلمة المرور
          </span>
          <input
            className="auth-split-input auth-split-input--line"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <button type="submit" className="auth-split-btn auth-split-btn--primary">
          تسجيل الدخول
        </button>
      </form>

      <p className="auth-split__forgot-row">
        <button
          type="button"
          className="auth-split__text-link"
          disabled
          title="غير متاح في العرض التجريبي"
        >
          نسيت كلمة المرور؟
        </button>
      </p>

      <p className="auth-split__panel-footer">
        © 2026 منصة مُدرك — واجهة عرض تخرجي
      </p>
    </AuthSplitShell>
  );
}
