import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Crosshair } from "./icons";

type Stamp = { id: number; x: number; y: number };

const TRAIL = [
  { stiffness: 340, damping: 32, size: 13, opacity: 0.55 },
  { stiffness: 280, damping: 30, size: 11, opacity: 0.42 },
  { stiffness: 230, damping: 28, size: 9, opacity: 0.32 },
  { stiffness: 190, damping: 27, size: 8, opacity: 0.24 },
  { stiffness: 155, damping: 26, size: 7, opacity: 0.17 },
];

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const stampId = useRef(0);
  const coordRef = useRef<HTMLSpanElement>(null);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.7 });
  const ringY = useSpring(my, { stiffness: 220, damping: 26, mass: 0.7 });

  // chained springs — each trail node chases the previous one
  const t1x = useSpring(mx, { stiffness: TRAIL[0].stiffness, damping: TRAIL[0].damping });
  const t1y = useSpring(my, { stiffness: TRAIL[0].stiffness, damping: TRAIL[0].damping });
  const t2x = useSpring(t1x, { stiffness: TRAIL[1].stiffness, damping: TRAIL[1].damping });
  const t2y = useSpring(t1y, { stiffness: TRAIL[1].stiffness, damping: TRAIL[1].damping });
  const t3x = useSpring(t2x, { stiffness: TRAIL[2].stiffness, damping: TRAIL[2].damping });
  const t3y = useSpring(t2y, { stiffness: TRAIL[2].stiffness, damping: TRAIL[2].damping });
  const t4x = useSpring(t3x, { stiffness: TRAIL[3].stiffness, damping: TRAIL[3].damping });
  const t4y = useSpring(t3y, { stiffness: TRAIL[3].stiffness, damping: TRAIL[3].damping });
  const t5x = useSpring(t4x, { stiffness: TRAIL[4].stiffness, damping: TRAIL[4].damping });
  const t5y = useSpring(t4y, { stiffness: TRAIL[4].stiffness, damping: TRAIL[4].damping });
  const trail = [
    { x: t1x, y: t1y, s: TRAIL[0].size, o: TRAIL[0].opacity },
    { x: t2x, y: t2y, s: TRAIL[1].size, o: TRAIL[1].opacity },
    { x: t3x, y: t3y, s: TRAIL[2].size, o: TRAIL[2].opacity },
    { x: t4x, y: t4y, s: TRAIL[3].size, o: TRAIL[3].opacity },
    { x: t5x, y: t5y, s: TRAIL[4].size, o: TRAIL[4].opacity },
  ];

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("cursor-custom");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      // CAD-style coordinate readout, updated without re-renders
      if (coordRef.current) {
        coordRef.current.textContent = `X ${String(e.clientX).padStart(4, "0")} · Y ${String(e.clientY).padStart(4, "0")}`;
      }
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        "a, button, input, select, textarea, label, [data-cursor], [role='button']"
      ) as HTMLElement | null;
      if (t) {
        setHovering(true);
        setLabel(t.dataset.cursorLabel ?? t.getAttribute("aria-label") ?? "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };
    const dn = (e: MouseEvent) => {
      if (e.button !== 0) return;
      setDown(true);
      // stamp a brick on every click
      const id = ++stampId.current;
      setStamps((s) => [...s.slice(-5), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setStamps((s) => s.filter((st) => st.id !== id)), 760);
    };
    const up = () => setDown(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      document.body.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90]"
      aria-hidden
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
    >
      {/* trailing crosshairs */}
      {trail.map((t, i) => (
        <motion.span
          key={i}
          className="absolute text-cyan"
          style={{ x: t.x, y: t.y, translateX: "-50%", translateY: "-50%" }}
          animate={{
            opacity: hovering ? t.o * 0.35 : t.o,
            scale: 1 - i * 0.09,
          }}
          transition={{ duration: 0.2 }}
        >
          <Crosshair style={{ width: t.s, height: t.s }} />
        </motion.span>
      ))}

      {/* hovering reticle */}
      {hovering && (
        <motion.span
          className="absolute text-amber"
          style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ opacity: { duration: 0.2 }, rotate: { repeat: Infinity, duration: 7, ease: "linear" } }}
        >
          <span className="block h-14 w-14 rounded-full border border-dashed border-amber/80" />
        </motion.span>
      )}

      {/* trailing ring */}
      <motion.div
        className="absolute rounded-full border border-cyan/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 46 : 34,
          height: hovering ? 46 : 34,
          opacity: hovering ? 0.3 : 0.55,
          borderColor: hovering ? "rgba(255,176,32,0.7)" : "rgba(111,227,255,0.7)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />

      {/* crosshair dot */}
      <motion.div
        className="absolute text-cyan"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: down ? 0.7 : 1, opacity: hovering ? 0.15 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <Crosshair className="h-5 w-5" />
      </motion.div>

      {/* coordinate readout */}
      <motion.span
        className="absolute font-mono text-[9px] tracking-[0.18em] text-ink-faint"
        style={{ x: mx, y: my, translateX: 16, translateY: -22 }}
        animate={{ opacity: hovering ? 0 : 0.8 }}
      >
        <span ref={coordRef}>X 0000 · Y 0000</span>
      </motion.span>

      {/* hover label */}
      {hovering && label && (
        <motion.div
          className="absolute"
          style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="mt-12 block whitespace-nowrap border border-amber/40 bg-navy-950/80 px-2 py-0.5 font-mono text-[10px] tracking-[0.25em] text-amber uppercase">
            [ {label} ]
          </span>
        </motion.div>
      )}

      {/* click stamps — bricks being placed */}
      {stamps.map((s) => (
        <motion.span
          key={s.id}
          className="absolute"
          style={{ left: s.x, top: s.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0.95, scale: 0.3, rotate: 0 }}
          animate={{ opacity: 0, scale: 1.8, rotate: 90 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block h-4 w-4 border border-amber" />
          <span className="absolute inset-[5px] border border-amber/60" />
        </motion.span>
      ))}
    </div>
  );
}