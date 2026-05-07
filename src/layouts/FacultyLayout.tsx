import { Outlet, useLocation } from "react-router-dom";
import { FacultySidebar } from "../components/faculty/FacultySidebar";
import { PROJECT_LOGO_SRC } from "../branding";

export function FacultyLayout() {
  const { pathname } = useLocation();

  function currentPageTitle(path: string): string {
    const p = path.replace(/\/+$/, "") || "/";
    if (p === "/") return "الرئيسية";
    if (p === "/monitoring") return "المراقبة المباشرة";
    if (p === "/students") return "الطلاب";
    if (p === "/at-risk") return "طلاب يحتاجون دعم";
    if (p.startsWith("/students/")) return "ملف الطالب";
    if (p === "/sessions") return "الجلسات";
    if (p === "/reports") return "التقارير والتحليلات";
    return "لوحة المحاضر";
  }

  return (
    <div className="shell shell--faculty-ui">
      <FacultySidebar />
      <div className="shell__main">
        <header className="topbar">
          <div className="topbar__lead">
            <img
              className="topbar__logo topbar__logo--project"
              src={PROJECT_LOGO_SRC}
              alt="شعار مُدرك — مشروع التخرج"
              decoding="async"
            />
            <div className="topbar__titles">
              <h1 className="visually-hidden">مُدرك</h1>
              <p className="topbar__subtitle topbar__subtitle--brand">منصة مُدرك</p>
              <p className="topbar__subtitle topbar__subtitle--page">{currentPageTitle(pathname)}</p>
            </div>
          </div>
        </header>
        <main className="main-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
