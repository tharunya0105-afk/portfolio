import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { PROFILE } from "../data";
import Magnetic from "../components/Magnetic";
import { smoothScrollHandler } from "../lib/scroll";
import { ArrowDown, Compass, Ruler } from "../components/icons";

import { useProjector, useCube } from "../lib/iso";

function Block({
  started,
  delay,
  x,
  y,
  w,
  d,
  h,
  label,
  sub,
  lx,
  ly,
  accent,
}: {
  started: boolean;
  delay: number;
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  label: string;
  sub: string;
  lx: number;
  ly: number;
  accent?: boolean;
}) {
  const cube = useCube();
  const { faces, edges } = cube(x, y, w, d, h);
  const pt = useProjector();
  const anchor = pt(x + w / 2, y + d / 2, h);
  return (
    <motion.g
      initial={{ opacity: 0, y: 30, scale: 0.88 }}
      animate={started ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {faces.map((f, i) => (
        <polygon key={i} points={f.d} fill={f.fill} stroke="rgba(111,227,255,0.55)" strokeWidth="1" />
      ))}
      {edges.map((e, i) => (
        <polyline
          key={`e${i}`}
          points={e}
          fill="none"
          stroke={accent ? "rgba(255,176,32,0.8)" : "rgba(111,227,255,0.75)"}
          strokeWidth="1.2"
        />
      ))}
      <motion.g
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.5 }}
      >
        <line
          x1={anchor[0]}
          y1={anchor[1] - 2}
          x2={lx}
          y2={ly}
          stroke="rgba(159,180,204,0.7)"
          strokeWidth="0.7"
          strokeDasharray="3 3"
        />
        <text
          x={lx}
          y={ly - 4}
          fill={accent ? "#ffb020" : "#6fe3ff"}
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.14em"
        >
          {label}
        </text>
        <text x={lx} y={ly + 10} fill="#9fb4cc" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.08em">
          {sub}
        </text>
      </motion.g>
    </motion.g>
  );
}

