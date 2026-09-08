import type { PropsWithChildren, ReactNode } from "react";
import { motion } from "framer-motion";

/** Full-width section with scroll-margin and a cutline divider at the top. */
export function Section({
  id,
  children,
  className = "",
}: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <section id={id} className={`relative z-10 scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

/** Blueprint dimension-line divider between sections. */
export function Cutline({ label, right }: { label?: string; right?: string }) {
  return (
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="relative py-10">
        <div className="cutline" />
        {label && (
          <span className="mono-label absolute top-1/2 left-[15%] -translate-y-1/2 bg-navy-950 px-2 text-cyan">
            {label}
          </span>
        )}
        {right && (
          <span className="mono-label absolute top-1/2 right-[15%] -translate-y-1/2 bg-navy-950 px-2 text-ink-faint">
            {right}
          </span>
        )}
      </div>
    </div>
  );
}

/** Asymmetric section header: index label left, big display title, meta right. */
export function SectionHead({
  index,
  label,
  title,
  meta,
}: {
  index: string;
  label: string;
  title: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="mb-14 grid grid-cols-1 items-end gap-6 md:mb-20 md:grid-cols-12">
      <motion.div
        className="md:col-span-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-2 w-2 rotate-45 border border-amber bg-amber/20" />
          <span className="mono-label text-amber">{label}</span>
          <span className="mono-label text-ink-faint">/ SEC. {index}</span>
        </div>
        <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </motion.div>
      {meta && (
        <motion.div
          className="md:col-span-4 md:pb-2 md:text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {meta}
        </motion.div>
      )}
    </div>
  );
}

/** Small blueprint title-block card used across sections. */
export function BlueprintCard({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`relative border border-cyan/25 bg-navy-900/70 backdrop-blur-sm ${
        className || ""
      }`}
    >
      {/* corner ticks */}
      <span className="absolute top-0 left-0 h-2.5 w-2.5 -translate-x-px -translate-y-px border-t border-l border-cyan/70" />
      <span className="absolute top-0 right-0 h-2.5 w-2.5 -translate-y-px translate-x-px border-t border-r border-cyan/70" />
      <span className="absolute bottom-0 left-0 h-2.5 w-2.5 -translate-x-px translate-y-px border-b border-l border-cyan/70" />
      <span className="absolute right-0 bottom-0 h-2.5 w-2.5 translate-x-px translate-y-px border-r border-b border-cyan/70" />
      {children}
    </div>
  );
}