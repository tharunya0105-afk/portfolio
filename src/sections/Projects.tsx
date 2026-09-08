import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Section, SectionHead, Cutline, BlueprintCard } from "../components/Section";
import { PROJECTS } from "../data";
import { Leaf, Shield, ArrowUpRight } from "../components/icons";

function TiltCard({ index }: { index: number }) {
  const p = PROJECTS[index];
  const [flipped, setFlipped] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const rxp = useMotionValue(0);
  const ryp = useMotionValue(0);
  const rx = useSpring(rxp, { stiffness: 180, damping: 20 });
  const ry = useSpring(ryp, { stiffness: 180, damping: 20 });

  const coarse = window.matchMedia("(pointer: coarse)").matches;

  const onMove = (e: React.MouseEvent) => {
    if (coarse) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rxp.set(py * -12);
    ryp.set(px * 16);
    setGlare({ x: (px + 0.5) * 100, y: (py + 0.5) * 100 });
  };

  const onLeave = () => {
    rxp.set(0);
    ryp.set(0);
  };

  const Icon = p.icon === "leaf" ? Leaf : Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{ perspective: 1400 }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative h-full min-h-[520px] cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
        data-cursor-label="FLIP"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="preserve-3d relative h-full"
        >
          {/* flip inner */}
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="preserve-3d relative h-full"
          >
            {/* FRONT */}
            <BlueprintCard className="backface-hidden absolute inset-0 flex h-full flex-col overflow-hidden p-7">
              {/* glare */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(420px circle at ${glare.x}% ${glare.y}%, rgba(111,227,255,0.09), transparent 60%)`,
                }}
              />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center border border-cyan/40 text-cyan transition-colors duration-300 group-hover:border-amber group-hover:text-amber">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="font-display text-6xl font-bold text-navy-700">{p.index}</span>
              </div>

              <div className="mt-6">
                <p className="mono-label mb-2 text-amber">{p.type}</p>
                <h3 className="font-display text-3xl font-bold text-ink">{p.title}</h3>
                <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-ink-dim uppercase">{p.subtitle}</p>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink-dim">{p.blurb}</p>

              <div className="mt-auto flex items-center justify-between pt-6">
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Inspect build sheet
                </span>
                <span className="border border-amber/50 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-amber">
                  {p.stat.k} · {p.stat.v}
                </span>
              </div>
            </BlueprintCard>

            {/* BACK */}
            <div className="backface-hidden absolute inset-0 h-full" style={{ transform: "rotateY(180deg)" }}>
              <BlueprintCard className="flex h-full flex-col bg-navy-900 p-7">
                <div className="flex items-center justify-between border-b border-cyan/20 pb-4">
                  <p className="mono-label text-cyan">BUILD SHEET — {p.index}</p>
                  <span className="font-mono text-[10px] text-ink-faint">TAP TO FLIP BACK</span>
                </div>
                <h4 className="mt-5 font-display text-2xl font-bold text-ink">{p.title}</h4>
                <ul className="mt-4 space-y-3">
                  {p.details.map((d, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-dim">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-cyan/70" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <p className="mono-label mb-2 text-ink-faint">MATERIALS</p>
                  <div className="flex flex-wrap gap-2">
                    {p.chips.map((c) => (
                      <span
                        key={c}
                        className="border border-cyan/30 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.1em] text-cyan uppercase"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-px border border-cyan/15 bg-cyan/15 pt-px">
                  <div className="bg-navy-900 p-3.5">
                    <p className="font-mono text-[9px] tracking-[0.2em] text-ink-faint uppercase">STATUS</p>
                    <p className="mt-1 font-mono text-[12px] text-ink">{p.index === "01" ? "HACKATHON MVP" : "ACTIVE SDK"}</p>
                  </div>
                  <div className="bg-navy-900 p-3.5">
                    <p className="font-mono text-[9px] tracking-[0.2em] text-ink-faint uppercase">SHEET</p>
                    <p className="mt-1 font-mono text-[12px] text-ink">SPEC-{p.index} / REV A</p>
                  </div>
                </div>
              </BlueprintCard>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="04"
          label="Selected Projects"
          title={
            <>
              Two builds, <span className="text-outline">two problem spaces.</span>
            </>
          }
          meta={
            <div className="font-mono text-[11px] leading-loose tracking-[0.18em] text-ink-faint uppercase">
              <p>ROTATE: HOVER · FLIP: CLICK</p>
              <p className="text-cyan">HOVER TO INSPECT — CLICK FOR THE BUILD SHEET</p>
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((_, i) => (
            <TiltCard key={i} index={i} />
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <Cutline label="SEC. 04 COMPLETE" right="SPECS ATTACHED" />
      </div>
    </Section>
  );
}