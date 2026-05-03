import { Outlet, useLocation } from "react-router-dom";
import { StudentSidebar } from "../components/student/StudentSidebar";
import { PROJECT_LOGO_SRC } from "../branding";
import { getDemoStudent } from "../data/seasMock";
import { studentTopbarSubtitle } from "../lib/studentTopbarSubtitle";

export function StudentLayout() {
  const { pathname } = useLocation();
  const student = getDemoStudent();
  const studentName = student?.name ?? "الطالب";
  const subtitle = studentTopbarSubtitle(pathname, studentName);
  const chipLabel = student
    ? `درجة تركيزي: ${student.engagementScore}%`
    : "—";

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
            <span className="chip chip--muted">{chipLabel}</span>
          </div>
        </header>
        <main className="main-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
