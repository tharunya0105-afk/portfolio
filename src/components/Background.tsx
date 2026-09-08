const NODES = [
  { x: "8%", y: "22%", s: 3, d: "0s", delay: "0s" },
  { x: "84%", y: "12%", s: 2, d: "7s", delay: "1.2s" },
  { x: "72%", y: "68%", s: 3, d: "11s", delay: "0.4s" },
  { x: "14%", y: "82%", s: 2, d: "9s", delay: "2s" },
  { x: "46%", y: "36%", s: 2, d: "13s", delay: "0.8s" },
  { x: "91%", y: "42%", s: 3, d: "8s", delay: "1.6s" },
  { x: "30%", y: "58%", s: 2, d: "12s", delay: "0.2s" },
  { x: "60%", y: "88%", s: 3, d: "10s", delay: "2.6s" },
];

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* major structural grid */}
      <div className="bp-grid-major absolute inset-0 opacity-70" />
      {/* minor grid, drifting slowly */}
      <div className="bp-grid absolute inset-0 opacity-80">
        <div className="grid-drift absolute -inset-y-20 inset-x-0 h-[calc(100%+160px)] bp-grid-dense opacity-60" />
      </div>
      <div className="grid-drift-x absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      {/* drifting nodes */}
      {NODES.map((n, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan/40"
          style={{
            left: n.x,
            top: n.y,
            width: n.s,
            height: n.s,
            animation: `drift ${n.d} ease-in-out infinite`,
            animationDelay: n.delay,
            boxShadow: "0 0 8px rgba(111,227,255,0.35)",
          }}
        />
      ))}

      {/* vignette + glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,13,26,0.55)_78%,rgba(5,13,26,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(18,48,79,0.5),transparent_70%)]" />
    </div>
  );
}