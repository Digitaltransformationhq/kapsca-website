import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Text color context: "light" for dark backgrounds, "dark" for light backgrounds */
  tone?: "light" | "dark";
};

/**
 * KAPS & Co. wordmark — the official "CA India" mark on a white badge
 * (so the navy mark stays legible on dark backgrounds) + the wordmark.
 */
export function Logo({ className = "", tone = "light" }: LogoProps) {
  const primary = tone === "light" ? "#ffffff" : "#1b365d";
  const sub = tone === "light" ? "rgba(255,255,255,0.55)" : "rgba(32,42,56,0.55)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
        <Image
          src="/ca-india-logo.png"
          alt="KAPS & Co. — Chartered Accountants (CA India)"
          width={1081}
          height={804}
          className="h-7 w-7 object-contain"
          priority
        />
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
