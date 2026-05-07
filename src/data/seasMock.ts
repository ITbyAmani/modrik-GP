/** بيانات تجريبية — منصة مُدرك / SEAS */

export type EngagementLevel = "عالي" | "متوسط" | "منخفض";

/** تفصيل تفاعل متعدد الوسائط (نِسَب تُعرض كرسم) */
export type MultimodalBreakdown = {
  visual: number;
  audio: number;
  digital: number;
};

export type Student = {
  id: string;
  name: string;
  engagementScore: number;
  criteria: {
    visual: number;
    attendance: number;
    grades: number;
  };
  level: EngagementLevel;
  atRisk: boolean;
  course: string;
  /** التخصص الأكاديمي */
  major: string;
  /** الكلية */
  college: string;
  lastSessionDate: string;
  /** مؤشر مباشر للشاشة الحية (0–100) */
  liveEngagement: number;
  multimodal: MultimodalBreakdown;
  /** نسبة حضور تراكمية */
  attendanceRate: number;
  absenceRate: number;
  gradeRows: { course: string; score: number; max: number }[];
  recommendations: string[];
};

export type Session = {
  id: string;
  /** اسم المقرر كما في قائمة الطلاب — للتصفية حسب الترم */
  course: string;
  courseName: string;
  date: string;
  avgEngagement: number;
  studentsCount: number;
  notes?: string;
};

export type AlertItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  severity: "info" | "warning" | "critical";
};

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: "instructor" | "admin" | "student";
  status: "نشط" | "معلّق";
};

export type IntegrationLink = {
  id: string;
  name: string;
  description: string;
  status: "متصل" | "غير متصل" | "قيد الإعداد";
  lastSync?: string;
};

export const currentLecture = {
  title: "رؤية حاسوبية — المحاضرة الحالية (الأسبوع 8)",
  code: "CS 331",
  avgEngagementScore: 74,
  attendancePct: 88,
  absencePct: 12,
};

/** بيانات عرض للمعلّم في لوحة التحكم — يمكن استبدال الصورة بملف حقيقي لاحقاً */
export const instructorProfile = {
  displayName: "هالة صالح المناعي",
  degree: "دكتوراة",
  department: "تقنية المعلومات",
  college: "علوم الحاسب والمعلومات",
  /** المقرر الذي تدرّسه حالياً */
  courseName: "رؤية حاسوبية",
  courseCode: "CS 331",
};

/** فترة في جدول أسبوعي — weekday: 0 = الأحد … 4 = الخميس (5–6 غير معروضة في واجهة تقويم المواد) */
export type InstructorScheduleSlot = {
  weekday: number;
  startTime: string;
  endTime: string;
  courseName: string;
  courseCode: string;
  room?: string;
};

