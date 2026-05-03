import { Link, Navigate } from "react-router-dom";
import { getDemoStudent, studentDemoNotifications } from "../../data/seasMock";

export function StudentNotificationsPage() {
  const student = getDemoStudent();

  if (!student) {
    return <Navigate to="/student/login" replace />;
  }

  return (
    <div className="page-stack">
      <nav className="breadcrumb">
        <Link to="/student">لوحة الطالب</Link>
        <span aria-hidden> / </span>
        <span>التنبيهات</span>
      </nav>

      <header className="page-header">
        <h1>التنبيهات</h1>
        <p className="panel__hint">
          إشعارات من منصة مُدرك حول التركيز والتفاعل متعدد الوسائط أثناء الجلسات
          (بيانات تجريبية للعرض).
        </p>
      </header>

      <section className="panel" aria-labelledby="student-notifications-title">
        <h2 id="student-notifications-title" className="visually-hidden">
          قائمة التنبيهات
        </h2>
        <ul className="smart-alerts" aria-label="قائمة التنبيهات">
          {studentDemoNotifications.map((a) => (
            <li
              key={a.id}
              className={`smart-alerts__item smart-alerts__item--${a.severity}`}
            >
              <div className="smart-alerts__body">
                <span
                  className={`smart-alerts__dot smart-alerts__dot--${a.severity}`}
                  aria-hidden
                />
                <strong className="smart-alerts__title">{a.title}</strong>
                <time className="smart-alerts__time">{a.time}</time>
                <p className="smart-alerts__detail">{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
