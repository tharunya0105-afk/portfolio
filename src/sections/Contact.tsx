import { useState } from "react";
import { motion } from "framer-motion";
import { Section, BlueprintCard } from "../components/Section";
import Magnetic from "../components/Magnetic";
import ResumeOverlay from "../components/ResumeSheet";
import { PROFILE, FOOTER_NOTE } from "../data";
import { ArrowUpRight, GitHubMark, LinkedInMark } from "../components/icons";

function SitePin({
  icon,
  name,
  handle,
  coords,
  className,
  delay,
  align = "left",
}: {
  icon: React.ReactNode;
  name: string;
  handle: string;
  coords: string;
  className: string;
  delay: number;
  align?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 16 }}
      className={`absolute ${className}`}
    >
      <div className={`group flex flex-col gap-2 ${align === "right" ? "items-end" : "items-start"}`}>
        <span className="pulse-ring relative grid h-10 w-10 place-items-center rounded-full border border-amber/70 bg-navy-900/90 text-amber transition-colors group-hover:bg-amber group-hover:text-navy-950">
          {icon}
        </span>
        <div className="border border-cyan/25 bg-navy-900/90 px-3 py-2 backdrop-blur-sm transition-colors group-hover:border-amber/50">
          <p className="font-display text-sm font-semibold text-ink">{name}</p>
          <p className="font-mono text-[10px] tracking-[0.12em] text-cyan">{handle}</p>
          <p className="mt-0.5 font-mono text-[9px] tracking-[0.16em] text-ink-faint uppercase">{coords}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <Section id="contact" className="overflow-hidden">
      {/* denser grid behind the finale */}
      <div className="bp-grid-dense pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-10">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mono-label mb-6 text-amber"
        >
          SEC. 07 — CONTACT / REACHABILITY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65 }}
          className="font-display max-w-4xl text-[clamp(2.4rem,7vw,4.6rem)] leading-[1.02] font-bold tracking-tight text-ink uppercase"
        >
          Have a blueprint?
          <br />
          <span className="text-amber">Let's build it.</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* map of reach */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-[380px] overflow-hidden border border-cyan/25 bg-navy-900/50 sm:h-[420px]">
              <div className="bp-grid absolute inset-0 opacity-70" />
              {/* site plan decorations */}
              <span className="mono-label absolute top-4 left-4 text-ink-faint">SITE PLAN — REACHABILITY</span>
              <span className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.2em] text-ink-faint">N ↑</span>
              {/* compass */}
              <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full border border-cyan/25">
                <div className="absolute inset-2 rounded-full border border-cyan/15" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 text-cyan">
                  <span className="block h-5 w-5 border-l border-t border-cyan/60" />
                </span>
              </div>
              <SitePin
                icon={<GitHubMark className="h-5 w-5" />}
                name="GitHub"
                handle={`@${PROFILE.github}`}
                coords="PULL REQUESTS WELCOME"
                className="top-[18%] left-[14%]"
                delay={0.2}
              />
              <SitePin
                icon={<LinkedInMark className="h-5 w-5" />}
                name="LinkedIn"
                handle={PROFILE.linkedin}
                coords="BUILDING IN PUBLIC"
                className="right-[10%] top-[30%]"
                delay={0.35}
                align="right"
              />
              {/* dashed routes */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 420" preserveAspectRatio="none" fill="none" aria-hidden>
                <motion.path
                  d="M 90 80 Q 200 60 300 120 T 520 300"
                  stroke="rgba(255,176,32,0.35)"
                  strokeWidth="1"
                  strokeDasharray="5 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </svg>
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
              FIG. 07 — TWO PINS, ONE PERSON, ZERO SPAM
            </p>
          </motion.div>

          {/* CTA */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <BlueprintCard className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="mono-label text-cyan">NEED IT ON PAPER?</p>
                      <p className="mt-1 font-display text-lg font-semibold text-ink">Get the drawing sheet</p>
                      <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">
                        TS-CV-2026-001 · A4 · print-ready blueprint résumé
                      </p>
                    </div>
                    <button
                      onClick={() => setResumeOpen(true)}
                      className="group flex items-center gap-2 border border-cyan/50 px-4 py-2.5 font-mono text-[11px] tracking-[0.2em] text-cyan uppercase transition-all duration-300 hover:border-amber hover:bg-amber/10 hover:text-amber"
                      data-cursor-label="OPEN"
                    >
                      Open plan
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </BlueprintCard>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="max-w-md text-[15px] leading-relaxed text-ink-dim"
              >
                Building something that needs cost intelligence, a sharp pair of hands on a C++ codebase, or a
                co-founder who ships? My inbox is a construction site — always accepting new projects.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-8"
              >
                <Magnetic strength={0.3}>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    data-cursor-label="SEND"
                    className="group inline-flex items-center gap-4 border-2 border-amber bg-amber px-8 py-4 font-mono text-sm tracking-[0.2em] text-navy-950 uppercase transition-all duration-300 hover:bg-transparent hover:text-amber"
                  >
                    Start a build
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-1 gap-px border border-cyan/20 bg-cyan/15 sm:grid-cols-3"
            >
              {[
                { k: "EMAIL", v: PROFILE.email },
                { k: "PHONE", v: PROFILE.phone },
                { k: "BASE", v: "TAMIL NADU, IN" },
              ].map((c) => (
                <div key={c.k} className="bg-navy-900/90 p-4">
                  <p className="font-mono text-[9px] tracking-[0.24em] text-ink-faint uppercase">{c.k}</p>
                  <p className="mt-1.5 font-mono text-[12.5px] break-all text-ink-dim">{c.v}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <ResumeOverlay open={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* footer */}
        <footer className="relative mt-24 border-t border-cyan/20 pt-8 pb-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="font-display text-sm font-semibold tracking-wide text-ink uppercase">
                THARUNYA SWAMINATHAN
              </p>
              <p className="mt-1 max-w-md font-mono text-[10px] leading-relaxed tracking-[0.12em] text-ink-faint uppercase">
                {FOOTER_NOTE}
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="mono-label text-ink-faint">
                © 2026 · BE CSE '29 · ALL DRAWINGS RESERVED
              </span>
              <span className="flex items-center gap-3">
                <span className="mono-label text-cyan">BUILT WITH REACT · TAILWIND · FRAMER MOTION</span>
                <span className="stamp">PLAN APPROVED ✓</span>
              </span>
            </div>
          </div>
          <p className="mt-10 text-center font-mono text-[10px] tracking-[0.5em] text-ink-faint uppercase">
            — END OF DRAWING —
          </p>
        </footer>
      </div>
    </Section>
  );
}