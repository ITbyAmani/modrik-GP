import { currentLecture, instructorProfile } from "../data/seasMock";

/** نص الشريط العلوي حسب المسار — لا يعرض «المحاضرة الحالية» إلا حيث يناسب السياق */
export function facultyTopbarSubtitle(pathname: string): string {
  const p = pathname.replace(/\/+$/, "") || "/";

  if (p === "/") {
    return currentLecture.title;
  }
  if (p === "/sessions") {
    return "إدارة الجلسات التعليمية — عرض وإنشاء وبدء وإنهاء";
  }
  if (p === "/monitoring") {
    return `المراقبة المباشرة — ${instructorProfile.courseName} (${currentLecture.code})`;
  }
  if (p === "/students") {
    return "الطلاب — قائمة المتابعة";
  }
  if (p === "/at-risk") {
    return "طلاب يحتاجون دعم";
  }
  if (p.startsWith("/students/")) {
    return "ملف الطالب";
  }
  if (p === "/reports") {
    return "التقارير والتحليلات";
  }

  return currentLecture.title;
}
