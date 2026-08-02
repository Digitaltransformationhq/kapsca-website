"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Globe } from "./Globe";

const ease = [0.16, 1, 0.3, 1] as const;

const TEAM = [
  {
    initials: "AP",
    name: "CA. Abhishek Patel",
    tag: "Direct Tax & Cross-Border Advisory",
    desc: "FCA, B.Com., Diploma in International Taxation, Certificate in FAFD & AI. Leads the firm's Direct Tax and Cross-Border Advisory practice, DTAA, FEMA and Litigation & Representation before tax authorities, CIT(A) and ITAT.",
    photo: "/team/abhishek-patel.jpg",
  },
  {
    initials: "MP",
    name: "CA. Mayur Patel",
    tag: "Institutional & Social Sector Advisory",
    desc: "ACA, M.Com. Leads the firm's practice on advising trusts, cooperative societies, government bodies and not-for-profit organizations on governance, regulatory compliance institutional development.",
    photo: "/team/mayur-patel.jpg",
  },
  {
    initials: "BP",
    name: "CA. Brijesh Pitroda",
    tag: "Indirect Tax, Forensics & Business Management",
    desc: "FCA, LL.B., M.Com., Certified in AI & Financial Accounting and Fraud Detection (FAFD). Treasurer, Vadodara Branch of ICAI. Leads the firm's GST & Litigation Practices, Forensics, Business Management and Project Execution practices.",
    photo: "/team/brijesh-pitroda.jpg",
  },
  {
    initials: "RR",
    name: "CA. Rohit Ramani",
    tag: "Audit & Assurance",
    desc: "ACA, B.Com. Leads the firm's Audit & Assurance practice, delivering statutory audit, internal audit, business valuation, due diligence, risk assurance and financial reporting solutions that strengthen governance, regulatory compliance and business confidence.",
    photo: "/team/rohit-ramani.jpg",
  },
  {
    initials: "MS",
    name: "CA. Mukesh Suthar",
    tag: "Bank Audit, Concurrent Audit, Stock Audit & Credit Appraisal",
    desc: "FCA, B.Com (Honors). Leads bank branch audits, concurrent audits and credit-appraisal work. Deep familiarity with nationalised and private bank processes, stock audits and RBI borrower-monitoring norms.",
    photo: "/team/mukesh-suthar.jpg",
  },
  {
    initials: "AK",
    name: "CA. Ajay Kapdi",
    tag: "Financial Management & Accounting — IFRS & Ind AS",
    desc: "ACA, M.Com. Leads the firm's practice in delivering finance & accounting outsourcing, financial reporting, Ind AS advisory, virtual accounting and business process solutions for domestic and international clients.",
    photo: "/team/ajay-kapdi.jpg",
  },
];

// Associates / team members below the partners. TODO: copy to be supplied.
const ASSOCIATES = [
  {
    initials: "KS",
    name: "CA. Kush Shah",
    tag: "Startups & Virtual CFO",
    desc: "FCA, B.Com. Leads the firm's Virtual CFO practice, helping startups and growing businesses strengthen financial strategy, cash flow, budgeting, MIS reporting and business performance for sustainable growth.",
    photo: "/team/kush-shah.jpeg",
  },
  {
    initials: "KP",
    name: "Karishma Pitroda",
    tag: "Corporate Relations & Talent Management",
    desc: "An MBA and Certified Digital Marketer, drives corporate relations and brand strategy. Experienced in streamlining day-to-day business operations and building robust human capital frameworks that support long-term operational excellence.",
    photo: "/team/karishma-pitroda.jpeg",
  },
  {
    initials: "AR",
    name: "Ankit Rudani",
    tag: "Loan Syndication & Market Intel",
    desc: "Master in Commerce. Leads loan syndication and government subsidy frameworks. Data-backed market research and financial analysis that optimise capital structuring and maximise fiscal incentives for clients.",
    photo: "/team/ankit-rudani.jpeg",
  },
  {
    initials: "JP",
    name: "Jay Pitroda",
    tag: "Cyber Security & Digital Trust",
    desc: "B.E. Information Technology. Leads Cybersecurity and IS Audits, RPA, AI & Digital Transformation in Business, and Digital Personal Data Protection Act, 2023 (DPDP Act) consultancy, building secure, efficient and reliable operations.",
    photo: "/team/jay-pitroda.jpeg",
  },
];

type Member = (typeof TEAM)[number];

// Per-photo crop tuning (object-position) so faces sit centred in the card.
const POS: Record<string, string> = {
  AP: "38% 30%",
  BP: "38% 30%",
};

