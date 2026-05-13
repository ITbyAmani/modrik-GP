import { NavLink } from "react-router-dom";
import sidebarFullLogo from "../../assets/modrik-sidebar-logo.png";
import { mockStudents } from "../../data/seasMock";

const atRiskCount = mockStudents.filter((s) => s.atRisk).length;

const navItems: {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
  badge?: number;
}[] = [
  { to: "/", label: "الرئيسية", icon: "◉", end: true },
  { to: "/monitoring", label: "المراقبة المباشرة", icon: "◎" },
  { to: "/students", label: "الطلاب", icon: "▣" },
  {
    to: "/at-risk",
    label: "يحتاجون دعم",
    icon: "!",
    badge: atRiskCount,
  },
  { to: "/sessions", label: "الجلسات التعليمية", icon: "▤" },
  { to: "/reports", label: "التقارير والتحليلات", icon: "≡" },
];

export function FacultySidebar() {
  return (
    <aside className="sidebar" aria-label="قائمة عضو هيئة التدريس">
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
        {navItems.map(({ to, label, icon, end, badge }) => (
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
            {to === "/at-risk" && badge && badge > 0 ? (
              <span className="sidebar__badge">{badge}</span>
            ) : null}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__footer">
        <p>بيانات تجريبية — واجهة عرض</p>
      </div>
    </aside>
  );
}
