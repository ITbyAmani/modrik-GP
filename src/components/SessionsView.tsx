import { mockSessions } from "../data/seasMock";

export function SessionsView() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <h1>الجلسات التعليمية</h1>
        <p>
          بعد كل جلسة: دمج إطارات الكاميرا (تعابير، اتجاه الرأس، نظرة) مع سجلات
          الحضور والدرجات لحساب درجة التفاعل.
        </p>
      </header>
      <div className="cards-grid">
        {mockSessions.map((s) => (
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
            {s.notes ? <p className="session-card__notes">{s.notes}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
