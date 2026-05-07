import { useMemo } from "react";

const WEEK_SHORT = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function toISO(y: number, m0: number, d: number): string {
  return `${y}-${pad(m0 + 1)}-${pad(d)}`;
}

type Cell = {
  key: string;
  day: number | null;
  inMonth: boolean;
  iso: string | null;
};

function buildMonthCells(year: number, month0: number): Cell[] {
  const first = new Date(year, month0, 1);
  const padStart = first.getDay();
  const lastDate = new Date(year, month0 + 1, 0).getDate();
  const cells: Cell[] = [];

  for (let i = 0; i < padStart; i++) {
    const d = new Date(year, month0, -(padStart - i));
    const y = d.getFullYear();
    const m = d.getMonth();
    const day = d.getDate();
    cells.push({
      key: `p-${y}-${m + 1}-${day}`,
      day,
      inMonth: false,
      iso: toISO(y, m, day),
    });
  }

  for (let day = 1; day <= lastDate; day++) {
    cells.push({
      key: `c-${year}-${month0 + 1}-${day}`,
      day,
      inMonth: true,
      iso: toISO(year, month0, day),
    });
  }

  let next = 1;
  const nm0 = month0 === 11 ? 0 : month0 + 1;
  const ny = month0 === 11 ? year + 1 : year;
  while (cells.length < 42) {
    cells.push({
      key: `n-${ny}-${nm0 + 1}-${next}`,
      day: next,
      inMonth: false,
      iso: toISO(ny, nm0, next),
    });
    next += 1;
  }

  return cells.slice(0, 42);
}

const MONTH_NAMES_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

type Props = {
  year: number;
  /** 0 = يناير */
  monthIndex: number;
  /** تواريخ ISO yyyy-mm-dd لتمييز أيام فيها مواد */
  highlightedDates: string[];
};

export function InstructorMonthCalendar({
  year,
  monthIndex,
  highlightedDates,
}: Props) {
  const now = new Date();
  const todayIso = toISO(now.getFullYear(), now.getMonth(), now.getDate());

  const highlightSet = useMemo(
    () => new Set(highlightedDates),
    [highlightedDates]
  );

  const cells = useMemo(
    () => buildMonthCells(year, monthIndex),
    [year, monthIndex]
  );

  const title = `${MONTH_NAMES_AR[monthIndex]} ${year}`;

  return (
    <div className="instructor-month-cal">
      <div className="instructor-month-cal__head">
        <h2 className="instructor-month-cal__title">التقويم</h2>
        <p className="instructor-month-cal__month">{title}</p>
      </div>
      <div
        className="instructor-month-cal__grid"
        role="grid"
        aria-label={`تقويم ${title}`}
      >
        {WEEK_SHORT.map((w) => (
          <div key={w} className="instructor-month-cal__dow" role="columnheader">
            {w}
          </div>
        ))}
        {cells.map((c) => {
          const has = c.iso && highlightSet.has(c.iso);
          const isToday = c.iso === todayIso;
          return (
            <div
              key={c.key}
              role="gridcell"
              className={`instructor-month-cal__cell${
                !c.inMonth ? " instructor-month-cal__cell--muted" : ""
              }${has ? " instructor-month-cal__cell--event" : ""}${
                isToday ? " instructor-month-cal__cell--today" : ""
              }`}
            >
              {c.day !== null ? <span>{c.day}</span> : null}
            </div>
          );
        })}
      </div>
      <p className="instructor-month-cal__legend">
        تمييز الأيام ضمن أسبوع عرض الجدول بجانبها
      </p>
    </div>
  );
}