function TeamCard({
  m,
  i,
  compact = false,
}: {
  m: Member;
  i: number;
  // `compact` shrinks the card so all six partners fit on a single row.
  compact?: boolean;
}) {
  const [ok, setOk] = useState(true);
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (i % (compact ? 6 : 3)) * 0.06,
        ease,
      }}
      // Desktop: flip on hover. Touch: flip on tap (no hover to rely on).
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      onClick={() => {
        if (window.matchMedia("(hover: none)").matches) setFlipped((f) => !f);
      }}
      role="button"
      tabIndex={0}
      aria-label={`${m.name} — ${m.tag}. Tap for details.`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      className={`group w-full cursor-pointer select-none [perspective:1400px] ${
        // Compact cards run taller so the larger back-face type still fits.
        compact ? "aspect-[4/5.4] max-w-[190px]" : "aspect-[4/5] max-w-[290px]"
      }`}
    >
      <div
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        className="relative h-full w-full transition-transform duration-[1200ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* ---------- Front: photo ---------- */}
        <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-navy-800 shadow-[0_24px_50px_-34px_rgba(10,23,40,0.5)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          {ok ? (
            <Image
              src={m.photo}
              alt={m.name}
              fill
              sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
              className="object-cover"
              style={{ objectPosition: POS[m.initials] ?? "50% 50%" }}
              onError={() => setOk(false)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-600 to-navy-900">
              <span className="font-display text-5xl font-800 text-white/90">
                {m.initials}
              </span>
            </div>
          )}

          {/* name overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent ${
              compact ? "p-3 pt-12" : "p-4 pt-16"
            }`}
          >
            <h3
              className={`font-display leading-tight text-white ${
                compact ? "font-800 text-[0.85rem]" : "font-700 text-base"
              }`}
            >
              {m.name}
            </h3>
          </div>
        </div>

        {/* ---------- Back: details ---------- */}
        <div
          className={`absolute inset-0 flex flex-col justify-center rounded-[22px] ring-1 ring-inset shadow-[0_24px_50px_-34px_rgba(10,23,40,0.5)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            compact
              ? "bg-white p-3.5 ring-navy-700/10"
              : "bg-navy-800 p-7 ring-white/10"
          }`}
        >
          <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-500/15 blur-2xl" />
          <div className="relative">
            <span
              className={`block h-px w-8 bg-accent-500 ${compact ? "mb-2.5" : "mb-4"}`}
            />
            {/* Partner cards drop the name here — it already sits on the photo. */}
            {!compact && (
              <h3 className="font-display text-lg font-700 leading-tight text-white">
                {m.name}
              </h3>
            )}
            <p
              className={`uppercase ${
                compact
                  ? "font-extrabold text-[9.5px] leading-[1.35] tracking-[0.1em] text-accent-700"
                  : "mt-1.5 font-600 text-[11px] tracking-[0.16em] text-accent-300"
              }`}
            >
              {m.tag}
            </p>
            <p
              className={`${
                compact
                  ? "mt-2 text-justify hyphens-none text-[11px] leading-[1.5] text-navy-600"
                  : "mt-4 text-sm leading-relaxed text-white/65"
              }`}
            >
              {m.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Team() {
  return (
    <section id="team" data-section="team" className="relative bg-navy-900">
      <div className="container-kaps pt-24 pb-6 sm:pt-32 sm:pb-8">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-300">
                The Partners
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-700 leading-[1.12] tracking-tight text-white text-balance"
            >
              Partner-Led. Multidisciplinary. Globally Minded.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="max-w-lg text-justify hyphens-none text-[0.98rem] leading-relaxed text-white/70 lg:pb-1"
          >
            <span className="tracking-[0.2em]">KAPS</span> &amp; Co. is a
            multidisciplinary professional services firm led by experienced
            Chartered Accountants. Every engagement is personally overseen by a
            partner, combining deep technical expertise, commercial insight and
            technology-driven innovation.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-9 grid grid-cols-2 justify-items-center gap-x-5 gap-y-10 sm:mt-10 sm:grid-cols-3 lg:grid-cols-6">
          {TEAM.map((m, i) => (
            <TeamCard key={m.initials} m={m} i={i} compact />
          ))}
        </div>
      </div>

      {/* ---------- Associates — its own full-height page ---------- */}
      <div className="container-kaps flex min-h-svh flex-col justify-center border-t border-white/10 py-16">
        {/* Heading + globe sit left, the intro and four cards run along the right. */}
        <div className="grid gap-10 xl:grid-cols-[1fr_auto] xl:items-start xl:gap-12">
          <div className="max-w-lg">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-300">
                Leadership Team
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(1.6rem,2.3vw,2.1rem)] font-700 leading-[1.14] tracking-tight text-white text-balance"
            >
              Experienced Leaders. Shared Vision.
            </motion.h2>

            {/* Fills the empty band under the heading on wide screens. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.15, ease }}
              className="mt-8 hidden w-full max-w-[320px] xl:block"
            >
              <Globe />
            </motion.div>
          </div>

          {/* Right column: intro sits directly over the row of four, so the
              cards ride up level with the globe instead of leaving a band. */}
          <div className="flex flex-col gap-10 xl:relative xl:top-12">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="max-w-lg text-justify hyphens-none text-[0.98rem] leading-relaxed text-white/70"
            >
              Our professionals bring together deep technical knowledge,
              commercial insight and sector experience to help clients navigate
              complexity, manage risk and achieve sustainable growth.
            </motion.p>

            <div className="grid grid-cols-2 justify-items-center gap-5 sm:grid-cols-4 xl:grid-cols-[repeat(4,190px)]">
              {ASSOCIATES.map((m, i) => (
                <TeamCard key={m.initials} m={m} i={i} compact />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
