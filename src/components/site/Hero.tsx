"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";
import { useConsultation } from "./consultation";
import { useScrollNav } from "./scroll-nav";
import { LottieEarth } from "./LottieEarth";

const STATS = [
  { to: 750, suffix: "+", pad: 0, label: "Clients served" },
  { to: 6, suffix: "", pad: 2, label: "Partner-led verticals" },
  { to: 12, suffix: "+", pad: 0, label: "Years of practice" },
  { to: 26, suffix: "", pad: 0, label: "States GST footprint" },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Counts up from 0 to `to` on mount; preserves suffix (e.g. "+") and zero-padding. */
function Counter({
  to,
  suffix = "",
  pad = 0,
  delay = 0,
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  pad?: number;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, delay, duration, reduce]);

  const text = pad > 0 ? String(value).padStart(pad, "0") : String(value);
  return (
    <>
      {text}
      {suffix}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const openConsult = useConsultation();
  const { go } = useScrollNav();

  const rise = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col pt-24 pb-6"
    >
      {/* Main hero row — vertically centered in the space above the stats band */}
      <div className="container-kaps relative z-10 flex flex-1 flex-col justify-center">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ---------- Left column ---------- */}
          <div className="max-w-xl lg:-mt-6">
            {/* Headline */}
            <motion.h1
              {...rise(0.08)}
              className="font-display text-[clamp(2.6rem,6vw,4.4rem)] font-800 leading-[1.02] tracking-[-0.02em] text-white text-balance"
            >
              Integrity beyond
              <br />
              the <span className="text-accent-400">numbers</span>.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...rise(0.16)}
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
            >
              A partner-led firm delivering assurance, taxation, forensic and
              advisory services — a single-window professional partner for
              businesses of every size.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                onClick={openConsult}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-600 text-white shadow-[0_12px_30px_-14px_rgba(78,167,46,0.6)] transition-all hover:bg-accent-600 hover:shadow-[0_16px_36px_-14px_rgba(78,167,46,0.75)] sm:w-auto"
              >
                Book an Appointment
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </button>
              <button
                onClick={() => go("services")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-base font-500 text-white/85 backdrop-blur transition-all hover:border-white/30 hover:bg-white/[0.07] hover:text-white sm:w-auto"
              >
                Explore our services
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                >
                  <path
                    d="M8 3v9M4 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* ---------- Right column: Earth & Connections animation ---------- */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            <LottieEarth />
          </motion.div>
        </div>

      </div>

      {/* ---------- Stats band (sits at the bottom, within the first screen) ---------- */}
      <div className="container-kaps relative z-10 mt-8">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="rounded-[26px] border border-white/60 bg-white p-6 shadow-[0_40px_90px_-45px_rgba(10,23,40,0.7)] sm:p-8"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease }}
                className="relative text-center sm:text-left"
              >
                {/* Circle accent (reference motif) */}
                <span className="mx-auto mb-2.5 flex h-2.5 w-2.5 rounded-full bg-accent-500 sm:mx-0" />
                <p className="font-display text-4xl font-800 tracking-tight text-navy-700 sm:text-5xl">
                  <Counter
                    to={s.to}
                    suffix={s.suffix}
                    pad={s.pad}
                    delay={0.8 + i * 0.12}
                  />
                </p>
                <p className="mt-1 text-sm font-500 text-navy-400">{s.label}</p>
                {i < STATS.length - 1 && (
                  <span className="absolute -right-4 top-2 hidden h-[70%] w-px bg-mist sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
