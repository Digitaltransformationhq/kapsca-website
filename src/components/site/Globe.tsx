"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

/** Locations glowing on the globe — HQ + reach across domestic & international clients. */
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [22.3072, 73.1812], size: 0.12 }, // Vadodara — HQ
  { location: [19.076, 72.8777], size: 0.06 }, // Mumbai
  { location: [28.6139, 77.209], size: 0.06 }, // Delhi
  { location: [13.0827, 80.2707], size: 0.05 }, // Chennai
  { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
  { location: [51.5074, -0.1278], size: 0.06 }, // London
  { location: [40.7128, -74.006], size: 0.06 }, // New York
  { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
  { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
  { location: [43.6532, -79.3832], size: 0.05 }, // Toronto
];

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const rRef = useRef(0);
  const phiRef = useRef(4.3); // start roughly on India

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: 0.26,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.2, 0.33, 0.5], // navy-blue continents (#345381)
      markerColor: [0.31, 0.65, 0.18], // brand green (#4EA72E)
      glowColor: [0.15, 0.42, 0.28], // green-teal atmosphere (#1D6B45)
      markers: MARKERS,
      onRender: (state) => {
        if (pointerInteracting.current === null && !reduced) {
          phiRef.current += 0.004;
        }
        state.phi = phiRef.current + rRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const fade = setTimeout(() => {
      canvas.style.opacity = "1";
    }, 120);

    return () => {
      clearTimeout(fade);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      {/* ambient halo behind the globe */}
      <div className="pointer-events-none absolute inset-6 rounded-full bg-accent-500/10 blur-3xl" />
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerMovement.current = delta;
            rRef.current = delta / 180;
          }
        }}
        className="relative h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]"
      />
    </div>
  );
}
