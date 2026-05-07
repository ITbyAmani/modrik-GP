import { InstructorDashboardStats } from "../../components/faculty/InstructorDashboardStats";
import { InstructorMonthCalendar } from "../../components/faculty/InstructorMonthCalendar";
import { InstructorWeekCalendar } from "../../components/faculty/InstructorWeekCalendar";
import instructorAvatar from "../../assets/instructor-avatar.svg";
import {
  currentLecture,
  dashboardSummary,
  engagementTrendSessionMinutes,
  engagementTrendWeeks,
  getInstructorCalendarHighlightIso,
  instructorCalendarMonth,
  instructorProfile,
  instructorScheduleWeekLabel,
  instructorWeeklySchedule,
  mockAlerts,
  mockStudents,
} from "../../data/seasMock";

export function InstructorHomePage() {
  const atRisk = mockStudents.filter((s) => s.atRisk);

  return (
    <div className="page-stack">
      <h1 className="visually-hidden">
        لوحة المحاضر — {instructorProfile.displayName}
      </h1>
      <section className="instructor-dash-hero" aria-label="الملف والجدولة">
        <aside className="instructor-profile-panel">
          <p className="instructor-profile-panel__welcome">مرحبًا بك</p>

          <div className="instructor-avatar-ring">
            <div className="instructor-avatar-ring__inner">
              <img
                src={instructorAvatar}
                alt=""
                width={112}
                height={112}
                decoding="async"
              />
            </div>
          </div>

          <div className="instructor-profile-panel__details">
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">الاسم</span>
              <span className="instructor-profile-panel__v">
                هالة صالح المناعي
              </span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">الدرجة العلمية</span>
              <span className="instructor-profile-panel__v">
                {instructorProfile.degree}
              </span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">القسم</span>
              <span className="instructor-profile-panel__v">
                {instructorProfile.department}
              </span>
            </div>
            <div className="instructor-profile-panel__row">
              <span className="instructor-profile-panel__k">الكلية</span>
              <span className="instructor-profile-panel__v">
                {instructorProfile.college}
              </span>
            </div>
          </div>
        </aside>

        <div className="welcome-banner-instructor welcome-banner-instructor--split">
          <div className="welcome-banner-instructor__schedule">
            <InstructorWeekCalendar
              slots={instructorWeeklySchedule}
              weekLabel={instructorScheduleWeekLabel}
            />
          </div>
          <aside
            className="welcome-banner-instructor__month"
            aria-label="تقويم شهري"
          >
            <InstructorMonthCalendar
              year={instructorCalendarMonth.year}
              monthIndex={instructorCalendarMonth.monthIndex}
              highlightedDates={getInstructorCalendarHighlightIso()}
            />
          </aside>
        </div>
      </section>

      <InstructorDashboardStats
        avgEngagementScore={currentLecture.avgEngagementScore}
        lectureCode={currentLecture.code}
        attendancePct={currentLecture.attendancePct}
        absencePct={currentLecture.absencePct}
        atRiskCount={atRisk.length}
        studentsMonitored={dashboardSummary.studentsMonitored}
        trendWeeks={engagementTrendWeeks}
        trendSessionMinutes={engagementTrendSessionMinutes}
      />

      <section className="panel panel--alerts-wide" aria-labelledby="alerts-dash">
        <h2 id="alerts-dash" className="panel__title">
          قائمة التنبيهات الذكية (Alerts)
        </h2>
        <p className="panel__hint">
          إشعارات عند انخفاض تفاعل طالب معيّن أو انخفاض متوسط تفاعل القاعة.
        </p>
        <ul className="smart-alerts" aria-label="قائمة التنبيهات">
          {mockAlerts.map((a) => (
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
