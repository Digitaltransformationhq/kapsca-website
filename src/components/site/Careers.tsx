"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ApplyModal } from "./ApplyModal";

const ease = [0.16, 1, 0.3, 1] as const;

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const EMAIL = "office@kapsca.in";

const EXPECT = [
  "Live client files from week one — audits, returns and assessments, not busywork.",
  "Every deliverable reviewed by the partner leading the vertical.",
  "Rotation across audit, direct tax, GST and forensic.",
  "Study leave and coaching support through your CA exams.",
];

const OPENINGS: { role: string; type: string; detail: string }[] = [
  {
    role: "Article Assistant",
    type: "Articleship",
    detail: "CA Intermediate cleared — one or both groups.",
  },
  {
    role: "Qualified Chartered Accountant",
    type: "Full-time",
    detail: "0–3 years, across any practice vertical.",
  },
  {
    role: "Semi-Qualified Assistant",
    type: "Full-time",
    detail: "CA Inter with articleship completed.",
  },
  {
    role: "Accounts & Audit Intern",
    type: "Internship",
    detail: "B.Com / M.Com — 3 to 6 months.",
  },
];

export function Careers() {
  // The role whose apply dialog is open, or null when closed.
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  return (
    <section
      id="careers"
      data-section="careers"
      className="relative bg-navy-900"
    >
      {/* hairline separation from the light section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-kaps pt-28 pb-6 sm:pt-40 sm:pb-8">
        {/* ---------- Header ---------- */}
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-400">
                Careers
              </span>
            </div>
            <motion.h2
              {...rise}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-700 leading-[1.12] tracking-tight text-white text-balance"
            >
              Learn the profession the way it should be learned.
            </motion.h2>
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <div className="mt-14 grid gap-x-16 gap-y-12 sm:mt-16 lg:grid-cols-12">
          {/* Left: what to expect */}
          <motion.div
            {...rise}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-600 uppercase tracking-[0.2em] text-white/40">
              What to expect
            </p>
            <ul className="mt-6">
              {EXPECT.map((point, i) => (
                <li
                  key={point}
                  className="flex gap-5 border-t border-white/10 py-4 first:border-t-0 first:pt-0"
                >
                  <span className="font-display text-sm font-700 tabular-nums text-accent-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.95rem] leading-relaxed text-white/70">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: open positions */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="lg:col-span-7"
          >
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-600 uppercase tracking-[0.2em] text-white/40">
                Open positions
              </p>
              <span className="text-xs font-500 text-white/30">
                {OPENINGS.length} roles
              </span>
            </div>

            <ul className="mt-6 border-t border-white/10">
              {OPENINGS.map((o) => (
                <li key={o.role}>
                  <button
                    onClick={() => setApplyingTo(o.role)}
                    className="group flex w-full items-center gap-6 border-b border-white/10 py-5 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg font-700 tracking-tight text-white">
                          {o.role}
                        </h3>
                        <span className="text-[11px] font-600 uppercase tracking-[0.14em] text-accent-400">
                          {o.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">
                        {o.detail}
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 shrink-0 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-accent-400"
                      fill="none"
                    >
                      <path
                        d="M3 8h9M8 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-white/45">
              Don&apos;t see a fit? Send your CV to{" "}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Career opportunity — CV",
                )}`}
                className="font-600 text-accent-300 hover:underline"
              >
                {EMAIL}
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>

      <ApplyModal role={applyingTo} onClose={() => setApplyingTo(null)} />
    </section>
  );
}
