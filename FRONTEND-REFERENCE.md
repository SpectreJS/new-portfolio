# Front-End Design & Architecture Reference

## ROLE

Tu es un expert Front-End spécialisé en :

* React
* Vite
* JavaScript / TypeScript
* SCSS / CSS
* GSAP
* Three.js / WebGL
* UI/UX premium
* Responsive Web Design
* Motion Design
* Creative Development
* Design inspiré des meilleurs sites Awwwards

Ce fichier `.md` constitue une **référence technique et créative** pour les futurs projets.

---

# OBJECTIF PRINCIPAL

Créer des sites web modernes, premium, immersifs et hautement animés en réutilisant une même philosophie :

**Architecture réutilisable + Design System + Animation System + Theme + Content**

Le nouveau projet doit pouvoir conserver les mêmes principes techniques et interactions tout en ayant une identité visuelle complètement différente.

Exemples de thèmes possibles :

* Real Estate
* Travel
* Luxury Hotel
* Architecture
* Automobile
* Portfolio
* Digital Agency
* Restaurant
* Fashion
* Event
* Technology
* Finance
* Corporate

Le thème ne doit jamais être considéré comme une contrainte technique.

---

## 1. ANALYSE DU PROJET DE RÉFÉRENCE

Avant de développer un nouveau projet, analyse le projet de référence fourni avec ce fichier.

Identifie :

* architecture React
* structure des dossiers
* composants
* pages
* routing
* gestion des données
* assets
* SCSS / CSS
* design tokens
* responsive
* animations
* GSAP
* Three.js
* interactions
* transitions
* navigation
* composants UI
* performances
* accessibilité

Ne copie pas aveuglément la structure.

Identifie les principes réutilisables.

---

## 2. PHILOSOPHIE D'ARCHITECTURE

Séparer clairement :

### ENGINE

Tout ce qui constitue le moteur technique :

* React
* routing
* composants
* animations
* transitions
* interactions
* responsive
* utilities
* hooks
* layout system

### DESIGN SYSTEM

Tout ce qui définit l'apparence :

* couleurs
* typographies
* spacing
* tailles
* boutons
* cards
* formes
* borders
* shadows
* backgrounds
* gradients

### THEME

Tout ce qui définit l'univers visuel du projet.

Exemple :

```
theme/
├── colors
├── typography
├── components
├── backgrounds
├── animations
└── imagery
```

### CONTENT

Tout ce qui concerne le contenu :

* textes
* images
* vidéos
* titres
* descriptions
* services
* produits
* destinations
* propriétés
* témoignages
* CTA

---

## 3. RÉUTILISABILITÉ

Les composants doivent être conçus pour être réutilisés.

Exemples :

```
Header
Hero
Button
Card
Section
Gallery
Slider
Modal
Navigation
Footer
Loader
PageTransition
```

Éviter de créer des composants fortement dépendants du contenu.

Mauvais :

```text
// Composant qui mélange layout, styles et contenu spécifique
<ProjectCard title="Maison A" price="€1.200.000"/>
```

Bon :

```text
// Composant générique
<Card title={title} subtitle={subtitle} image={src}>{children}</Card>
```

---

## 4. STRUCTURE DE DOSSIERS (RECOMMANDATION)

```
src/
├── assets/
│   ├── images/
│   ├── svgs/
│   └── fonts/
├── components/
│   ├── ui/         # boutons, inputs, badges
│   ├── layout/     # Header, Footer, Grid
│   └── sections/   # Sections réutilisables (Hero, Works)
├── context/
├── data/           # contenu (JSON / JS)
├── hooks/
├── pages/
├── three/          # scènes three.js et helpers
├── animations/     # GSAP timelines réutilisables
├── styles/
│   ├── base/
│   ├── components/
│   ├── sections/
│   └── utilities/
├── utils/
└── App.jsx
```

---

## 5. DESIGN TOKENS

Centraliser les tokens : `src/assets/styles/utilities/_variables.scss` ou `design-tokens.json`.

Tokens recommandés :

* colors: primary, secondary, neutral, accent, background, surface
* type: font-family, scale, line-height
* spacing: xs, sm, md, lg, xl
* radii, shadows, z-index

---

## 6. STYLES ET SCSS

Principes :

* `@use` et `@forward` pour scinder les partials
* Variables centralisées
* Mixins pour responsive, fluid type et utilities
* Éviter les sélecteurs trop spécifiques
* Favoriser des classes utilitaires pour positionnement et layout

Convention :

```
styles/
├── base/_reset.scss
├── base/_typography.scss
├── components/_button.scss
├── sections/_hero.scss
└── utilities/_mixins.scss
```

---

## 7. ANIMATION SYSTEM (GSAP)

Principes :

* Centraliser les timelines réutilisables dans `src/animations/`
* Exposer des helpers `animateIn`, `animateOut`, `stagger()`
* Respecter `prefers-reduced-motion` et le mode reduced-motion du site
* Utiliser `matchMedia` pour responsive animation

Exemple :

```
src/animations/
├── gsap.js       # GSAP setup + utilities
├── hero.js       # timeline du Hero
└── reveals.js     # reveal recipes
```

---

## 8. THREE.JS / WEBGL

Principes :

* Isoler la scène dans `src/three/` avec un wrapper React
* Charger les ressources via `GLTFLoader` et `DRACOLoader` si besoin
* Offrir une fallback statique pour mobile / reduced motion
* Décharger et nettoyer la scène au unmount

Structure :

```
src/three/
├── Scene.jsx
├── LabScene.js
├── loaders.js
└── shaders.js
```

---

## 9. ROUTING & NAVIGATION

Principes :

* `react-router` pour routing
* `TransitionLink` pour animations de navigation
* Router minimal : `/<home>, /works, /project/:id, /about, /contact`
* Précharger les assets critiques au hover (link prefetch)

---

## 10. ACCESSIBILITÉ

Principes :

* Contraste suffisant pour textes importants
* Focus visible et logique
* Navigation clavier complète
* ARIA pour composants complexes (modals, sliders)
* Respecter `prefers-reduced-motion`

---

## 11. PERFORMANCE

Conseils :

* Code-splitting par route
* Lazy-loading des scènes Three.js
* Optimiser images (WebP, AVIF)
* Préconnect / preload critical assets
* Minifier CSS/JS et tree-shaking

---

## 12. TESTS & QUALITY

* Linting: `eslint` + `prettier`
* Type checking: TypeScript or `prop-types`
* Visual regression: Percy / Chromatic (optional)

---

## 13. DEPLOY

* Static host: Netlify / Vercel / GitHub Pages
* Add caching headers and asset fingerprinting
* CI: run `build`, `lint`, `typecheck`

---

## 14. TEMPLATE CHECKLIST

Avant release:

* [ ] Responsive checks desktop / tablet / mobile
* [ ] Reduced motion verified
* [ ] Lighthouse score baseline
* [ ] Accessibility audit (axe)
* [ ] Performance budget met

---

## 15. BONNES PRATIQUES & NOTES

* Favoriser composition over configuration lourde
* Garder l'API des composants simple et prévisible
* Documenter les composants (Storybook ou MDX)
* Centraliser les assets et le contenu
* Versionner `node` avec `.nvmrc` ou `engines` dans `package.json`

---

Fichier de référence généré pour usage interne — adapter au besoin du projet.
