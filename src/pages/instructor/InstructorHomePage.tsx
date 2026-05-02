import { Link } from "react-router-dom";
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
          <h2 className="instructor-profile-panel__title">الملف التعريفي</h2>
          <p className="instructor-profile-panel__progress-label">
            اكتمال الملف: {instructorProfile.profileCompletionPct}%
          </p>
          <div
            className="instructor-profile-panel__progress-track"
            role="presentation"
          >
            <div
              className="instructor-profile-panel__progress-fill"
              style={{
                width: `${instructorProfile.profileCompletionPct}%`,
              }}
            />
          </div>

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

          <p className="instructor-profile-panel__name">
            {instructorProfile.displayName}
          </p>
          <p className="instructor-profile-panel__course">
            يدرّس حالياً:{" "}
            <strong>
              {instructorProfile.courseName} ({instructorProfile.courseCode})
            </strong>
          </p>
          <p className="instructor-profile-panel__role">
            {instructorProfile.roleLine}
          </p>
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
          إشعارات عند انخفاض تفاعل طالب معيّن أو انخفاض متوسط تفاعل القاعة، مع
          ربط بالمراقبة المباشرة.
        </p>
        <ul className="alerts-compact alerts-compact--wide">
          {mockAlerts.map((a) => (
            <li key={a.id}>
              <span
                className={`alerts-compact__sev alerts-compact__sev--${a.severity}`}
              />
              <div>
                <strong>{a.title}</strong>
                <p>{a.detail}</p>
                <time>{a.time}</time>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/monitoring" className="panel__cta">
          فتح المراقبة المباشرة للجلسة →
        </Link>
      </section>
    </div>
  );
}
