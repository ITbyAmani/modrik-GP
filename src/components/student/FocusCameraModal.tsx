import { useEffect, useId, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * نافذة معاينة كاميرا لمحاكاة «انضمام» الفصل الافتراضي وجمع مؤشرات التركيز لاحقاً.
 * يتطلب إذن المتصفح للكاميرا.
 */
export function FocusCameraModal({ open, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setError(null);
      return;
    }

    let stream: MediaStream | null = null;

    const start = async () => {
      setError(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("المتصفح لا يدعم الوصول إلى الكاميرا من هذه الصفحة.");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        const el = videoRef.current;
        if (el) {
          el.srcObject = stream;
          await el.play().catch(() => {});
        }
      } catch {
        setError(
          "تعذّر تشغيل الكاميرا. تأكدي من منح الإذن أو أن الكاميرا غير مستخدمة في تطبيق آخر."
        );
      }
    };

    void start();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      const el = videoRef.current;
      if (el) el.srcObject = null;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="focus-camera-modal__backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="focus-camera-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="focus-camera-modal__head">
          <h2 id={titleId} className="focus-camera-modal__title">
            مراقبة التركيز — معاينة الكاميرا
          </h2>
          <button
            type="button"
            className="focus-camera-modal__close"
            onClick={onClose}
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>
        <p className="focus-camera-modal__lead">
          في النسخة الكاملة تُرسل الإطارات لتحليل التركيز دون تخزين دائم. هنا:
          معاينة مباشرة فقط (واجهة عرض).
        </p>
        {error ? (
          <p className="focus-camera-modal__error" role="alert">
            {error}
          </p>
        ) : (
          <div className="focus-camera-modal__video-wrap">
            <video
              ref={videoRef}
              className="focus-camera-modal__video"
              autoPlay
              playsInline
              muted
            />
          </div>
        )}
        <div className="focus-camera-modal__foot">
          <button type="button" className="btn-secondary" onClick={onClose}>
            إنهاء الجلسة
          </button>
        </div>
      </div>
    </div>
  );
}
