/** عتبات درجة التركيز / التفاعل — مطابقة لعمود «درجة التركيز» في جدول الطلاب */
export function focusScoreBand(score: number): "green" | "yellow" | "red" {
  const n = Number(score);
  if (!Number.isFinite(n)) return "red";
  if (n >= 70) return "green";
  if (n >= 60) return "yellow";
  return "red";
}
