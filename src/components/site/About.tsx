"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, ReactNode> = {
  partner: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 11.5l2 2 3.5-3.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  bond: (
    <>
      <path d="M9 12h6" />
      <path d="M10 8H8a4 4 0 0 0 0 8h2" />
      <path d="M14 16h2a4 4 0 0 0 0-8h-2" />
    </>
  ),
  window: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9h17M9 20.5v-11" />
    </>
  ),
};

const PILLARS: { label: string; body: string }[] = [
  {
    label: "Vision",
    body: "To redefine professional services by becoming a globally respected firm that inspires trust, drives innovation and shapes sustainable business growth.",
  },
  {
    label: "Mission",
    body: "To provide integrated assurance, taxation, advisory and transformation services through exceptional people, advanced technology and deep industry expertise — delivering measurable value with integrity, independence and excellence.",
  },
];

const WHY_US: { icon: string; title: string; desc: string }[] = [
  {
    icon: "partner",
    title: "Partner-led, always",
    desc: "Every engagement is supervised start to finish by a partner — never delegated away.",
  },
  {
    icon: "clock",
    title: "Deadlines honoured",
    desc: "Statutory and client deadlines are treated as inviolable commitments.",
  },
  {
    icon: "bond",
    title: "Built to last",
    desc: "Many clients have stayed with our partners for more than a decade.",
  },
  {
    icon: "window",
    title: "A single window",
    desc: "One Firm. Complete Business Solutions.",
  },
];

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

/**
 * Editorial layout — no panels or boxes anywhere. Structure comes from
 * hairline rules, an indexed label column and a shift in type scale, which is
 * the same vocabulary the Services list and Careers rows already use.
 */
export function About() {
  return (
    // Sized to one screen, like Solutions: every measure below is capped by
    // viewport HEIGHT as well as width, so the whole section clears a short
    // laptop without scrolling.
    <section
      id="about"
      data-section="about"
      className="relative flex min-h-[118svh] flex-col justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* Ambient lighting (navy blooms top-left, bottom-right and behind the
          eagle) is painted by this section's LAYER in Sections.tsx, not here —
          it has to cover the layer's full box or it leaves a seam along the
          bottom edge as the section lifts. */}

      {/* Eagle watermark — vigilance and focus, sat behind the copy on the
          right. The wrapper carries a left-to-right gradient mask that dissolves
          the bird before it reaches the text, the same masking idea the hero
          uses on its world map. The artwork itself is drawn rather than used as
          an alpha mask: its feather detail lives in the greys, not the alpha
          channel, so masking a flat colour would flatten it to a silhouette.
          Desaturating and lifting it instead keeps the linework and still hands
          the palette back to the section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, #000 30%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 30%)",
        }}
      >
        <div
          // Mirrored so the head and beak point back into the copy. The
          // background sits left because the flip swaps the sides, landing the
          // bird against the right edge of the screen.
          className="absolute right-[-24%] top-1/2 h-[min(80vh,46rem)] w-full -translate-y-1/2 -scale-x-100 opacity-[0.14] [filter:brightness(1.7)_contrast(1.35)]"
          style={{
            // Duotone: the gradient sits above the artwork and blends in
            // `color`, so the greys keep their luminance but take the section's
            // hue — a light navy off the crest falling to deep navy through the
            // breast. (No grayscale() in the filter; it would strip the tint.)
            backgroundImage:
              "linear-gradient(158deg, rgba(96,138,190,0.95) 0%, rgba(47,80,124,0.95) 58%, rgba(27,54,93,0.95) 100%), url('/eagle.png')",
            backgroundBlendMode: "color",
            backgroundSize: "100% 100%, contain",
            backgroundPosition: "center, left",
            backgroundRepeat: "no-repeat",
            // The PNG carries an opaque grey plate rather than an alpha
            // channel, so a radial fall-off centred on the head dissolves the
            // rectangle and concentrates what's left on the eye and beak.
            // Both radii MUST stay inside the box: reach = centre ± radius ×
            // (final stop). An ellipse that runs past an edge is cut off there
            // while still part-opaque, which paints a hard line across the
            // section — 62% at 42% used to overshoot the top by 20% and did
            // exactly that. These radii land ~9% clear of every edge.
            maskImage:
              "radial-gradient(48% 44% at 44% 48%, #000 30%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(48% 44% at 44% 48%, #000 30%, transparent 88%)",
          }}
        />
      </div>

      <div className="container-kaps relative z-10">
        {/* ---------- Header — same eyebrow + h2 idiom as every other section ---------- */}
        <div className="mb-[clamp(1.5rem,4.5vh,3rem)]">
          <div className="mb-[clamp(0.75rem,2vh,1.25rem)] inline-flex items-center gap-3">
            <span className="h-px w-8 bg-accent-500" />
            <span className="text-xs font-600 uppercase tracking-[0.26em] text-accent-300">
              Who we are
            </span>
          </div>
          <motion.h2
            {...rise}
            transition={{ duration: 0.8, ease }}
            className="max-w-4xl font-display text-[clamp(1.6rem,min(3.6vw,5.2vh),2.9rem)] font-800 leading-[1.08] tracking-[-0.02em] text-white text-balance"
          >
            What we <span className="text-accent-400">stand for</span>, and why
            firms stay.
          </motion.h2>
        </div>

        {/* ---------- Vision & Mission, as indexed statement rows ---------- */}
        <div className="border-t border-white/10">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              {...rise}
              transition={{ duration: 0.8, delay: i * 0.08, ease }}
              className="group relative grid gap-3 border-b border-white/10 py-[clamp(1.35rem,4vh,2.75rem)] lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-8"
            >
              {/* the rule brightens to brand green as the row is read */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent-500 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />

              <div className="flex items-baseline lg:pt-2">
                <h3 className="text-xs font-600 uppercase tracking-[0.26em] text-white/45 transition-colors duration-500 group-hover:text-white">
                  {p.label}
                </h3>
              </div>

              <p className="max-w-3xl font-display text-[clamp(1.05rem,min(1.8vw,2.6vh),1.45rem)] font-600 leading-[1.55] tracking-tight text-white/60 transition-colors duration-500 group-hover:text-white/85 text-justify hyphens-none">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ---------- Why firms choose us — four columns, hairline-divided ---------- */}
        <div className="mt-[clamp(2rem,6vh,4.5rem)] grid gap-[clamp(1.5rem,4vh,3rem)] sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {WHY_US.map((w, i) => (
            <motion.div
              key={w.title}
              {...rise}
              transition={{ duration: 0.7, delay: 0.14 + i * 0.07, ease }}
              className="group lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[clamp(1.3rem,3vh,1.75rem)] w-[clamp(1.3rem,3vh,1.75rem)] text-accent-400 transition-[transform,color,filter] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-accent-300 group-hover:[filter:drop-shadow(0_5px_14px_rgba(78,167,46,0.5))]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[w.icon]}
              </svg>

              <h3 className="mt-[clamp(0.75rem,2vh,1.25rem)] font-display text-[clamp(0.95rem,1.9vh,1.05rem)] font-700 leading-tight tracking-tight text-white">
                {w.title}
              </h3>
              {/* short accent rule that extends on hover */}
              <span className="mt-2.5 block h-px w-6 bg-accent-500/70 transition-all duration-500 group-hover:w-12 group-hover:bg-accent-400" />
              <p className="mt-2.5 text-[clamp(12px,1.6vh,13.5px)] leading-relaxed text-white/55">
                {w.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
