import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { AuthSplitShell } from "../../components/auth/AuthSplitShell";

export function StudentLoginPage() {
  const { role, loginAsStudent } = useAuth();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  if (role === "student") {
    return <Navigate to="/student" replace />;
  }
  if (role === "instructor") {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    loginAsStudent();
    navigate("/student", { replace: true });
  }

  return (
    <AuthSplitShell>
      <p className="auth-split__eyebrow">منصة مُدرك</p>
      <h1 className="auth-split__signin-title">تسجيل الدخول</h1>
      <span className="auth-split__badge auth-split__badge--student">طالب</span>

      <form className="auth-split-form" onSubmit={handleSubmit}>
        <label className="auth-split-field">
          <span className="auth-split-field__label">الرقم الجامعي</span>
          <input
            className="auth-split-input"
            type="text"
            name="studentId"
            inputMode="numeric"
            autoComplete="username"
            placeholder="444008593"
            dir="ltr"
            value={id}
            onChange={(ev) => setId(ev.target.value)}
          />
        </label>
        <label className="auth-split-field">
          <span className="auth-split-field__label">كلمة المرور</span>
          <input
            className="auth-split-input"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <button type="submit" className="auth-split-btn auth-split-btn--primary">
          دخول بوابة الطالب
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
        © 2026 مُدرك — عرض تخرجي
      </p>
    </AuthSplitShell>
  );
}
