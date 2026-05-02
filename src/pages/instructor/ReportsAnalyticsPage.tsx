import { useMemo, useState } from "react";
import { mockSessions, mockStudents } from "../../data/seasMock";

const periods = [
  { id: "4w", label: "آخر ٤ أسابيع" },
  { id: "8w", label: "آخر ٨ أسابيع" },
  { id: "sem", label: "الفصل الحالي" },
];

export function ReportsAnalyticsPage() {
  const [period, setPeriod] = useState(periods[1].id);
  const [course, setCourse] = useState("all");

  const courses = useMemo(() => {
    const s = new Set(mockStudents.map((x) => x.course));
    return ["all", ...Array.from(s)];
  }, []);

  const rows = useMemo(() => {
    let list = mockStudents;
    if (course !== "all") list = list.filter((s) => s.course === course);
    return list;
  }, [course]);

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1>التقارير والتحليلات</h1>
        <p>فلاتر للفترة والمقرر، مع إمكانية تصدير البيانات (واجهة فقط).</p>
      </header>

      <section className="panel report-filters" data-period={period}>
        <h2 className="panel__title">تخصيص المقاييس</h2>
        <div className="report-filters__row">
          <label>
            الفترة الزمنية
            <select
              className="select-input"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {periods.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            المقرر
            <select
              className="select-input"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="all">جميع المقررات</option>
              {courses
                .filter((c) => c !== "all")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <p className="panel__hint">
          الفترة المختارة:{" "}
          <strong>{periods.find((p) => p.id === period)?.label}</strong> — البيانات
          المعروضة تجريبية.
        </p>
        <div className="report-actions">
          <button type="button" className="btn-primary" disabled title="ربط لاحق">
            تحميل PDF
          </button>
          <button type="button" className="btn-secondary" disabled title="ربط لاحق">
            تحميل Excel
          </button>
        </div>
      </section>

      <section className="panel">
        <h2 className="panel__title">ملخص الطلاب حسب الفلتر</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>الطالب</th>
                <th>المقرر</th>
                <th>التفاعل</th>
                <th>الحضور</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.course}</td>
                  <td>{s.engagementScore}%</td>
                  <td>{s.attendanceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2 className="panel__title">جلسات مسجّلة</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>الجلسة</th>
                <th>التاريخ</th>
                <th>متوسط التفاعل</th>
              </tr>
            </thead>
            <tbody>
              {mockSessions.map((x) => (
                <tr key={x.id}>
                  <td>{x.courseName}</td>
                  <td>{x.date}</td>
                  <td>{x.avgEngagement}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
