import { Outlet } from "react-router-dom";
import { FacultySidebar } from "../components/faculty/FacultySidebar";
import { PROJECT_LOGO_SRC } from "../branding";
import { currentLecture, dashboardSummary } from "../data/seasMock";

export function FacultyLayout() {
  return (
    <div className="shell">
      <FacultySidebar />
      <div className="shell__main">
        <header className="topbar">
          <div className="topbar__lead">
            <img
              className="topbar__logo topbar__logo--project"
              src={PROJECT_LOGO_SRC}
              alt="شعار مُدرك — لوحة عضو هيئة التدريس"
              decoding="async"
            />
            <div>
              <h1 className="visually-hidden">
                مُدرك — لوحة عضو هيئة التدريس
              </h1>
              <p className="topbar__subtitle">
                {currentLecture.title} ·{" "}
                <span className="topbar__role">لوحة عضو هيئة التدريس</span>
              </p>
            </div>
          </div>
          <div className="topbar__meta">
            <span className="chip chip--muted">
              متوسط الأسبوع: {dashboardSummary.avgEngagementThisWeek}%
            </span>
          </div>
        </header>
        <main className="main-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
