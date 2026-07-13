"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const EMAIL = "office@kapsca.in";

const subjectFor = (role: string) => `Application — ${role}`;

const bodyFor = (role: string) =>
  [
    "Dear KAPS & Co.,",
    "",
    `I would like to apply for the position of ${role}.`,
    "",
    "Name:",
    "Phone:",
    "Qualification:",
    "Current status:",
    "",
    "My CV is attached to this email.",
    "",
    "Regards,",
  ].join("\n");

/** Opens the applicant's own mail client. `mailto:` can carry a subject and a
 *  body, but never an attachment — browsers block that — which is why the modal
 *  asks the applicant to attach the CV themselves before sending. */
const mailtoHref = (role: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(
    subjectFor(role),
  )}&body=${encodeURIComponent(bodyFor(role))}`;

/** Gmail's web compose — the fallback for anyone with no desktop mail client. */
const gmailHref = (role: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EMAIL,
  )}&su=${encodeURIComponent(subjectFor(role))}&body=${encodeURIComponent(
    bodyFor(role),
  )}`;

const STEPS = [
  "We'll open a new email, already addressed and written for you.",
  "Attach your CV or resume to that email (PDF preferred).",
  "Add anything else you'd like us to know, then hit send.",
];

export function ApplyModal({
  role,
  onClose,
}: {
  role: string | null;
  onClose: () => void;
}) {
  const open = role !== null;
  const [copied, setCopied] = useState(false);

  // Close on Esc + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the address is on screen anyway */
    }
  }

  /** Opens Gmail's web compose in a new tab. `window.open` only escapes the
   *  popup blocker while the click is still being handled, so this must stay
   *  synchronous — no timers, no awaits before it. */
  function openEmail() {
    if (!role) return;
    window.open(gmailHref(role), "_blank", "noopener,noreferrer");
    onClose();
  }

  // The careers section sits inside a transformed scroll layer, which would
  // otherwise become the containing block for `position: fixed`. Portal out.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
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

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Apply for ${role}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cloud p-6 shadow-[0_40px_100px_-30px_rgba(5,12,25,0.7)] sm:p-8"
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

            <div className="pr-8">
              <span className="text-xs font-600 uppercase tracking-[0.22em] text-accent-600">
                Apply
              </span>
              <h3 className="mt-2 font-display text-2xl font-700 leading-tight text-navy-700">
                {role}
              </h3>
            </div>

            {/* The one thing they must not miss */}
            <div className="mt-6 flex gap-3.5 rounded-xl bg-accent-500/10 p-4 ring-1 ring-inset ring-accent-500/20">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-5 w-5 shrink-0 text-accent-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.2a4 4 0 0 1 5.65 5.66l-9.19 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <p className="text-sm leading-relaxed text-navy-600">
                <span className="font-700 text-navy-700">
                  Please attach your CV
                </span>{" "}
                to the email before you send it — we can&apos;t attach it for
                you.
              </p>
            </div>

            <ol className="mt-6 space-y-3.5">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-100 font-display text-xs font-700 tabular-nums text-navy-600">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-navy-500">{step}</p>
                </li>
              ))}
            </ol>

            <button
              onClick={openEmail}
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-600 text-white shadow-[0_12px_30px_-14px_rgba(78,167,46,0.6)] transition-all hover:bg-accent-600"
            >
              Open email &amp; attach CV
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
              >
                <path
                  d="M3 8h9M8 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="mt-4 text-center text-xs text-navy-400">
              Prefer your own mail app?{" "}
              <a
                href={mailtoHref(role)}
                onClick={onClose}
                className="font-600 text-accent-600 hover:underline"
              >
                Open it there
              </a>
            </p>

            <p className="mt-2 text-center text-xs text-navy-400">
              Or email us directly at{" "}
              <button
                onClick={copyEmail}
                className="font-600 text-accent-600 hover:underline"
              >
                {copied ? "Copied!" : EMAIL}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
