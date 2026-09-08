import { useMemo, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { Section, SectionHead, Cutline, BlueprintCard } from "../components/Section";
import { BUILDME } from "../data";
import { useCube, useProjector } from "../lib/iso";

/* ---------------- isometric product architecture ---------------- */

function IsoLayer({
  x,
  y,
  w,
  d,
  h,
  delay,
  label,
  sub,
  accent,
  pulsing,
  lx = 620,
  ly,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  delay: number;
  label: string;
  sub: string;
  accent?: boolean;
  pulsing?: boolean;
  lx?: number;
  ly?: number;
}) {
  const cube = useCube();
  const pt = useProjector(34, 350, 300);
  const { faces, edges } = cube(x, y, w, d, h);
  const anchor = pt(x + w / 2, y + d / 2, h);
  const labelY = ly ?? anchor[1];
  return (
    <motion.g
      initial={{ opacity: 0, y: 34, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {faces.map((f, i) => (
        <polygon key={i} points={f.d} fill={f.fill} stroke="rgba(111,227,255,0.5)" strokeWidth="1" />
      ))}
      {edges.map((e, i) => (
        <polyline
          key={`e${i}`}
          points={e}
          fill="none"
          stroke={accent ? "rgba(255,176,32,0.85)" : "rgba(111,227,255,0.7)"}
          strokeWidth="1.2"
        />
      ))}
      {pulsing && (
        <motion.circle
          cx={anchor[0]}
          cy={anchor[1]}
          r="26"
          fill="none"
          stroke="rgba(255,176,32,0.5)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0.9, 0, 0.9] }}
          viewport={{ once: true }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        />
      )}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4 }}
      >
        <line x1={anchor[0]} y1={anchor[1]} x2={lx} y2={labelY} stroke="rgba(159,180,204,0.6)" strokeWidth="0.7" strokeDasharray="3 3" />
        <text
          x={lx + 8}
          y={labelY - 4}
          fill={accent ? "#ffb020" : "#6fe3ff"}
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.14em"
        >
          {label}
        </text>
        <text x={lx + 8} y={labelY + 10} fill="#9fb4cc" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">
          {sub}
        </text>
      </motion.g>
    </motion.g>
  );
}

function BuildScene() {
  const pt = useProjector(34, 350, 300);
  const [wx, wy] = pt(4.1, 1.15, 1.35);
  const [wx2, wy2] = pt(6.2, 1.15, 1.0);

  return (
    <svg viewBox="0 0 800 520" className="h-auto w-full" fill="none" aria-label="BuildMe product architecture diagram">
      {/* floor */}
      <motion.path
        d={`M ${pt(0, 0, 0)} L ${pt(7, 0, 0)} L ${pt(7, 3.4, 0)} L ${pt(0, 3.4, 0)} Z`}
        fill="rgba(10,26,45,0.55)"
        stroke="rgba(111,227,255,0.25)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9 }}
      />
      {/* floor grid */}
      {[0.85, 1.7, 2.55].map((y) => (
        <motion.line
          key={`gx${y}`}
          x1={pt(0, y, 0)[0]}
          y1={pt(0, y, 0)[1]}
          x2={pt(7, y, 0)[0]}
          y2={pt(7, y, 0)[1]}
          stroke="rgba(111,227,255,0.1)"
          strokeWidth="0.7"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + y * 0.1, duration: 0.4 }}
        />
      ))}

      {/* layer 1 — data */}
      <IsoLayer x={0.7} y={0.6} w={2.6} d={1.1} h={0.5} delay={0.15} label="DATA FOUNDATION" sub="CPWD RATES · LOCATION · QUOTES" lx={620} ly={252} />
      {/* layer 2 — engine */}
      <IsoLayer x={3.2} y={0.9} w={1.7} d={1.3} h={1.1} delay={0.4} label="COST INTELLIGENCE ENGINE" sub="ESTIMATION CORE" accent pulsing lx={620} ly={330} />
      {/* layer 3 — workflows */}
      <IsoLayer x={4.9} y={0.75} w={1.0} d={0.8} h={1.5} delay={0.65} label="WORKFLOWS" sub="ESTIMATE · MONITOR · COMPARE" lx={620} ly={400} />

      {/* users flag */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <line x1={pt(3.4, 2.9, 0)[0]} y1={pt(3.4, 2.9, 0)[1]} x2={pt(3.4, 2.9, 0)[0]} y2={pt(3.4, 2.9, 0)[1] - 70} stroke="rgba(111,227,255,0.5)" strokeWidth="1" />
        <path d={`M ${pt(3.4, 2.9, 0)[0]} ${pt(3.4, 2.9, 0)[1] - 70} l 34 -6 l -4 16 z`} fill="rgba(255,176,32,0.9)" />
        <text x={pt(3.4, 2.9, 0)[0] + 44} y={pt(3.4, 2.9, 0)[1] - 78} fill="#e8f2ff" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
          ENGINEERS + HOMEOWNERS
        </text>
      </motion.g>

      {/* output callout */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <rect x="150" y="438" width="300" height="52" fill="rgba(8,24,43,0.85)" stroke="rgba(111,227,255,0.35)" strokeWidth="1" />
        <line x1="150" y1="462" x2="450" y2="462" stroke="rgba(111,227,255,0.2)" strokeWidth="0.7" />
        <text x="164" y="455" fill="#6fe3ff" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.14em">
          OUTPUT: BUDGET HEALTH · QUOTE INTELLIGENCE
        </text>
        <text x="164" y="478" fill="#5c7291" fontSize="8" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
          DECISIONS BEFORE COMMITMENT, NOT AFTER
        </text>
        <line x1={wx} y1={wy} x2="150" y2="446" stroke="rgba(255,176,32,0.6)" strokeWidth="0.8" strokeDasharray="3 3" />
      </motion.g>

      {/* pipes */}
      <motion.path
        d={`M ${pt(2.0, 1.15, 0.5)} L ${pt(4.05, 1.55, 1.1)}`}
        stroke="rgba(255,176,32,0.6)"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.85, duration: 0.5 }}
      />
      <motion.path
        d={`M ${pt(4.9, 1.55, 1.1)} L ${pt(5.4, 1.15, 1.5)}`}
        stroke="rgba(255,176,32,0.6)"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.05, duration: 0.5 }}
      />
      <text x={wx2} y={wy2 + 16} fill="#5c7291" fontSize="8" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
        LAYERED, NOT MONOLITHIC
      </text>

      {/* dim line */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
        stroke="rgba(159,180,204,0.6)"
        strokeWidth="0.8"
      >
        <line x1={pt(0, 3.4, 0)[0]} y1={pt(0, 3.4, 0)[1] + 24} x2={pt(7, 3.4, 0)[0]} y2={pt(7, 3.4, 0)[1] + 24} />
        <line x1={pt(0, 3.4, 0)[0]} y1={pt(0, 3.4, 0)[1] + 18} x2={pt(0, 3.4, 0)[0]} y2={pt(0, 3.4, 0)[1] + 30} />
        <line x1={pt(7, 3.4, 0)[0]} y1={pt(7, 3.4, 0)[1] + 18} x2={pt(7, 3.4, 0)[0]} y2={pt(7, 3.4, 0)[1] + 30} />
        <text x={pt(3.5, 3.4, 0)[0]} y={pt(3.5, 3.4, 0)[1] + 40} fill="#9fb4cc" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
          PRODUCT LAYERS — 3 OF 3 DEPLOYED
        </text>
      </motion.g>
    </svg>
  );
}

