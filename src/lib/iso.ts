import { useMemo } from "react";

export const C = Math.cos(Math.PI / 6);
export const S = Math.sin(Math.PI / 6);

export type Pt = [number, number];

/** Iso projection: (x, y, z) → screen [sx, sy]. Defaults sized for a 800×560 viewBox. */
export function useProjector(s = 42, ox = 400, oy = 300) {
  return useMemo(
    () =>
      (x: number, y: number, z = 0): Pt => [
        ox + (x - y) * s * C,
        oy + (x + y) * s * S - z * s,
      ],
    [s, ox, oy]
  );
}

export type Cube = { faces: { d: string; fill: string }[]; edges: string[] };

/** Builds the faces/edges of an isometric box. */
export function useCube() {
  const pt = useProjector();
  return (x: number, y: number, w: number, d: number, h: number): Cube => {
    const tl = pt(x, y, h);
    const tr = pt(x + w, y, h);
    const br = pt(x + w, y + d, h);
    const bl = pt(x, y + d, h);
    const tlb = pt(x, y, 0);
    const trb = pt(x + w, y, 0);
    const brb = pt(x + w, y + d, 0);
    const blb = pt(x, y + d, 0);
    const P = (pts: Pt[]) => pts.map((p) => p.join(",")).join(" ");
    const faces = [
      { d: P([tl, tr, br, bl]), fill: "rgba(38,76,120,0.5)" },
      { d: P([tlb, trb, tr, tl]), fill: "rgba(12,32,56,0.85)" },
      { d: P([trb, brb, br, tr]), fill: "rgba(18,44,78,0.8)" },
    ];
    const edges = [
      `${tl[0]},${tl[1]} ${tr[0]},${tr[1]} ${br[0]},${br[1]} ${bl[0]},${bl[1]} ${tl[0]},${tl[1]}`,
      `${tlb[0]},${tlb[1]} ${trb[0]},${trb[1]}`,
      `${trb[0]},${trb[1]} ${brb[0]},${brb[1]}`,
      `${brb[0]},${brb[1]} ${br[0]},${br[1]}`,
      `${blb[0]},${blb[1]} ${bl[0]},${bl[1]}`,
      `${tlb[0]},${tlb[1]} ${blb[0]},${blb[1]}`,
    ];
    return { faces, edges };
  };
}