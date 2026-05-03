import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { InstructorWeekCalendar } from "../../components/faculty/InstructorWeekCalendar";
import { MultimodalIndicators } from "../../components/MultimodalIndicators";
import {
  getDemoStudent,
  instructorScheduleWeekLabel,
  instructorWeeklySchedule,
  mockSessions,
} from "../../data/seasMock";

function initialsFromName(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length >= 2) return (p[0][0] + p[1][0]).slice(0, 2);
  return name.slice(0, 2);
}

export function StudentDashboardPage() {
  const student = getDemoStudent();

  const slotsForCourse = useMemo(
    () =>
      instructorWeeklySchedule.filter((s) => s.courseName === student?.course),
    [student?.course]
  );

  const sessionsForCourse = useMemo(() => {
    if (!student) return [];
    return [...mockSessions]
      .filter((s) => s.course === student.course)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [student]);

  if (!student) {
    return <Navigate to="/" replace />;
  }

  const ini = initialsFromName(student.name);

  return (
    <div className="page-stack">
      <h1 className="visually-hidden">لوحة الطالب — {student.name}</h1>
      <section className="instructor-dash-hero" aria-label="الملف والجدولة">
        <aside className="instructor-profile-panel">
          <p className="instructor-profile-panel__welcome">مرحباً</p>

          <div className="instructor-avatar-ring">
            <div className="instructor-avatar-ring__inner instructor-avatar-ring__inner--initials">
              <span aria-hidden>{ini}</span>
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
              <span className="instructor-profile-panel__k">المقرر</span>
              <span className="instructor-profile-panel__v">{student.course}</span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">مستوى الانخراط</span>
              <span className="instructor-profile-panel__v">{student.level}</span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">آخر جلسة</span>
              <span className="instructor-profile-panel__v">
                {student.lastSessionDate}
              </span>
            </div>
          </div>

          <p className="student-dash-profile__cta">
            <Link to="/student/profile">عرض ملفي التفصيلي</Link>
          </p>
        </aside>

        <div className="welcome-banner-instructor student-dash-week-wrap">
          <div className="welcome-banner-instructor__schedule">
            <h2 className="student-dash-week__title">جدول مقرري هذا الأسبوع</h2>
            {slotsForCourse.length > 0 ? (
              <InstructorWeekCalendar
                slots={slotsForCourse}
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

      <section className="kpi-grid student-dash-kpis" aria-label="ملخص سريع">
        <article className="kpi-card">
          <span className="kpi-card__label">درجة التركيز / التفاعل</span>
          <span className="kpi-card__value kpi-card__value--sm">
            {student.engagementScore}%
          </span>
        </article>
        <article className="kpi-card">
          <span className="kpi-card__label">نسبة الحضور</span>
          <span className="kpi-card__value kpi-card__value--sm">
            {student.attendanceRate}%
          </span>
        </article>
        <article className="kpi-card">
          <span className="kpi-card__label">التفاعل اللحظي (آخر جلسة)</span>
          <span className="kpi-card__value kpi-card__value--sm">
            {student.liveEngagement}%
          </span>
        </article>
      </section>

      <div className="two-col two-col--stretch">
        <section className="panel">
          <h2 className="panel__title">مؤشرات متعددة الوسائط</h2>
          <p className="panel__hint">كما تظهر في مراقبة المحاضر (بيانات تجريبية).</p>
          <MultimodalIndicators m={student.multimodal} />
        </section>
        <section className="panel">
          <h2 className="panel__title">أبرز الدرجات</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>المقرر</th>
                  <th>الدرجة</th>
                </tr>
              </thead>
              <tbody>
                {student.gradeRows.map((g) => (
                  <tr key={g.course}>
                    <td>{g.course}</td>
                    <td>
                      {g.score} / {g.max}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {student.recommendations.length > 0 ? (
        <section className="panel">
          <h2 className="panel__title">توصيات لك</h2>
          <ul className="student-profile-recs">
            {student.recommendations.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="panel" id="sessions" aria-labelledby="student-sessions-title">
        <h2 id="student-sessions-title" className="panel__title">
          الجلسات المسجّلة للمقرر
        </h2>
        <p className="panel__hint">
          جلسات تجريبية مرتبطة بمقررك ضمن منصة مُدرك (نفس مصدر تقارير المحاضر).
        </p>
        <div className="table-wrap">
          <table className="data-table data-table--reports-sessions">
            <thead>
              <tr>
                <th>الجلسة</th>
                <th>التاريخ</th>
                <th>متوسط التفاعل</th>
                <th>المسجلون</th>
              </tr>
            </thead>
            <tbody>
              {sessionsForCourse.length === 0 ? (
                <tr>
                  <td colSpan={4} className="reports-page__empty-cell">
                    لا توجد جلسات مسجّلة لهذا المقرر في العرض التجريبي.
                  </td>
                </tr>
              ) : (
                sessionsForCourse.map((s) => (
                  <tr key={s.id}>
                    <td>{s.courseName}</td>
                    <td>{s.date}</td>
                    <td>{s.avgEngagement}%</td>
                    <td>{s.studentsCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
