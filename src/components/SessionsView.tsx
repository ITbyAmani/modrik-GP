import { useEffect, useMemo, useState } from "react";
import { mockSessions, mockStudents } from "../data/seasMock";

export function SessionsView() {
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const courseOptions = useMemo(() => {
    const names = Array.from(new Set(mockStudents.map((s) => s.course)));
    return names.sort((a, b) => a.localeCompare(b, "ar"));
  }, []);

  useEffect(() => {
    if (courseFilter && !courseOptions.includes(courseFilter)) {
      setCourseFilter("");
    }
  }, [courseFilter, courseOptions]);

  const sessionsFiltered = useMemo(() => {
    const sorted = [...mockSessions].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    let rows = sorted;
    if (courseFilter) {
      rows = rows.filter((s) => s.course === courseFilter);
    }
    const q = query.trim();
    if (q) {
      const qLower = q.toLowerCase();
      rows = rows.filter(
        (s) =>
          s.courseName.includes(q) ||
          s.courseName.toLowerCase().includes(qLower) ||
          s.course.includes(q) ||
          s.course.toLowerCase().includes(qLower)
      );
    }
    return rows;
  }, [courseFilter, query]);

  const totalAll = mockSessions.length;
  const hasActiveFilters = Boolean(courseFilter || query.trim());

  return (
    <div className="page-stack">
      <section
        className="student-filter student-filter--faculty"
        aria-label="تصفية وبحث الجلسات"
      >
        <div className="student-filter__bar">
          <div className="student-filter__segment student-filter__segment--course">
            <label className="student-filter__label" htmlFor="sessions-course-filter">
              المقرر
            </label>
            <div className="student-filter__shell">
              <span className="student-filter__glyph" aria-hidden>
                ◫
              </span>
              <select
                id="sessions-course-filter"
                className="student-filter__select"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="">جميع المقررات</option>
                {courseOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="student-filter__rule" aria-hidden />
          <div className="student-filter__segment student-filter__segment--search">
            <label className="student-filter__label" htmlFor="sessions-search">
              بحث في الجلسات
            </label>
            <div className="student-filter__shell student-filter__shell--search">
              <span
                className="student-filter__glyph student-filter__glyph--search"
                aria-hidden
              >
                ⌕
              </span>
              <input
                id="sessions-search"
                type="search"
                className="student-filter__input"
                placeholder="جزء من عنوان المحاضرة أو اسم المقرر…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <p className="sessions-view__summary" role="status">
          {!hasActiveFilters
            ? `إجمالي الجلسات المعروضة: ${totalAll}`
            : `عرض ${sessionsFiltered.length} من أصل ${totalAll} جلسة${
                courseFilter ? ` — المقرر: ${courseFilter}` : ""
              }`}
        </p>
      </section>

      {sessionsFiltered.length === 0 ? (
        <p className="sessions-view__empty panel">
          لا توجد جلسات تطابق التصفية. جرّب «جميع المقررات» أو امسح البحث.
        </p>
      ) : (
        <div className="cards-grid">
          {sessionsFiltered.map((s) => (
            <article key={s.id} className="session-card">
              <div className="session-card__head">
                <h2>{s.courseName}</h2>
                <span className="score-pill score-pill--lg">{s.avgEngagement}%</span>
              </div>
              <dl className="session-card__dl">
                <div>
                  <dt>التاريخ</dt>
                  <dd>{s.date}</dd>
                </div>
                <div>
                  <dt>المسجلون</dt>
                  <dd>{s.studentsCount}</dd>
                </div>
              </dl>
              <div className="session-card__footer">
                {s.notes ? (
                  <p className="session-card__notes">{s.notes}</p>
                ) : (
                  <p className="session-card__notes session-card__notes--empty">
                    لا توجد ملاحظات مسجّلة لهذه الجلسة.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="sessions-view__hint">
        بيانات تجريبية — إضافة جلسة أو تعديلها من لوحة الجامعة يمكن ربطها لاحقاً
        من واجهة الـ API.
      </p>
    </div>
  );
}
