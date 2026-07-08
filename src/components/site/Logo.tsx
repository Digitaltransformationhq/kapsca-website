type LogoProps = {
  className?: string;
  /** Text color context: "light" for dark backgrounds, "dark" for light backgrounds */
  tone?: "light" | "dark";
};

/**
 * KAPS & Co. wordmark + monogram.
 * A single, clean mark: a rounded green tile enclosing one upward growth stroke.
 */
export function Logo({ className = "", tone = "light" }: LogoProps) {
  const primary = tone === "light" ? "#ffffff" : "#1b365d";
  const sub = tone === "light" ? "rgba(255,255,255,0.55)" : "rgba(32,42,56,0.55)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-accent-400 to-accent-600 shadow-[0_6px_16px_-6px_rgba(78,167,46,0.65)] ring-1 ring-inset ring-white/20">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
          <path
            d="M4 15.5 L9.5 10 L13 13 L20 6"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 6 L20 6 L20 11"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.12rem] font-700 tracking-tight"
          style={{ color: primary }}
        >
          KAPS &amp; Co.
        </span>
        <span
          className="mt-[3px] text-[0.55rem] font-500 uppercase tracking-[0.26em]"
          style={{ color: sub }}
        >
          Chartered Accountants
        </span>
      </span>
    </span>
  );
}
