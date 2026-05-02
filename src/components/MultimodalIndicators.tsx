import type { MultimodalBreakdown } from "../data/seasMock";

type Props = {
  m: MultimodalBreakdown;
  compact?: boolean;
};

function IconEye({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        fill="currentColor"
        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      />
    </svg>
  );
}

function IconMic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        fill="currentColor"
        d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"
      />
    </svg>
  );
}

function IconDigital({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        fill="currentColor"
        d="M4 6h16v10H4V6zm2 12h12v2H4v-2zm4 4h4v2H8v-2z"
      />
    </svg>
  );
}

const ICONS = {
  visual: IconEye,
  audio: IconMic,
  digital: IconDigital,
} as const;

export function MultimodalIndicators({ m, compact }: Props) {
  const items: {
    key: keyof MultimodalBreakdown;
    short: string;
    hint: string;
  }[] = [
    {
      key: "visual",
      short: "رؤية وتعبيرات",
      hint: "تحليل الوجه، اتجاه الرأس، نظرة العين (FER)",
    },
    {
      key: "audio",
      short: "صوتي",
      hint: "الكلام، النبرة، التفاعل الصوتي مع الجلسة",
    },
    {
      key: "digital",
      short: "مشاركة رقمية",
      hint: "المنصة، التسليم، النقر والتفاعل مع النظام",
    },
  ];

  return (
    <div className={`modality-icons${compact ? " modality-icons--compact" : ""}`}>
      {items.map(({ key, short, hint }) => {
        const Icon = ICONS[key];
        return (
          <span
            key={key}
            className="modality-icons__item"
            title={`${short}: ${hint} — مساهمة تقريبية ${m[key]}%`}
          >
            <span className="modality-icons__iconwrap" aria-hidden>
              <Icon className="modality-icons__svg" />
            </span>
            <span className="modality-icons__text">
              <span className="modality-icons__short">{short}</span>
              <span className="modality-icons__pct">{m[key]}%</span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
