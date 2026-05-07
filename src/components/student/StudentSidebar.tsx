import { NavLink } from "react-router-dom";
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
  return (
    <aside className="sidebar" aria-label="قائمة الطالب">
      <div className="sidebar__brand">
        <div className="sidebar__logo-circle">
          <img
            className="sidebar__logo-img sidebar__logo-img--project sidebar__logo-img--full-brand"
            src={sidebarFullLogo}
            alt="شعار مُدرك — مشروع التخرج"
            width={120}
            height={120}
            decoding="async"
          />
        </div>
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
        <p>بيانات تجريبية — واجهة عرض</p>
      </div>
    </aside>
  );
}
