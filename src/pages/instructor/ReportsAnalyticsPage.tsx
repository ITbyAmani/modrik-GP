import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TrendLineChart } from "../../components/TrendLineChart";
import {
  engagementTrendWeeks,
  mockSessions,
  mockStudents,
} from "../../data/seasMock";
import { focusScoreBand } from "../../lib/focusScoreBands";

const periods = [
  { id: "4w", label: "آخر ٤ أسابيع" },
  { id: "8w", label: "آخر ٨ أسابيع" },
  { id: "sem", label: "الفصل الحالي" },
] as const;

/** مرجع زمني تجريبي للفلاتر (نهاية الفصل) */
const REPORT_ANCHOR = "2026-04-30";

function periodRangeStart(periodId: string): string | null {
  if (periodId === "sem") return "2026-01-15";
  const d = new Date(`${REPORT_ANCHOR}T12:00:00`);
  if (periodId === "4w") d.setUTCDate(d.getUTCDate() - 28);
  if (periodId === "8w") d.setUTCDate(d.getUTCDate() - 56);
  return d.toISOString().slice(0, 10);
}

function inPeriod(dateStr: string, periodId: string): boolean {
  const start = periodRangeStart(periodId);
  if (!start) return true;
  return dateStr >= start && dateStr <= REPORT_ANCHOR;
}

function focusScoreRowClass(score: number): string {
  const tier = focusScoreBand(score);
  return `row-focus row-focus--${tier}`;
}

