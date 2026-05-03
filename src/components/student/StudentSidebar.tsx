import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import sidebarFullLogo from "../../assets/modrik-sidebar-logo.png";

const navItems: {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}[] = [
  { to: "/student", label: "الرئيسية", icon: "◉", end: true },
  { to: "/student/virtual", label: "الفصول الافتراضية", icon: "▤" },
];

export function StudentSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/student/login", { replace: true });
  }

  return (
    <aside className="sidebar" aria-label="قائمة الطالب">
      <div className="sidebar__brand">
        <img
          className="sidebar__logo-img sidebar__logo-img--project sidebar__logo-img--full-brand"
          src={sidebarFullLogo}
          alt="شعار مُدرك — مشروع التخرج"
          width={120}
          height={120}
          decoding="async"
        />
      </div>
      <nav className="sidebar__nav">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
          >
            <span className="sidebar__icon" aria-hidden>
              {icon}
            </span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__footer">
        <button
          type="button"
          className="btn-logout sidebar__logout"
          onClick={handleLogout}
        >
          تسجيل الخروج
        </button>
        <p className="sidebar__footer-note">بيانات تجريبية — واجهة عرض</p>
      </div>
    </aside>
  );
}
