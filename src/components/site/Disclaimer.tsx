"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * ICAI-mandated entry disclaimer. Shown on every visit (state resets on each
 * full page load — intentionally not persisted) and blocks the site until the
 * visitor confirms they are seeking information of their own accord.
 */
export function Disclaimer() {
  const [open, setOpen] = useState(true);
  const [agreed, setAgreed] = useState(false);

  // Lock background scroll while the gate is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease }}
            className="relative flex max-h-[90svh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-30px_rgba(10,23,40,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-navy-100 px-7 py-5 sm:px-9">
              <span className="h-6 w-1 rounded-full bg-accent-500" />
              <h2
                id="disclaimer-title"
                className="font-display text-2xl font-700 tracking-tight text-navy-700"
              >
                Disclaimer
              </h2>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-7 py-6 sm:px-9">
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-navy-600">
                <p>
                  The Institute of Chartered Accountants of India does not permit
                  advertisement or solicitation by Chartered Accountants in any
                  form or manner. By accessing this website,{" "}
                  <span className="font-600 text-navy-700">www.kapsca.in</span>,
                  you acknowledge and confirm that you are seeking information
                  relating to{" "}
                  <span className="tracking-[0.2em]">KAPS</span> &amp; Co. of
                  your own accord and that there has been no form of
                  solicitation, advertisement or inducement by{" "}
                  <span className="tracking-[0.2em]">KAPS</span> &amp; Co. or its
                  partners or employees.
                </p>
                <p>
                  The contents of this website are for informational purposes only
                  and should not be interpreted as soliciting or advertising. No
                  information provided on this website should be used or construed
                  as a substitute for professional advice.{" "}
                  <span className="tracking-[0.2em]">KAPS</span> &amp; Co. shall
                  not be liable for consequences of any action taken by relying on
                  the information provided on this website. It is recommended that
                  the readers should take professional advice before acting on the
                  same.
                </p>
                <p>
                  The contents of this website are the intellectual property of{" "}
                  <span className="tracking-[0.2em]">KAPS</span> &amp; Co.
                </p>
              </div>
            </div>

            {/* Footer — agree + proceed */}
            <div className="border-t border-navy-100 bg-cloud px-7 py-5 sm:px-9">
              <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-navy-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#4ea72e]"
                />
                <span>
                  I have read and understood the above and I agree with the terms
                  of usage of this website.
                </span>
              </label>

              <button
                type="button"
                disabled={!agreed}
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-7 py-3 text-base font-600 text-white shadow-[0_12px_30px_-14px_rgba(78,167,46,0.6)] transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                Proceed
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  aria-hidden
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
