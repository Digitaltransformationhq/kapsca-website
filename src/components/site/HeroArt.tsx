"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Hero artwork — an original "financial clarity" composition.
 * Borrows the reference's rounded, circular-motif language but speaks the
 * language of an advisory firm: a floating insight panel with a growth curve,
 * orbiting accents, and trust badges. Fully vector, theme-colored, animated.
 */
export function HeroArt() {
  const reduce = useReducedMotion();

  const float = (delay = 0, distance = 12) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: {
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* Orbiting ring of dots (nod to the circular reference mark) */}
      {!reduce && (
        <motion.div
          className="absolute inset-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.4"
              strokeDasharray="1.2 3"
            />
            {[0, 90, 180, 270].map((a) => {
              const rad = (a * Math.PI) / 180;
              return (
                <circle
                  key={a}
                  cx={50 + 47 * Math.cos(rad)}
                  cy={50 + 47 * Math.sin(rad)}
                  r={a === 0 ? 1.7 : 1}
                  fill={a === 0 ? "#4ea72e" : "rgba(255,255,255,0.5)"}
                />
              );
            })}
          </svg>
        </motion.div>
      )}

      {/* Main insight panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="absolute left-1/2 top-[45%] w-[72%] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          {...float(0.2, 10)}
          className="rounded-[26px] border border-white/60 bg-white p-5 shadow-[0_40px_80px_-30px_rgba(10,23,40,0.65)]"
        >
          {/* Panel header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-600 uppercase tracking-[0.22em] text-navy-400">
                Advisory Snapshot
              </p>
              <p className="font-display text-sm font-700 text-navy-700">
                FY Growth Overview
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-700 text-accent-600">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              +18.4%
            </span>
          </div>

          {/* Chart */}
          <svg viewBox="0 0 240 120" className="w-full">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ea72e" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#4ea72e" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[24, 54, 84].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="240"
                y2={y}
                stroke="#eef2f7"
                strokeWidth="1"
              />
            ))}
            <motion.path
              d="M0 96 L40 82 L80 88 L120 58 L160 64 L200 32 L240 20"
              fill="none"
              stroke="#4ea72e"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 96 L40 82 L80 88 L120 58 L160 64 L200 32 L240 20 L240 120 L0 120 Z"
              fill="url(#area)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            />
            <motion.circle
              cx="240"
              cy="20"
              r="4"
              fill="#4ea72e"
              stroke="#fff"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, type: "spring", stiffness: 300 }}
            />
          </svg>

          {/* Mini stats row */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { k: "GST", v: "Filed" },
              { k: "Audit", v: "On track" },
              { k: "ITC", v: "Reconciled" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl bg-cloud px-2.5 py-2 text-center"
              >
                <p className="text-[9px] font-600 uppercase tracking-wider text-navy-400">
                  {s.k}
                </p>
                <p className="text-[11px] font-700 text-navy-700">{s.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating badge — compliance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-2 top-[6%] hidden sm:block"
      >
        <motion.div
          {...float(0.6, 14)}
          className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/95 px-3.5 py-2.5 shadow-[0_20px_45px_-20px_rgba(10,23,40,0.7)] backdrop-blur"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-700 text-navy-700">GSTR-9C</p>
            <p className="text-[9px] font-500 text-navy-400">Compliant</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating badge — clients */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-1 bottom-[3%]"
      >
        <motion.div
          {...float(1.1, 12)}
          className="rounded-2xl border border-white/60 bg-navy-700 px-4 py-3 shadow-[0_20px_45px_-20px_rgba(10,23,40,0.9)]"
        >
          <p className="font-display text-xl font-800 leading-none text-white">
            750+
          </p>
          <p className="mt-1 text-[9px] font-500 uppercase tracking-[0.18em] text-white/60">
            Clients served
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