/* ---------- the hero scene ---------- */
function IsoScene({ started }: { started: boolean }) {
  const pt = useProjector();
  const gridX = useMemo(() => {
    const lines: string[] = [];
    for (let y = 0; y <= 4; y += 1) {
      const a = pt(0, y, 0);
      const b = pt(6, y, 0);
      lines.push(`${a[0]},${a[1]} ${b[0]},${b[1]}`);
    }
    for (let x = 0; x <= 6; x += 1) {
      const a = pt(x, 0, 0);
      const b = pt(x, 4, 0);
      lines.push(`${a[0]},${a[1]} ${b[0]},${b[1]}`);
    }
    return lines;
  }, [pt]);

  const dimLeft = pt(0, 4, 0);
  const dimRight = pt(6, 4, 0);
  const dimMid = pt(3, 4, 0);
  const dimUp = pt(0, 4, 0);
  const dimTop = pt(0, 4, 2.6);

  return (
    <svg viewBox="0 0 800 560" className="h-auto w-full" fill="none" aria-hidden>
      {/* platform floor */}
      <motion.path
        d={`M ${pt(0, 0, 0)} L ${pt(6, 0, 0)} L ${pt(6, 4, 0)} L ${pt(0, 4, 0)} Z`}
        stroke="rgba(111,227,255,0.28)"
        strokeWidth="1"
        fill="rgba(10,26,45,0.5)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={started ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.9 }}
      />
      {gridX.map((line, i) => (
        <motion.line
          key={i}
          x1={line.split(" ")[0].split(",")[0]}
          y1={line.split(" ")[0].split(",")[1]}
          x2={line.split(" ")[1].split(",")[0]}
          y2={line.split(" ")[1].split(",")[1]}
          stroke="rgba(111,227,255,0.12)"
          strokeWidth="0.7"
          initial={{ pathLength: 0 }}
          animate={started ? { pathLength: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
        />
      ))}

      {/* the three blocks */}
      <Block
        started={started}
        delay={1.05}
        x={0.7}
        y={0.7}
        w={2.1}
        d={1.25}
        h={0.42}
        label="DATA LAYER"
        sub="CPWD RATES · LOCATION · QUOTES"
        lx={118}
        ly={430}
      />
      <Block
        started={started}
        delay={1.3}
        x={3.1}
        y={0.75}
        w={1.5}
        d={1.5}
        h={1.05}
        label="COST ENGINE"
        sub="INTELLIGENCE CORE"
        lx={648}
        ly={196}
        accent
      />
      <Block
        started={started}
        delay={1.55}
        x={4.95}
        y={1.05}
        w={0.85}
        d={0.85}
        h={1.9}
        label="WORKFLOWS"
        sub="ESTIMATE · MONITOR · COMPARE"
        lx={712}
        ly={330}
      />

      {/* connecting pipes */}
      <motion.path
        d={`M ${pt(1.75, 1.32, 0.42)} L ${pt(3.85, 1.5, 1.05)}`}
        stroke="rgba(255,176,32,0.75)"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={started ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay: 1.85, duration: 0.5 }}
      />
      <motion.path
        d={`M ${pt(4.6, 1.5, 1.05)} L ${pt(5.37, 1.47, 1.9)}`}
        stroke="rgba(255,176,32,0.75)"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={started ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay: 2.05, duration: 0.5 }}
      />

      {/* dimension lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 0.6 }}
        stroke="rgba(159,180,204,0.65)"
        strokeWidth="0.8"
      >
        <line x1={dimLeft[0]} y1={dimLeft[1] + 26} x2={dimRight[0]} y2={dimRight[1] + 26} />
        <line x1={dimLeft[0]} y1={dimLeft[1] + 20} x2={dimLeft[0]} y2={dimLeft[1] + 32} />
        <line x1={dimRight[0]} y1={dimRight[1] + 20} x2={dimRight[0]} y2={dimRight[1] + 32} />
        <line x1={dimMid[0]} y1={dimMid[1] + 26} x2={dimMid[0]} y2={dimMid[1] + 34} />
        <text x={dimMid[0] + 6} y={dimMid[1] + 40} fill="#9fb4cc" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
          42.0 m
        </text>
        <line x1={dimUp[0] - 34} y1={dimUp[1]} x2={dimUp[0] - 34} y2={dimTop[1]} />
        <text x={dimUp[0] - 92} y={dimUp[1] - 34} fill="#9fb4cc" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
          ELEV +12.4
        </text>
      </motion.g>

      {/* compass */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={started ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2.7, duration: 0.5 }}
        style={{ transformOrigin: "60px 60px" }}
      >
        <circle cx="60" cy="60" r="26" stroke="rgba(111,227,255,0.5)" strokeWidth="1" />
        <circle cx="60" cy="60" r="20" stroke="rgba(111,227,255,0.3)" strokeWidth="0.7" strokeDasharray="2 3" />
        <path d="M60 34 L66 66 L60 58 L54 66 Z" fill="rgba(255,176,32,0.85)" />
        <text x="60" y="100" textAnchor="middle" fill="#9fb4cc" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.2em">
          N ↑
        </text>
      </motion.g>

      {/* title block */}
      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={started ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.85, duration: 0.5 }}
        fontFamily="'JetBrains Mono', monospace"
      >
        <rect x="520" y="470" width="252" height="66" fill="rgba(8,24,43,0.85)" stroke="rgba(111,227,255,0.4)" strokeWidth="1" />
        <line x1="520" y1="496" x2="772" y2="496" stroke="rgba(111,227,255,0.3)" strokeWidth="0.7" />
        <line x1="520" y1="518" x2="772" y2="518" stroke="rgba(111,227,255,0.3)" strokeWidth="0.7" />
        <text x="532" y="487" fill="#6fe3ff" fontSize="9" letterSpacing="0.14em">
          DWG: THARUNYA-2026
        </text>
        <text x="652" y="487" fill="#9fb4cc" fontSize="9" letterSpacing="0.14em">
          REV B
        </text>
        <text x="532" y="511" fill="#9fb4cc" fontSize="9" letterSpacing="0.14em">
          SCALE 1:100
        </text>
        <text x="652" y="511" fill="#ffb020" fontSize="9" letterSpacing="0.14em">
          ISSUED: 2026
        </text>
        <text x="532" y="529" fill="#5c7291" fontSize="8" letterSpacing="0.1em">
          PERSONAL PLATFORM — CONCEPT MASSING
        </text>
      </motion.g>
    </svg>
  );
}

/* ---------- typewriter ---------- */
function useTypewriter(text: string, active: boolean, speed = 38) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return text.slice(0, n);
}

