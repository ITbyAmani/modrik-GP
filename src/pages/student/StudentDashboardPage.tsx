import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import instructorAvatar from "../../assets/instructor-avatar.svg";
import { InstructorWeekCalendar } from "../../components/faculty/InstructorWeekCalendar";
import { StudentProfileContent } from "../../components/student/StudentProfileContent";
import {
  getDemoStudent,
  getStudentWeeklyScheduleSlots,
  instructorScheduleWeekLabel,
} from "../../data/seasMock";

export function StudentDashboardPage() {
  const student = getDemoStudent();

  const slotsForWeek = useMemo(
    () => (student ? getStudentWeeklyScheduleSlots(student) : []),
    [student]
  );

  if (!student) {
    return <Navigate to="/student/login" replace />;
  }

  return (
    <div className="page-stack student-dash-page">
      <header className="page-header student-dash-page__intro">
        <h1>لوحة الطالب</h1>
        <p className="panel__hint student-dash-page__lead">
          نظرة على جدولك ومؤشرات التفاعل (بيانات تجريبية).
        </p>
      </header>

      <section className="instructor-dash-hero" aria-label="الملف والجدولة">
        <aside className="instructor-profile-panel">
          <p className="instructor-profile-panel__welcome">مرحباً</p>

          <div className="instructor-avatar-ring">
            <div className="instructor-avatar-ring__inner">
              <img
                src={instructorAvatar}
                alt=""
                width={112}
                height={112}
                decoding="async"
              />
            </div>
          </div>

          <div className="instructor-profile-panel__details">
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">الاسم</span>
              <span className="instructor-profile-panel__v">{student.name}</span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">الرقم الجامعي</span>
              <span className="instructor-profile-panel__v" dir="ltr">
                {student.id}
              </span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">التخصص</span>
              <span className="instructor-profile-panel__v">{student.major}</span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">الكلية</span>
              <span className="instructor-profile-panel__v">{student.college}</span>
            </div>
          </div>
        </aside>

        <div className="welcome-banner-instructor student-dash-week-wrap">
          <div className="welcome-banner-instructor__schedule">
            <h2 className="student-dash-week__title">جدول مقرري هذا الأسبوع</h2>
            {slotsForWeek.length > 0 ? (
              <InstructorWeekCalendar
                slots={slotsForWeek}
                weekLabel={instructorScheduleWeekLabel}
              />
            ) : (
              <p className="panel__hint student-dash-week__empty">
                لا توجد خانات جدول مطابقة للمقرر في البيانات التجريبية الحالية.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="student-dash-below">
        <StudentProfileContent student={student} embedded />
      </div>
    </div>
  );
}