function focusScorePillClass(score: number): string {
  const tier = focusScoreBand(score);
  return `score-pill score-pill--focus-${tier}`;
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

function downloadCsv(filename: string, headers: string[], lines: string[][]) {
  const esc = (cell: string) => {
    const s = String(cell);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const body = [
    headers.map(esc).join(","),
    ...lines.map((row) => row.map(esc).join(",")),
  ].join("\n");
  const blob = new Blob(["\ufeff" + body], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ReportsAnalyticsPage() {
  const [period, setPeriod] = useState<(typeof periods)[number]["id"]>("8w");
  const [course, setCourse] = useState("all");
  const [query, setQuery] = useState("");

  const courseOptions = useMemo(() => {
    return Array.from(new Set(mockStudents.map((x) => x.course))).sort((a, b) =>
      a.localeCompare(b, "ar")
    );
  }, []);

  const studentRows = useMemo(() => {
    let list = mockStudents.filter((s) => inPeriod(s.lastSessionDate, period));
    if (course !== "all") list = list.filter((s) => s.course === course);
    const q = query.trim();
    if (q) {
      list = list.filter(
        (s) =>
          s.name.includes(q) ||
          s.id.includes(q) ||
          s.course.includes(q)
      );
    }
    return list;
  }, [course, period, query]);

  const sessionRows = useMemo(() => {
    let list = mockSessions.filter((s) => inPeriod(s.date, period));
    if (course !== "all") list = list.filter((s) => s.course === course);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [course, period]);

  const kpis = useMemo(() => {
    const eng = studentRows.map((s) => s.engagementScore);
    const att = studentRows.map((s) => s.attendanceRate);
    const atRisk = studentRows.filter((s) => s.atRisk).length;
    return {
      avgEngagement: avg(eng),
      avgAttendance: avg(att),
      atRisk,
      count: studentRows.length,
    };
  }, [studentRows]);

  const trendSlice = useMemo(() => {
    const w = engagementTrendWeeks;
    if (period === "4w") return w.slice(-4);
    if (period === "8w") return w.slice(-8);
    return w;
  }, [period]);

  const compareStats = useMemo(() => {
    const w = engagementTrendWeeks.map((x) => x.value);
    const last4 = avg(w.slice(-4));
    const last8 = avg(w.slice(-8));
    return { last4, last8 };
  }, []);

  const doctorRecommendations = useMemo(() => {
    const items: string[] = [];
    const { last4, last8 } = compareStats;
    const gap = last4 - last8;

    if (gap >= 2) {
      items.push(
        "الاتجاه في الأسابيع الأربع الأخيرة أقوى من متوسط ثمانية أسابيع: حافظ على نمط التفاعل القصير (أسئلة سريعة، مناقشة مصغّرة) الذي يبدو أنه يرفع المؤشر."
      );
    } else if (gap <= -2) {
      items.push(
        "متوسط التفاعل في آخر أربعة أسابيع أدنى من متوسط ثمانية أسابيع: راجع ترتيب المحتوى الثقيل، وأضف فواصل تفاعل كل ١٥–٢٠ دقيقة."
      );
    } else {
      items.push(
        "المنحنى الأسبوعي مستقر نسبياً بين نافذتي ٤ و٨ أسابيع؛ جرّب نشاطاً رقمياً موحّداً بعد المحاضرة لرفع المتابعة بين الجلسات."
      );
    }

    if (kpis.count === 0) {
      items.push(
        "الفلاتر الحالية لا تعرض طلاباً — وسّع الفترة أو اختر «جميع المقررات» لاستخلاص توصيات أوضح من البيانات."
      );
    } else {
      if (kpis.avgEngagement < 70) {
        items.push(
          `متوسط تفاعل الطلاب المعروضين (${kpis.avgEngagement}٪) دون عتبة ٧٠٪: فعّل نقاط تحقق بصرية أواضح (استطلاع شاشة، إيماءة) في أول عشرين دقيقة.`
        );
      } else if (kpis.avgEngagement >= 80) {
        items.push(
          "متوسط التفاعل ضمن العينة الحالية مرتفع: وثّق الأنشطة التي نجحت (مثلاً تمرين تطبيقي أو مناقشة جماعية) لمشاركتها مع الزملاء."
        );
      }
      if (kpis.atRisk >= 3) {
        items.push(
          "عدد الطلاب المعرضين للخطر مرتفع في العرض الحالي: خصّص متابعات قصيرة أسبوعياً واطّلع على صفحة «يحتاجون دعم»."
        );
      } else if (kpis.atRisk > 0) {
        items.push(
          `يوجد ${kpis.atRisk} طالب/طالبة ضمن «معرض للخطر» في الجدول — راجع الملفات الفردية والتوصيات في كل ملف.`
        );
      }
    }

    return items;
  }, [compareStats, kpis]);

  const exportStudentsCsv = useCallback(() => {
    const headers = [
      "الرقم الجامعي",
      "الاسم",
      "المقرر",
      "التفاعل",
      "الحضور",
      "المستوى",
      "معرض_للخطر",
    ];
    const lines = studentRows.map((s) => [
      s.id,
      s.name,
      s.course,
      String(s.engagementScore),
      String(s.attendanceRate),
      s.level,
      s.atRisk ? "نعم" : "لا",
    ]);
    downloadCsv(`تقرير_طلاب_${period}.csv`, headers, lines);
  }, [period, studentRows]);

  const exportSessionsCsv = useCallback(() => {
    const headers = ["المقرر", "الجلسة", "التاريخ", "متوسط_التفاعل", "المسجلون"];
    const lines = sessionRows.map((s) => [
      s.course,
      s.courseName,
      s.date,
      String(s.avgEngagement),
      String(s.studentsCount),
    ]);
    downloadCsv(`تقرير_جلسات_${period}.csv`, headers, lines);
  }, [period, sessionRows]);

  const periodLabel = periods.find((p) => p.id === period)?.label ?? "";

  return (
    <div className="page-stack reports-page">
      <section
        className="panel reports-page__filters-panel"
        aria-label="تصفية التقارير والتصدير"
      >
        <div className="student-filter student-filter--faculty">
          <div className="student-filter__bar reports-page__filters-bar">
          <div className="student-filter__segment student-filter__segment--course">
            <label className="student-filter__label" htmlFor="reports-period">
              الفترة الزمنية
            </label>
            <div className="student-filter__shell">
              <span className="student-filter__glyph" aria-hidden>
                ◷
              </span>
              <select
                id="reports-period"
                className="student-filter__select"
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value as (typeof periods)[number]["id"])
                }
              >
                {periods.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="student-filter__rule" aria-hidden />
          <div className="student-filter__segment student-filter__segment--course">
            <label className="student-filter__label" htmlFor="reports-course">
              المقرر
            </label>
            <div className="student-filter__shell">
              <span className="student-filter__glyph" aria-hidden>
                ◫
              </span>
              <select
                id="reports-course"
                className="student-filter__select"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="all">جميع المقررات</option>
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="student-filter__rule" aria-hidden />
          <div className="student-filter__segment student-filter__segment--search">
            <label className="student-filter__label" htmlFor="reports-search">
              بحث في الطلاب المعروضين
            </label>
            <div className="student-filter__shell student-filter__shell--search">
              <span
                className="student-filter__glyph student-filter__glyph--search"
                aria-hidden
              >
                ⌕
              </span>
              <input
                id="reports-search"
                type="search"
                className="student-filter__input"
                placeholder="اسم، رقم جامعي، أو مقرر…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        </div>
        <p className="panel__hint reports-page__filter-hint">
          الفترة: <strong>{periodLabel}</strong>
          {course !== "all" ? (
            <>
              {" "}
              — المقرر: <strong>{course}</strong>
            </>
          ) : null}{" "}
          — الطلاب والجلسات أدناه يتبعان نفس الفلاتر (حسب تاريخ آخر جلسة /
          تاريخ الجلسة ضمن النافذة).
        </p>
        <div className="reports-page__filters-actions">
          <div className="report-actions">
            <button type="button" className="btn-primary" onClick={exportStudentsCsv}>
              تصدير CSV — الطلاب
            </button>
            <button type="button" className="btn-primary" onClick={exportSessionsCsv}>
              تصدير CSV — الجلسات
            </button>
            <button
              type="button"
              className="btn-secondary btn-secondary--outline"
              disabled
              title="يتطلب توليد PDF من الخادم لاحقاً"
            >
              تحميل PDF
            </button>
          </div>
        </div>
      </section>

      <div className="two-col two-col--stretch reports-page__charts">
        <section className="panel panel--chart">
          <h2 className="panel__title">اتجاه متوسط التفاعل (أسبوعياً)</h2>
          <p className="panel__hint">
            عدد النقاط يتغيّر حسب الفترة المختارة (بيانات تجريبية ثابتة من لوحة
            المحاضر).
          </p>
          <TrendLineChart
            title="متوسط Engagement أسبوعياً"
            values={trendSlice.map((p) => p.value)}
            xLabels={trendSlice.map((p) => p.label)}
          />
        </section>
        <section className="panel report-compare">
          <h2 className="panel__title">مقارنة سريعة (أسابيع)</h2>
          <p className="panel__hint">
            متوسط قيم المخطط الأسبوعي: آخر ٤ أسابيع مقابل آخر ٨ أسابيع (لا يعتمد
            على فلتر المقرر).
          </p>
          <div className="report-compare__grid">
            <article className="report-compare__card">
              <span className="report-compare__label">آخر ٤ أسابيع</span>
              <strong className="report-compare__value">{compareStats.last4}%</strong>
            </article>
            <article className="report-compare__card">
              <span className="report-compare__label">آخر ٨ أسابيع</span>
              <strong className="report-compare__value">{compareStats.last8}%</strong>
            </article>
          </div>
          <div className="report-compare__recommendations">
            <h3 className="report-compare__recommendations-title">توصيات للدكتور</h3>
            <ul className="report-compare__recommendations-list">
              {doctorRecommendations.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="panel reports-page__table-block">
        <h2 className="panel__title">ملخص الطلاب</h2>
        <p className="panel__hint">
          صفوف ملوّنة حسب عتبات التركيز (٨٠+ / ٧٠–٧٩ / أقل من ٧٠). اضغط الاسم
          لملف الطالب.
        </p>
        <div className="table-wrap">
          <table className="data-table data-table--students">
            <thead>
              <tr>
                <th>الطالب</th>
                <th>المقرر</th>
                <th>التفاعل</th>
                <th>الحضور</th>
                <th>مستوى الانخراط</th>
                <th>خطر</th>
              </tr>
            </thead>
            <tbody>
              {studentRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="reports-page__empty-cell">
                    لا يوجد طلاب ضمن الفلاتر الحالية.
                  </td>
                </tr>
              ) : (
                studentRows.map((s) => (
                  <tr key={s.id} className={focusScoreRowClass(s.engagementScore)}>
                    <td>
                      <Link className="reports-page__student-link" to={`/students/${s.id}`}>
                        {s.name}
                      </Link>
                    </td>
                    <td>{s.course}</td>
                    <td>
                      <span className={focusScorePillClass(s.engagementScore)}>
                        {s.engagementScore}%
                      </span>
                    </td>
                    <td>{s.attendanceRate}%</td>
                    <td>{s.level}</td>
                    <td>{s.atRisk ? "نعم" : "لا"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel reports-page__table-block">
        <h2 className="panel__title">جلسات مسجّلة</h2>
        <p className="panel__hint">
          مرتبة من الأحدث؛ تتبع فلتر الفترة والمقرر مثل جدول الطلاب.
        </p>
        <div className="table-wrap">
          <table className="data-table data-table--reports-sessions">
            <thead>
              <tr>
                <th>المقرر</th>
                <th>الجلسة</th>
                <th>التاريخ</th>
                <th>متوسط التفاعل</th>
                <th>المسجلون</th>
              </tr>
            </thead>
            <tbody>
              {sessionRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="reports-page__empty-cell">
                    لا توجد جلسات ضمن الفلاتر الحالية.
                  </td>
                </tr>
              ) : (
                sessionRows.map((x) => (
                  <tr key={x.id}>
                    <td>{x.course}</td>
                    <td>{x.courseName}</td>
                    <td>{x.date}</td>
                    <td>
                      <span className={focusScorePillClass(x.avgEngagement)}>
                        {x.avgEngagement}%
                      </span>
                    </td>
                    <td>{x.studentsCount}</td>
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
