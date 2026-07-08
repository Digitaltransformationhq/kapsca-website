"use client";

import { motion } from "motion/react";
import { Logo } from "./Logo";
import { useScrollNav } from "./scroll-nav";

const ease = [0.16, 1, 0.3, 1] as const;

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const ADDRESS = "Trivia Complex, Race Course Road, Vadodara, Gujarat 390007";
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=15&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;

const FOOTER_LINKS = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

export function Contact() {
  const { go } = useScrollNav();

  return (
    <section
      id="contact"
      data-section="contact"
      className="grain relative flex min-h-[100svh] flex-col bg-navy-950"
    >
      {/* soft brand wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_0%,rgba(78,167,46,0.12),transparent_60%)]" />

      <div className="container-kaps relative flex flex-1 flex-col justify-center pt-28 pb-16 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- Left: message + actions ---------- */}
          <div className="flex flex-col justify-center">
            <motion.div
              {...rise}
              transition={{ duration: 0.7, ease }}
              className="mb-5 inline-flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-400">
                Get in touch
              </span>
            </motion.div>

            <motion.h2
              {...rise}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="font-display text-[clamp(2rem,4vw,3.1rem)] font-700 leading-[1.08] tracking-tight text-white text-balance"
            >
              Let&apos;s talk about what your business needs.
            </motion.h2>

            <motion.p
              {...rise}
              transition={{ duration: 0.8, delay: 0.12, ease }}
              className="mt-6 max-w-md text-lg leading-relaxed text-white/60"
            >
              We&apos;d welcome the opportunity to understand your requirements
              and show how our team can add value. Reach out — a partner will
              respond personally.
            </motion.p>

            <motion.div
              {...rise}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="mailto:office@kapsca.in?subject=Consultation%20Request"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-600 text-white shadow-[0_12px_30px_-14px_rgba(78,167,46,0.6)] transition-all hover:bg-accent-600"
              >
                Book a Consultation
                <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none">
                  <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

            {/* Secondary contacts — editorial inline, not a card */}
            <motion.div
              {...rise}
              transition={{ duration: 0.8, delay: 0.28, ease }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-7 text-sm"
            >
              <span className="flex flex-col">
                <span className="text-[11px] font-600 uppercase tracking-[0.16em] text-white/40">
                  Email
                </span>
                <a href="mailto:office@kapsca.in" className="mt-1 font-500 text-white transition-colors hover:text-accent-400">
                  office@kapsca.in
                </a>
              </span>
              <span className="flex flex-col">
                <span className="text-[11px] font-600 uppercase tracking-[0.16em] text-white/40">
                  Website
                </span>
                <a href="https://www.kapsca.in" className="mt-1 font-500 text-white transition-colors hover:text-accent-400">
                  www.kapsca.in
                </a>
              </span>
              <span className="flex flex-col">
                <span className="text-[11px] font-600 uppercase tracking-[0.16em] text-white/40">
                  GSTIN
                </span>
                <span className="mt-1 font-mono text-[0.9rem] font-500 text-white">
                  24AAYFK1347G1Z4
                </span>
              </span>
            </motion.div>
          </div>

          {/* ---------- Right: office location + map ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
          >
            {/* Map */}
            <div className="relative aspect-[16/11] w-full bg-navy-900">
              <iframe
                title="KAPS & Co. — Head Office, Vadodara"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full [filter:grayscale(0.25)_contrast(0.95)_brightness(0.95)]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-950/70 to-transparent" />
            </div>

            {/* Address + directions */}
            <div className="p-6 sm:p-7">
              <p className="text-[11px] font-600 uppercase tracking-[0.2em] text-accent-400">
                Head Office · Vadodara
              </p>
              <p className="mt-2.5 text-[1.02rem] leading-relaxed text-white">
                323–324, Trivia Complex, Race Course Road,
                <br className="hidden sm:block" /> Vadodara – 390 007, Gujarat,
                India
              </p>
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-600 text-white transition-colors hover:bg-white/[0.16]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent-400" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.2" />
                </svg>
                Get Directions
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none">
                  <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="relative border-t border-white/10">
        <div className="container-kaps py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-4 text-sm leading-relaxed text-white/45">
                Integrity beyond numbers — a partner-led firm of Chartered
                Accountants in Vadodara, Gujarat.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-sm font-500 text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 KAPS &amp; Co., Chartered Accountants · FRN 156667W · GSTIN
              24AAYFK1347G1Z4
            </p>
            <p>Vadodara · Gujarat · India</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
