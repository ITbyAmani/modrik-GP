import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockStudents } from "../data/seasMock";

/** 80–100 أخضر، 70–79 أصفر، أقل من 70 أحمر */
function focusScoreTier(score: number): "green" | "yellow" | "red" {
  if (score >= 80) return "green";
  if (score >= 70) return "yellow";
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

      <section className="students-filters" aria-label="تصفية وبحث الطلاب">
        <div className="students-filters__head">
          <span className="students-filters__head-title">تصفية القائمة</span>
          <span className="students-filters__head-desc">
            اختر مقرراً أو ابحث بالاسم أو الرقم الجامعي
          </span>
        </div>
        <div className="students-filters__grid">
          <div className="students-filters__field">
            <label
              className="students-filters__label"
              htmlFor="students-course-filter"
            >
              المقرر
            </label>
            <div className="students-filters__control students-filters__control--select">
              <select
                id="students-course-filter"
                className="students-filters__select"
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
          <div className="students-filters__field">
            <label className="students-filters__label" htmlFor="students-search">
              بحث
            </label>
            <div className="students-filters__control students-filters__control--search">
              <span className="students-filters__search-icon" aria-hidden>
                ⌕
              </span>
              <input
                id="students-search"
                type="search"
                className="students-filters__input"
                placeholder="الاسم، الرقم الجامعي، أو المقرر…"
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