/* ---------------- cost estimator widget ---------------- */

type Phase = "idle" | "computing" | "done";

const RATES: Record<string, number> = { rcc: 1850, load: 1450, premium: 2600 };
const FINISH: Record<string, number> = { standard: 1, premium: 1.28, luxury: 1.62 };
const TYPE_LABEL: Record<string, string> = { rcc: "RCC Framed", load: "Load Bearing", premium: "Premium Frame" };
const FINISH_LABEL: Record<string, string> = { standard: "Standard", premium: "Premium", luxury: "Luxury" };
const LOCATION_FACTOR = 1.06;

const TICKER = ["LOADING CPWD RATE BOOK …", "APPLYING LOCATION FACTOR ×1.06 …", "MATCHING 142 QUOTE SAMPLES …"];

function formatINR(n: number) {
  return "₹ " + n.toLocaleString("en-IN");
}

function Estimator() {
  const [area, setArea] = useState(1200);
  const [floors, setFloors] = useState(2);
  const [type, setType] = useState("rcc");
  const [finish, setFinish] = useState("standard");
  const [phase, setPhase] = useState<Phase>("idle");
  const [total, setTotal] = useState(0);
  const [tick, setTick] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const target = useMemo(
    () => Math.round(RATES[type] * area * floors * FINISH[finish] * LOCATION_FACTOR),
    [area, floors, type, finish]
  );

  const run = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("computing");
    setTotal(0);
    TICKER.forEach((_, i) => timers.current.push(setTimeout(() => setTick(i), 220 * i)));
    timers.current.push(
      setTimeout(() => {
        setPhase("done");
        animate(0, target, {
          duration: 1.15,
          ease: "easeOut",
          onUpdate: (v) => setTotal(Math.round(v)),
        });
      }, 1120)
    );
  };

  const breakdown = useMemo(
    () => [
      { label: "Structure", pct: 52, color: "#6fe3ff" },
      { label: "Finishing", pct: 22, color: "#8ee6a8" },
      { label: "Services", pct: 16, color: "#c9a8ff" },
      { label: "Contingency", pct: 10, color: "#ffb020" },
    ],
    []
  );

  const inputCls =
    "w-full border border-cyan/30 bg-navy-950/70 px-3 py-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-amber";

  return (
    <BlueprintCard className="flex h-full flex-col p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan/20 pb-4">
        <div>
          <p className="mono-label text-amber">FIELD KIT — COST ESTIMATOR</p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
            Demo of the BuildMe Cost Intelligence engine
          </p>
        </div>
        <span className="border border-cyan/30 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-cyan">
          v0.4 · DEMO
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 py-5">
        <label className="col-span-1 block">
          <span className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-ink-dim uppercase">Plot area (sq.ft)</span>
          <input
            type="number"
            min={200}
            max={20000}
            step={50}
            value={area}
            onChange={(e) => setArea(Math.max(0, Number(e.target.value) || 0))}
            className={inputCls}
            data-cursor-label="INPUT"
          />
        </label>
        <label className="col-span-1 block">
          <span className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-ink-dim uppercase">Floors</span>
          <input
            type="number"
            min={1}
            max={12}
            value={floors}
            onChange={(e) => setFloors(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
            className={inputCls}
            data-cursor-label="INPUT"
          />
        </label>
        <label className="col-span-1 block">
          <span className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-ink-dim uppercase">Structure type</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputCls} appearance-none`}>
            {Object.keys(RATES).map((k) => (
              <option key={k} value={k} className="bg-navy-900">
                {TYPE_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="col-span-1 block">
          <span className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-ink-dim uppercase">Finishing</span>
          <select value={finish} onChange={(e) => setFinish(e.target.value)} className={`${inputCls} appearance-none`}>
            {Object.keys(FINISH).map((k) => (
              <option key={k} value={k} className="bg-navy-900">
                {FINISH_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={run}
          disabled={phase === "computing"}
          className="group relative flex-1 overflow-hidden border border-amber bg-amber/10 px-5 py-3.5 font-mono text-xs tracking-[0.22em] text-amber uppercase transition-all duration-300 hover:bg-amber hover:text-navy-950 disabled:opacity-60"
          data-cursor-label="RUN"
        >
          {phase === "computing" ? "Computing…" : phase === "done" ? "Re-run estimate" : "Run estimate"}
          {phase === "computing" && (
            <span className="scan-bar absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber/60 to-transparent" />
          )}
        </button>
        <span className="font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">CPWD-style</span>
      </div>

      {/* computing ticker */}
      {phase === "computing" && (
        <div className="mt-4 space-y-1 border border-cyan/20 bg-navy-950/60 p-3 font-mono text-[11px]">
          {TICKER.map((t, i) => (
            <p key={i} className={i <= tick ? "text-cyan" : "text-ink-faint"}>
              {i <= tick ? "✓" : "·"} {t}
              {i === tick && i < TICKER.length - 1 && <span className="cursor-blink">▋</span>}
            </p>
          ))}
        </div>
      )}

      {/* result */}
      <div className={`mt-4 flex-1 transition-opacity duration-300 ${phase === "done" ? "opacity-100" : "opacity-40"}`}>
        <div className="flex items-end justify-between border-b border-cyan/25 pb-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-ink-dim uppercase">Estimated project cost</p>
            <p className="mt-1 font-display text-4xl font-bold text-ink tabular-nums">
              {formatINR(total)}
              {phase === "computing" && <span className="cursor-blink text-amber">_</span>}
            </p>
          </div>
          <span className="mb-1 font-mono text-[10px] text-ink-faint">± 8%</span>
        </div>
        <div className="mt-4 space-y-2.5">
          {breakdown.map((b, i) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-mono text-[10px] tracking-[0.14em] text-ink-dim uppercase">{b.label}</span>
              <div className="relative h-[7px] flex-1 overflow-hidden bg-navy-800">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: b.color }}
                  initial={{ width: 0 }}
                  animate={phase === "done" ? { width: `${b.pct}%` } : { width: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-[11px] text-ink-dim tabular-nums">{b.pct}%</span>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-cyan/10 pt-3 font-mono text-[9.5px] leading-relaxed tracking-[0.1em] text-ink-faint uppercase">
          Illustrative demo — rates are CPWD-style approximations. BuildMe benchmarks against real quotation data.
        </p>
      </div>
    </BlueprintCard>
  );
}

/* ---------------- section ---------------- */

export default function BuildMe() {
  return (
    <Section id="buildme" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="02"
          label="The Flagship"
          title={
            <>
              BuildMe<span className="text-amber">.</span>
            </>
          }
          meta={
            <div className="font-mono text-[11px] leading-loose tracking-[0.18em] text-ink-faint uppercase">
              <p>FOUNDED 2026 · IN ACTIVE DEVELOPMENT</p>
              <p className="text-cyan">STACK: NEXT.JS · REACT · TS · PRISMA</p>
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* architecture diagram */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5 }}
              className="mb-6 max-w-lg text-[15px] leading-relaxed text-ink-dim"
            >
              {BUILDME.problem}
            </motion.p>
            <div className="relative rounded-sm border border-cyan/15 bg-navy-900/40 p-2">
              <BuildScene />
              <span className="mono-label absolute top-3 left-4 text-ink-faint">FIG. 02 — SYSTEM ASSEMBLY</span>
            </div>

            {/* workflows */}
            <div className="mt-6">
              <p className="mono-label mb-3 text-cyan">WORKFLOW MODULES</p>
              <div className="flex flex-wrap gap-2">
                {BUILDME.workflows.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="group flex items-center gap-2 border border-cyan/25 bg-navy-900/70 px-3 py-2 font-mono text-[11px] tracking-[0.1em] text-ink-dim uppercase transition-all duration-300 hover:border-amber hover:text-amber"
                  >
                    <span className="h-1.5 w-1.5 rotate-45 bg-cyan/60 transition-colors group-hover:bg-amber" />
                    {w}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* estimator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Estimator />
          </motion.div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <Cutline label="SEC. 02 COMPLETE" right="ENGINE ONLINE" />
      </div>
    </Section>
  );
}