/** جدول تجريبي: المواد التي يدرّسها عضو هيئة التدريس هذا الأسبوع */
export const instructorWeeklySchedule: InstructorScheduleSlot[] = [
  {
    weekday: 0,
    startTime: "10:00",
    endTime: "11:50",
    courseName: "رؤية حاسوبية",
    courseCode: "CS 331",
    room: "قاعة 201",
  },
  {
    weekday: 0,
    startTime: "13:00",
    endTime: "14:50",
    courseName: "تعلم عميق",
    courseCode: "CS 415",
    room: "قاعة 105",
  },
  {
    weekday: 1,
    startTime: "08:00",
    endTime: "09:50",
    courseName: "رؤية حاسوبية",
    courseCode: "CS 331",
    room: "معمل صور",
  },
  {
    weekday: 2,
    startTime: "10:00",
    endTime: "11:50",
    courseName: "أنظمة ذكية",
    courseCode: "CS 442",
    room: "قاعة 310",
  },
  {
    weekday: 3,
    startTime: "11:00",
    endTime: "12:50",
    courseName: "تعلم عميق",
    courseCode: "CS 415",
    room: "قاعة 105",
  },
  {
    weekday: 4,
    startTime: "09:00",
    endTime: "10:50",
    courseName: "رؤية حاسوبية",
    courseCode: "CS 331",
    room: "قاعة 201",
  },
  {
    weekday: 2,
    startTime: "13:00",
    endTime: "14:50",
    courseName: "رؤية حاسوبية",
    courseCode: "CS 331",
    room: "قاعة 201",
  },
  {
    weekday: 3,
    startTime: "08:00",
    endTime: "09:50",
    courseName: "رؤية حاسوبية",
    courseCode: "CS 331",
    room: "معمل صور",
  },
  {
    weekday: 0,
    startTime: "15:00",
    endTime: "16:50",
    courseName: "تعلم آلي",
    courseCode: "CS 340",
    room: "قاعة 112",
  },
  {
    weekday: 1,
    startTime: "10:00",
    endTime: "11:50",
    courseName: "تعلم آلي",
    courseCode: "CS 340",
    room: "قاعة 112",
  },
  {
    weekday: 2,
    startTime: "08:00",
    endTime: "09:50",
    courseName: "تعلم آلي",
    courseCode: "CS 340",
    room: "معمل تعلم آلي",
  },
  {
    weekday: 3,
    startTime: "13:00",
    endTime: "14:50",
    courseName: "تعلم آلي",
    courseCode: "CS 340",
    room: "قاعة 112",
  },
  {
    weekday: 4,
    startTime: "11:00",
    endTime: "12:50",
    courseName: "تعلم آلي",
    courseCode: "CS 340",
    room: "قاعة 118",
  },
  {
    weekday: 2,
    startTime: "15:00",
    endTime: "16:50",
    courseName: "تعلم آلي",
    courseCode: "CS 340",
    room: "قاعة 305",
  },
  {
    weekday: 4,
    startTime: "13:00",
    endTime: "14:50",
    courseName: "رؤية حاسوبية",
    courseCode: "CS 331",
    room: "معمل صور",
  },
];

/** خانات جدول الأسبوع لمقررات الطالب (أسماء المقررات من gradeRows) */
export function getStudentWeeklyScheduleSlots(
  student: Student
): InstructorScheduleSlot[] {
  const names = [...new Set(student.gradeRows.map((r) => r.course))];
  return instructorWeeklySchedule
    .filter((s) => names.includes(s.courseName))
    .sort((a, b) =>
      a.weekday !== b.weekday
        ? a.weekday - b.weekday
        : a.startTime.localeCompare(b.startTime)
    );
}

/** تسمية أسبوع العرض (يمكن ربطها لاحقاً بالتاريخ الفعلي) */
export const instructorScheduleWeekLabel =
  "أسبوع المحاضرات (بيانات تجريبية — 26 أبريل – 2 مايو 2026)";

/** التقويم الشهري المعروض بجانب جدول الأسبوع */
export const instructorCalendarMonth = { year: 2026, monthIndex: 4 };

/** تمييز أيام أسبوع العرض (محلياً yyyy-mm-dd) */
export function getInstructorCalendarHighlightIso(): string[] {
  const out: string[] = [];
  const start = new Date(2026, 3, 26);
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    out.push(`${y}-${m}-${day}`);
  }
  return out;
}

/** اتجاه متوسط التفاعل أسبوعياً */
export const engagementTrendWeeks = [
  { label: "أسبوع 1", value: 62 },
  { label: "أسبوع 2", value: 68 },
  { label: "أسبوع 3", value: 65 },
  { label: "أسبوع 4", value: 71 },
  { label: "أسبوع 5", value: 69 },
  { label: "أسبوع 6", value: 73 },
  { label: "أسبوع 7", value: 70 },
  { label: "أسبوع 8", value: 74 },
];

/** تفاعل داخل المحاضرة (دقائق من بداية الجلسة) */
export const engagementTrendSessionMinutes = [
  { minute: 0, value: 58 },
  { minute: 15, value: 72 },
  { minute: 30, value: 78 },
  { minute: 45, value: 71 },
  { minute: 60, value: 76 },
  { minute: 75, value: 69 },
  { minute: 90, value: 74 },
];

export const dashboardSummary = {
  activeCourses: 4,
  studentsMonitored: 47,
  avgEngagementThisWeek: 72,
  atRiskCount: 4,
  sessionsThisMonth: 18,
};

