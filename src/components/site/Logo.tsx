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
      <Image
        src="/ca-india-logo.png"
        alt="KAPS & Co. — Chartered Accountants (CA India)"
        width={1081}
        height={804}
        className="h-9 w-auto object-contain"
        priority
      />
      <span className="flex flex-col items-start text-left leading-none">
        <span
          className="font-jetbrains text-[1.02rem] font-700 tracking-[0.14em]"
          style={{ color: primary }}
        >
          KAPS &amp; Co.
        </span>
        <span
          className="mt-[4px] font-jetbrains text-[0.5rem] font-500 uppercase tracking-[0.2em]"
          style={{ color: sub }}
        >
          Chartered Accountants
        </span>
      </span>
    </span>
  );
}
