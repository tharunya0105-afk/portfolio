import { animate } from "framer-motion";

/** JS-driven smooth scroll to a section id — reliable in every environment. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - 84 // fixed nav clearance
  );
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.min(y, max);
  animate(window.scrollY, target, {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
    // behavior: "instant" bypasses CSS scroll-behavior:smooth,
    // which can be broken in some embedded webviews.
    onUpdate: (v) => window.scrollTo({ top: v, behavior: "instant" }),
  });
}

/** Event handler for anchors: smooth-scrolls instead of a hard jump. */
export function smoothScrollHandler(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#") && href.length > 1) {
    e.preventDefault();
    scrollToId(href.slice(1));
  }
}