export const engagementDistribution = {
  high: 18,
  medium: 14,
  low: 10,
};

export const mockStudents: Student[] = [
  {
    id: "444008593",
    name: "أماني علي الدوسري",
    engagementScore: 94,
    criteria: { visual: 88, attendance: 92, grades: 72 },
    level: "عالي",
    atRisk: false,
    course: "رؤية حاسوبية",
    major: "تقنية المعلومات",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-28",
    liveEngagement: 95,
    multimodal: { visual: 42, audio: 28, digital: 30 },
    attendanceRate: 94,
    absenceRate: 6,
    gradeRows: [
      { course: "رؤية حاسوبية", score: 88, max: 100 },
      { course: "تعلم آلي", score: 81, max: 100 },
    ],
    recommendations: [
      "الحفاظ على المشاركة الرقمية في المنتدى بعد المحاضرة.",
      "متابعة تمارين الرؤية الحاسوبية المتقدمة لرفع درجة المشروع.",
    ],
  },
  {
    id: "444008633",
    name: "هيفاء بن ناصر",
    engagementScore: 93,
    criteria: { visual: 75, attendance: 80, grades: 58 },
    level: "متوسط",
    atRisk: false,
    course: "رؤية حاسوبية",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-28",
    liveEngagement: 94,
    multimodal: { visual: 38, audio: 22, digital: 40 },
    attendanceRate: 82,
    absenceRate: 18,
    gradeRows: [
      { course: "رؤية حاسوبية", score: 72, max: 100 },
      { course: "قواعد البيانات", score: 65, max: 100 },
    ],
    recommendations: [
      "زيادة التفاعل البصري مع الشاشة أثناء الشرح التقني.",
      "مراجعة وحدة الـ CNN قبل اختبار الأسبوع القادم.",
    ],
  },
  {
    id: "443007303",
    name: "نورة سليمان الهذيلان",
    engagementScore: 95,
    criteria: { visual: 52, attendance: 65, grades: 56 },
    level: "متوسط",
    atRisk: false,
    course: "تعلم عميق",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-25",
    liveEngagement: 96,
    multimodal: { visual: 32, audio: 18, digital: 50 },
    attendanceRate: 68,
    absenceRate: 32,
    gradeRows: [
      { course: "تعلم عميق", score: 58, max: 100 },
      { course: "رؤية حاسوبية", score: 61, max: 100 },
    ],
    recommendations: [
      "جدولة لقاء إرشادي لمناقشة صعوبات الواجبات البرمجية.",
      "التحقق من جودة الإضاءة والكاميرا لتحسين التقدير البصري.",
    ],
  },
  {
    id: "444008602",
    name: "سارة علي السبيعي",
    engagementScore: 91,
    criteria: { visual: 90, attendance: 95, grades: 88 },
    level: "عالي",
    atRisk: false,
    course: "رؤية حاسوبية",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-29",
    liveEngagement: 92,
    multimodal: { visual: 48, audio: 26, digital: 26 },
    attendanceRate: 98,
    absenceRate: 2,
    gradeRows: [
      { course: "رؤية حاسوبية", score: 94, max: 100 },
      { course: "الذكاء الاصطناعي", score: 89, max: 100 },
    ],
    recommendations: [
      "المشاركة في ورشة أبحاث اختيارية لتعميق موضوع الـ Object Detection.",
    ],
  },
  {
    id: "444001100",
    name: "لمياء عبدالله القحطاني",
    engagementScore: 44,
    criteria: { visual: 38, attendance: 55, grades: 40 },
    level: "منخفض",
    atRisk: true,
    course: "تعلم عميق",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-22",
    liveEngagement: 36,
    multimodal: { visual: 28, audio: 15, digital: 57 },
    attendanceRate: 55,
    absenceRate: 45,
    gradeRows: [
      { course: "تعلم عميق", score: 42, max: 100 },
      { course: "البرمجة بلغة بايثون", score: 48, max: 100 },
    ],
    recommendations: [
      "تفعيل خطة دعم: جلسات تعويضية للحضور والمتابعة الأسبوعية.",
      "فحص جودة الاتصال والصوت أثناء الجلسات عن بُعد.",
    ],
  },
  {
    id: "444002211",
    name: "رغد محمد الشهري",
    engagementScore: 74,
    criteria: { visual: 72, attendance: 60, grades: 70 },
    level: "متوسط",
    atRisk: false,
    course: "أنظمة ذكية",
    major: "علوم الحاسب — مسار الأنظمة الذكية",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-27",
    liveEngagement: 75,
    multimodal: { visual: 40, audio: 30, digital: 30 },
    attendanceRate: 76,
    absenceRate: 24,
    gradeRows: [
      { course: "أنظمة ذكية", score: 74, max: 100 },
      { course: "هندسة البرمجيات", score: 69, max: 100 },
    ],
    recommendations: [
      "تعزيز الحضور المبكر للجلسات لتحسين مؤشر الانخراط الصوتي.",
    ],
  },
  {
    id: "444003322",
    name: "دانة سعد العتيبي",
    engagementScore: 39,
    criteria: { visual: 35, attendance: 42, grades: 41 },
    level: "منخفض",
    atRisk: true,
    course: "أنظمة ذكية",
    major: "علوم الحاسب — مسار الأنظمة الذكية",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-20",
    liveEngagement: 32,
    multimodal: { visual: 25, audio: 12, digital: 63 },
    attendanceRate: 48,
    absenceRate: 52,
    gradeRows: [
      { course: "أنظمة ذكية", score: 44, max: 100 },
      { course: "قواعد البيانات", score: 38, max: 100 },
    ],
    recommendations: [
      "إحالة للمرشد الأكاديمي ومراجعة خطة التعلم الذاتي.",
      "التركيز على التمارين التطبيقية قصيرة المدى لرفع الدرجات.",
    ],
  },
  {
    id: "444004441",
    name: "ريم عبدالرحمن الزهراني",
    engagementScore: 86,
    criteria: { visual: 82, attendance: 88, grades: 78 },
    level: "عالي",
    atRisk: false,
    course: "رؤية حاسوبية",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-29",
    liveEngagement: 85,
    multimodal: { visual: 45, audio: 25, digital: 30 },
    attendanceRate: 90,
    absenceRate: 10,
    gradeRows: [
      { course: "رؤية حاسوبية", score: 84, max: 100 },
      { course: "البرمجة بلغة بايثون", score: 79, max: 100 },
    ],
    recommendations: [
      "متابعة مشاريع المجموعة لرفع المؤشر الصوتي قليلاً.",
    ],
  },
  {
    id: "444006663",
    name: "شهد محمد الغامدي",
    engagementScore: 92,
    criteria: { visual: 88, attendance: 91, grades: 85 },
    level: "عالي",
    atRisk: false,
    course: "رؤية حاسوبية",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-29",
    liveEngagement: 91,
    multimodal: { visual: 40, audio: 30, digital: 30 },
    attendanceRate: 96,
    absenceRate: 4,
    gradeRows: [
      { course: "رؤية حاسوبية", score: 91, max: 100 },
      { course: "هندسة البرمجيات", score: 86, max: 100 },
    ],
    recommendations: [
      "المشاركة في نشاط اختياري لتعميق موضوع الـ Segmentation.",
    ],
  },
  {
    id: "444007774",
    name: "لطيفة سالم الحربي",
    engagementScore: 46,
    criteria: { visual: 40, attendance: 48, grades: 44 },
    level: "منخفض",
    atRisk: true,
    course: "أنظمة ذكية",
    major: "علوم الحاسب — مسار الأنظمة الذكية",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-21",
    liveEngagement: 48,
    multimodal: { visual: 22, audio: 18, digital: 60 },
    attendanceRate: 52,
    absenceRate: 48,
    gradeRows: [
      { course: "أنظمة ذكية", score: 46, max: 100 },
      { course: "قواعد البيانات", score: 41, max: 100 },
    ],
    recommendations: [
      "جدولة متابعة أسبوعية ومراجعة التسجيلات التعليمية.",
      "تقليل الاعتماد على المشاركة الرقمية فقط وتعزيز الحضور البصري.",
    ],
  },
  {
    id: "444008885",
    name: "منى عبدالعزيز السهلي",
    engagementScore: 78,
    criteria: { visual: 76, attendance: 80, grades: 72 },
    level: "متوسط",
    atRisk: false,
    course: "رؤية حاسوبية",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-29",
    liveEngagement: 79,
    multimodal: { visual: 42, audio: 28, digital: 30 },
    attendanceRate: 84,
    absenceRate: 16,
    gradeRows: [
      { course: "رؤية حاسوبية", score: 77, max: 100 },
      { course: "تعلم آلي", score: 73, max: 100 },
    ],
    recommendations: [
      "رفع نسبة المشاركة الصوتية في مناقشات المحاضرة.",
    ],
  },
  {
    id: "444009996",
    name: "جواهر حسن القرني",
    engagementScore: 84,
    criteria: { visual: 80, attendance: 86, grades: 76 },
    level: "عالي",
    atRisk: false,
    course: "تعلم عميق",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-28",
    liveEngagement: 83,
    multimodal: { visual: 36, audio: 34, digital: 30 },
    attendanceRate: 88,
    absenceRate: 12,
    gradeRows: [
      { course: "تعلم عميق", score: 82, max: 100 },
      { course: "الذكاء الاصطناعي", score: 78, max: 100 },
    ],
    recommendations: [
      "الحفاظ على التوازن بين المؤشرات البصرية والصوتية.",
    ],
  },
  {
    id: "444001223",
    name: "عبير خالد العنزي",
    engagementScore: 66,
    criteria: { visual: 62, attendance: 68, grades: 64 },
    level: "منخفض",
    atRisk: true,
    course: "رؤية حاسوبية",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-26",
    liveEngagement: 67,
    multimodal: { visual: 30, audio: 25, digital: 45 },
    attendanceRate: 70,
    absenceRate: 30,
    gradeRows: [
      { course: "رؤية حاسوبية", score: 64, max: 100 },
      { course: "البرمجة بلغة بايثون", score: 62, max: 100 },
    ],
    recommendations: [
      "مراجعة تمارين الوحدة الحالية قبل الاختبار القصير.",
    ],
  },
  {
    id: "444002334",
    name: "وفاء طلال البقمي",
    engagementScore: 89,
    criteria: { visual: 86, attendance: 90, grades: 82 },
    level: "عالي",
    atRisk: false,
    course: "أنظمة ذكية",
    major: "علوم الحاسب — مسار الأنظمة الذكية",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-29",
    liveEngagement: 88,
    multimodal: { visual: 44, audio: 28, digital: 28 },
    attendanceRate: 92,
    absenceRate: 8,
    gradeRows: [
      { course: "أنظمة ذكية", score: 87, max: 100 },
      { course: "هندسة البرمجيات", score: 83, max: 100 },
    ],
    recommendations: [
      "تقديم ملخص تطبيقي اختياري في المنتدى الأسبوعي.",
    ],
  },
  {
    id: "444003445",
    name: "مها سلمان الدوسري",
    engagementScore: 75,
    criteria: { visual: 73, attendance: 76, grades: 71 },
    level: "متوسط",
    atRisk: false,
    course: "تعلم عميق",
    major: "علوم الحاسب — مسار الذكاء الاصطناعي",
    college: "كلية علوم الحاسب والمعلومات",
    lastSessionDate: "2026-04-27",
    liveEngagement: 76,
    multimodal: { visual: 35, audio: 35, digital: 30 },
    attendanceRate: 80,
    absenceRate: 20,
    gradeRows: [
      { course: "تعلم عميق", score: 74, max: 100 },
      { course: "رؤية حاسوبية", score: 70, max: 100 },
    ],
    recommendations: [
      "زيادة التفاعل البصري أثناء شرح الشبكات العصبية.",
    ],
  },
];

