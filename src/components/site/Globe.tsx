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
      // cobe tints the whole sphere with baseColor and only varies brightness:
      // `dark: 1` lights the land dots over a dark ocean, `dark: 0` inverts it —
      // lit ocean, dots subtracted out. We want the latter: white water, navy
      // landmass. mapBrightness then controls how dark the continents sit.
      dark: 0,
      // Land is a dot lattice; it only reads as solid once the covering radius
      // drops under the shader's fixed dot radius, i.e. well past ~75k samples.
      mapSamples: 100000,
      // With dark:0, land = baseColor × (1 − mapBrightness) and water = baseColor.
      // The hero world map's grey (navy-900 at 12% over white ≈ #E2E4E7) sits at
      // 0.22; nudged up so the continents read against the white water.
      mapBrightness: 0.55,
      diffuse: 0.4, // keeps the landmass an even grey rather than fading at the limb
      baseColor: [1, 1, 1], // white water
      markerColor: [0.31, 0.65, 0.18], // brand green — needs to read on white
      glowColor: [0.3, 0.38, 0.5], // soft blue-white atmosphere
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

    // Settles at 35% — the globe is a backdrop, not a focal point. (cobe's own
    // `opacity` option blends the far hemisphere through instead of fading, so
    // the alpha belongs on the canvas.)
    const fade = setTimeout(() => {
      canvas.style.opacity = "0.35";
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
      <div className="pointer-events-none absolute inset-6 rounded-full bg-white/[0.07] blur-3xl" />
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
