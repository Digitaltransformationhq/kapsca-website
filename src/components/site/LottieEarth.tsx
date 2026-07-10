"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "motion/react";

/** Animated "Earth & Connections" motif for the hero right column. */
export function LottieEarth() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden">
      {/* Box clips the animation's empty canvas margins; the globe renders
          larger (crisp) and stays centered, inclined at Earth's ~23.44° tilt */}
      <DotLottieReact
        src="/earth-connections.lottie"
        loop
        autoplay={!reduce}
        className="absolute inset-[-32%] [contain:layout_paint_size]"
        style={{ transform: "rotate(-23.44deg)" }}
      />
    </div>
  );
}
