"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Hero } from "./Hero";
import { About } from "./About";
import { Services } from "./Services";
import { Team } from "./Team";
import { Contact } from "./Contact";

/** Rounded-corner radius (max, at sm) + margin. A non-terminal section's box
 *  extends below its content by just a tiny buffer when the section is taller
 *  than the viewport (its corners are already far below the fold), and only
 *  grows to hide the corners when the section is around one viewport tall.
 *  This keeps the reveal "stripe" minimal on tall sections. */
const CORNER = 36;
const CORNER_MARGIN = 8;
const MIN_BUFFER = 6;

const nonTerminalBox = (content: number, V: number) =>
  Math.max(content + MIN_BUFFER, V + CORNER + CORNER_MARGIN);

/** Spring smoothing — snappy/responsive (matches the hero's fast feel) while
 *  still easing. Higher stiffness + lighter mass = less lag across every section. */
const SMOOTH = { stiffness: 260, damping: 38, mass: 0.45, restDelta: 0.5 };

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Ordered stack of sections. Each earlier one lifts to reveal the next. */
const SECTIONS: { id: string; el: ReactNode; bg: string }[] = [
  {
    id: "top",
    el: <Hero />,
    bg: "grain bg-[linear-gradient(135deg,#0d2138_0%,#123a44_50%,#1d5e3e_100%)]",
  },
  { id: "about", el: <About />, bg: "bg-cloud" },
  { id: "services", el: <Services />, bg: "bg-navy-900" },
  { id: "team", el: <Team />, bg: "bg-cloud" },
  { id: "contact", el: <Contact />, bg: "bg-navy-950" },
];

type LayerProps = {
  index: number;
  scrollY: MotionValue<number>;
  enterEnd: number;
  liftDistance: number;
  isTerminal: boolean;
  viewport: number;
  zIndex: number;
  bg: string;
  onMeasure: (index: number, height: number) => void;
  onFrame: () => void;
  registerNode: (index: number, node: HTMLElement | null) => void;
  children: ReactNode;
};

/**
 * One section as a fixed, full-width layer. It translates up 1:1 with scroll
 * across its window — first scrolling its own content, then lifting off the
 * top to uncover the (stationary) section behind it.
 */
function StackLayer({
  index,
  scrollY,
  enterEnd,
  liftDistance,
  isTerminal,
  viewport,
  zIndex,
  bg,
  onMeasure,
  onFrame,
  registerNode,
  children,
}: LayerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useIso(() => {
    const el = contentRef.current;
    if (!el) return;
    const report = () => {
      const nh = el.offsetHeight;
      setH(nh);
      onMeasure(index, nh);
    };
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index, onMeasure]);

  const dist = Math.max(1, liftDistance);
  const yRaw = useTransform(scrollY, [enterEnd, enterEnd + dist], [0, -dist], {
    clamp: true,
  });
  const y = useSpring(yRaw, SMOOTH);

  // Re-evaluate the active section on every smoothed frame (incl. spring settle).
  useMotionValueEvent(y, "change", onFrame);

  const boxHeight = isTerminal ? h : nonTerminalBox(h, viewport);
  const safeHeight =
    Number.isFinite(boxHeight) && boxHeight > 0 ? boxHeight : undefined;

  return (
    <motion.div
      ref={(node) => registerNode(index, node)}
      style={{ y, height: safeHeight, zIndex }}
      className={`fixed inset-x-0 top-0 overflow-hidden will-change-transform ${bg} ${
        isTerminal ? "" : "rounded-b-[28px] sm:rounded-b-[36px]"
      }`}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}

type Props = {
  onActiveChange?: (id: string) => void;
  bindGo?: (fn: (id: string) => void) => void;
};

export function Sections({ onActiveChange, bindGo }: Props) {
  const [vh, setVh] = useState(0);
  const [heights, setHeights] = useState<number[]>(() =>
    SECTIONS.map(() => 0),
  );
  const activeRef = useRef("top");
  const layerNodes = useRef<(HTMLElement | null)[]>([]);
  const enterEndsRef = useRef<number[]>([]);

  const { scrollY } = useScroll();

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMeasure = useCallback((i: number, h: number) => {
    setHeights((prev) => {
      if (prev[i] === h) return prev;
      const next = [...prev];
      next[i] = h;
      return next;
    });
  }, []);

  const registerNode = useCallback((i: number, node: HTMLElement | null) => {
    layerNodes.current[i] = node;
  }, []);

  const V = vh || 900;
  const N = SECTIONS.length;

  // Per-section lift distance and stacked entry points. Mapped over SECTIONS
  // (not `heights`) and guarded so a stale/short heights array never yields NaN.
  const lifts = SECTIONS.map((_, i) => {
    const h = Number.isFinite(heights[i]) ? heights[i] : 0;
    // Non-terminal sections lift their full box height (fully off the top);
    // the terminal section just scrolls its content.
    return i < N - 1 ? nonTerminalBox(h, V) : Math.max(1, h - V);
  });
  const enterEnds: number[] = [];
  let acc = 0;
  for (let i = 0; i < N; i++) {
    enterEnds.push(acc);
    acc += lifts[i];
  }
  const total = acc;
  enterEndsRef.current = enterEnds;

  // Active section from the LIVE on-screen geometry (transform-aware, so the
  // navbar highlight always matches exactly what's visible — no lag).
  const updateActive = useCallback(() => {
    const line = (window.innerHeight || 900) * 0.25;
    let idx = SECTIONS.length - 1;
    for (let i = 0; i < SECTIONS.length; i++) {
      const node = layerNodes.current[i];
      if (!node) continue;
      // First (top-most) layer still covering past the 25% line is active.
      if (node.getBoundingClientRect().bottom > line) {
        idx = i;
        break;
      }
    }
    const id = SECTIONS[idx].id;
    if (id !== activeRef.current) {
      activeRef.current = id;
      onActiveChange?.(id);
    }
  }, [onActiveChange]);

  useMotionValueEvent(scrollY, "change", updateActive);
  useEffect(() => {
    updateActive();
  }, [updateActive, vh, heights]);

  useEffect(() => {
    bindGo?.((id: string) => {
      const i = SECTIONS.findIndex((x) => x.id === id);
      if (i < 0) return;
      window.scrollTo({
        top: enterEndsRef.current[i] ?? 0,
        behavior: "smooth",
      });
    });
  }, [bindGo]);

  return (
    <div className="relative">
      {SECTIONS.map((s, i) => (
        <StackLayer
          key={s.id}
          index={i}
          scrollY={scrollY}
          enterEnd={enterEnds[i]}
          liftDistance={lifts[i]}
          isTerminal={i === N - 1}
          viewport={V}
          zIndex={N - i}
          bg={s.bg}
          onMeasure={onMeasure}
          onFrame={updateActive}
          registerNode={registerNode}
        >
          {s.el}
        </StackLayer>
      ))}

      {/* Spacer: total lift distance + one viewport so the last section fully scrolls */}
      <div
        style={{ height: Number.isFinite(total + V) ? total + V : "100svh" }}
        aria-hidden
      />
    </div>
  );
}
