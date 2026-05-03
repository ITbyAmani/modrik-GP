import type { Student } from "../../data/seasMock";

function StackedBreakdown({
  visual,
  audio,
  digital,
}: {
  visual: number;
  audio: number;
  digital: number;
}) {
  return (
    <div className="stack-bar" role="img" aria-label="تفصيل درجة التفاعل">
      <div
        className="stack-bar__seg stack-bar__seg--visual"
        style={{ width: `${visual}%` }}
        title={`بصري ${visual}%`}
      />
      <div
        className="stack-bar__seg stack-bar__seg--audio"
        style={{ width: `${audio}%` }}
        title={`صوتي ${audio}%`}
      />
      <div
        className="stack-bar__seg stack-bar__seg--digital"
        style={{ width: `${digital}%` }}
        title={`رقمي ${digital}%`}
      />
    </div>
  );
}

type Props = {
  student: Student;
  /** إخفاء ترويسة الملف عند عرض المحتوى داخل لوحة الطالب (تتكرر مع بطاقة الملف) */
  embedded?: boolean;
};

export function StudentProfileContent({ student, embedded }: Props) {
  const m = student.multimodal;

  return (
    <>
      {!embedded ? (
        <header className="profile-header">
          <div className="profile-header__avatar" aria-hidden>
            {student.name
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </div>
          <div>
            <h1>{student.name}</h1>
            <p className="profile-header__meta">
              الرقم الجامعي: <strong dir="ltr">{student.id}</strong> · التخصص:{" "}
              {student.major} · الكلية: {student.college}
            </p>
            <div className="profile-header__pills">
              <span className="score-pill">{student.engagementScore}% تفاعل مركب</span>
              {student.atRisk ? (
                <span className="pill pill--low">معرّض للخطر</span>
              ) : (
                <span className="pill pill--high">ضمن المعدل الآمن</span>
              )}
            </div>
          </div>
        </header>
      ) : null}

      {embedded ? (
        <section className="panel student-dash-embedded-attendance">
          <h2 className="panel__title">سجل الحضور</h2>
          <p className="panel__hint">دمج مع بيانات الجامعة (وهمي).</p>
          <div className="attendance-block">
            <div className="attendance-block__row">
              <span>نسبة الحضور</span>
              <strong>{student.attendanceRate}%</strong>
            </div>
            <div className="crit-track attendance-block__bar">
              <div
                className="crit-fill"
                style={{ width: `${student.attendanceRate}%` }}
              />
            </div>
            <p className="muted-xs">نسبة الغياب: {student.absenceRate}%</p>
          </div>
        </section>
      ) : (
        <div className="two-col">
          <section className="panel">
            <h2 className="panel__title">الدرجات الأكاديمية</h2>
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

          <section className="panel">
            <h2 className="panel__title">سجل الحضور</h2>
            <p className="panel__hint">دمج مع بيانات الجامعة (وهمي).</p>
            <div className="attendance-block">
              <div className="attendance-block__row">
                <span>نسبة الحضور</span>
                <strong>{student.attendanceRate}%</strong>
              </div>
              <div className="crit-track attendance-block__bar">
                <div
                  className="crit-fill"
                  style={{ width: `${student.attendanceRate}%` }}
                />
              </div>
              <p className="muted-xs">نسبة الغياب: {student.absenceRate}%</p>
            </div>
          </section>
        </div>
      )}

      <section className="panel">
        <h2 className="panel__title">تفصيل درجة التفاعل (متعدد الوسائط)</h2>
        <p className="panel__hint">
          مساهمة تقديرية: بصري (رؤية وتعابير) مقابل صوتي مقابل تفاعل رقمي مع
          النظام.
        </p>
        <StackedBreakdown visual={m.visual} audio={m.audio} digital={m.digital} />
        <ul className="stack-legend">
          <li>
            <span className="stack-legend__sw stack-legend__sw--visual" /> بصري{" "}
            {m.visual}%
          </li>
          <li>
            <span className="stack-legend__sw stack-legend__sw--audio" /> صوتي{" "}
            {m.audio}%
          </li>
          <li>
            <span className="stack-legend__sw stack-legend__sw--digital" /> رقمي{" "}
            {m.digital}%
          </li>
        </ul>
      </section>
    </>
  );
}
