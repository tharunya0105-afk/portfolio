import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section, SectionHead, Cutline, BlueprintCard } from "../components/Section";
import { GIT_DIFF, GIT_LOG, OPENSOURCE } from "../data";
import { GitCommit, GitFork, TerminalIcon } from "../components/icons";

function useTypedOnce(text: string, active: boolean, cps = 95, instant = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    setN(instant ? text.length : 0);
    if (instant) return;
    const delay = Math.floor(1000 / cps);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, delay);
    return () => clearInterval(id);
  }, [active, text, cps, instant]);
  return n;
}

function LogPane({ started, instant }: { started: boolean; instant: boolean }) {
  const text = GIT_LOG.map((l) => `${l.hash}  ${l.msg}`).join("\n");
  const shown = useTypedOnce(text, started, 95, instant);
  const full = shown >= text.length;

  return (
    <div className="border border-cyan/25 bg-navy-950/90">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-cyan/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-orange/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
        <span className="ml-3 flex items-center gap-2 font-mono text-[11px] text-ink-dim">
          <TerminalIcon className="h-3.5 w-3.5 text-cyan" />
          openj9 — git log
        </span>
      </div>
      <div className="min-h-[280px] p-5 font-mono text-[12.5px] leading-[1.9]">
        <p className="text-ink-dim">
          <span className="text-cyan">tharunya@build</span>
          <span className="text-ink-faint"> ~/openj9 % </span>
          <span className="text-ink">git log --oneline -5</span>
        </p>
        {GIT_LOG.map((l, i) => {
          const lineStart = GIT_LOG.slice(0, i).reduce((a, x) => a + x.msg.length + 9, 0);
          const visible = Math.max(0, Math.min(l.msg.length + 9, shown - lineStart));
          if (visible <= 0 && !full) return null;
          const fullLine = visible >= l.msg.length + 9;
          return (
            <p key={i} className="whitespace-pre">
              <span className="text-amber">{l.hash.slice(0, 7)}</span>
              <span className="text-ink-faint">  </span>
              <span className={fullLine ? "text-ink-dim" : "text-ink"}>{l.msg.slice(0, Math.max(0, visible - 9))}</span>
              {!fullLine && <span className="cursor-blink text-cyan">▋</span>}
              {fullLine && <span className="ml-3 text-[10px] text-ink-faint">{l.when}</span>}
            </p>
          );
        })}
        {full && <p className="mt-2 text-ink-faint">(END) — {GIT_LOG.length} commits, upstream repo</p>}
      </div>
    </div>
  );
}

function DiffPane({ started, instant }: { started: boolean; instant: boolean }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (!started) return;
    setRevealed(instant ? GIT_DIFF.length : 0);
    if (instant) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= GIT_DIFF.length) clearInterval(id);
    }, 320);
    return () => clearInterval(id);
  }, [started, instant]);

  const colorFor = (k: string) =>
    k === "add" ? "text-[#8ee6a8]" : k === "rem" ? "text-[#ff8f6b]" : "text-ink-faint";

  return (
    <div className="border border-cyan/25 bg-navy-950/90">
      <div className="flex items-center gap-2 border-b border-cyan/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-orange/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
        <span className="ml-3 flex items-center gap-2 font-mono text-[11px] text-ink-dim">
          <GitFork className="h-3.5 w-3.5 text-cyan" />
          openj9 — git diff · const-correctness
        </span>
      </div>
      <div className="min-h-[280px] p-5 font-mono text-[12.5px] leading-[1.9]">
        <p className="text-ink-dim">
          <span className="text-cyan">tharunya@build</span>
          <span className="text-ink-faint"> ~/openj9 % </span>
          <span className="text-ink">git diff --cached --stat</span>
        </p>
        <p className="mt-1 text-ink-dim">
          <span className="text-amber">14 files changed</span>, 62 insertions(+), 3 deletions(-)
        </p>
        <p className="mt-3 text-ink-faint">diff --git a/runtime/env.cc b/runtime/env.cc</p>
        {GIT_DIFF.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={revealed > i ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.2 }}
            className={`whitespace-pre ${colorFor(l.kind)}`}
          >
            <span className="mr-3 inline-block w-4 select-none text-center opacity-60">{l.prefix}</span>
            {l.text}
          </motion.p>
        ))}
        {revealed >= GIT_DIFF.length && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-cyan">
            ✓ compile clean — merged
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default function OpenSource() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });
  const reduced = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const started = inView;
  const instant = Boolean(reduced);

  return (
    <Section id="opensource" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="03"
          label="Open Source"
          title={
            <>
              Commits, <span className="text-outline">not résumé lines.</span>
            </>
          }
          meta={
            <div className="font-mono text-[11px] leading-loose tracking-[0.18em] text-ink-faint uppercase">
              <p>PROJECT: ECLIPSE OPENJ9</p>
              <p className="text-cyan">ROLE: CONTRIBUTOR — C++ / RUNTIME</p>
            </div>
          }
        />

        <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <LogPane key={runId} started={started} instant={instant} />
            <div className="mt-6">
              <DiffPane key={runId} started={started} instant={instant} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <BlueprintCard className="h-full p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center border border-cyan/40 text-cyan">
                  <GitCommit className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-ink">{OPENSOURCE.project}</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-ink-dim uppercase">{OPENSOURCE.role}</p>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-ink-dim">{OPENSOURCE.intro}</p>

              <p className="mono-label mb-3 text-cyan">WHAT LANDED</p>
              <ul className="space-y-3">
                {OPENSOURCE.details.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: i * 0.12, duration: 0.45 }}
                    className="flex gap-3 border border-cyan/15 bg-navy-900/60 p-3.5 text-[13px] leading-relaxed text-ink-dim"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rotate-45 border border-amber bg-amber/30" />
                    {d}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 border border-dashed border-cyan/25 p-4">
                <p className="mono-label mb-2 text-amber">ENGINEERING NOTE</p>
                <p className="font-mono text-[11.5px] leading-relaxed text-ink-faint">
                  const-correctness is load-bearing code: it converts "please don't mutate" into "the compiler
                  refuses." Same principle BuildMe applies to budgets.
                </p>
              </div>

              <button
                onClick={() => setRunId((r) => r + 1)}
                className="mt-6 w-full border border-cyan/40 py-3 font-mono text-[11px] tracking-[0.22em] text-cyan uppercase transition-all duration-300 hover:border-amber hover:bg-amber/10 hover:text-amber"
                data-cursor-label="REPLAY"
              >
                ↻ Replay the build log
              </button>
            </BlueprintCard>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <Cutline label="SEC. 03 COMPLETE" right="PUSHED UPSTREAM" />
      </div>
    </Section>
  );
}