import Image from "next/image";

/** Split so each glyph can be spaced out to fill the wordmark's exact width. */
const SUBTITLE = Array.from("CHARTERED ACCOUNTANTS");

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
      className="h-11 w-auto object-contain"
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
          {/* "K A P S" is spaced letter by letter; "Co." stays tight. The
              ampersand carries a small margin instead of space characters —
              the wordmark is monospaced, so a real space would advance a full
              glyph width and open a gap several times the letter-spacing.
              "Co." runs at normal tracking; the full stop is pulled in on top
              of that because a monospaced period sits centred in a full-width
              cell, which reads as a space after the "o". */}
          <span
            className="font-jetbrains text-[1.7rem] font-800 leading-none tracking-[0.2em] whitespace-nowrap"
            style={{ color: primary }}
          >
            KAPS<span className="mx-[0.08em]">&amp;</span>
            <span className="tracking-normal">
              Co<span className="-ml-[0.2em]">.</span>
            </span>
          </span>
          {/* Green line — matches the reference logo, ending at the "Co." full
              stop. The clip path narrows it to a point at the left, so the tail
              thins out as it fades instead of stopping at full weight. */}
          <span
            aria-hidden
            className="my-[3px] h-[1.5px] w-full bg-[linear-gradient(to_right,transparent_0%,transparent_14%,var(--color-accent-500)_72%,var(--color-accent-400)_100%)]"
            style={{
              clipPath: "polygon(0 50%, 58% 0, 100% 0, 100% 100%, 58% 100%)",
            }}
          />
          {/* Justified to the wordmark: each glyph is its own flex item, so the
              line starts under the "K" and ends under the full stop whatever the
              wordmark's size or tracking. `w-0 min-w-full` keeps this line out of
              the parent's fit-content width — otherwise it, not "K A P S & Co.",
              would decide how wide the block is. */}
          <span
            aria-hidden
            className="flex w-0 min-w-full justify-between font-jetbrains text-[0.6rem] font-500 uppercase"
            style={{ color: sub }}
          >
            {SUBTITLE.map((char, i) => (
              <span key={`${char}-${i}`} className={char === " " ? "w-[0.3em]" : ""}>
                {char === " " ? "" : char}
              </span>
            ))}
          </span>
          <span className="sr-only">Chartered Accountants</span>
        </span>
      </span>
    </span>
  );
}
