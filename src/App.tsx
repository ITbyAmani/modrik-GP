import { Navigate, Route, Routes } from "react-router-dom";
import { RequireInstructor } from "./auth/RequireInstructor";
import { RequireStudent } from "./auth/RequireStudent";
import { WildcardRedirect } from "./auth/WildcardRedirect";
import { FacultyLayout } from "./layouts/FacultyLayout";
import { StudentLayout } from "./layouts/StudentLayout";
import { InstructorLoginPage } from "./pages/auth/InstructorLoginPage";
import { StudentLoginPage } from "./pages/auth/StudentLoginPage";
import { InstructorHomePage } from "./pages/instructor/InstructorHomePage";
import { MonitoringPage } from "./pages/instructor/MonitoringPage";
import { StudentsView } from "./components/StudentsView";
import { StudentProfilePage } from "./pages/instructor/StudentProfilePage";
import { ReportsAnalyticsPage } from "./pages/instructor/ReportsAnalyticsPage";
import { SessionsView } from "./components/SessionsView";
import { StudentDashboardPage } from "./pages/student/StudentDashboardPage";
import { StudentNotificationsPage } from "./pages/student/StudentNotificationsPage";
import { StudentVirtualClassroomsPage } from "./pages/student/StudentVirtualClassroomsPage";
import "./App.css";

/**
 * مسار تخطيط بدون path + مسارات مطلقة (/، /monitoring، …)
 * يعمل بشكل موثوق مع React Router 7 (تجنب Outlet فارغ مع parent path="/").
 */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<InstructorLoginPage />} />
      <Route path="/student/login" element={<StudentLoginPage />} />

      <Route element={<RequireInstructor />}>
        <Route element={<FacultyLayout />}>
          <Route path="/" element={<InstructorHomePage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/students/:studentId" element={<StudentProfilePage />} />
          <Route path="/students" element={<StudentsView />} />
          <Route path="/at-risk" element={<StudentsView onlyAtRisk />} />
          <Route path="/sessions" element={<SessionsView />} />
          <Route path="/reports" element={<ReportsAnalyticsPage />} />
        </Route>
      </Route>

      <Route element={<RequireStudent />}>
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<StudentDashboardPage />} />
          <Route path="/student/profile" element={<Navigate to="/student" replace />} />
          <Route path="/student/virtual" element={<StudentVirtualClassroomsPage />} />
          <Route path="/student/notifications" element={<StudentNotificationsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<WildcardRedirect />} />
    </Routes>
  );
}
