import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
      <h1 className="auth-split__signin-title">تسجيل الدخول</h1>
      <p className="auth-split__sub">
        محاضر؟{" "}
        <Link to="/login" className="auth-split__sub-link">
          دخول المحاضر
        </Link>
      </p>

      <form className="auth-split-form" onSubmit={handleSubmit}>
        <label className="auth-split-field">
          <span className="auth-split-field__label visually-hidden">
            الرقم الجامعي
          </span>
          <input
            className="auth-split-input auth-split-input--boxed"
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
        <strong>ملاحظة:</strong> للعرض التجريبي أي رقم جامعي وكلمة مرور تُقبل.
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
