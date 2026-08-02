"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** How long each domain holds on screen before the next one takes over. */
const HOLD_MS = 2800;

/* Emerging / specialist practice domains — the ones that set the firm apart
   from a standard compliance shop. */
const DOMAINS = [
  "AI-Driven Finance Transformation",
  "Cyber Security & Internal Controls",
  "Cross-Border Transaction & International Taxation",
  "ESG & Sustainability",
  "Crypto & Digital Asset",
  "Forensic Accounting & Fraud Investigation",
  "Strategic Tax, Litigation & Compliance",
  "Virtual CFO & Business Intelligence",
  "Governance, Risk & Compliance",
  "Business Valuation & Mergers & Acquisitions",
  "Startup, Fund Raising & Government Incentive",
  "Wealth Management & Family Office",
  "Global Business Compliance & Research",
];

/**
 * Hero side text: cycles through the firm's specialist domains, one at a time.
 * The animated line is hidden from assistive tech — a static list of the same
 * domains is exposed instead, so the content never depends on the timer.
 */
export function DomainRotator() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Timer is keyed on `index`, so each domain gets a full hold of its own.
  useEffect(() => {
    const id = setTimeout(
      () => setIndex((n) => (n + 1) % DOMAINS.length),
      HOLD_MS,
    );
    return () => clearTimeout(id);
  }, [index]);

  // With reduced motion the text still cycles, but only through opacity —
  // no travel, no blur.
  const enter = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 20, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -18, filter: "blur(6px)" },
      };

  return (
    <div className="w-full max-w-[28rem]">
      <div aria-hidden>
        {/* Fixed height so the surrounding layout never shifts mid-cycle.
            Sized for the longest name — "Cross-Border Transaction &
            International Taxation" — at four lines. Tracks viewport height on
            the same curve as the type below, so a short screen doesn't reserve
            room the smaller text never uses. */}
        <div className="flex min-h-[clamp(10rem,24vh,13.5rem)] items-end">
          <AnimatePresence mode="wait">
            <motion.p
              key={DOMAINS[index]}
              {...enter}
              transition={{ duration: reduce ? 0.3 : 0.55, ease }}
              className="w-full font-display text-[clamp(1.95rem,4.5vh,2.9rem)] font-700 leading-[1.16] tracking-tight text-navy-700 text-balance text-right"
            >
              {DOMAINS[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Accent rule — redraws with every domain change, running right-to-left
            to match the right-aligned names. It sits outside the fixed-height
            slot, so it holds a constant baseline however many lines the name
            wraps to. */}
        <motion.div
          key={index}
          initial={reduce ? {} : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0.3 : 0.75, delay: reduce ? 0 : 0.12, ease }}
          className="mt-5 h-[2px] w-full origin-right rounded-full bg-gradient-to-l from-accent-500 via-accent-500/70 to-transparent"
        />
      </div>

      {/* Same content, static, for screen readers and no-JS crawlers */}
      <ul className="sr-only">
        {DOMAINS.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
}
