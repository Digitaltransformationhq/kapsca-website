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

      <div className="container-kaps relative flex flex-1 flex-col justify-center pt-40 pb-16 sm:pt-48">
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
              className="mt-9 max-w-md"
            >
              <a
                href="mailto:office@kapsca.in"
                className="group flex items-center gap-4 border-t border-white/10 py-4"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-[1.05rem] font-500 text-white/85 transition-colors group-hover:text-white">
                  office@kapsca.in
                </span>
                <svg viewBox="0 0 16 16" className="ml-auto h-4 w-4 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-accent-400" fill="none">
                  <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="tel:+919725339233"
                className="group flex items-center gap-4 border-t border-white/10 py-4"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-[1.05rem] font-500 text-white/85 transition-colors group-hover:text-white">
                  +91 97253 39233
                </span>
                <svg viewBox="0 0 16 16" className="ml-auto h-4 w-4 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-accent-400" fill="none">
                  <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
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
      <footer className="relative overflow-hidden border-t border-white/10">
        <div className="container-kaps pt-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-4 text-sm leading-relaxed text-white/45">
                Integrity beyond numbers — a partner-led firm of Chartered
                Accountants in Vadodara, Gujarat.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-x-20 gap-y-4 sm:mr-12 lg:mr-24">
              {FOOTER_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left text-sm font-500 text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 KAPS &amp; Co. · Crafted in Vadodara · All rights reserved.</p>
            <p>Vadodara · Gujarat · India</p>
          </div>
        </div>

        {/* Oversized wordmark anchoring the footer */}
        <div
          aria-hidden
          className="pointer-events-none mt-6 select-none overflow-hidden"
        >
          <div className="translate-y-[0.12em] whitespace-nowrap text-center font-sans text-[17vw] font-900 leading-[0.78] tracking-tight">
            <span className="bg-gradient-to-b from-white/70 to-white/[0.06] bg-clip-text text-transparent">
              KAPS&nbsp;&amp;
            </span>{" "}
            <span className="bg-gradient-to-b from-accent-400 to-accent-600/[0.12] bg-clip-text text-transparent">
              Co.
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
