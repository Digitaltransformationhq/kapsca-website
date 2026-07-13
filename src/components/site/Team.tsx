"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const TEAM = [
  {
    initials: "AP",
    name: "CA. Abhishek Patel",
    tag: "Direct Tax",
    desc: "Leads direct-tax advisory, assessments and appellate work before CIT(A) and ITAT.",
    photo: "/team/abhishek-patel.jpg",
  },
  {
    initials: "MP",
    name: "CA. Mayur Patel",
    tag: "Audit",
    desc: "Leads the firm's statutory, internal and risk-based audit practice.",
    photo: "/team/mayur-patel.jpg",
  },
  {
    initials: "BP",
    name: "CA. Brijesh Pitroda",
    tag: "GST · Forensic",
    desc: "12+ years leading GST, forensic audit and project finance. ACA, FAFD, LLB, M.Com.",
    photo: "/team/brijesh-pitroda.jpg",
  },
  {
    initials: "RR",
    name: "CA. Rohit Ramani",
    tag: "Corporate Law",
    desc: "Leads company law, corporate advisory, insolvency and FEMA matters.",
    photo: "/team/rohit-ramani.jpg",
  },
  {
    initials: "MS",
    name: "CA. Mukesh Suthar",
    tag: "Bank Audit",
    desc: "Leads bank branch audits, concurrent audits and credit-appraisal work.",
    photo: "/team/mukesh-suthar.jpg",
  },
  {
    initials: "AK",
    name: "CA. Ajay Kapdi",
    tag: "Advisory",
    desc: "Leads management advisory, outsourced accounting and MIS systems.",
    photo: "/team/ajay-kapdi.jpg",
  },
];

// Associates / team members below the partners. TODO: copy to be supplied.
const ASSOCIATES = [
  {
    initials: "KS",
    name: "CA. Kush Shah",
    tag: "—",
    desc: "Profile coming soon.",
    photo: "/team/kush-shah.jpeg",
  },
  {
    initials: "KP",
    name: "Karishma Pitroda, MBA",
    tag: "—",
    desc: "Profile coming soon.",
    photo: "/team/karishma-pitroda.jpeg",
  },
  {
    initials: "AR",
    name: "CA. Ankit Rudani",
    tag: "—",
    desc: "Profile coming soon.",
    photo: "/team/ankit-rudani.jpeg",
  },
  {
    initials: "JP",
    name: "Jay Pitroda",
    tag: "—",
    desc: "Profile coming soon.",
    photo: "/team/jay-pitroda.jpeg",
  },
];

type Member = (typeof TEAM)[number];

// Per-photo crop tuning (object-position) so faces sit centred in the card.
const POS: Record<string, string> = {
  AP: "38% 30%",
  BP: "38% 30%",
};

function TeamCard({ m, i }: { m: Member; i: number }) {
  const [ok, setOk] = useState(true);
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
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
      className="group aspect-[4/5] w-full max-w-[290px] cursor-pointer select-none [perspective:1400px]"
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
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent p-4 pt-16">
            <h3 className="font-display text-base font-700 leading-tight text-white">
              {m.name}
            </h3>
          </div>
        </div>

        {/* ---------- Back: details ---------- */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-[22px] bg-navy-800 p-7 ring-1 ring-inset ring-white/10 shadow-[0_24px_50px_-34px_rgba(10,23,40,0.5)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-500/15 blur-2xl" />
          <div className="relative">
            <span className="mb-4 block h-px w-8 bg-accent-500" />
            <h3 className="font-display text-lg font-700 leading-tight text-white">
              {m.name}
            </h3>
            <p className="mt-1.5 text-[11px] font-600 uppercase tracking-[0.16em] text-accent-300">
              {m.tag}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{m.desc}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Team() {
  return (
    <section id="team" data-section="team" className="relative bg-cloud">
      <div className="container-kaps pt-28 pb-6 sm:pt-40 sm:pb-8">
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
            <span className="tracking-[0.2em]">KAPS</span> &amp; Co. is a
            partnership of six Chartered Accountants, each leading a practice
            vertical — so every engagement is supervised, start to finish, by a
            partner.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-14 grid grid-cols-1 justify-items-center gap-14 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <TeamCard key={m.initials} m={m} i={i} />
          ))}
        </div>

        {/* ---------- Associates ---------- */}
        <div className="mt-12 border-t border-navy-700/10 pt-9 sm:mt-14 sm:pt-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-600">
                Leadership Team
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-700 leading-[1.12] tracking-tight text-navy-700 text-balance"
            >
              The people behind every engagement.
            </motion.h2>
          </div>

          <div className="mx-auto mt-12 grid grid-cols-1 justify-items-center gap-14 sm:grid-cols-2 lg:grid-cols-4">
            {ASSOCIATES.map((m, i) => (
              <TeamCard key={m.initials} m={m} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
