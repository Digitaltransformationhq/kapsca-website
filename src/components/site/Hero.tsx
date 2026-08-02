"use client";

import { motion, useReducedMotion } from "motion/react";
import { DomainRotator } from "./DomainRotator";
import { useConsultation } from "./consultation";
import { useScrollNav } from "./scroll-nav";

const ease = [0.16, 1, 0.3, 1] as const;

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
      className="relative flex min-h-[100svh] flex-col bg-white pt-32 pb-6"
    >
      {/* ---------- World map backdrop ---------- */}
      <motion.div
        aria-hidden
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          // Fade the map out toward the edges so it never fights the copy.
          maskImage:
            "radial-gradient(120% 90% at 50% 45%, #000 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 45%, #000 35%, transparent 78%)",
        }}
      >
        {/* The SVG's ocean is transparent, so masking a flat colour with it
            tints every landmass uniformly and drops the file's stray colours. */}
        <div
          className="absolute left-1/2 top-1/2 aspect-[2191/1135] w-[150%] -translate-x-1/2 -translate-y-1/2 bg-navy-900/[0.12] lg:w-[115%]"
          style={{
            maskImage: "url('/world-map.svg')",
            WebkitMaskImage: "url('/world-map.svg')",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </motion.div>

      {/* Main hero row — vertically centered in the space above the stats band */}
      <div className="container-kaps relative z-10 flex flex-1 flex-col justify-center">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
          <div className="max-w-2xl lg:-mt-6">
            {/* Headline. Type and spacing below are capped by viewport HEIGHT as
                well as width — with a width-only clamp, a short laptop screen left
                the hero taller than the viewport and the headline rode up under
                the navbar. */}
            <motion.h1
              {...rise(0.08)}
              className="font-display text-[clamp(2.2rem,min(6vw,8.4vh),4.4rem)] font-800 leading-[1.02] tracking-[-0.02em] text-navy-700 text-balance"
            >
              Integrity beyond
              <br />
              the <span className="text-accent-600">numbers</span>.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...rise(0.16)}
              className="mt-[clamp(1rem,2.6vh,1.5rem)] max-w-xl text-[clamp(1rem,2.1vh,1.125rem)] leading-relaxed text-navy-500 text-justify hyphens-none"
            >
              Chartered Accountants firm with an experienced and
              dedicated team, delivering assurance, tax, advisory and
              transformation services as a trusted single-window partner for
              businesses worldwide, driving sustainable growth and creating
              long-term value.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...rise(0.24)}
              className="mt-[clamp(1.25rem,3.6vh,2.25rem)] flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                onClick={openConsult}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-700 px-6 py-3.5 text-base font-600 text-white shadow-[0_12px_30px_-14px_rgba(27,54,93,0.6)] transition-all hover:bg-navy-800 hover:shadow-[0_16px_36px_-14px_rgba(27,54,93,0.75)] sm:w-auto"
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
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-navy-900/15 bg-white/60 px-6 py-3.5 text-base font-500 text-navy-600 backdrop-blur transition-all hover:border-navy-900/30 hover:bg-navy-900/[0.04] hover:text-navy-700 sm:w-auto"
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

          {/* Rotating specialist-domain panel. Hidden below lg — the hero has to
              stay inside one screen on laptops, and the copy owns that space. */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease }}
            className="hidden justify-self-end lg:block lg:-mt-6"
          >
            <DomainRotator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
