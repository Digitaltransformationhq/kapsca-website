"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export type ServiceGroup = {
  /** Short label shown in the list. */
  label: string;
  items: string[];
};

export type ServiceDetail = {
  title: string;
  intro: string;
  groups: ServiceGroup[];
};

/**
 * Master–detail body: the group list on the left, the selected group's items
 * on the right. Deliberately not an accordion — expanding rows in place grew
 * the dialog past the viewport on short screens and forced it to scroll. Here
 * the height is set by the longest group and never changes as you browse.
 *
 * Lives in its own component so closing the dialog unmounts it and the first
 * group is selected again on reopen, with no state to reset by hand.
 */
function Groups({ groups }: { groups: ServiceGroup[] }) {
  const [active, setActive] = useState(groups[0]);

  return (
    <div className="grid md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
      {/* ---------- Left: the groups ---------- */}
      <ul className="border-navy-900/[0.08] md:border-r md:pr-3">
        {groups.map((g) => {
          const isActive = g.label === active.label;
          return (
            <li key={g.label}>
              <button
                type="button"
                onClick={() => setActive(g)}
                aria-pressed={isActive}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-300 ${
                  isActive ? "bg-navy-700" : "hover:bg-navy-900/[0.04]"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-accent-500 text-white"
                      : "bg-accent-500/12 text-accent-600"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>

                <span
                  className={`flex-1 font-display text-[0.95rem] font-600 tracking-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-navy-700"
                  }`}
                >
                  {g.label}
                </span>

                <span
                  className={`text-[11px] font-500 tabular-nums transition-colors duration-300 ${
                    isActive ? "text-white/50" : "text-navy-300"
                  }`}
                >
                  {g.items.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* ---------- Right: the selected group's capabilities ---------- */}
      <div className="mt-5 border-t border-navy-900/[0.08] pt-5 md:mt-0 md:border-t-0 md:pl-7 md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
          >
            <p className="text-[11px] font-600 uppercase tracking-[0.18em] text-accent-600">
              {active.label}
            </p>
            <ul className="mt-3.5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {active.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-2.5 text-[13.5px] leading-snug text-navy-500"
                >
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-accent-500/70" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** The full capability list for one practice area. */
export function ServiceDetailModal({
  detail,
  onClose,
}: {
  detail: ServiceDetail | null;
  onClose: () => void;
}) {
  // Close on Esc + lock background scroll while open.
  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [detail, onClose]);

  // Rendered into <body>. The section this modal is declared in is a
  // transformed, overflow-hidden layer (see Sections.tsx), and a fixed-position
  // child of a transformed ancestor anchors to that ancestor rather than the
  // viewport — which pushed the dialog off-centre and clipped its top edge.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {detail && (
        <motion.div
          // Extra padding at the foot pulls the centred dialog a little above
          // the true middle, which sits better against the page behind it.
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pb-16 sm:p-6 sm:pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog — wide and short, so it fits a laptop screen without
              scrolling. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={detail.title}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            className="relative z-10 max-h-[86vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-cloud p-6 shadow-[0_40px_100px_-30px_rgba(5,12,25,0.7)] sm:p-7"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-navy-400 transition-colors hover:bg-navy-100 hover:text-navy-700"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Header — title and intro sit side by side on wide screens, which
                keeps the dialog short enough to clear a laptop viewport. */}
            <div className="grid gap-x-10 gap-y-2 pr-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-end">
              <div>
                <span className="mb-3 flex h-px w-8 bg-accent-500" />
                <h2 className="font-display text-2xl font-700 leading-tight tracking-tight text-navy-700">
                  {detail.title}
                </h2>
              </div>
              <p className="max-w-2xl text-[0.95rem] leading-relaxed text-navy-500 lg:pb-1">
                {detail.intro}
              </p>
            </div>

            <div className="mt-5 border-t border-navy-900/[0.08] pt-5">
              <Groups groups={detail.groups} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