export function getStudentById(id: string): Student | undefined {
  return mockStudents.find((s) => s.id === id);
}

/** طالب تجريبي لعرض لوحة «الطالب» دون مصادقة — يُستبدل لاحقاً بسياق المستخدم */
export const demoStudentDashboardId = "444008593";

export function getDemoStudent(): Student | undefined {
  return getStudentById(demoStudentDashboardId);
}

export const mockSessions: Session[] = [
  {
    id: "s1",
    course: "رؤية حاسوبية",
    courseName: "رؤية حاسوبية — المحاضرة 12",
    date: "2026-04-29",
    avgEngagement: 76,
    studentsCount: 28,
    notes: "تحليل تعبيرات الوجه أثناء شرح CNN",
  },
  {
    id: "s1-11",
    course: "رؤية حاسوبية",
    courseName: "رؤية حاسوبية — المحاضرة 11",
    date: "2026-04-22",
    avgEngagement: 72,
    studentsCount: 27,
  },
  {
    id: "s1-10",
    course: "رؤية حاسوبية",
    courseName: "رؤية حاسوبية — المحاضرة 10",
    date: "2026-04-15",
    avgEngagement: 68,
    studentsCount: 26,
  },
  {
    id: "s1-9",
    course: "رؤية حاسوبية",
    courseName: "رؤية حاسوبية — المحاضرة 9",
    date: "2026-04-08",
    avgEngagement: 74,
    studentsCount: 28,
  },
  {
    id: "s-ml-8",
    course: "تعلم آلي",
    courseName: "تعلم آلي — المحاضرة 8",
    date: "2026-04-24",
    avgEngagement: 82,
    studentsCount: 24,
  },
  {
    id: "s-ml-7",
    course: "تعلم آلي",
    courseName: "تعلم آلي — المحاضرة 7",
    date: "2026-04-17",
    avgEngagement: 79,
    studentsCount: 25,
  },
  {
    id: "s2",
    course: "تعلم عميق",
    courseName: "تعلم عميق — المحاضرة 8",
    date: "2026-04-25",
    avgEngagement: 61,
    studentsCount: 22,
  },
  {
    id: "s2-7",
    course: "تعلم عميق",
    courseName: "تعلم عميق — المحاضرة 7",
    date: "2026-04-18",
    avgEngagement: 64,
    studentsCount: 23,
  },
  {
    id: "s2-6",
    course: "تعلم عميق",
    courseName: "تعلم عميق — المحاضرة 6",
    date: "2026-04-11",
    avgEngagement: 59,
    studentsCount: 21,
  },
  {
    id: "s2-5",
    course: "تعلم عميق",
    courseName: "تعلم عميق — المحاضرة 5",
    date: "2026-04-04",
    avgEngagement: 67,
    studentsCount: 22,
  },
  {
    id: "s3",
    course: "أنظمة ذكية",
    courseName: "أنظمة ذكية — مراجعة",
    date: "2026-04-27",
    avgEngagement: 69,
    studentsCount: 18,
  },
  {
    id: "s3-6",
    course: "أنظمة ذكية",
    courseName: "أنظمة ذكية — المحاضرة 6",
    date: "2026-04-20",
    avgEngagement: 71,
    studentsCount: 19,
  },
  {
    id: "s3-5",
    course: "أنظمة ذكية",
    courseName: "أنظمة ذكية — المحاضرة 5",
    date: "2026-04-13",
    avgEngagement: 65,
    studentsCount: 18,
  },
  {
    id: "s3-4",
    course: "أنظمة ذكية",
    courseName: "أنظمة ذكية — المحاضرة 4",
    date: "2026-04-06",
    avgEngagement: 70,
    studentsCount: 17,
  },
];

