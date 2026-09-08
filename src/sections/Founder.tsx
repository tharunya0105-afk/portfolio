import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHead, Cutline, BlueprintCard } from "../components/Section";
import { FOUNDER_STORY, FOUNDER_STATS, PROFILE } from "../data";
import { Stamp } from "../components/icons";

export default function Founder() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 0.85", "start 0.35"],
  });
  const unroll = useTransform(scrollYProgress, [0, 1], [0.06, 1]);

  return (
    <Section id="profile">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="01"
          label="Founder Profile"
          title={
            <>
              Built by hand.
              <br />
              <span className="text-outline">Site by site.</span>
            </>
          }
          meta={
            <div className="font-mono text-[11px] leading-loose tracking-[0.18em] text-ink-faint uppercase">
              <p>DOC. THR-2026-001</p>
              <p>SHEET 01 OF 01</p>
              <p className="text-cyan">STATUS: IN ACTIVE BUILD</p>
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* left rail */}
          <div className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-28 space-y-6 font-mono text-[10px] leading-loose tracking-[0.2em] text-ink-faint uppercase">
              <div>
                <p className="text-cyan">A-A</p>
                <p>SECTION</p>
              </div>
              <div className="h-24 border-l border-dashed border-cyan/30" />
              <div>
                <p>DRAWN BY</p>
                <p className="text-ink-dim">T. SWAMINATHAN</p>
              </div>
              <div>
                <p>CHECKED BY</p>
                <p className="text-ink-dim">FIELD NOTEBOOK</p>
              </div>
              <div>
                <p>DATE</p>
                <p className="text-ink-dim">2025 → NOW</p>
              </div>
            </div>
          </div>

          {/* the scroll */}
          <div ref={scrollRef} className="lg:col-span-10">
            <div className="relative" style={{ perspective: 1200 }}>
              {/* rolled edge at the bottom of the scroll */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 rounded-b-[50%_18px] bg-gradient-to-t from-navy-700/80 to-transparent"
                style={{ opacity: useTransform(scrollYProgress, [0.15, 0.85], [1, 0]) }}
              />
              <motion.div style={{ scaleY: unroll, transformOrigin: "top" }} className="will-change-transform">
                <BlueprintCard className="p-6 sm:p-10">
                  {/* document header */}
                  <div className="border-b border-cyan/25 pb-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="mono-label mb-2 text-cyan">ISSUED FOR REVIEW — FOUNDER PROFILE</p>
                        <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                          {PROFILE.name}
                        </h3>
                        <p className="mt-1 font-mono text-xs tracking-[0.12em] text-ink-dim uppercase">
                          {PROFILE.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="stamp">APPROVED ✓</span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                          {PROFILE.gradYear}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* story */}
                  <div className="grid grid-cols-1 gap-6 border-b border-cyan/15 py-7 md:grid-cols-3 md:gap-8">
                    {FOUNDER_STORY.map((s, i) => (
                      <motion.div
                        key={s.heading}
                        initial={{ opacity: 0, y: 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ delay: 0.15 + i * 0.18, duration: 0.55 }}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <span className="font-mono text-[10px] text-amber">0{i + 1}</span>
                          <span className="h-px flex-1 bg-cyan/20" />
                        </div>
                        <h4 className="mb-2 font-display text-lg font-semibold text-ink">{s.heading}</h4>
                        <p className="text-sm leading-relaxed text-ink-dim">{s.body}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* stats */}
                  <div className="grid grid-cols-2 gap-px overflow-hidden border border-cyan/15 bg-cyan/15 sm:grid-cols-4">
                    {FOUNDER_STATS.map((st, i) => (
                      <motion.div
                        key={st.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                        className="group bg-navy-900 p-5 transition-colors duration-300 hover:bg-navy-800"
                      >
                        <p className="font-display text-3xl font-bold text-cyan transition-colors group-hover:text-amber">
                          {st.value}
                        </p>
                        <p className="mt-1.5 font-mono text-[10px] leading-snug tracking-[0.14em] text-ink-dim uppercase">
                          {st.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* document footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                    <span className="flex items-center gap-2">
                      <Stamp className="h-4 w-4 text-cyan/70" />
                      CONSTRUCTION METAPHOR: INTENTIONAL
                    </span>
                    <span>REV B — SUPERSEDES ALL PRIOR DRAFTS</span>
                  </div>
                </BlueprintCard>
              </motion.div>

              {/* subtle tilt tied to scroll */}
              <motion.div
                className="pointer-events-none absolute -inset-3 z-10 border border-cyan/10"
                style={{ rotateX: useTransform(scrollYProgress, [0, 1], [14, 0]) }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <Cutline label="SEC. 01 COMPLETE" right="CONTINUE →" />
      </div>
    </Section>
  );
}