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
  displayName: "د. حلا المناعي",
  roleLine: "عضو هيئة تدريس — كلية علوم الحاسب والمعلومات",
  /** المقرر الذي تدرّسه حالياً */
  courseName: "رؤية حاسوبية",
  courseCode: "CS 331",
  /** شريط اكتمال الملف (واجهة فقط) */
  profileCompletionPct: 75,
};

/** فترة في جدول أسبوعي — weekday: 0 = الأحد … 6 = السبت */
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
];

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
  studentsMonitored: 42,
  avgEngagementThisWeek: 72,
  atRiskCount: 5,
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
    engagementScore: 84,
    criteria: { visual: 88, attendance: 92, grades: 72 },
    level: "عالي",
    atRisk: false,
    course: "رؤية حاسوبية",
    lastSessionDate: "2026-04-28",
    liveEngagement: 86,
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
    engagementScore: 71,
    criteria: { visual: 75, attendance: 80, grades: 58 },
    level: "متوسط",
    atRisk: false,
    course: "رؤية حاسوبية",
    lastSessionDate: "2026-04-28",
    liveEngagement: 68,
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
    engagementScore: 76,
    criteria: { visual: 52, attendance: 65, grades: 56 },
    level: "متوسط",
    atRisk: false,
    course: "تعلم عميق",
    lastSessionDate: "2026-04-25",
    liveEngagement: 44,
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
    engagementScore: 67,
    criteria: { visual: 72, attendance: 60, grades: 70 },
    level: "متوسط",
    atRisk: false,
    course: "أنظمة ذكية",
    lastSessionDate: "2026-04-27",
    liveEngagement: 62,
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
];

export function getStudentById(id: string): Student | undefined {
  return mockStudents.find((s) => s.id === id);
}

export const mockSessions: Session[] = [
  {
    id: "s1",
    courseName: "رؤية حاسوبية — المحاضرة 12",
    date: "2026-04-29",
    avgEngagement: 76,
    studentsCount: 28,
    notes: "تحليل تعبيرات الوجه أثناء شرح CNN",
  },
  {
    id: "s2",
    courseName: "تعلم عميق — المحاضرة 8",
    date: "2026-04-25",
    avgEngagement: 61,
    studentsCount: 22,
  },
  {
    id: "s3",
    courseName: "أنظمة ذكية — مراجعة",
    date: "2026-04-27",
    avgEngagement: 69,
    studentsCount: 18,
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
  {
    id: "a4",
    title: "اكتمال مزامنة البيانات",
    detail: "تم دمج بيانات الحضور والدرجات من نظام الجامعة لجلسة ٢٩/٠٤.",
    time: "أمس",
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
