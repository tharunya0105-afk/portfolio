import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHead, Cutline } from "../components/Section";
import { MILESTONES } from "../data";

export default function Path() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="roadmap" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="06"
          label="Education & Direction"
          title={
            <>
              The roadmap <span className="text-outline">reads like a build plan.</span>
            </>
          }
          meta={
            <div className="font-mono text-[11px] leading-loose tracking-[0.18em] text-ink-faint uppercase">
              <p>PROGRESS: 3 OF 4 MILESTONES</p>
              <p className="text-cyan">PATH STATUS: BEING PAVED IN REAL TIME</p>
            </div>
          }
        />

        <div ref={railRef} className="relative">
          {/* the rail that draws itself */}
          <div className="absolute top-2 bottom-2 left-[17px] w-px md:left-1/2 md:-translate-x-1/2">
            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 2 1000" fill="none">
              <path d="M1 0 V1000" stroke="rgba(63,168,201,0.25)" strokeWidth="1.5" strokeDasharray="6 8" />
              <motion.path
                d="M1 0 V1000"
                stroke="#ffb020"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-14 md:space-y-20">
            {MILESTONES.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <div key={i} className={`relative md:grid md:grid-cols-2 md:gap-16 ${left ? "" : ""}`}>
                  {/* marker */}
                  <div className="absolute top-7 left-[11px] z-10 md:left-1/2 md:-translate-x-1/2">
                    <motion.span
                      initial={{ scale: 0, rotate: 45 }}
                      whileInView={{ scale: 1, rotate: 45 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
                      className={`block h-3.5 w-3.5 ${
                        m.state === "future"
                          ? "border border-dashed border-amber bg-navy-950"
                          : "bg-cyan shadow-[0_0_14px_rgba(111,227,255,0.8)]"
                      }`}
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: left ? -46 : 46, y: 18 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    className={`relative pl-12 md:pl-0 ${
                      left
                        ? "md:col-start-1 md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div
                      className={`group relative border bg-navy-900/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber/50 sm:p-7 ${
                        m.state === "future" ? "border-dashed border-amber/40" : "border-cyan/25"
                      }`}
                    >
                      {/* corner ticks */}
                      <span className="absolute top-0 left-0 h-2 w-2 -translate-x-px -translate-y-px border-t border-l border-cyan/60" />
                      <span className="absolute top-0 right-0 h-2 w-2 -translate-y-px translate-x-px border-t border-r border-cyan/60" />
                      <span className="absolute bottom-0 left-0 h-2 w-2 -translate-x-px translate-y-px border-b border-l border-cyan/60" />
                      <span className="absolute right-0 bottom-0 h-2 w-2 translate-x-px translate-y-px border-r border-b border-cyan/60" />

                      <div className={`mb-3 flex items-center gap-3 ${left ? "md:justify-end" : ""}`}>
                        <span className="mono-label text-amber">
                          MILESTONE {String(i + 1).padStart(2, "0")} — {m.tag}
                        </span>
                        <span className="hidden h-px w-10 bg-cyan/25 md:block" />
                      </div>

                      <p
                        className={`font-display text-6xl font-bold ${
                          m.state === "future" ? "text-outline" : "text-navy-600 group-hover:text-cyan/40"
                        } transition-colors duration-300`}
                      >
                        {m.year}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">{m.title}</h3>
                      <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-cyan uppercase">{m.org}</p>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-dim md:ml-auto">{m.body}</p>

                      {m.state === "future" && (
                        <span className="absolute -top-3 right-4 border border-amber/60 bg-navy-950 px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] text-amber uppercase">
                          IN PROGRESS
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* empty grid slot keeps alternating rhythm */}
                  <div className={`hidden md:block ${left ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`} />
                </div>
              );
            })}
          </div>

          {/* end cap */}
          <div className="relative mt-16 pl-12 md:pl-0 md:text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-col items-start gap-2 md:items-center"
            >
              <span className="border border-cyan/30 px-4 py-2 font-mono text-[11px] tracking-[0.24em] text-cyan uppercase">
                → NEXT MILESTONE: CUSTOMERS, NOT CREDENTIALS
              </span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-ink-faint uppercase">
                BE CSE '29 · SARANATHAN COLLEGE OF ENGINEERING
              </span>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <Cutline label="SEC. 06 COMPLETE" right="PATH PAVED" />
      </div>
    </Section>
  );
}