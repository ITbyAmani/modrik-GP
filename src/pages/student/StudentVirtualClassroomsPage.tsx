import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FocusCameraModal } from "../../components/student/FocusCameraModal";
import {
  getDemoStudent,
  getInstructorCalendarHighlightIso,
  getStudentWeeklyScheduleSlots,
} from "../../data/seasMock";

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

function dateTimeOn(dateIso: string, hhmm: string): Date {
  const [y, mo, d] = dateIso.split("-").map(Number);
  const [hh, mm] = hhmm.split(":").map(Number);
  return new Date(y, mo - 1, d, hh, mm, 0, 0);
}

function lectureStatus(now: Date, start: Date, end: Date): LectureStatus {
  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "live";
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
  const student = getDemoStudent();

  const lectures = useMemo((): LectureRow[] => {
    if (!student) return [];
    const weekDates = getInstructorCalendarHighlightIso();
    const slots = getStudentWeeklyScheduleSlots(student);
    const now = new Date();

    return [...slots]
      .sort((a, b) => {
        const da = weekDates[a.weekday] ?? "";
        const db = weekDates[b.weekday] ?? "";
        if (da !== db) return da.localeCompare(db);
        return a.startTime.localeCompare(b.startTime);
      })
      .map((s, i) => {
        const dateIso = weekDates[s.weekday] ?? "";
        const start = dateTimeOn(dateIso, s.startTime);
        const end = dateTimeOn(dateIso, s.endTime);
        const status = lectureStatus(now, start, end);
        return {
          id: `${s.weekday}-${s.startTime}-${i}`,
          courseName: s.courseName,
          courseCode: s.courseCode,
          room: s.room,
          dateIso,
          startTime: s.startTime,
          endTime: s.endTime,
          status,
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

      <header className="page-header">
        <h1>الفصول الافتراضية</h1>
      </header>

      <section className="panel">
        <h2 className="panel__title">جدولة المحاضرات</h2>
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
      </section>

      <FocusCameraModal open={cameraOpen} onClose={() => setCameraOpen(false)} />
    </div>
  );
}
