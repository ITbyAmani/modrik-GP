import { Link } from "react-router-dom";
import { TrendLineChart } from "../../components/TrendLineChart";
import { MultimodalIndicators } from "../../components/MultimodalIndicators";
import {
  engagementTrendSessionMinutes,
  mockStudents,
} from "../../data/seasMock";
import { focusScoreBand } from "../../lib/focusScoreBands";

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length >= 2) return (p[0][0] + p[1][0]).slice(0, 2);
  return name.slice(0, 2);
}

/** نفس عتبات جدول الطلاب: ٧٠+ أخضر، ٦٠–٦٩ أصفر، أقل من ٦٠ أحمر */
function liveTone(v: number): "high" | "mid" | "low" {
  const b = focusScoreBand(v);
  if (b === "green") return "high";
  if (b === "yellow") return "mid";
  return "low";
}

export function MonitoringPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <h1>المراقبة المباشرة (Real-Time Monitoring)</h1>
        <p>
          مراقبة الجلسة الحالية (حضوري أو عن بُعد): شبكة الطلاب الحاضرين مع
          مؤشر لوني للتفاعل، ومؤشرات مدمجة (بصري / صوتي / رقمي).
        </p>
      </header>

      <div className="monitor-legend panel" role="group" aria-label="مفتاح الألوان">
        <span className="monitor-legend__title">مفتاح مؤشر التفاعل اللحظي:</span>
        <ul className="monitor-legend__list">
          <li>
            <span className="monitor-legend__dot monitor-legend__dot--high" />
            أخضر — تفاعل عالي (٧٠٪ فما فوق)
          </li>
          <li>
            <span className="monitor-legend__dot monitor-legend__dot--mid" />
            أصفر — متوسط (٦٠–٦٩٪)
          </li>
          <li>
            <span className="monitor-legend__dot monitor-legend__dot--low" />
            أحمر — منخفض (أقل من ٦٠٪)
          </li>
        </ul>
      </div>

      <section className="panel panel--chart monitor-session-chart">
        <h2 className="panel__title">متوسط تفاعل القاعة خلال الجلسة</h2>
        <p className="panel__hint">
          محور أفقي: دقائق منذ بداية المحاضرة (بيانات تجريبية).
        </p>
        <TrendLineChart
          values={engagementTrendSessionMinutes.map((p) => p.value)}
          xLabels={engagementTrendSessionMinutes.map((p) => `${p.minute}د`)}
        />
      </section>

      <h2 className="section-title">عرض الشبكة (Grid View) — الطلاب الحاضرون</h2>
      <p className="section-lead">
        صورة رمزية بالأحرف، ومؤشر لوني، و<strong>المؤشرات المدمجة</strong>: رؤية
        وتعبيرات، صوت، مشاركة رقمية.
      </p>
      <div className="monitor-grid" role="list">
        {mockStudents.map((s) => {
          const tone = liveTone(s.liveEngagement);
          return (
            <article key={s.id} className="monitor-card" role="listitem">
              <div className="monitor-card__top">
                <div
                  className={`monitor-card__avatar monitor-card__avatar--${tone}`}
                  aria-hidden
                >
                  {initials(s.name)}
                </div>
                <span
                  className={`monitor-card__live monitor-card__live--${tone}`}
                  title="مؤشر التفاعل اللحظي (Engagement)"
                >
                  {s.liveEngagement}%
                </span>
              </div>
              <h3 className="monitor-card__name">{s.name}</h3>
              <p className="monitor-card__id">{s.id}</p>
              <div className="monitor-card__modal">
                <span className="monitor-card__mod-label">
                  مؤشرات متعددة الوسائط (Multimodal)
                </span>
                <MultimodalIndicators m={s.multimodal} compact />
              </div>
              <Link className="monitor-card__link" to={`/students/${s.id}`}>
                ملف الطالب
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
