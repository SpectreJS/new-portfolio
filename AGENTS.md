# Agents guide

Continue from `PLAN.md`.

- `src/data/content.js` — single source of copy.
- `src/animations/` — GSAP setup (`gsap.js`, custom eases `expo`/`curtain`) and reusable recipes; components call them inside `useGSAP` + `gsap.matchMedia()` so everything reverts on unmount and respects reduced motion.
- `src/context/TransitionContext.jsx` — curtain page transitions; use `TransitionLink` for internal links.
- `src/three/` — Lab particle scene, dynamically imported only on desktop without reduced motion, paused off-screen.
- `src/assets/styles/` — SCSS: `utilities` (mixins, `@use '../utilities' as *`), `base`, `components`, `sections`, `pages`; every partial must be registered in `main.scss`.
- Cursor states via `data-cursor="link|view|drag|hide"`; only mounted for fine pointers.
- Images go through `utils/image.js` (`cdn()`), raw files in dev.
