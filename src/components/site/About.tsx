"use client";

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

const CREDENTIALS: { k: string; v: string; wide?: boolean }[] = [
  { k: "Legal Status", v: "Partnership Firm" },
  { k: "Firm Reg. No.", v: "156667W" },
  { k: "GSTIN", v: "24AAYFK1347G1Z4" },
  { k: "PAN", v: "AAYFK1347G" },
  { k: "Head Office", v: "Trivia Complex, Race Course Road, Vadodara – 390 007", wide: true },
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
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-navy-900/10 bg-navy-800 p-7 ring-1 ring-inset ring-white/5 sm:p-8">
              {/* Masthead — seal + title */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-500/40">
                  <span className="absolute inset-1 rounded-full border border-dashed border-white/15" />
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path
                      d="M12 3l7 3v5c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6l7-3z"
                      stroke="#4ea72e"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="#ffffff"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-700 leading-tight text-white">
                    Firm Credentials
                  </h3>
                  <p className="mt-0.5 text-xs font-500 text-white/45">
                    Registered with the ICAI · FRN 156667W
                  </p>
                </div>
              </div>

              {/* Ledger — dotted-leader rows, official registration numbers */}
              <dl className="mt-6 space-y-0.5">
                {CREDENTIALS.filter((r) => !r.wide).map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline gap-3 py-2.5"
                  >
                    <dt className="shrink-0 text-sm text-white/50">{row.k}</dt>
                    <span className="mb-1 min-w-6 flex-1 border-b border-dotted border-white/20" />
                    <dd className="shrink-0 font-mono text-sm tracking-tight text-white">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Head office — full width */}
              {CREDENTIALS.filter((r) => r.wide).map((row) => (
                <div key={row.k} className="mt-4 border-t border-white/10 pt-4">
                  <dt className="text-sm text-white/50">{row.k}</dt>
                  <dd className="mt-1 text-sm leading-snug text-white">
                    {row.v}
                  </dd>
                </div>
              ))}

              {/* Footer — restrained CTA */}
              <a
                href="#contact"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-600 text-accent-400 transition-colors hover:text-accent-300"
              >
                Talk to a partner
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
