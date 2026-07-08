"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* — Line icons, one per practice vertical — */
const Icon = {
  audit: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="m9.5 13 1.6 1.6L15 11" />
    </>
  ),
  gst: (
    <>
      <path d="M6 3h9l3 3v15l-2.2-1.4L13.5 21 11 19.6 8.5 21 6 19.6z" />
      <path d="M9 8h6M9 11.5h6" />
    </>
  ),
  direct: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M9.5 12h5M9.5 15.5h5M9.5 8.5h2" />
    </>
  ),
  forensic: (
    <>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 4 4" />
      <path d="M8.5 10.5h4M10.5 8.5v4" />
    </>
  ),
  corporate: (
    <>
      <path d="M4 21h16M6 21V6l7-3v18M18 21v-9l-5-2" />
      <path d="M9 9h1M9 12h1M9 15h1" />
    </>
  ),
  finance: (
    <>
      <path d="M4 21h16M5 21V9l7-4 7 4v12" />
      <path d="M9 21v-5h6v5" />
      <path d="M12 5V3" />
    </>
  ),
};

const SERVICES: {
  no: string;
  title: string;
  tag: string;
  icon: ReactNode;
  points: string[];
}[] = [
  {
    no: "01",
    title: "Audit & Assurance",
    tag: "Risk-based, business-oriented audits",
    icon: Icon.audit,
    points: [
      "Statutory Audit under the Companies Act",
      "Tax Audit u/s 44AB",
      "Bank, branch & concurrent audits",
      "Internal audit frameworks",
    ],
  },
  {
    no: "02",
    title: "Indirect Tax — GST",
    tag: "End-to-end GST practice",
    icon: Icon.gst,
    points: [
      "GSTR-1, 3B, 9 & 9C compliances",
      "ITC reconciliation & due diligence",
      "SCN replies & appellate representation",
      "GST refunds & health-checks",
    ],
  },
  {
    no: "03",
    title: "Direct Taxation",
    tag: "Planning, compliance & litigation",
    icon: Icon.direct,
    points: [
      "Corporate & personal income tax",
      "TDS / TCS compliance",
      "Assessments & appeals",
      "International tax & DTAA advisory",
    ],
  },
  {
    no: "04",
    title: "Forensic Audit",
    tag: "Evidence-driven fraud detection",
    icon: Icon.forensic,
    points: [
      "Vendor & ledger forensic analysis",
      "SAP / ERP data analytics",
      "ITC & input fraud investigations",
      "Expert reports for litigation",
    ],
  },
  {
    no: "05",
    title: "Corporate & Advisory",
    tag: "Strategic & secretarial support",
    icon: Icon.corporate,
    points: [
      "Incorporation & ROC filings",
      "LLP & partnership formation",
      "Insolvency & voluntary liquidation",
      "FEMA & FDI advisory",
    ],
  },
  {
    no: "06",
    title: "Project Finance & CMA",
    tag: "Unlocking capital for growth",
    icon: Icon.finance,
    points: [
      "CMA data preparation",
      "Term loan & working-capital docs",
      "Credit appraisal & viability studies",
      "Restructuring & TEV studies",
    ],
  },
];

export function Services() {
  return (
    <section
      id="services"
      data-section="services"
      className="grain relative overflow-hidden bg-navy-900"
    >
      {/* soft top separation from the light section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-kaps pt-20 pb-6 sm:pt-28 sm:pb-8">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-400">
                What we do
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-700 leading-[1.12] tracking-tight text-white text-balance"
            >
              One professional partner for every regulatory, financial and
              advisory need.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="max-w-sm text-[0.98rem] leading-relaxed text-white/55 lg:pb-1"
          >
            Each partner leads a practice vertical, supported by dedicated
            managers and qualified staff — so you get genuine specialists, not
            generalists.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.no}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-accent-500/40 hover:bg-white/[0.045] sm:p-7"
            >
              {/* top accent line grows on hover */}
              <span className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-accent-500 transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-inset ring-accent-500/20 transition-colors group-hover:bg-accent-500/15">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[22px] w-[22px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </span>
                <span className="font-mono text-sm font-600 text-white/25">
                  {s.no}
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg font-700 text-white">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm font-500 text-accent-400/90">
                {s.tag}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-white/8 pt-5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm leading-snug text-white/60"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
