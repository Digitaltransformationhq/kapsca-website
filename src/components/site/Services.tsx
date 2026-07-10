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
  cfo: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
      <path d="m7 12 2.5-2.5L12 12l3.5-4" />
    </>
  ),
  transaction: (
    <>
      <path d="M7 8h10M17 8l-3-3M17 8l-3 3" />
      <path d="M17 16H7M7 16l3-3M7 16l3 3" />
    </>
  ),
  succession: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M12 7v3M6 16v-3h12v3" />
    </>
  ),
  wealth: (
    <>
      <ellipse cx="12" cy="6" rx="6" ry="2.4" />
      <path d="M6 6v5c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V6" />
      <path d="M6 11v5c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4v-5" />
    </>
  ),
  ai: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 10h4v4h-4z" />
      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
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
  {
    no: "07",
    title: "Virtual CFO Services",
    tag: "Finance leadership, on demand",
    icon: Icon.cfo,
    points: [
      "MIS, budgeting & cash-flow control",
      "Board & investor reporting",
      "Financial controls & process design",
      "Fund-raise & lender liaison",
    ],
  },
  {
    no: "08",
    title: "Transaction Advisory",
    tag: "Deals, diligence & valuations",
    icon: Icon.transaction,
    points: [
      "Buy-side & sell-side due diligence",
      "Business & share valuations",
      "M&A structuring & negotiation",
      "Deal documentation support",
    ],
  },
  {
    no: "09",
    title: "Succession Planning",
    tag: "Continuity across generations",
    icon: Icon.succession,
    points: [
      "Family & business governance",
      "Ownership & management transition",
      "Wills, trusts & estate structuring",
      "Family constitution & charters",
    ],
  },
  {
    no: "10",
    title: "Wealth Advisory",
    tag: "Preserving & growing capital",
    icon: Icon.wealth,
    points: [
      "Portfolio & asset-allocation review",
      "Tax-efficient investment structuring",
      "Estate & inheritance planning",
      "Risk & insurance advisory",
    ],
  },
  {
    no: "11",
    title: "AI Transformation",
    tag: "Future-ready finance & compliance",
    icon: Icon.ai,
    points: [
      "Finance automation & RPA",
      "AI-driven analytics & dashboards",
      "Data-driven audit & reconciliation",
      "Digital compliance workflows",
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
      {/* ambient brand lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_0%,rgba(78,167,46,0.07),transparent_55%)]" />

      <div className="container-kaps pt-28 pb-6 sm:pt-40 sm:pb-8">
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
        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.no}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
              className="glow-border group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-6 transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_0_34px_-6px_rgba(78,167,46,0.4),0_34px_60px_-30px_rgba(0,0,0,0.72)] sm:p-7"
            >
              {/* oversized ghost index */}
              <span className="pointer-events-none absolute -top-6 right-2 select-none font-display text-[7rem] font-800 leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-accent-500/[0.08]">
                {s.no}
              </span>

              {/* icon — bare line mark */}
              <svg
                viewBox="0 0 24 24"
                className="relative h-9 w-9 text-accent-400 transition-all duration-500 group-hover:text-accent-300 group-hover:[filter:drop-shadow(0_4px_12px_rgba(78,167,46,0.55))]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {s.icon}
              </svg>

              <h3 className="relative mt-6 font-display text-xl font-700 tracking-tight text-white">
                {s.title}
              </h3>
              <p className="relative mt-1 text-[13px] font-500 text-accent-400/90">
                {s.tag}
              </p>

              <ul className="relative mt-6 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-[13.5px] leading-snug text-white/55"
                  >
                    <span className="mt-2 h-px w-3.5 shrink-0 bg-accent-500/70 transition-all duration-300 group-hover:w-5 group-hover:bg-accent-400" />
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
