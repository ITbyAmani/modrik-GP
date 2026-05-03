import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { InstructorWeekCalendar } from "../../components/faculty/InstructorWeekCalendar";
import { FocusCameraModal } from "../../components/student/FocusCameraModal";
import {
  getDemoStudent,
  instructorScheduleWeekLabel,
  instructorWeeklySchedule,
} from "../../data/seasMock";

const WEEKDAY_NAMES = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
] as const;

export function StudentVirtualClassroomsPage() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const student = getDemoStudent();

  const slotsForCourse = useMemo(
    () =>
      instructorWeeklySchedule.filter((s) => s.courseName === student?.course),
    [student?.course]
  );

  const scheduleRows = useMemo(() => {
    return [...slotsForCourse].sort((a, b) => {
      if (a.weekday !== b.weekday) return a.weekday - b.weekday;
      return a.startTime.localeCompare(b.startTime);
    });
  }, [slotsForCourse]);

  if (!student) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page-stack">
      <nav className="breadcrumb">
        <Link to="/student">لوحة الطالب</Link>
        <span aria-hidden> / </span>
        <span>الفصول الافتراضية</span>
      </nav>

      <header className="page-header">
        <h1>الفصول الافتراضية</h1>
        <p>
          جدولة محاضرات مقررك لهذا الأسبوع، والانضمام للفصل الحالي عبر زر{" "}
          <strong>انضم الآن</strong> مع معاينة كاميرا لمحاكاة مراقبة التركيز.
        </p>
      </header>

      <section className="panel student-virtual-cta-panel">
        <div className="student-virtual-cta-panel__row">
          <div>
            <h2 className="panel__title">الفصل الافتراضي الحالي (تجريبي)</h2>
            <p className="panel__hint">
              {student.course} — يُفتح معاينة الكاميرا محلياً في المتصفح بعد
              منح الإذن.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary student-virtual-join-btn"
            onClick={() => setCameraOpen(true)}
          >
            انضم الآن
          </button>
        </div>
      </section>

      <section className="panel">
        <h2 className="panel__title">جدول المحاضرات (أسبوعي)</h2>
        <p className="panel__hint">
          نفس أسبوع الجدول الأكاديمي في منصة المحاضر، مُصفّى لمقررك.
        </p>
        <div className="welcome-banner-instructor student-virtual-week">
          <div className="welcome-banner-instructor__schedule">
            <InstructorWeekCalendar
              slots={slotsForCourse}
              weekLabel={instructorScheduleWeekLabel}
            />
          </div>
        </div>
      </section>

      <section className="panel">
        <h2 className="panel__title">قائمة المواعيد</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>اليوم</th>
                <th>الوقت</th>
                <th>المقرر</th>
                <th>القاعة</th>
              </tr>
            </thead>
            <tbody>
              {scheduleRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="reports-page__empty-cell">
                    لا توجد مواعيد مطابقة في البيانات التجريبية.
                  </td>
                </tr>
              ) : (
                scheduleRows.map((s, i) => (
                  <tr key={`${s.weekday}-${s.startTime}-${i}`}>
                    <td>{WEEKDAY_NAMES[s.weekday] ?? s.weekday}</td>
                    <td dir="ltr">
                      {s.startTime} – {s.endTime}
                    </td>
                    <td>
                      {s.courseName} ({s.courseCode})
                    </td>
                    <td>{s.room ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <FocusCameraModal open={cameraOpen} onClose={() => setCameraOpen(false)} />
    </div>
  );
}
