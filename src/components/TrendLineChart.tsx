import { useId } from "react";

type Point = { x: number; y: number };

type Props = {
  /** قيم على المحور الصادي 0–100 */
  values: number[];
  title?: string;
  /** عناوين للمحور السفلي */
  xLabels?: string[];
};

function buildPoints(values: number[]): Point[] {
  if (values.length === 0) return [];
  const n = values.length;
  return values.map((v, i) => ({
    x: n === 1 ? 50 : (i / (n - 1)) * 100,
    y: 100 - Math.min(100, Math.max(0, v)),
  }));
}

export function TrendLineChart({ values, title, xLabels }: Props) {
  const gid = useId().replace(/:/g, "");
  const pts = buildPoints(values);
  const poly =
    pts.length > 0
      ? pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ")
      : "";

  return (
    <figure className="trend-chart" aria-label={title}>
      {title ? <figcaption className="trend-chart__title">{title}</figcaption> : null}
      <div className="trend-chart__wrap">
        <svg
          className="trend-chart__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
        >
          <defs>
            <linearGradient id={`trendFill-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {pts.length > 1 ? (
            <polygon
              fill={`url(#trendFill-${gid})`}
              points={`0,100 ${poly} 100,100`}
              stroke="none"
            />
          ) : null}
          {pts.length > 0 ? (
            <polyline
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              points={poly}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={2.2}
              fill="var(--surface)"
              stroke="var(--brand)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
      {xLabels && xLabels.length > 0 ? (
        <div className="trend-chart__xlabels">
          {xLabels.map((lb, i) => (
            <span key={i}>{lb}</span>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
