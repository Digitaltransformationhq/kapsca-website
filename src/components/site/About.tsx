"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const PRACTICE = [
  "GST & Indirect Tax",
  "Direct Taxation",
  "Forensic Audit",
  "Statutory & Internal Audit",
  "Insolvency & Liquidation",
  "Company Secretarial",
  "Project Finance",
  "Management Advisory",
];

const ICONS: Record<string, ReactNode> = {
  partner: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 11.5l2 2 3.5-3.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  bond: (
    <>
      <path d="M9 12h6" />
      <path d="M10 8H8a4 4 0 0 0 0 8h2" />
      <path d="M14 16h2a4 4 0 0 0 0-8h-2" />
    </>
  ),
  window: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9h17M9 20.5v-11" />
    </>
  ),
};

const WHY_US: { icon: string; title: string; desc: string }[] = [
  {
    icon: "partner",
    title: "Partner-led, always",
    desc: "Every engagement is supervised start to finish by a partner — never delegated away.",
  },
  {
    icon: "clock",
    title: "Deadlines honoured",
    desc: "Statutory and client deadlines are treated as inviolable commitments.",
  },
  {
    icon: "bond",
    title: "Built to last",
    desc: "Many clients have stayed with our partners for more than a decade.",
  },
  {
    icon: "window",
    title: "A single window",
    desc: "Assurance, tax, forensic and advisory — all under one roof.",
  },
];

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function About() {
  return (
    <section id="about" data-section="about" className="relative bg-cloud">
      <div className="container-kaps pt-20 pb-6 sm:pt-28 sm:pb-8">
        {/* ---------- Header ---------- */}
        <motion.div
          {...rise}
          transition={{ duration: 0.7, ease }}
          className="mb-5 inline-flex items-center gap-3"
        >
          <span className="h-px w-8 bg-accent-500" />
          <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-600">
            About the Firm
          </span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ---------- Left: narrative ---------- */}
          <div className="lg:col-span-7">
            <motion.h2
              {...rise}
              transition={{ duration: 0.8, delay: 0.04, ease }}
              className="max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-700 leading-[1.12] tracking-tight text-navy-700 text-balance"
            >
              A partner-led practice, built on integrity.
            </motion.h2>

            <motion.p
              {...rise}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-navy-500"
            >
              KAPS &amp; Co. is a progressive firm of Chartered Accountants in
              Vadodara, Gujarat — a single-window partner for assurance,
              taxation, forensic and advisory needs, serving domestic and
              international clients of every size.
            </motion.p>

            <motion.p
              {...rise}
              transition={{ duration: 0.8, delay: 0.16, ease }}
              className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-navy-500"
            >
              Every engagement runs under direct partner supervision — the depth
              of a large firm with the care and responsiveness of a boutique.
            </motion.p>

            {/* Practice areas */}
            <motion.div
              {...rise}
              transition={{ duration: 0.8, delay: 0.22, ease }}
              className="mt-9"
            >
              <p className="mb-3 text-xs font-600 uppercase tracking-[0.2em] text-navy-400">
                Practice areas
              </p>
              <div className="flex flex-wrap gap-2">
                {PRACTICE.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-navy-200/70 bg-white px-3.5 py-1.5 text-sm font-500 text-navy-600 transition-colors hover:border-accent-400 hover:text-navy-700"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              {...rise}
              transition={{ duration: 0.8, delay: 0.28, ease }}
              className="mt-10 flex items-center gap-4 border-l-2 border-accent-500 pl-5"
            >
              <p className="font-display text-lg font-600 italic tracking-tight text-navy-700">
                &ldquo;Integrity beyond numbers.&rdquo;
              </p>
            </motion.blockquote>
          </div>

          {/* ---------- Right: credentials record ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="lg:col-span-5 lg:self-start"
          >
            <div className="glow-border relative overflow-hidden rounded-2xl bg-navy-800 p-6 sm:p-7">
              {/* soft corner light */}
              <span className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent-500/10 blur-3xl" />

              {/* Header */}
              <div className="relative flex items-center gap-3">
                <span className="h-px w-7 bg-accent-500" />
                <h3 className="font-display text-lg font-700 leading-tight text-white">
                  Why firms choose us
                </h3>
              </div>
              <p className="relative mt-2 text-sm font-500 text-white/45">
                The difference a partner-led firm makes.
              </p>

              {/* Pillars — bare icons, hairline-separated rows */}
              <ul className="relative mt-3">
                {WHY_US.map((w) => (
                  <li
                    key={w.title}
                    className="group/w flex gap-4 border-t border-white/[0.07] py-3.5 first:border-t-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-[26px] w-[26px] shrink-0 text-accent-400 transition-[transform,color,filter] duration-300 group-hover/w:-translate-y-0.5 group-hover/w:text-accent-300 group-hover/w:[filter:drop-shadow(0_3px_10px_rgba(78,167,46,0.55))]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {ICONS[w.icon]}
                    </svg>
                    <div>
                      <p className="font-display text-[15px] font-700 tracking-tight text-white">
                        {w.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/55">
                        {w.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
