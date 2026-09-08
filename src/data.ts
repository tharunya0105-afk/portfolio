export const PROFILE = {
  name: "Tharunya Swaminathan",
  shortName: "THARUNYA SWAMINATHAN",
  role: "Student Founder. Builder of BuildMe. Engineer of Ideas.",
  tagline:
    "CS undergrad building construction tech for the people who actually build — freelance civil engineers, site by site.",
  phone: "+91 98949 83239",
  email: "hello@tharunya.dev",
  github: "tharunya0105-afk",
  linkedin: "Tharunya Swaminathan",
  location: "Saranathan College of Engineering, Tamil Nadu",
  gradYear: "Expected graduation · 2029",
};

export const FOUNDER_STORY = [
  {
    heading: "The gap I kept hitting",
    body: "Every residential project in India runs on the same silent failure: design decisions, contractor quotations, and real construction costs never talk to each other until it's too late. Engineers commit to numbers they can't verify, and budgets bleed out mid-build.",
  },
  {
    heading: "So I built the missing layer",
    body: "BuildMe is a decision-support platform for freelance civil engineers managing multiple residential sites — with homeowners as the beneficiaries. It turns scattered quotes and CPWD rate books into one cost intelligence layer: estimate, compare, monitor, decide.",
  },
  {
    heading: "How I work",
    body: "Customer discovery before code. Engineer-first MVP. Real data over slides. I collect actual quotation datasets to benchmark estimation reliability, then let the product earn its place site by site.",
  },
];

export const FOUNDER_STATS = [
  { value: "2026", label: "BuildMe founded" },
  { value: "1", label: "startup in active build" },
  { value: "2", label: "flagship projects shipped" },
  { value: "1", label: "production OSS project" },
];

export const BUILDME = {
  name: "BuildMe",
  subtitle: "Construction Decision-Support Platform",
  founded: "2026 — Present",
  problem:
    "Design decisions, contractor quotations, and construction costs live in different worlds. BuildMe connects them before commitment — so engineers stop discovering cost overruns at the worst possible moment.",
  workflows: [
    "Cost Estimation",
    "Design-to-Cost Analysis",
    "Project / Site Monitoring",
    "Budget Health",
    "Contractor-Quote Intelligence",
  ],
  stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "API Routes", "Prisma / SQLite", "AI Integrations"],
  engine: [
    { label: "CPWD base rates", note: "govt. schedule of rates" },
    { label: "Time + location factors", note: "adjusted per site" },
    { label: "Quote benchmarks", note: "real contractor data" },
  ],
};

export const OPENSOURCE = {
  project: "Eclipse OpenJ9",
  role: "Contributor · C++ compiler / runtime",
  intro:
    "Production JVM, used by millions of containers. My contributions landed in the const-correctness work across compiler and environment components — tightening type contracts the way you'd reinforce a frame before it takes load.",
  details: [
    "Const-correctness improvements across C++ compiler / environment components",
    "Updated declarations, definitions, and dependent usages to match conventions",
    "Git discipline: branches, diffs, status checks, and change tracking on a real upstream repo",
  ],
};

export const GIT_LOG = [
  { hash: "a1f4c2e", msg: "openj9: const-correctness pass over environment interfaces", when: "3 days ago" },
  { hash: "9d8b113", msg: "openj9: mark read-only params const in compiler util paths", when: "6 days ago" },
  { hash: "4c7e02a", msg: "openj9: align const qualifiers with codebase conventions", when: "1 week ago" },
  { hash: "b2f90d8", msg: "openj9: declare lookup tables const in rate engine (buildme)", when: "2 weeks ago" },
  { hash: "e5a3c77", msg: "buildme: cost intelligence engine — CPWD rate loader", when: "3 weeks ago" },
];

export const GIT_DIFF = [
  { prefix: "-", text: "const char* resolveBaseRate(const char* code);", kind: "rem" },
  { prefix: "+", text: "const char* const resolveBaseRate(const char* const code);", kind: "add" },
  { prefix: " ", text: "// pinning pointer + pointee: zero accidental mutation", kind: "ctx" },
  { prefix: "+", text: "static const RateEntry kRates[] = { /* CPWD 2026 */ };", kind: "add" },
  { prefix: " ", text: "int main(void) { return estimateSite(kRates, SITE_1); }", kind: "ctx" },
];

export const PROJECTS = [
  {
    id: "crop",
    index: "01",
    title: "Crop Disease AI",
    subtitle: "Autonomous Crop Pest & Disease Containment Network",
    type: "Agentic AI · Hackathon",
    icon: "leaf" as const,
    blurb:
      "An agentic containment network that spots disease from a leaf image, scores its own confidence, weighs environmental factors and prior cases — then triggers detection → prediction → response.",
    details: [
      "Leaf-image identification with confidence scoring",
      "Environmental factors + previous-case memory",
      "Structured detection, prediction & response loop",
    ],
    chips: ["Python", "LLM Agents", "CV Pipelines", "FastAPI"],
    stat: { k: "3-stage", v: "agent pipeline" },
  },
  {
    id: "prism",
    index: "02",
    title: "Prism SDK",
    subtitle: "AI Privacy Layer",
    type: "React · TypeScript · Vite",
    icon: "shield" as const,
    blurb:
      "A privacy layer that sits between your data and any AI application — redacting, masking, and scoping sensitive information before it ever leaves your side.",
    details: [
      "Redacts / masks sensitive fields pre-inference",
      "Drop-in SDK for React + Vite apps",
      "Policy-driven: what the model sees is what you allow",
    ],
    chips: ["React", "TypeScript", "Vite", "REST"],
    stat: { k: "0-trust", v: "default posture" },
  },
];

