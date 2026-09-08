import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

/** Two stacked isometric building blocks — the brand mark */
export function BlocksMark(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" opacity={0.6} />
      <path d="M8.5 5.3 16.5 9.7M7.5 15.4l3.2 1.9" opacity={0.5} />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.4-6.5-10.4a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.3" />
    </svg>
  );
}

export function Compass(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      <path d="M12 12.6v-1.2" />
    </svg>
  );
}

export function Cube(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path d="M4 8l8 4.5L20 8M12 12.5V21" opacity={0.65} />
    </svg>
  );
}

export function Ruler(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="9" width="18" height="6" rx="1" transform="rotate(-12 12 12)" />
      <path d="m7.2 13.4.9-2M10.6 12.5l.9-2M14 11.6l.9-2" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 19c0-8 5-13 14-14 0 9-4.5 14-12 14" />
      <path d="M5 19c2.5-4 6-7.5 10-9.5" />
      <path d="M5 19c-1-3 1-6 4-7.5" opacity={0.6} />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 19 5.5v6c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5v-6L12 3Z" />
      <path d="M9 11.8 11.2 14 15.5 9.6" />
    </svg>
  );
}

export function GitCommit(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9V3.5M12 15v5.5" />
    </svg>
  );
}

export function GitFork(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="6" cy="5.5" r="2.2" />
      <circle cx="18" cy="5.5" r="2.2" />
      <circle cx="12" cy="18.5" r="2.2" />
      <path d="M6 7.7v1.3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.7" />
      <path d="M12 14.3v-2.3" />
    </svg>
  );
}

/** Minimal cat-face mark standing in for GitHub */
export function GitHubMark(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5c-4.4 0-8 3.5-8 7.8 0 3.5 2.3 6.4 5.4 7.4.4.1.5-.2.5-.4v-1.3c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.3.8 1.3.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3-1.8 3.7-3.6 3.9.3.3.5.7.5 1.4v2.1c0 .2.1.5.5.4a8 8 0 0 0 5.4-7.4c0-4.3-3.6-7.8-8-7.8Z" />
    </svg>
  );
}

export function LinkedInMark(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V16M8 7.6v.1" />
      <path d="M12 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" />
      <path d="M8 10.5h0" />
    </svg>
  );
}

export function Crosshair(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="m7 9.5 3 2.8-3 2.8M12.5 15.5H17" />
    </svg>
  );
}

export function Gear(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8" />
    </svg>
  );
}

export function Stamp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 8h8M8 12h8M8 16h5" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Location(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5c-3.3 0-6 2.6-6 5.9 0 4.4 6 11.1 6 11.1s6-6.7 6-11.1c0-3.3-2.7-5.9-6-5.9Z" />
      <path d="M12 12a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" />
    </svg>
  );
}