/** ٨٠–١٠٠ أخضر، ٧٠–٧٩ أصفر، أقل من ٧٠ أحمر — درجة التركيز والتفاعل اللحظي */
export function focusScoreBand(score: number): "green" | "yellow" | "red" {
  const n = Number(score);
  if (!Number.isFinite(n)) return "red";
  if (n >= 80) return "green";
  if (n >= 70) return "yellow";
  return "red";
}
