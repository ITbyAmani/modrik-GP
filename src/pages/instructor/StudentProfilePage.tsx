import { Navigate, useParams } from "react-router-dom";
import { StudentProfileContent } from "../../components/student/StudentProfileContent";
import { getStudentById } from "../../data/seasMock";

export function StudentProfilePage() {
  const { studentId } = useParams();
  const student = studentId ? getStudentById(studentId) : undefined;

  if (!studentId) return <Navigate to="/students" replace />;
  if (!student) return <Navigate to="/students" replace />;

  return (
    <div className="page-stack student-profile-page">
      <StudentProfileContent student={student} />
    </div>
  );
}
