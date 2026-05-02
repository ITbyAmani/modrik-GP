import type { InstructorScheduleSlot } from "../../data/seasMock";

const WEEKDAY_LABELS = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

type Props = {
  slots: InstructorScheduleSlot[];
  weekLabel: string;
};

export function InstructorWeekCalendar({ slots, weekLabel }: Props) {
  const byDay = WEEKDAY_LABELS.map((_, day) =>
    slots.filter((s) => s.weekday === day)
  );

  return (
    <div className="instructor-week-cal" aria-label="جدول مواد الأسبوع">
      <div className="instructor-week-cal__head">
        <h3 className="instructor-week-cal__title">تقويم المواد</h3>
        <p className="instructor-week-cal__subtitle">{weekLabel}</p>
      </div>
      <div className="instructor-week-cal__scroll" role="region">
        <div className="instructor-week-cal__grid">
          {WEEKDAY_LABELS.map((dayName, day) => (
            <div key={dayName} className="instructor-week-cal__col">
              <div className="instructor-week-cal__dayhead">
                <span className="instructor-week-cal__dayname">{dayName}</span>
              </div>
              <div className="instructor-week-cal__slots">
                {byDay[day].length === 0 ? (
                  <span className="instructor-week-cal__empty">—</span>
                ) : (
                  byDay[day].map((s, i) => (
                    <article
                      key={`${s.weekday}-${s.startTime}-${i}`}
                      className="instructor-week-cal__slot"
                    >
                      <p className="instructor-week-cal__course">{s.courseName}</p>
                      <p className="instructor-week-cal__code">{s.courseCode}</p>
                      <div className="instructor-week-cal__slot-meta">
                        <p className="instructor-week-cal__time">
                          <span
                            className="instructor-week-cal__time-range"
                            dir="ltr"
                          >
                            {s.startTime} – {s.endTime}
                          </span>
                        </p>
                        {s.room ? (
                          <p className="instructor-week-cal__room">{s.room}</p>
                        ) : null}
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
