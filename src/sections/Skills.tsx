import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHead, Cutline } from "../components/Section";
import { SKILL_EDGES, SKILL_GROUPS, SKILL_NODES } from "../data";

const CHIP_W = 92;
const CHIP_H = 34;

type NodeT = (typeof SKILL_NODES)[number];

function trace(a: NodeT, b: NodeT): string {
  const ax = a.x + CHIP_W / 2;
  const bx = b.x - CHIP_W / 2;
  const mx = (ax + bx) / 2;
  return `M ${ax} ${a.y} H ${mx} V ${b.y} H ${bx}`;
}

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  const { edges, neighbors } = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const [a, b] of SKILL_EDGES) {
      if (!map.has(a)) map.set(a, new Set());
      if (!map.has(b)) map.set(b, new Set());
      map.get(a)!.add(b);
      map.get(b)!.add(a);
    }
    return { edges: SKILL_EDGES, neighbors: map };
  }, []);

  const groupById = useMemo(
    () => Object.fromEntries(SKILL_GROUPS.map((g) => [g.id, g])),
    []
  );

  const groupRects = useMemo(() => {
    const rects: Record<string, { x: number; y: number; w: number; h: number; id: string }> = {};
    for (const g of SKILL_GROUPS) {
      const nodes = SKILL_NODES.filter((n) => n.group === g.id);
      if (!nodes.length) continue;
      const x0 = Math.min(...nodes.map((n) => n.x - CHIP_W / 2)) - 34;
      const y0 = Math.min(...nodes.map((n) => n.y - CHIP_H / 2)) - 30;
      const x1 = Math.max(...nodes.map((n) => n.x + CHIP_W / 2)) + 34;
      const y1 = Math.max(...nodes.map((n) => n.y + CHIP_H / 2)) + 34;
      rects[g.id] = { x: x0, y: y0, w: x1 - x0, h: y1 - y0, id: g.id };
    }
    return rects;
  }, []);

  const isLit = (id: string) => active === id || (active !== null && neighbors.get(active)?.has(id));
  const dimAll = active !== null;

  return (
    <Section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="05"
          label="Technical Skills"
          title={
            <>
              A circuit, <span className="text-outline">not a progress bar.</span>
            </>
          }
          meta={
            <div className="font-mono text-[11px] leading-loose tracking-[0.18em] text-ink-faint uppercase">
              <p>HOVER A NODE TO TRACE ITS CONNECTIONS</p>
              <p className="text-cyan">EVERYTHING REACHES EVERYTHING ELSE</p>
            </div>
          }
        />

        <div className="relative overflow-hidden border border-cyan/15 bg-navy-900/30">
          <div className="bp-grid absolute inset-0 opacity-50" />
          <div className="no-scrollbar relative overflow-x-auto">
            <div className="relative min-w-[760px] p-4 sm:min-w-[980px]">
              <svg viewBox="0 0 1200 580" className="block h-auto w-full" aria-label="Skill network circuit diagram">
                {/* group boxes */}
                {Object.values(groupRects).map((r) => {
                  const g = groupById[r.id];
                  const lit = active !== null && SKILL_NODES.find((n) => n.id === active)?.group === r.id;
                  return (
                    <motion.rect
                      key={r.id}
                      x={r.x}
                      y={r.y}
                      width={r.w}
                      height={r.h}
                      rx="6"
                      fill="none"
                      stroke={g.color}
                      strokeOpacity={lit ? 0.9 : dimAll ? 0.25 : 0.45}
                      strokeWidth="1"
                      strokeDasharray="5 4"
                      animate={{ strokeOpacity: lit ? 0.9 : dimAll ? 0.25 : 0.45 }}
                    />
                  );
                })}
                {Object.values(groupRects).map((r) => (
                  <text
                    key={`l${r.id}`}
                    x={r.x + 10}
                    y={r.y + 16}
                    fill={groupById[r.id].color}
                    fontSize="9.5"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="0.24em"
                  >
                    {groupById[r.id].label}
                  </text>
                ))}

                {/* traces */}
                {edges.map(([a, b], i) => {
                  const na = SKILL_NODES.find((n) => n.id === a)!;
                  const nb = SKILL_NODES.find((n) => n.id === b)!;
                  const touched = active === a || active === b;
                  return (
                    <motion.path
                      key={i}
                      d={trace(na, nb)}
                      fill="none"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                      className={touched ? "trace-flow" : undefined}
                      animate={{
                        stroke: touched ? "#ffb020" : "#3fa8c9",
                        strokeOpacity: dimAll && !touched ? 0.18 : touched ? 0.95 : 0.4,
                      }}
                    />
                  );
                })}

                {/* nodes */}
                {SKILL_NODES.map((n) => {
                  const g = groupById[n.group];
                  const lit = isLit(n.id);
                  const isActive = active === n.id;
                  return (
                    <g
                      key={n.id}
                      transform={`translate(${n.x} ${n.y})`}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActive(n.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(n.id)}
                      onBlur={() => setActive(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={n.label}
                    >
                      {/* pins */}
                      {[-CHIP_W / 2, CHIP_W / 2].map((px) => (
                        <motion.g key={px} animate={{ opacity: lit || !dimAll ? 1 : 0.3 }}>
                          <line
                            x1={px}
                            y1={-9}
                            x2={px + Math.sign(px) * 6}
                            y2={-9}
                            stroke={lit ? "#ffb020" : "#3fa8c9"}
                            strokeWidth="1"
                          />
                          <line
                            x1={px}
                            y1={9}
                            x2={px + Math.sign(px) * 6}
                            y2={9}
                            stroke={lit ? "#ffb020" : "#3fa8c9"}
                            strokeWidth="1"
                          />
                          <circle cx={px + Math.sign(px) * 6} cy={-9} r="1.6" fill={lit ? "#ffb020" : "#3fa8c9"} />
                          <circle cx={px + Math.sign(px) * 6} cy={9} r="1.6" fill={lit ? "#ffb020" : "#3fa8c9"} />
                        </motion.g>
                      ))}
                      <motion.rect
                        x={-CHIP_W / 2}
                        y={-CHIP_H / 2}
                        width={CHIP_W}
                        height={CHIP_H}
                        rx="3"
                        fill={lit ? "rgba(255,176,32,0.08)" : "rgba(8,24,43,0.85)"}
                        stroke={lit ? "#ffb020" : g.color}
                        strokeOpacity={lit || !dimAll ? 0.8 : 0.3}
                        strokeWidth={isActive ? 1.6 : 1}
                        animate={{ strokeWidth: isActive ? 1.6 : 1 }}
                      />
                      {isActive && (
                        <motion.rect
                          x={-CHIP_W / 2 - 4}
                          y={-CHIP_H / 2 - 4}
                          width={CHIP_W + 8}
                          height={CHIP_H + 8}
                          rx="5"
                          fill="none"
                          stroke="#ffb020"
                          strokeWidth="1"
                          initial={{ opacity: 0.9, scale: 0.9 }}
                          animate={{ opacity: [0.9, 0, 0.9], scale: 1.06 }}
                          transition={{ repeat: Infinity, duration: 1.6 }}
                        />
                      )}
                      <text
                        textAnchor="middle"
                        y="3.5"
                        fill={lit ? "#e8f2ff" : "#9fb4cc"}
                        fontSize="11.5"
                        fontFamily="'JetBrains Mono', monospace"
                        letterSpacing="0.06em"
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* legend */}
          <div className="relative flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-cyan/15 px-5 py-3.5 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" /> TRACE LIT = CONNECTED
            </span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-3 w-3 rounded-[3px] border border-cyan/50" /> CHIP = SKILL
            </span>
            <span className="ml-auto hidden text-cyan/70 md:block">HOVER TO LIGHT THE BOARD</span>
            <span className="text-ink-faint md:hidden">SWIPE THE BOARD →</span>
          </div>
        </div>

        {/* mobile fallback chips */}
        <div className="mt-6 md:hidden">
          <p className="mono-label mb-3 text-cyan">QUICK REFERENCE</p>
          <div className="flex flex-wrap gap-2">
            {SKILL_NODES.map((n) => (
              <span
                key={n.id}
                className="border border-cyan/25 px-2.5 py-1.5 font-mono text-[11px] text-ink-dim uppercase"
              >
                {n.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <Cutline label="SEC. 05 COMPLETE" right="ALL TRACES LIVE" />
      </div>
    </Section>
  );
}