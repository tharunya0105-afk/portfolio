import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUILD_LINES = [
  "> init build plan ........................ THARUNYA-2026",
  "> drafting blueprint layers .............. ok",
  "> loading fonts [sora / inter / jbmono] .. ok",
  "> compiling sections [7/7] ............... ok",
  "> stamping plan .......................... APPROVED",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BUILD_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLines(i + 1), 260 + i * 380));
    });
    // progress bar
    const start = Date.now();
    const DURATION = 2050;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / DURATION);
      setPct(Math.round(t * 100));
      if (t < 1) timers.push(setTimeout(tick, 40));
    };
    timers.push(setTimeout(tick, 120));

    timers.push(
      setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 650);
      }, 2450)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    setVisible(false);
    setTimeout(onDone, 300);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-center overflow-hidden bg-navy-950"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          onClick={skip}
          aria-label="Blueprint compiling — click to skip"
        >
          <div className="bp-grid absolute inset-0 opacity-60" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />

          <div className="relative mx-auto w-full max-w-xl px-6">
            <div className="mb-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber" />
              </span>
              <span className="mono-label text-cyan">BLUEPRINT COMPILING — DO NOT TOUCH THE PAPER</span>
            </div>

            <div className="space-y-2 font-mono text-[12px] leading-relaxed sm:text-[13px]">
              {BUILD_LINES.slice(0, lines).map((l, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    l.includes("APPROVED")
                      ? "text-amber"
                      : l.includes("...") && i === lines - 1
                        ? "text-ink-dim"
                        : "text-ink-dim"
                  }
                >
                  {l}
                  {i === lines - 1 && lines < BUILD_LINES.length && (
                    <span className="cursor-blink text-cyan">▋</span>
                  )}
                </motion.p>
              ))}
              {lines === BUILD_LINES.length && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 text-amber">
                  ✓ PLAN APPROVED — RELEASING BUILD
                </motion.p>
              )}
            </div>

            <div className="mt-10">
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-ink-faint">
                <span>PROGRESS</span>
                <span className="text-cyan">{String(pct).padStart(3, "0")}%</span>
              </div>
              <div className="relative h-[3px] w-full overflow-hidden bg-navy-700/60">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan/60 via-cyan to-amber"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {/* scan highlight */}
              <div className="relative mt-1 h-[3px] w-full overflow-hidden">
                <div className="scan-bar absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
              </div>
            </div>

            <p className="mt-8 text-center font-mono text-[10px] tracking-[0.3em] text-ink-faint uppercase">
              click anywhere to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}