import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { TrendLineChart } from "../../components/TrendLineChart";
import { FocusCameraModal } from "../../components/student/FocusCameraModal";
import {
  getDemoStudent,
  getInstructorCalendarHighlightIso,
  getStudentWeeklyScheduleSlots,
  mockSessions,
} from "../../data/seasMock";

type VirtualViewMode = "current" | "recorded";

type LectureStatus = "upcoming" | "live" | "ended";

type LectureRow = {
  id: string;
  courseName: string;
  courseCode: string;
  room?: string;
  dateIso: string;
  startTime: string;
  endTime: string;
  status: LectureStatus;
};

/** للعرض التجريبي: الصف 1 انتهت، الصف 2 انضم الآن (فعّال)، الباقي زر معطّل */
function demoLectureStatusByIndex(index: number): LectureStatus {
  if (index === 0) return "ended";
  if (index === 1) return "live";
  return "upcoming";
}

function formatLectureDate(dateIso: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("ar-SA-u-nu-latn", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function StudentVirtualClassroomsPage() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [viewMode, setViewMode] = useState<VirtualViewMode>("current");
  const student = getDemoStudent();

  const sessionsForCourse = useMemo(() => {
    if (!student) return [];
    return [...mockSessions]
      .filter((s) => s.course === student.course)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [student]);

  /** ترتيب زمني تصاعدي لرسم متوسط التفاعل */
  const sessionsChartAsc = useMemo(
    () =>
      [...sessionsForCourse].sort((a, b) => a.date.localeCompare(b.date)),
    [sessionsForCourse]
  );

  const lectures = useMemo((): LectureRow[] => {
    if (!student) return [];
    const weekDates = getInstructorCalendarHighlightIso();
    const slots = getStudentWeeklyScheduleSlots(student);

    return [...slots]
      .sort((a, b) => {
        const da = weekDates[a.weekday] ?? "";
        const db = weekDates[b.weekday] ?? "";
        if (da !== db) return da.localeCompare(db);
        return a.startTime.localeCompare(b.startTime);
      })
      .map((s, i) => {
        const dateIso = weekDates[s.weekday] ?? "";
        return {
          id: `${s.weekday}-${s.startTime}-${i}`,
          courseName: s.courseName,
          courseCode: s.courseCode,
          room: s.room,
          dateIso,
          startTime: s.startTime,
          endTime: s.endTime,
          status: demoLectureStatusByIndex(i),
        };
      });
  }, [student]);

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

      <header className="page-header page-header--virtual">
        <h1>الفصول الافتراضية</h1>
      </header>

      <section className="panel student-virtual-panel" id="sessions">
        <div
          className="student-filter student-virtual-view-filter"
          aria-label="نوع عرض الفصول الافتراضية"
        >
          <div className="student-filter__bar">
            <div className="student-filter__segment student-filter__segment--course">
              <label className="student-filter__label" htmlFor="student-virtual-view">
                عرض المحاضرات
              </label>
              <div className="student-filter__shell">
                <span className="student-filter__glyph" aria-hidden>
                  ◫
                </span>
                <select
                  id="student-virtual-view"
                  className="student-filter__select"
                  value={viewMode}
                  onChange={(e) =>
                    setViewMode(e.target.value as VirtualViewMode)
                  }
                >
                  <option value="current">المحاضرات الحالية</option>
                  <option value="recorded">المحاضرات المسجلة</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {viewMode === "current" ? (
          <>
            <h2 className="panel__title student-virtual-panel__body-title">
              جدولة المحاضرات
            </h2>
            <p className="panel__hint">
              أسبوع العرض يطابق بيانات الجدول التجريبية (26 أبريل – 2 مايو 2026).
            </p>

            {lectures.length === 0 ? (
              <p className="reports-page__empty-cell panel__hint">
                لا توجد محاضرات مطابقة لمقررك في البيانات التجريبية.
              </p>
            ) : (
              <ul className="student-virtual-list">
                {lectures.map((lec) => (
                  <li key={lec.id} className="student-virtual-list__item">
                    <div className="student-virtual-list__main">
                      <div className="student-virtual-list__title-row">
                        <strong className="student-virtual-list__title">
                          {lec.courseName}
                        </strong>
                        <span className="student-virtual-list__code">{lec.courseCode}</span>
                      </div>
                      <p className="student-virtual-list__meta">
                        <span>{formatLectureDate(lec.dateIso)}</span>
                        <span className="student-virtual-list__sep" aria-hidden>
                          ·
                        </span>
                        <span dir="ltr">
                          {lec.startTime} – {lec.endTime}
                        </span>
                        {lec.room ? (
                          <>
                            <span className="student-virtual-list__sep" aria-hidden>
                              ·
                            </span>
                            <span>{lec.room}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                    <div className="student-virtual-list__action">
                      {lec.status === "ended" ? (
                        <span className="student-virtual-list__ended">انتهت</span>
                      ) : lec.status === "live" ? (
                        <button
                          type="button"
                          className="btn-primary student-virtual-list__join"
                          onClick={() => setCameraOpen(true)}
                        >
                          انضم الآن
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-primary student-virtual-list__join"
                          disabled
                          title="يُفعّل الزر عند بداية وقت المحاضرة"
                        >
                          انضم الآن
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <h2
              id="student-virtual-recorded-sessions-title"
              className="panel__title student-virtual-panel__body-title"
            >
              الجلسات المسجّلة للمقرر
            </h2>
            <p className="panel__hint">
              جلسات تجريبية مرتبطة بمقررك ضمن منصة مُدرك (نفس مصدر تقارير المحاضر).
            </p>
            {sessionsChartAsc.length > 0 ? (
              <div className="student-virtual-sessions-chart">
                <TrendLineChart
                  title="متوسط التفاعل عبر الجلسات المسجّلة (%)"
                  values={sessionsChartAsc.map((s) => s.avgEngagement)}
                  xLabels={sessionsChartAsc.map((s) =>
                    s.date.slice(5).replace("-", "/")
                  )}
                />
              </div>
            ) : null}
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
          </>
        )}
      </section>

      <FocusCameraModal open={cameraOpen} onClose={() => setCameraOpen(false)} />
    </div>
  );
}
