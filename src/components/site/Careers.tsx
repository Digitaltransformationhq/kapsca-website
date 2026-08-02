"use client";

import { useState } from "react";
import Image from "next/image";
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
  "Every deliverable reviewed by the partner leading the vertical.",
  "Rotation across audit, direct tax, GST and forensic.",
  "Study leave and coaching support through your CA exams.",
];

const OPENINGS: { role: string; type: string; detail: string }[] = [
  {
    role: "Article Assistant",
    type: "Articleship",
    detail: "CA / CS / CWA — Intermediate cleared, one or both groups.",
  },
  {
    role: "Accounts & Audit Intern",
    type: "Internship",
    detail: "B.Com / M.Com / MBA — 3 to 6 months.",
  },
];

export function Careers() {
  // The role whose apply dialog is open, or null when closed.
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  return (
    <section
      id="careers"
      data-section="careers"
      className="relative flex min-h-svh flex-col justify-center bg-white"
    >
      {/* hairline separation from the section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-900/10 to-transparent" />

      <div className="container-kaps relative pt-24 pb-10 sm:pt-28">
        {/* Nest mark beside the tagline. Absolutely placed so it decorates the
            header band without adding height to the one-screen layout. The PNG
            has an opaque grey backdrop, so it is inverted, multiplied into the
            white page and faded at the edges with a radial mask. */}
        <Image
          src="/Nest.png"
          alt=""
          aria-hidden
          width={1536}
          height={1024}
          className="pointer-events-none absolute right-0 top-28 hidden h-auto w-[clamp(220px,24vw,400px)] select-none opacity-20 mix-blend-multiply invert [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_70%)] lg:block"
        />

        {/* ---------- Header ---------- */}
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-600">
                Careers
              </span>
            </div>
            <motion.h2
              {...rise}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-700 leading-[1.12] tracking-tight text-navy-700 text-balance"
            >
              Learn the profession the way it should be learned.
            </motion.h2>
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <div className="mt-10 grid gap-x-16 gap-y-10 sm:mt-12 lg:grid-cols-12">
          {/* Left: what to expect */}
          <motion.div
            {...rise}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-600 uppercase tracking-[0.2em] text-navy-400">
              What to expect
            </p>
            <ul className="mt-5">
              {EXPECT.map((point, i) => (
                <li
                  key={point}
                  className="flex gap-5 border-t border-navy-700/10 py-3.5 first:border-t-0 first:pt-0"
                >
                  <span className="font-display text-sm font-700 tabular-nums text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.95rem] leading-relaxed text-navy-500">
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
              <p className="text-xs font-600 uppercase tracking-[0.2em] text-navy-400">
                Open positions
              </p>
              <span className="text-xs font-500 text-navy-300">
                {OPENINGS.length} roles
              </span>
            </div>

            <ul className="mt-5 border-t border-navy-700/10">
              {OPENINGS.map((o) => (
                <li key={o.role}>
                  <button
                    onClick={() => setApplyingTo(o.role)}
                    className="group flex w-full items-center gap-6 border-b border-navy-700/10 py-4 text-left transition-colors hover:bg-navy-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg font-700 tracking-tight text-navy-700">
                          {o.role}
                        </h3>
                        <span className="text-[11px] font-600 uppercase tracking-[0.14em] text-accent-600">
                          {o.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-navy-400">
                        {o.detail}
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 shrink-0 text-navy-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600"
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

            <p className="mt-5 text-sm text-navy-400">
              Don&apos;t see a fit? Send your CV to{" "}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Career opportunity — CV",
                )}`}
                className="font-600 text-accent-700 hover:underline"
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
