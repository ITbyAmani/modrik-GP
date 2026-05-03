import { NavLink, Outlet, useLocation } from "react-router-dom";
import { StudentSidebar } from "../components/student/StudentSidebar";
import { PROJECT_LOGO_SRC } from "../branding";
import { getDemoStudent } from "../data/seasMock";
import { studentTopbarSubtitle } from "../lib/studentTopbarSubtitle";

export function StudentLayout() {
  const { pathname } = useLocation();
  const student = getDemoStudent();
  const studentName = student?.name ?? "الطالب";
  const subtitle = studentTopbarSubtitle(pathname, studentName);

  return (
    <div className="shell">
      <StudentSidebar />
      <div className="shell__main">
        <header className="topbar">
          <div className="topbar__lead">
            <img
              className="topbar__logo topbar__logo--project"
              src={PROJECT_LOGO_SRC}
              alt="شعار مُدرك — مشروع التخرج"
              decoding="async"
            />
            <div>
              <h1 className="visually-hidden">مُدرك — الطالب</h1>
              <p className="topbar__subtitle">{subtitle}</p>
            </div>
          </div>
          <div className="topbar__meta">
            <NavLink
              to="/student/notifications"
              className={({ isActive }) =>
                `student-topbar-notify${isActive ? " student-topbar-notify--active" : ""}`
              }
              aria-label="التنبيهات"
              title="التنبيهات"
            >
              <svg
                className="student-topbar-notify__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75v-.7V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </NavLink>
          </div>
        </header>
        <main className="main-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
