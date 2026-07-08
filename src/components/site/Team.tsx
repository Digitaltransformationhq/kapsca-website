"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const TEAM = [
  {
    initials: "AP",
    name: "CA. Abhishek Patel",
    creds: "Chartered Accountant",
    focus: "Direct Tax · Income-Tax Litigation · International Tax",
    bio: "Heads direct-tax advisory, assessments and appellate work before CIT(A) and ITAT — advising corporates and HNIs on structuring, DTAA and tax planning.",
  },
  {
    initials: "MP",
    name: "CA. Mayur Patel",
    creds: "Chartered Accountant",
    focus: "Statutory Audit · Internal Audit · Corporate Assurance",
    bio: "Leads the firm's audit and assurance practice, with deep experience in statutory audits, internal-audit design and risk-based audit frameworks across sectors.",
  },
  {
    initials: "BP",
    name: "CA. Brijesh Pitroda",
    creds: "ACA, FAFD, LLB, M.Com",
    focus: "Indirect Tax (GST) · Forensic Audit · Project Finance",
    bio: "12+ years of specialised experience leading the GST and forensic-audit verticals. Treasurer, WIRC — Vadodara Branch (2025–29) and MBA faculty at KPGU.",
  },
  {
    initials: "RR",
    name: "CA. Rohit Ramani",
    creds: "Chartered Accountant",
    focus: "Company Law · Corporate Advisory · Insolvency",
    bio: "Leads the corporate, legal and secretarial practice — ROC / MCA compliance, commercial agreements, IBC Section 59 voluntary liquidations and FEMA advisory.",
  },
  {
    initials: "MS",
    name: "CA. Mukesh Suthar",
    creds: "Chartered Accountant",
    focus: "Bank Audit · Concurrent Audit · Credit Appraisal",
    bio: "Leads bank-branch audits, concurrent audits and credit-appraisal work, with deep familiarity across nationalised and private bank processes and RBI norms.",
  },
  {
    initials: "AK",
    name: "CA. Ajay Kapdi",
    creds: "Chartered Accountant",
    focus: "Management Advisory · MIS & Accounting Systems",
    bio: "Leads management advisory, outsourced accounting and MIS — designing internal reporting systems and robust month-end close frameworks for SMEs.",
  },
];

export function Team() {
  return (
    <section id="team" data-section="team" className="relative bg-cloud">
      <div className="container-kaps pt-20 pb-6 sm:pt-28 sm:pb-8">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-600">
                The Partners
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-700 leading-[1.12] tracking-tight text-navy-700 text-balance"
            >
              Six specialists. One partner-led firm.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="max-w-sm text-[0.98rem] leading-relaxed text-navy-500 lg:pb-1"
          >
            KAPS &amp; Co. is a partnership of six Chartered Accountants, each
            leading a practice vertical — so every engagement is supervised,
            start to finish, by a partner.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.initials}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
              className="group rounded-2xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:border-accent-400/60 hover:shadow-[0_24px_50px_-30px_rgba(10,23,40,0.35)] sm:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-700 font-display text-lg font-700 text-white ring-2 ring-inset ring-accent-500/30 transition-transform duration-300 group-hover:scale-105">
                  {m.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.05rem] font-700 leading-tight text-navy-700">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-xs font-600 text-accent-600">
                    {m.creds}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-navy-100 pt-4">
                <p className="mb-1.5 text-[10.5px] font-600 uppercase tracking-[0.16em] text-navy-400">
                  Focus
                </p>
                <p className="text-sm font-600 text-navy-600">{m.focus}</p>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  {m.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