export const SKILL_GROUPS = [
  { id: "lang", label: "LANGUAGES", color: "#6fe3ff" },
  { id: "dev", label: "DEVELOPMENT", color: "#ffb020" },
  { id: "data", label: "DATA / BACKEND", color: "#8ee6a8" },
  { id: "core", label: "CORE CS", color: "#c9a8ff" },
  { id: "tools", label: "TOOLS", color: "#ff8f6b" },
];

export const SKILL_NODES = [
  { id: "java", label: "Java", group: "lang", x: 90, y: 120 },
  { id: "c", label: "C", group: "lang", x: 210, y: 70 },
  { id: "python", label: "Python", group: "lang", x: 330, y: 120 },
  { id: "react", label: "React", group: "dev", x: 560, y: 60 },
  { id: "ts", label: "TypeScript", group: "dev", x: 690, y: 110 },
  { id: "next", label: "Next.js", group: "dev", x: 830, y: 70 },
  { id: "vite", label: "Vite", group: "dev", x: 960, y: 120 },
  { id: "rest", label: "REST APIs", group: "dev", x: 1100, y: 70 },
  { id: "sql", label: "SQL", group: "data", x: 600, y: 260 },
  { id: "prisma", label: "Prisma", group: "data", x: 760, y: 300 },
  { id: "sqlite", label: "SQLite", group: "data", x: 920, y: 250 },
  { id: "dsa", label: "DSA", group: "core", x: 320, y: 320 },
  { id: "oop", label: "OOP", group: "core", x: 480, y: 360 },
  { id: "git", label: "Git", group: "tools", x: 140, y: 420 },
  { id: "github", label: "GitHub", group: "tools", x: 300, y: 470 },
  { id: "linux", label: "Linux", group: "tools", x: 470, y: 500 },
  { id: "vscode", label: "VS Code", group: "tools", x: 640, y: 460 },
];

// undirected edges between skill nodes (by id)
export const SKILL_EDGES: [string, string][] = [
  ["java", "dsa"],
  ["c", "dsa"],
  ["c", "oop"],
  ["python", "dsa"],
  ["python", "rest"],
  ["react", "ts"],
  ["react", "vite"],
  ["react", "rest"],
  ["ts", "next"],
  ["ts", "rest"],
  ["next", "prisma"],
  ["next", "sqlite"],
  ["sql", "prisma"],
  ["prisma", "sqlite"],
  ["sql", "dsa"],
  ["git", "github"],
  ["git", "linux"],
  ["linux", "vscode"],
  ["git", "vscode"],
  ["java", "oop"],
  ["python", "prisma"],
];

export const MILESTONES = [
  {
    year: "2025",
    tag: "GROUNDBREAKING",
    title: "BE Computer Science & Engineering",
    org: "Saranathan College of Engineering, Tamil Nadu",
    body: "Started the degree that would become the foundation — coursework in Data Structures, OOP, Data Science, Digital Principles & Computer Organization.",
    state: "done",
  },
  {
    year: "2026",
    tag: "FOUNDATION",
    title: "Founded BuildMe",
    org: "Construction decision-support platform",
    body: "Identified the residential-construction cost gap, built the first web prototype, and shipped the Cost Intelligence engine combining CPWD rates, location factors, and real quotation data.",
    state: "done",
  },
  {
    year: "2026",
    tag: "OPEN SOURCE",
    title: "Eclipse OpenJ9 contributions",
    org: "Production-grade JVM",
    body: "Landed const-correctness improvements across C++ compiler / environment components — learning upstream discipline on a codebase that runs in production at scale.",
    state: "done",
  },
  {
    year: "2027 →",
    tag: "THE BUILD AHEAD",
    title: "Validated, customer-driven startup",
    org: "Engineer-first MVP → real revenue",
    body: "Customer discovery with freelance engineers, growing construction-cost benchmarks, and turning BuildMe from a working prototype into a company people pay for.",
    state: "future",
  },
];

export const NAV_LINKS = [
  { id: "profile", label: "Profile" },
  { id: "buildme", label: "BuildMe" },
  { id: "opensource", label: "Open Source" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "roadmap", label: "Roadmap" },
  { id: "contact", label: "Contact" },
];

export const RESUME_BUILDME = [
  "Identified a recurring residential-construction problem: design decisions, contractor quotations, and construction costs never connect before commitment.",
  "Built a working web prototype for freelance civil engineers managing multiple residential sites — with homeowners as beneficiaries.",
  "Developed a Cost Intelligence engine: CPWD base rates × time/location adjustments × construction-cost reference data.",
  "Shipped workflows for cost estimation, design-to-cost analysis, site monitoring, budget health, and contractor-quote intelligence.",
  "Collected and structured construction-cost datasets and quotation data to benchmark estimation reliability.",
  "Built with Next.js, React, TypeScript, Tailwind CSS, API routes, Prisma/SQLite, and AI integrations — iterating on an engineer-first MVP.",
];

export const RESUME_COURSEWORK =
  "Data Structures, OOP, Data Science, Digital Principles & Computer Organization";

export const FOOTER_NOTE =
  "Drawn, engineered, and deployed by Tharunya Swaminathan. No templates were harmed — this one is a custom build, like everything else here.";