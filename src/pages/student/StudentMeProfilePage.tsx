import { Link, Navigate } from "react-router-dom";
import { StudentProfileContent } from "../../components/student/StudentProfileContent";
import { getDemoStudent } from "../../data/seasMock";

export function StudentMeProfilePage() {
  const student = getDemoStudent();

  if (!student) {
    return <Navigate to="/student" replace />;
  }

  return (
    <div className="page-stack">
      <nav className="breadcrumb">
        <Link to="/student">لوحة الطالب</Link>
        <span aria-hidden> / </span>
        <span>ملفي</span>
      </nav>

      <StudentProfileContent student={student} />
    </div>
  );
}
