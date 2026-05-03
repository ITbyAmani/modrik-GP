import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
      <p className="auth-split__sub">
        طالب؟{" "}
        <Link to="/student/login" className="auth-split__sub-link">
          دخول الطالب
        </Link>
      </p>

      <form className="auth-split-form" onSubmit={handleSubmit}>
        <label className="auth-split-field">
          <span className="auth-split-field__label visually-hidden">
            البريد الجامعي
          </span>
          <input
            className="auth-split-input auth-split-input--boxed"
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
            className="auth-split-input auth-split-input--boxed"
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

      <p className="auth-split__note">
        <strong>ملاحظة:</strong> للعرض التجريبي يمكن استخدام البريد{" "}
        <span dir="ltr">test@pnu.edu.sa</span>
      </p>

      <div className="auth-split__btn-row">
        <button
          type="button"
          className="auth-split-btn auth-split-btn--azure"
          disabled
          title="غير متاح في العرض التجريبي"
        >
          تغيير كلمة المرور
        </button>
        <button
          type="button"
          className="auth-split-btn auth-split-btn--azure"
          disabled
          title="غير متاح في العرض التجريبي"
        >
          تحتاج مساعدة في الدخول؟
        </button>
      </div>

      <p className="auth-split__panel-footer">
        © 2026 منصة مُدرك — واجهة عرض تخرجي
      </p>
    </AuthSplitShell>
  );
}