export const mockAlerts: AlertItem[] = [
  {
    id: "a0",
    title: "انخفاض تفاعل القاعة (متوسط الجلسة)",
    detail:
      "متوسط Engagement Score للقاعة انخفض دون ٦٠٪ خلال آخر ٢٠ دقيقة مقارنة بمتوسط المحاضرة.",
    time: "الآن",
    severity: "warning",
  },
  {
    id: "a1",
    title: "انخفاض تفاعل طالب محدد",
    detail:
      "الطالبة نورة سليمان الهذيلان: مؤشر بصري منخفض ونسبة نظر للشاشة دون العتبة خلال آخر ١٥ دقيقة.",
    time: "منذ ١٥ دقيقة",
    severity: "critical",
  },
  {
    id: "a2",
    title: "انخفاض التفاعل البصري (مجموعة)",
    detail:
      "ثلاثة طلاب بمعدل نظر للشاشة أقل من العتبة في نفس الجلسة.",
    time: "منذ ساعتين",
    severity: "warning",
  },
  {
    id: "a3",
    title: "قائمة الطلاب المعرضين للخطر",
    detail: "تحديث تلقائي: طالبان جديدان انضما لتصنيف «منخفض».",
    time: "اليوم 09:15",
    severity: "critical",
  },
];

/** تنبيهات مُدرك — تركيز وتفاعل متعدد الوسائط (واجهة الطالب، تجريبية) */
export const studentDemoNotifications: AlertItem[] = [
  {
    id: "st1",
    title: "مُدرك: درجة التركيز فوق المعدل في آخر جلسة",
    detail:
      "سجّلت المنصة في جلسة «رؤية حاسوبية» (٢٩/٠٤) متوسط تركيز أعلى من جلستك السابقة — استمرار النظر للشاشة والمشاركة الصوتية ضمن النطاق المقترح.",
    time: "منذ ساعة",
    severity: "info",
  },
  {
    id: "st2",
    title: "تنبيه تركيز — انخفاض مؤقت في المؤشر البصري",
    detail:
      "خلال آخر ١٥ دقيقة من الجلسة الحية انخفضت نسبة التوجه البصري نحو المحتوى دون عتبة التنبيه في مُدرك. يُفضّل تقليل التشتت على الجهاز المجاور.",
    time: "اليوم 10:42",
    severity: "warning",
  },
  {
    id: "st3",
    title: "مُدرك: تفاعل مركب ضمن المعدل الآمن",
    detail:
      "دمج مؤشرات التركيز البصري والصوتي والرقمي لجلسة «تعلم آلي» يظهر استقراراً — لا يلزم إجراء؛ يمكن مراجعة التفصيل في لوحة الطالب.",
    time: "أمس",
    severity: "info",
  },
  {
    id: "st4",
    title: "تنبيه منصة — جلسة تركيز قصيرة مسجّلة",
    detail:
      "عند تفعيل «معاينة الكاميرا» لمراقبة التركيز سجّلت مُدرك جلسة تركيز تجريبية (بيانات لا تُرسل للمحاضر إلا عند انضمامك للفصل الافتراضي).",
    time: "منذ يومين",
    severity: "info",
  },
];

