"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Public Web3Forms access key — safe to expose (spam-protected, tied to the
 *  firm's inbox). Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local / Vercel. */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

const SERVICES = [
  "Audit & Assurance",
  "Indirect Tax — GST",
  "Direct Taxation",
  "Forensic Audit",
  "Corporate & Advisory",
  "Project Finance & CMA",
  "General enquiry",
];

type Status = "idle" | "submitting" | "success" | "error";

export function ConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  // Reset to a clean form shortly after closing.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMsg(
        "The form isn't configured yet. Please email office@kapsca.in directly.",
      );
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New consultation request — ${data.name}`,
          from_name: "KAPS & Co. Website",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Couldn't send right now. Please try again or email office@kapsca.in.",
      );
    }
  }

  const inputCls =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-navy-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20";
  const labelCls =
    "mb-1.5 block text-[11px] font-600 uppercase tracking-[0.14em] text-navy-400";

  return (
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
            aria-label="Book a consultation"
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
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="py-8 text-center">
                {/* Tick badge — 8-point seal */}
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.05 }}
                  className="relative mx-auto flex h-16 w-16 items-center justify-center"
                >
                  <span className="absolute inset-0 rounded-[16px] bg-accent-500 shadow-[0_12px_28px_-8px_rgba(78,167,46,0.6)]" />
                  <span className="absolute inset-0 rotate-45 rounded-[16px] bg-accent-500" />
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="relative h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                  >
                    <motion.path d="M5 13l4 4L19 7" />
                  </motion.svg>
                </motion.span>

                <h3 className="mt-5 font-display text-2xl font-700 text-navy-700">
                  Request received
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-navy-500">
                  Thank you — a partner from KAPS &amp; Co. will get back to you
                  shortly. Prefer to talk now? Give us a call.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="tel:+919725339233"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-accent-600"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M6.5 3.5a1 1 0 0 1 1 .7l1 3a1 1 0 0 1-.3 1.05L7 9.5a12 12 0 0 0 5.5 5.5l1.25-1.2a1 1 0 0 1 1.05-.24l3 1a1 1 0 0 1 .7 1v3a1 1 0 0 1-1 1A15 15 0 0 1 3.5 5.5a1 1 0 0 1 1-1h2Z" />
                    </svg>
                    Call +91 97253 39233
                  </a>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-xl border border-navy-200 px-6 py-3 text-sm font-600 text-navy-600 transition-colors hover:bg-navy-100 hover:text-navy-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="pr-8">
                  <span className="text-xs font-600 uppercase tracking-[0.22em] text-accent-600">
                    Book an Appointment
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-700 leading-tight text-navy-700">
                    Tell us a little about your requirements
                  </h3>
                  <p className="mt-2 text-sm text-navy-500">
                    Share a few details and a partner will respond personally.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className={labelCls}>
                        Full name
                      </label>
                      <input id="c-name" name="name" required placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className={labelCls}>
                        Phone
                      </label>
                      <input id="c-phone" name="phone" type="tel" placeholder="+91 …" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-email" className={labelCls}>
                      Email
                    </label>
                    <input id="c-email" name="email" type="email" required placeholder="you@company.com" className={inputCls} />
                  </div>

                  <div>
                    <label htmlFor="c-service" className={labelCls}>
                      Service of interest
                    </label>
                    <select id="c-service" name="service" required defaultValue="" className={inputCls}>
                      <option value="" disabled>
                        Select a service…
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-message" className={labelCls}>
                      Message
                    </label>
                    <textarea id="c-message" name="message" rows={3} placeholder="How can we help?" className={`${inputCls} resize-none`} />
                  </div>

                  {status === "error" && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-600 text-white shadow-[0_12px_30px_-14px_rgba(78,167,46,0.6)] transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Request
                        <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none">
                          <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-navy-400">
                    Or email us at{" "}
                    <a href="mailto:office@kapsca.in" className="font-600 text-accent-600 hover:underline">
                      office@kapsca.in
                    </a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
