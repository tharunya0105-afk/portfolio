import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import {
  OPENSOURCE,
  PROFILE,
  PROJECTS,
  RESUME_BUILDME,
  RESUME_COURSEWORK,
  SKILL_GROUPS,
  SKILL_NODES,
} from "../data";
import { CloseIcon, GitHubMark, LinkedInMark, Location, Stamp } from "./icons";

/* ---------- reusable bits ---------- */

function SheetSection({ num, title, children, className = "" }: PropsWithChildren<{ num: string; title: string; className?: string }>) {
  return (
    <section className={className}>
      <div className="mb-1 flex items-center gap-2 border-b border-[#b8d4f0] pb-1">
        <span className="h-1.5 w-1.5 rotate-45 bg-[#ffb020]" />
        <span className="font-mono text-[8px] tracking-[0.22em] text-[#3a6ea5] uppercase">Sec. {num}</span>
        <h3 className="font-display text-[12px] font-bold tracking-wide text-[#0b2c4f] uppercase">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function SheetItem({ children }: PropsWithChildren) {
  return (
    <li className="flex gap-1.5 text-[9px] leading-[1.5] text-[#16375c]">
      <span className="mt-[5px] h-[3px] w-[3px] shrink-0 rotate-45 bg-[#ffb020]" />
      <span>{children}</span>
    </li>
  );
}

/* ---------- the drawing sheet ---------- */

function SheetBody() {
  const groupLabel = (id: string) => SKILL_GROUPS.find((g) => g.id === id)!.label;
  const groupSkills = (id: string) =>
    SKILL_NODES.filter((n) => n.group === id)
      .map((n) => n.label)
      .join(" · ");

  return (
    <div className="relative border-2 border-[#2c5f96] bg-[#f2f8ff] p-3 text-[#16375c]">
      {/* blueprint grid on the paper */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(44,95,150,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,95,150,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      {/* registration crosses */}
      {[
        "top-1.5 left-1.5",
        "top-1.5 right-1.5",
        "bottom-1.5 left-1.5",
        "bottom-1.5 right-1.5",
      ].map((pos) => (
        <span key={pos} className={`absolute ${pos} h-3 w-3 text-[#2c5f96]`} aria-hidden>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 0v4M6 8v4M0 6h4M8 6h4" />
          </svg>
        </span>
      ))}

      <div className="relative">
        {/* header */}
        <header className="border-b-2 border-[#2c5f96] pb-2.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[8px] tracking-[0.3em] text-[#3a6ea5] uppercase">
                Project: Curriculum Vitae — Personal Drawing
              </p>
              <h1 className="font-display text-[26px] leading-none font-bold tracking-tight text-[#0b2c4f] uppercase">
                Tharunya Swaminathan
              </h1>
              <p className="mt-1 font-mono text-[9.5px] tracking-[0.14em] text-[#3a6ea5] uppercase">
                BE Computer Science &amp; Engineering · Student Founder · Builder of BuildMe
              </p>
            </div>
            <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
              <span className="border-2 border-[#ff6b2c] px-2 py-0.5 font-mono text-[8px] tracking-[0.26em] text-[#ff6b2c] uppercase [transform:rotate(-5deg)]">
                Issued for review
              </span>
              <span className="font-mono text-[8px] tracking-[0.18em] text-[#3a6ea5] uppercase">
                {PROFILE.gradYear}
              </span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[8.5px] tracking-[0.08em] text-[#16375c]">
            <span className="flex items-center gap-1.5">
              <span className="grid h-3.5 w-3.5 place-items-center border border-[#2c5f96]">
                <Location className="h-2.5 w-2.5" />
              </span>
              {PROFILE.location}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="grid h-3.5 w-3.5 place-items-center border border-[#2c5f96]">
                <GitHubMark className="h-2.5 w-2.5" />
              </span>
              github.com/{PROFILE.github}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="grid h-3.5 w-3.5 place-items-center border border-[#2c5f96]">
                <LinkedInMark className="h-2.5 w-2.5" />
              </span>
              linkedin.com/in/{PROFILE.linkedin}
            </span>
            <span>{PROFILE.phone}</span>
          </div>
        </header>

        {/* body */}
        <div className="grid grid-cols-5 gap-4 py-2.5">
          {/* left column */}
          <div className="col-span-5 space-y-3 sm:col-span-2">
            <SheetSection num="1" title="Founder Profile">
              <p className="text-[9px] leading-[1.55] text-[#16375c]">
                CS undergrad and student founder building technology for real problems. Founded BuildMe — a
                construction decision-support platform helping residential-project engineers make better cost and
                planning decisions before and during construction. Hands-on across product development, data-driven
                cost estimation, open source, and AI-enabled prototypes.
              </p>
            </SheetSection>

            <SheetSection num="2" title="Technical Skills">
              <ul className="space-y-1">
                {SKILL_GROUPS.map((g) => (
                  <li key={g.id} className="text-[9px] leading-[1.5]">
                    <span className="font-mono text-[8px] font-bold tracking-[0.16em] text-[#3a6ea5] uppercase">
                      {groupLabel(g.id)}
                    </span>
                    <span className="text-[#16375c]"> — {groupSkills(g.id)}</span>
                  </li>
                ))}
              </ul>
            </SheetSection>

            <SheetSection num="3" title="Education">
              <p className="text-[9.5px] leading-[1.55] text-[#16375c]">
                <span className="font-bold">BE Computer Science &amp; Engineering</span>
                <br />
                Saranathan College of Engineering, Tamil Nadu · 2025–2029
              </p>
              <p className="mt-1 text-[9px] leading-[1.5] text-[#3a6ea5]">
                Coursework: {RESUME_COURSEWORK}
              </p>
            </SheetSection>

            <SheetSection num="4" title="Direction">
              <p className="text-[9.5px] leading-[1.6] text-[#16375c]">
                Moving BuildMe from functional prototype toward a validated, customer-driven startup — customer
                discovery, real construction data, and a focused engineer-first MVP.
              </p>
            </SheetSection>
          </div>

          {/* right column */}
          <div className="col-span-5 space-y-3 sm:col-span-3">
            <SheetSection num="5" title="Startup Experience">
              <p className="mb-1.5 text-[9.5px] font-bold text-[#0b2c4f]">
                BuildMe — Founder · Construction Decision-Support Platform · 2026–Present
              </p>
              <ul className="space-y-1">
                {RESUME_BUILDME.map((b, i) => (
                  <SheetItem key={i}>{b}</SheetItem>
                ))}
              </ul>
            </SheetSection>

            <SheetSection num="6" title="Open Source">
              <p className="mb-1.5 text-[9.5px] font-bold text-[#0b2c4f]">Eclipse OpenJ9 — Contributor · C++ / Runtime</p>
              <ul className="space-y-1">
                {OPENSOURCE.details.map((d, i) => (
                  <SheetItem key={i}>{d}</SheetItem>
                ))}
              </ul>
            </SheetSection>

            <SheetSection num="7" title="Selected Projects">
              <div className="space-y-2">
                {PROJECTS.map((p) => (
                  <div key={p.id}>
                    <p className="text-[9.5px] font-bold text-[#0b2c4f]">
                      {p.title} <span className="font-mono font-normal tracking-[0.12em] text-[#3a6ea5] uppercase">— {p.type}</span>
                    </p>
                    <ul className="mt-0.5 space-y-0.5">
                      {p.details.map((d, i) => (
                        <SheetItem key={i}>{d}</SheetItem>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SheetSection>
          </div>
        </div>

        {/* title block */}
        <div className="mt-1 flex items-stretch border-2 border-[#2c5f96]">
          {[
            ["PROJECT", "CURRICULUM VITAE"],
            ["DWG NO", "TS-CV-2026-001 · REV B"],
            ["SHEET", "1 OF 1 · SCALE 1:1"],
            ["DRAWN BY", "T. SWAMINATHAN"],
            ["DATE", "2026"],
          ].map(([k, v]) => (
            <div key={k} className="flex-1 border-r border-[#2c5f96] px-2 py-1.5 last:border-r-0">
              <p className="font-mono text-[7px] tracking-[0.2em] text-[#3a6ea5] uppercase">{k}</p>
              <p className="font-mono text-[8px] font-bold text-[#0b2c4f] uppercase">{v}</p>
            </div>
          ))}
        </div>

        {/* footer strip */}
        <footer className="mt-2 flex items-center justify-between border-t border-[#b8d4f0] pt-1.5 font-mono text-[7.5px] tracking-[0.22em] text-[#3a6ea5] uppercase">
          <span>© 2026 Tharunya Swaminathan — all drawings reserved</span>
          <span className="flex items-center gap-1.5">
            Built with React · Tailwind · Framer Motion
            <Stamp className="h-3 w-3" />
          </span>
        </footer>
      </div>
    </div>
  );
}

/* ---------- overlay + print ---------- */

export default function ResumeOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setClosing(false);
      onClose();
    }, 260);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[95] flex flex-col bg-navy-950/95 backdrop-blur-md transition-opacity duration-300 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="bp-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      {/* toolbar */}
      <div className="no-print relative z-10 flex items-center justify-between gap-3 border-b border-cyan/20 px-4 py-3 sm:px-6">
        <p className="font-mono text-[11px] tracking-[0.24em] text-cyan uppercase">
          Drawing sheet — TS-CV-2026-001
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="border border-amber bg-amber/10 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-amber uppercase transition-colors hover:bg-amber hover:text-navy-950"
            data-cursor-label="PRINT"
          >
            Print / Save as PDF
          </button>
          <button
            onClick={requestClose}
            className="grid h-9 w-9 place-items-center border border-cyan/40 text-cyan transition-colors hover:border-amber hover:text-amber"
            aria-label="Close drawing sheet"
            data-cursor-label="CLOSE"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
      {/* sheet viewport */}
      <div className="relative z-10 flex-1 overflow-auto p-4 sm:p-8">
        <div className="sheet-print mx-auto w-[min(820px,100%)] shadow-[0_20px_60px_rgba(5,13,26,0.7)]">
          <SheetBody />
        </div>
        <p className="no-print mt-4 pb-6 text-center font-mono text-[10px] tracking-[0.3em] text-ink-faint uppercase">
          Tip: choose "Save as PDF" in the print dialog — A4, blueprint style
        </p>
      </div>
    </div>
  );
}