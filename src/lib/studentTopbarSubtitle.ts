/** عنوان الشريط العلوي في واجهة الطالب */
export function studentTopbarSubtitle(
  pathname: string,
  studentName: string
): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/student/virtual") {
    return `الفصول الافتراضية — ${studentName}`;
  }
  return `لوحة الطالبة — ${studentName}`;
}
