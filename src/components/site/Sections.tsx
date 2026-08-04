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
import { Careers } from "./Careers";
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

/** Px of lift per px of scroll during the reveal. The hero used to get this for
 *  free — a CSS bug left its layer in normal flow, so it moved natively AND by
 *  transform, clearing the screen in half the scroll of every other section.
 *  That double pace is the handover feel worth keeping, so it is now explicit
 *  and applies to all of them. Content taller than the viewport still scrolls
 *  1:1 first; only the curtain runs at this speed. */
const CURTAIN_SPEED = 2;

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Ordered stack of sections. Each earlier one lifts to reveal the next. */
const SECTIONS: { id: string; el: ReactNode; bg: string }[] = [
  {
    id: "top",
    el: <Hero />,
    // Must match the section's OWN background. A layer's box runs ~44px taller
    // than its content to keep the rounded corners off screen, and that strip
    // paints in the layer colour — so a navy gradient here (invisible behind
    // the white hero) surfaced as a stray dark line under the hero as it lifted.
    bg: "grain bg-white",
  },
  {
    id: "about",
    el: <About />,
    // About's ambient washes AND its film grain live HERE, not inside the
    // section, so they cover the layer's full box. Painted inside they stopped
    // at the section's edge and the ~44px corner strip below stayed flat navy —
    // a visible line along the bottom as the section lifted. Any section with a
    // non-flat background has to paint it on the layer for the same reason.
    // The washes are navy-only — the green blooms that used to sit top-left and
    // behind the eagle read as a tint over the whole section rather than as
    // lighting, so the brand green is now carried by the rules and icons alone.
    bg: "grain bg-navy-950 bg-[radial-gradient(65%_50%_at_12%_0%,rgba(47,80,124,0.22),transparent_62%),radial-gradient(55%_45%_at_100%_100%,rgba(47,80,124,0.3),transparent_65%),radial-gradient(38%_46%_at_86%_50%,rgba(47,80,124,0.18),transparent_68%)]",
  },
  { id: "services", el: <Services />, bg: "bg-white" },
  { id: "team", el: <Team />, bg: "bg-navy-900" },
  { id: "careers", el: <Careers />, bg: "bg-white" },
  { id: "contact", el: <Contact />, bg: "bg-navy-950" },
];

type LayerProps = {
  index: number;
  /** one spring-smoothed scroll value shared by every layer */
  smoothScrollY: MotionValue<number>;
  enterEnd: number;
  /** how far the layer travels to clear the screen */
  travel: number;
  /** travel spent scrolling content into view at 1:1 before the curtain */
  read: number;
  /** scroll the whole travel costs (read + curtain / CURTAIN_SPEED) */
  budget: number;
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
  smoothScrollY,
  enterEnd,
  travel,
  read,
  budget,
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

  // Two-phase: 1:1 while the section's own overflow scrolls past, then the
  // curtain at CURTAIN_SPEED. Sections that fit the viewport have no read
  // phase, so they map straight through and hand over in ~half a screen.
  const dist = Math.max(1, travel);
  const span = Math.max(1, budget);
  const twoPhase = read > 0 && span > read;
  // Reads the ALREADY-smoothed scroll, so the clamp is the last word: a layer
  // that has finished lifting is pinned at -dist and cannot lag back into
  // view. (Springing each layer's own y instead let a finished layer trail its
  // target and show a sliver of the wrong section along the top edge.)
  const y = useTransform(
    smoothScrollY,
    twoPhase
      ? [enterEnd, enterEnd + read, enterEnd + span]
      : [enterEnd, enterEnd + span],
    twoPhase ? [0, -read, -dist] : [0, -dist],
    { clamp: true },
  );

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
  // ONE spring for the whole stack. Every layer derives its position from this
  // single value, so the layers are always mutually consistent — no layer can
  // lag behind another and expose a seam between them.
  const smoothScrollY = useSpring(scrollY, SMOOTH);

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

  // Per-section travel, and the scroll each costs. Mapped over SECTIONS (not
  // `heights`) and guarded so a stale/short heights array never yields NaN.
  const travels = SECTIONS.map((_, i) => {
    const h = Number.isFinite(heights[i]) ? heights[i] : 0;
    // Non-terminal sections lift their full box height (fully off the top);
    // the terminal section just scrolls its content.
    return i < N - 1 ? nonTerminalBox(h, V) : Math.max(1, h - V);
  });
  // Overflow past one viewport is read at 1:1; the rest is curtain. The last
  // section has no curtain at all — it only scrolls its own content.
  const reads = SECTIONS.map((_, i) =>
    i < N - 1
      ? Math.max(0, (Number.isFinite(heights[i]) ? heights[i] : 0) - V)
      : 0,
  );
  const budgets = travels.map((t, i) =>
    i < N - 1 ? reads[i] + (t - reads[i]) / CURTAIN_SPEED : t,
  );
  const enterEnds: number[] = [];
  let acc = 0;
  for (let i = 0; i < N; i++) {
    enterEnds.push(acc);
    acc += budgets[i];
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
          smoothScrollY={smoothScrollY}
          enterEnd={enterEnds[i]}
          travel={travels[i]}
          read={reads[i]}
          budget={budgets[i]}
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
