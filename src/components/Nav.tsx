import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS, PROFILE } from "../data";
import { smoothScrollHandler } from "../lib/scroll";
import { BlocksMark, CloseIcon, MenuIcon } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 48));

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setVisible(true);
  };
  const closeMenu = () => {
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 280);
  };

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-[80]"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 ${
            scrolled ? "py-2.5" : "py-5"
          }`}
        >
          <a
            href="#top"
            className={`group flex items-center gap-2.5 transition-colors duration-300 ${
              scrolled ? "" : ""
            }`}
            aria-label="Back to top"
            data-cursor-label="TOP"
          >
            <span
              className={`grid h-9 w-9 place-items-center border border-cyan/50 text-cyan transition-all duration-500 group-hover:rotate-12 group-hover:border-amber group-hover:text-amber ${
                scrolled ? "bg-navy-900/80" : "bg-transparent"
              }`}
            >
              <BlocksMark className="h-5 w-5" />
            </span>
            <span className="hidden font-mono text-[11px] tracking-[0.28em] text-ink-dim sm:block">
              THARUNYA<span className="text-cyan">.</span>SWAMINATHAN
            </span>
          </a>

          {/* desktop links */}
          <nav
            className={`hidden items-center gap-1 border px-2 transition-all duration-500 lg:flex ${
              scrolled
                ? "border-cyan/25 bg-navy-900/85 py-1.5 shadow-[0_8px_30px_rgba(5,13,26,0.6)] backdrop-blur-md"
                : "border-transparent bg-transparent"
            }`}
          >
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={smoothScrollHandler}
                data-cursor-label={l.label}
                className="group relative px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-ink-dim uppercase transition-colors duration-200 hover:text-ink"
              >
                <span className="mr-1 text-[9px] text-cyan/60">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
                <span className="absolute inset-x-2 bottom-0.5 h-px scale-x-0 bg-amber transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-cursor-label="CONTACT"
              className="hidden border border-amber/60 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-amber uppercase transition-all duration-300 hover:bg-amber hover:text-navy-950 md:block"
            >
              Let's build
            </a>
            <button
              onClick={visible ? closeMenu : openMenu}
              className="grid h-10 w-10 place-items-center border border-cyan/40 text-cyan transition-colors hover:border-amber hover:text-amber lg:hidden"
              aria-label={visible ? "Close menu" : "Open menu"}
            >
              {visible ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile overlay */}
      {visible && (
        <div
          className={`fixed inset-0 z-[70] flex flex-col bg-navy-950/98 backdrop-blur-md transition-opacity duration-300 ${
            closing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="bp-grid absolute inset-0 opacity-50" />
          <nav className="relative flex flex-1 flex-col justify-center gap-1 px-8">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  smoothScrollHandler(e);
                  closeMenu();
                }}
                style={{ transitionDelay: `${closing ? 0 : 0.1 + i * 0.06}s` }}
                className={`group flex items-baseline gap-4 border-b border-cyan/15 py-4 transition-all duration-300 ${
                  closing ? "translate-x-6 opacity-0" : "translate-x-0 opacity-100"
                }`}
              >
                <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                <span className="font-display text-3xl font-semibold text-ink transition-colors group-hover:text-amber">
                  {l.label}
                </span>
                <span className="ml-auto h-2 w-2 rotate-45 border border-cyan/40" />
              </a>
            ))}
            <p
              className={`mt-10 font-mono text-[11px] tracking-[0.25em] text-ink-faint uppercase transition-opacity duration-300 ${
                closing ? "opacity-0" : "opacity-100"
              }`}
              style={{ transitionDelay: `${closing ? 0 : 0.7}s` }}
            >
              {PROFILE.location}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}