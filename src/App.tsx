import { Navigate, Route, Routes } from "react-router-dom";
import { FacultyLayout } from "./layouts/FacultyLayout";
import { StudentLayout } from "./layouts/StudentLayout";
import { InstructorHomePage } from "./pages/instructor/InstructorHomePage";
import { MonitoringPage } from "./pages/instructor/MonitoringPage";
import { StudentsView } from "./components/StudentsView";
import { StudentProfilePage } from "./pages/instructor/StudentProfilePage";
import { ReportsAnalyticsPage } from "./pages/instructor/ReportsAnalyticsPage";
import { SessionsView } from "./components/SessionsView";
import { StudentDashboardPage } from "./pages/student/StudentDashboardPage";
import { StudentMeProfilePage } from "./pages/student/StudentMeProfilePage";
import "./App.css";

/**
 * مسار تخطيط بدون path + مسارات مطلقة (/، /monitoring، …)
 * يعمل بشكل موثوق مع React Router 7 (تجنب Outlet فارغ مع parent path="/").
 */
export default function App() {
  return (
    <Routes>
      <Route element={<FacultyLayout />}>
        <Route path="/" element={<InstructorHomePage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/students/:studentId" element={<StudentProfilePage />} />
        <Route path="/students" element={<StudentsView />} />
        <Route path="/at-risk" element={<StudentsView onlyAtRisk />} />
        <Route path="/sessions" element={<SessionsView />} />
        <Route path="/reports" element={<ReportsAnalyticsPage />} />
      </Route>
      <Route element={<StudentLayout />}>
        <Route path="/student" element={<StudentDashboardPage />} />
        <Route path="/student/profile" element={<StudentMeProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
