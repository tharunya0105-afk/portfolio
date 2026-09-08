# Tharunya Swaminathan — Portfolio

A single-page portfolio built around a **construction / blueprint** metaphor: isometric CAD hero, scroll-assembled project diagrams, a live cost-estimation widget, a git-log-style open-source section, and a skill constellation.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
```

## Structure

```
├── index.html
└── src/
    ├── App.tsx            # section composition + smooth scroll
    ├── data.ts            # all content (projects, skills, timeline)
    ├── components/        # Nav, Preloader, CustomCursor, Background, Magnetic, icons…
    └── sections/          # Hero, Profile, BuildMe, OpenSource, Projects, Skills, Path, Contact
```

## Related project

[Prism](https://github.com/tharunya0105-afk/prism) — the AI privacy layer (SDK + Chrome extension) featured in the Projects section.
