import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockStudents } from "../data/seasMock";

/** ≥70 أخضر، 60–69 أصفر، أقل من 60 أحمر */
function focusScoreTier(score: number): "green" | "yellow" | "red" {
  const n = Number(score);
  if (!Number.isFinite(n)) return "red";
  if (n >= 70) return "green";
  if (n >= 60) return "yellow";
  return "red";
}

function focusScoreRowClass(score: number): string {
  const tier = focusScoreTier(score);
  return `row-focus row-focus--${tier}`;
}

function focusScorePillClass(score: number): string {
  const base = "score-pill";
  const tier = focusScoreTier(score);
  return `${base} score-pill--focus-${tier}`;
}

export function StudentsView({ onlyAtRisk = false }: { onlyAtRisk?: boolean }) {
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const baseRows = useMemo(
    () =>
      onlyAtRisk ? mockStudents.filter((s) => s.atRisk) : mockStudents,
    [onlyAtRisk]
  );

  const courseOptions = useMemo(() => {
    const names = Array.from(new Set(baseRows.map((s) => s.course)));
    return names.sort((a, b) => a.localeCompare(b, "ar"));
  }, [baseRows]);

  useEffect(() => {
    if (courseFilter && !courseOptions.includes(courseFilter)) {
      setCourseFilter("");
    }
  }, [courseFilter, courseOptions]);

  const list = useMemo(() => {
    let rows = baseRows;
    if (courseFilter) {
      rows = rows.filter((s) => s.course === courseFilter);
    }
    const q = query.trim();
    if (q) {
      rows = rows.filter(
        (s) =>
          s.name.includes(q) ||
          s.id.includes(q) ||
          s.course.includes(q)
      );
    }
    return rows;
  }, [baseRows, courseFilter, query]);

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1>{onlyAtRisk ? "طلاب يحتاجون دعم" : "الطلاب"}</h1>
        <p>
          قائمة الطلاب مع درجة التركيز — افتح{" "}
          <strong>ملف الطالب</strong> للتحليل التفصيلي والتوصيات.
        </p>
      </header>

      <section className="student-filter" aria-label="تصفية وبحث الطلاب">
        <p className="student-filter__hint">
          اختر مقرراً أو ابحث بالاسم / الرقم الجامعي / المقرر
        </p>
        <div className="student-filter__bar">
          <div className="student-filter__segment student-filter__segment--course">
            <label className="student-filter__label" htmlFor="students-course-filter">
              المقرر
            </label>
            <div className="student-filter__shell">
              <span className="student-filter__glyph" aria-hidden>
                ◫
              </span>
              <select
                id="students-course-filter"
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
            <label className="student-filter__label" htmlFor="students-search">
              بحث
            </label>
            <div className="student-filter__shell student-filter__shell--search">
              <span className="student-filter__glyph student-filter__glyph--search" aria-hidden>
                ⌕
              </span>
              <input
                id="students-search"
                type="search"
                className="student-filter__input"
                placeholder="ابحث في الطلاب المعروضين…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="table-wrap">
        <table className="data-table data-table--students">
          <thead>
            <tr>
              <th scope="col">الطالب</th>
              <th scope="col">المقرر</th>
              <th scope="col">درجة التركيز</th>
              <th scope="col">آخر جلسة</th>
              <th scope="col" className="th-narrow">
                ملف الطالب
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr
                key={s.id}
                className={`${focusScoreRowClass(s.engagementScore)}${
                  s.atRisk ? " row-at-risk" : ""
                }`}
              >
                <td>
                  <div className="cell-name">
                    <strong>{s.name}</strong>
                    <span className="muted-xs">{s.id}</span>
                  </div>
                </td>
                <td>{s.course}</td>
                <td>
                  <span className={focusScorePillClass(s.engagementScore)}>
                    {s.engagementScore}%
                  </span>
                </td>
                <td>{s.lastSessionDate}</td>
                <td>
                  <Link className="btn-ghost" to={`/students/${s.id}`}>
                    عرض
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