/* ---------- brick-by-brick name ---------- */
function BrickName({ started, text }: { started: boolean; text: string }) {
  const letters = text.split("");
  return (
    <span className="inline-block">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 46, rotateX: 80, scale: 0.9 }}
          animate={
            started
              ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
              : {}
          }
          transition={{
            delay: 0.35 + i * 0.045,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -6, color: "#ffb020", transition: { duration: 0.15 } }}
          data-cursor-label="BRICK"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- hero ---------- */
export default function Hero({ started }: { started: boolean }) {
  const reduced = useReducedMotion();
  const tagline = useTypewriter(PROFILE.role, started, 32);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(nx);
    my.set(ny);
    rx.set(ny * -5);
    ry.set(nx * 6);
  };

  return (
    <section id="top" className="relative z-10 flex min-h-screen flex-col overflow-hidden">
      <div
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-10 px-6 pt-32 pb-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-4 lg:pt-24"
        onMouseMove={onMove}
      >
        {/* left — the words */}
        <div className="order-2 w-full lg:order-1 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 border border-cyan/30 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              <span className="mono-label text-cyan">PROJECT: PERSONAL PLATFORM</span>
            </span>
            <span className="mono-label text-ink-faint">PLAN NO. THR-2026-001</span>
          </motion.div>

          <h1
            className="font-display text-[clamp(2.6rem,8vw,5.2rem)] leading-[0.98] font-bold tracking-tight text-ink uppercase"
            style={{ perspective: 600 }}
          >
            <BrickName started={started} text="Tharunya" />
            <br />
            <BrickName started={started} text="Swaminathan" />
          </h1>

          <div className="mt-5 h-2 overflow-hidden" aria-hidden>
            <motion.div
              className="flex h-full w-full"
              initial={{ scaleX: 0 }}
              animate={started ? { scaleX: 1 } : {}}
              transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            >
              {Array.from({ length: 26 }).map((_, i) => (
                <span key={i} className="h-full flex-1 border-r border-cyan/25 bg-cyan/10" />
              ))}
            </motion.div>
          </div>

          <p className="mt-6 min-h-[4.5rem] font-mono text-sm leading-relaxed text-cyan sm:text-base">
            {tagline}
            {tagline.length < PROFILE.role.length && <span className="cursor-blink">▋</span>}
          </p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-dim"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.7, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#profile"
                onClick={smoothScrollHandler}
                data-cursor-label="UNROLL"
                className="group relative inline-flex items-center gap-3 border border-amber bg-amber/10 px-6 py-3.5 font-mono text-xs tracking-[0.22em] text-amber uppercase transition-all duration-300 hover:bg-amber hover:text-navy-950"
              >
                View the build
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#buildme"
                onClick={smoothScrollHandler}
                data-cursor-label="RUN"
                className="group inline-flex items-center gap-3 border border-cyan/50 px-6 py-3.5 font-mono text-xs tracking-[0.22em] text-cyan uppercase transition-all duration-300 hover:border-cyan hover:bg-cyan/10"
              >
                <Ruler className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                Try the cost engine
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : {}}
            transition={{ delay: 3.1, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase"
          >
            <span>STATUS: <span className="text-ink-dim">UNDER CONSTRUCTION — v2.0</span></span>
            <span>LOCATION: <span className="text-ink-dim">TAMIL NADU, INDIA</span></span>
            <span className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-cyan/70" /> 11.0°N / 78.7°E
            </span>
          </motion.div>
        </div>

        {/* right — the drawing */}
        <motion.div
          className="order-1 w-full max-w-xl lg:order-2 lg:col-span-6"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformPerspective: 1100, rotateX: rx, rotateY: ry }}
        >
          <div className="relative">
            <IsoScene started={started} />
            <div className="absolute -top-3 -right-2 hidden font-mono text-[9px] tracking-[0.3em] text-ink-faint uppercase md:block">
              FIG. 01 — CONCEPT MASSING
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#profile"
        onClick={smoothScrollHandler}
        data-cursor-label="SCROLL"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 3.4, duration: 0.6 }}
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-ink-faint uppercase"
      >
        <span>scroll to unroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-cyan/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-cyan"
            animate={started ? { y: [0, 40] } : {}}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 3.6 }}
          />
        </span>
      </motion.a>
    </section>
  );
}