export const mockAdminUsers: AdminUserRow[] = [
  {
    id: "u1",
    name: "د. حلا المناعي",
    email: "h.mannai@pnu.edu.sa",
    role: "instructor",
    status: "نشط",
  },
  {
    id: "u2",
    name: "مشرف النظام",
    email: "admin@mudrek.local",
    role: "admin",
    status: "نشط",
  },
  {
    id: "u3",
    name: "أماني علي الدوسري",
    email: "444008593@student.pnu.edu.sa",
    role: "student",
    status: "نشط",
  },
  {
    id: "u4",
    name: "سارة علي السبيعي",
    email: "444008602@student.pnu.edu.sa",
    role: "student",
    status: "نشط",
  },
];

export const mockIntegrations: IntegrationLink[] = [
  {
    id: "i1",
    name: "نظام الدرجات الأكاديمي (SIS)",
    description: "جلب الدرجات والمقررات المسجّلة للطالب.",
    status: "متصل",
    lastSync: "2026-05-01 08:00",
  },
  {
    id: "i2",
    name: "نظام الحضور والغياب",
    description: "مزامنة جداول القاعات والجلسات الحضورية.",
    status: "متصل",
    lastSync: "2026-05-01 07:45",
  },
  {
    id: "i3",
    name: "منصة التعلم الإلكتروني (LMS)",
    description: "المشاركات، التسليمات، والنشاط الرقمي.",
    status: "قيد الإعداد",
  },
  {
    id: "i4",
    name: "تقويم الجامعة",
    description: "ربط مواعيد الاختبارات والعطل.",
    status: "غير متصل",
  },
];
