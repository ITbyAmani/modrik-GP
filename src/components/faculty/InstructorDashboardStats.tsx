import { Link } from "react-router-dom";
import { TrendLineChart } from "../TrendLineChart";

export type InstructorDashboardWeekPoint = { label: string; value: number };

export type InstructorDashboardSessionPoint = {
  minute: number;
  value: number;
};

export type InstructorDashboardStatsProps = {
  avgEngagementScore: number;
  lectureCode: string;
  attendancePct: number;
  absencePct: number;
  atRiskCount: number;
  studentsMonitored: number;
  trendWeeks: InstructorDashboardWeekPoint[];
  trendSessionMinutes: InstructorDashboardSessionPoint[];
};

/**
 * بطاقات الإحصائيات + رسوم التفاعل الزمني.
 * في واجهة RTL: الإحصائيات يميناً، الرسوم يساراً (شبكة عمودين).
 */
export function InstructorDashboardStats({
  avgEngagementScore,
  lectureCode,
  attendancePct,
  absencePct,
  atRiskCount,
  studentsMonitored,
  trendWeeks,
  trendSessionMinutes,
}: InstructorDashboardStatsProps) {
  const weekLabels = trendWeeks.map((w) => w.label.replace("أسبوع ", "س"));
  const weekValues = trendWeeks.map((w) => w.value);
  const sessionValues = trendSessionMinutes.map((p) => p.value);
  const sessionLabels = trendSessionMinutes.map((p) => `${p.minute}د`);

  return (
    <section
      className="instructor-dash-metrics"
      aria-label="إحصائيات سريعة ورسوم التفاعل الزمني"
    >
      <div className="instructor-dash-metrics__split">
        <aside
          className="instructor-dash-metrics__stats-col"
          aria-labelledby="instructor-dash-kpi-title"
        >
          <header className="instructor-dash-metrics__block-head">
            <h2
              className="instructor-dash-metrics__title"
              id="instructor-dash-kpi-title"
            >
              بطاقات الإحصائيات السريعة
            </h2>
            <p className="instructor-dash-metrics__subtitle">
              نظرة على المحاضرة الحالية.
            </p>
          </header>

          <div className="instructor-dash-metrics__kpis kpi-grid kpi-grid--stats-aside">
            <article className="kpi-card">
              <span className="kpi-card__label">
                متوسط درجة التفاعل (Engagement Score)
              </span>
              <span className="kpi-card__sub">المحاضرة الحالية</span>
              <strong className="kpi-card__value">{avgEngagementScore}%</strong>
              <span className="kpi-card__foot">{lectureCode}</span>
            </article>

            <article className="kpi-card">
              <span className="kpi-card__label">الحضور والغياب</span>
              <span className="kpi-card__sub">نسب مئوية تقريبية للجلسة</span>
              <strong className="kpi-card__value">حضور {attendancePct}%</strong>
              <span className="kpi-card__foot">غياب: {absencePct}%</span>
            </article>

            <article className="kpi-card kpi-card--alert">
              <span className="kpi-card__label">
                الطلاب المعرضون للخطر (At-Risk Students)
              </span>
              <span className="kpi-card__sub">بحاجة متابعة أكاديمية</span>
              <strong className="kpi-card__value">{atRiskCount}</strong>
              <Link className="kpi-card__link" to="/at-risk">
                عرض القائمة
              </Link>
            </article>

            <article className="kpi-card">
              <span className="kpi-card__label kpi-card__label--single">
                طلاب تحت المراقبة عبر المنصة
              </span>
              <strong className="kpi-card__value">{studentsMonitored}</strong>
            </article>
          </div>
        </aside>

        <div
          className="instructor-dash-metrics__charts-col"
          aria-labelledby="instructor-dash-trend-title"
        >
          <header className="instructor-dash-metrics__block-head instructor-dash-metrics__block-head--charts">
            <h2
              className="instructor-dash-metrics__title instructor-dash-metrics__title--sm"
              id="instructor-dash-trend-title"
            >
              رسم التفاعل الزمني (Trend Chart)
            </h2>
            <p className="instructor-dash-metrics__lead">
              يمكن مقارنة اتجاه التفاعل على مستوى الأسابيع، أو داخل المحاضرة
              الواحدة (بالدقائق).
            </p>
          </header>

          <div className="dashboard-charts-grid instructor-dash-metrics__charts">
            <section
              className="panel panel--chart"
              aria-labelledby="trend-weeks-heading"
            >
              <h3 id="trend-weeks-heading" className="panel__title">
                عبر الأسابيع الماضية
              </h3>
              <p className="panel__hint">
                متوسط Engagement Score مركّب لمجموعة المقرر (بيانات تجريبية).
              </p>
              <TrendLineChart
                title="التفاعل أسبوعياً"
                values={weekValues}
                xLabels={weekLabels}
              />
            </section>

            <section
              className="panel panel--chart"
              aria-labelledby="trend-session-heading"
            >
              <h3 id="trend-session-heading" className="panel__title">
                داخل المحاضرة الحالية (بالدقائق)
              </h3>
              <p className="panel__hint">
                متوسط تفاعل القاعة منذ بداية الجلسة — وهمي للعرض.
              </p>
              <TrendLineChart
                title="التفاعل خلال الجلسة"
                values={sessionValues}
                xLabels={sessionLabels}
              />
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
