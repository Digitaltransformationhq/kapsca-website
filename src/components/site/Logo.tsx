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
  const onDark = tone === "light";
  const primary = onDark ? "#ffffff" : "#1b365d";
  const sub = onDark ? "rgba(255,255,255,0.6)" : "#5b6472";

  const mark = (
    <Image
      src="/ca-india-logo.png"
      alt="KAPS & Co. — Chartered Accountants (CA India)"
      width={1081}
      height={804}
      className="h-10 w-auto object-contain"
      priority
    />
  );

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* On dark backgrounds, a white badge keeps the navy CA-India mark legible;
          on light backgrounds the mark shows directly. */}
      {onDark ? (
        <span className="flex items-center justify-center rounded-lg bg-white px-2 py-1.5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
          {mark}
        </span>
      ) : (
        mark
      )}
      {/* Wordmark scaled to the CA mark, with the green divider line (as in the
          official logo) between the name and the "Chartered Accountants" line. */}
      <span className="flex flex-col items-start leading-none">
        {/* Name + green line share a width fitted to "KAPS & Co." so the line
            ends exactly under the "Co." full stop. */}
        <span className="flex w-fit flex-col items-stretch">
          <span
            className="-mr-[0.28em] font-jetbrains text-[1.4rem] font-700 leading-none tracking-[0.06em] whitespace-nowrap"
            style={{ color: primary }}
          >
            KAPS&nbsp;&amp;&nbsp;Co.
          </span>
          {/* Green line — matches the reference logo, ending at the "Co." full stop */}
          <span
            aria-hidden
            className="my-[3px] h-[2px] w-full rounded-full bg-[linear-gradient(to_right,transparent_0%,transparent_30%,var(--color-accent-500)_76%,var(--color-accent-400)_100%)]"
          />
        </span>
        <span
          className="font-jetbrains text-[0.55rem] font-500 uppercase tracking-[0.22em]"
          style={{ color: sub }}
        >
          Chartered&nbsp;Accountants
        </span>
      </span>
    </span>
  );
}
