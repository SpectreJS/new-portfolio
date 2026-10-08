/**
 * Single source of truth for every piece of copy on the site.
 * Replace the identity, projects and experience below with your own.
 */

export const identity = {
	firstName: 'Tsiry',
	lastName: 'Razanakoto',
	initials: 'AV',
	role: 'Front-End Developer & Creative Developer',
	location: 'Paris, FR',
	timezone: 'Europe/Paris',
	email: 'hello@alexverdier.dev',
	availability: 'Disponible — projets freelance 2027',
	intro:
		"Je conçois et développe des expériences web où le code devient matière : interfaces React précises, motion design GSAP, univers 3D en temps réel et sites WordPress sur-mesure.",
}

export const socials = [
	{ label: 'GitHub', handle: '@tsiryrazanakoto', href: 'https://github.com/SpectreJS' },
	{ label: 'LinkedIn', handle: 'in/tsiryrazanakoto', href: 'https://www.linkedin.com/in/tsiry-razanakoto-b035a9170/?isSelfProfile=true' },
]

export const navigation = [
	{ label: 'Works', href: '/#works', index: '01' },
	{ label: 'About', href: '/#about', index: '02' },
	{ label: 'Lab', href: '/#lab', index: '03' },
	{ label: 'Contact', href: '/#contact', index: '04' },
]

export const about = {
	statement:
		"Je construis des interfaces qui se ressentent avant de se comprendre. Chaque transition a une intention, chaque pixel un rôle, chaque milliseconde compte.",
	bio: [
		"Développeur front-end depuis plus de six ans, je travaille à l'intersection du design et de l'ingénierie. J'accompagne studios, agences et marques dans la création de sites qui marquent — sans jamais sacrifier la performance ni l'accessibilité.",
		"Mon terrain de jeu : React pour l'architecture, GSAP pour le mouvement, Three.js pour la profondeur, WordPress pour donner les clés aux équipes.",
	],
	capabilities: [
		{ title: 'Interfaces React', text: 'Architecture de composants, design systems, SPA performantes.' },
		{ title: 'Motion & interaction', text: 'Timelines GSAP, ScrollTrigger, micro-interactions, transitions de pages.' },
		{ title: 'WebGL & 3D', text: 'Scènes Three.js, shaders légers, particules, expériences temps réel.' },
		{ title: 'WordPress sur-mesure', text: 'Thèmes custom, Elementor, Gutenberg, intégration pixel-perfect.' },
		{ title: 'Emailing', text: 'Templates HTML responsive, Brevo, compatibilité tous clients.' },
	],
}

export const projects = [
	{
		slug: 'noctis',
		title: 'Noctis',
		category: 'Expérience immersive',
		client: 'Maison Noctis — Parfums',
		year: '2026',
		role: 'Creative Development',
		image: '/img/noctis.png',
		tech: ['React', 'Three.js', 'GSAP', 'GLSL'],
		description:
			'Site de lancement pour une fragrance de niche : un flacon en verre rendu en temps réel, des transitions liquides et une narration au scroll.',
		challenge:
			"Traduire une fragrance — une matière invisible — en expérience visuelle. Le client voulait un site qui se vit comme une ouverture de flacon : lente, sensorielle, précieuse.",
		approach:
			"Une scène Three.js unique traverse toute la page. Le scroll pilote la caméra et la réfraction du verre ; GSAP orchestre la typographie autour. Un fallback image est servi sur mobile pour garder un premier rendu sous la seconde.",
		url: 'https://example.com',
	},
	{
		slug: 'atelier-mercure',
		title: 'Atelier Mercure',
		category: 'Site vitrine — WordPress',
		client: "Atelier Mercure — Architecture",
		year: '2025',
		role: 'Front-End & WordPress',
		image: '/img/mercure.png',
		tech: ['WordPress', 'Elementor', 'GSAP', 'SCSS'],
		description:
			"Portfolio éditorial pour un studio d'architecture brutaliste. Thème sur-mesure, galeries plein écran, back-office pensé pour l'équipe.",
		challenge:
			"Donner au studio l'autonomie d'Elementor sans perdre la rigueur d'une direction artistique éditoriale très stricte.",
		approach:
			"Des widgets Elementor développés sur-mesure, verrouillés sur la grille et la typographie du studio. Les animations GSAP sont déclarées par attributs, l'équipe les active sans toucher au code.",
		url: 'https://example.com',
	},
	{
		slug: 'pulse-records',
		title: 'Pulse Records',
		category: 'Label musical',
		client: 'Pulse Records',
		year: '2025',
		role: 'Front-End Development',
		image: '/img/pulse.png',
		tech: ['React', 'GSAP', 'Web Audio', 'Lenis'],
		description:
			'Catalogue interactif pour un label électronique : scroll horizontal, visualisation audio en direct, pochettes qui réagissent au son.',
		challenge:
			'Présenter 200 sorties sans tomber dans la grille de pochettes, et faire ressentir le son avant même de lancer la lecture.',
		approach:
			"Un catalogue en défilement horizontal synchronisé avec Lenis, des analyseurs Web Audio qui alimentent les déformations visuelles, le tout sous 100 Ko de JavaScript initial.",
		url: 'https://example.com',
	},
	{
		slug: 'maison-lumen',
		title: 'Maison Lumen',
		category: 'Design system emailing',
		client: 'Maison Lumen — Art de vivre',
		year: '2024',
		role: 'HTML Email & Brevo',
		image: '/img/lumen.png',
		tech: ['HTML Email', 'Brevo', 'MJML', 'Figma'],
		description:
			"Système de templates emailing modulaires pour une marque lifestyle : 24 blocs, rendu identique d'Outlook à Apple Mail.",
		challenge:
			"Industrialiser des campagnes premium hebdomadaires tout en conservant l'élégance éditoriale de la marque, sur des clients mail aux moteurs de rendu hostiles.",
		approach:
			"Une bibliothèque de blocs testés sur 40 clients, intégrée à Brevo avec des zones éditables. Le temps de production d'une campagne est passé de deux jours à deux heures.",
		url: 'https://example.com',
	},
	{
		slug: 'orbital-lab',
		title: 'Orbital Lab',
		category: 'Data visualisation WebGL',
		client: 'Orbital — Recherche spatiale',
		year: '2024',
		role: 'Creative Development',
		image: '/img/orbital.png',
		tech: ['Three.js', 'GLSL', 'React', 'GSAP'],
		description:
			'80 000 débris orbitaux rendus en temps réel dans le navigateur. Une expérience pédagogique pour comprendre la pollution spatiale.',
		challenge:
			"Afficher des dizaines de milliers d'objets en mouvement à 60 fps, y compris sur des ordinateurs portables modestes.",
		approach:
			"Les positions sont calculées dans un vertex shader à partir des paramètres orbitaux : le CPU ne fait presque rien. GSAP pilote les chapitres narratifs et la caméra.",
		url: 'https://example.com',
	},
]

export const skills = [
	{ name: 'React', detail: 'Hooks, architecture, perf', depth: 0.9, shape: 'pill' },
	{ name: 'JavaScript', detail: 'ES2024, TypeScript', depth: 0.5, shape: 'pill' },
	{ name: 'HTML', detail: 'Sémantique & a11y', depth: 0.7, shape: 'circle' },
	{ name: 'SCSS', detail: 'Architecture, BEM', depth: 0.4, shape: 'pill' },
	{ name: 'GSAP', detail: 'Timelines, ScrollTrigger', depth: 1, shape: 'pill', accent: true },
	{ name: 'Three.js', detail: 'WebGL, GLSL', depth: 0.6, shape: 'circle' },
	{ name: 'WordPress', detail: 'Thèmes sur-mesure', depth: 0.8, shape: 'pill' },
	{ name: 'Elementor', detail: 'Widgets custom', depth: 0.3, shape: 'pill' },
	{ name: 'Brevo / HTML Email', detail: 'Templates responsive', depth: 0.65, shape: 'pill' },
]

export const experience = [
	{
		period: '2026',
		role: 'Site of the Day — Noctis',
		company: 'Reconnaissance',
		text: 'Projet primé pour sa direction artistique et son usage du temps réel.',
	},
	{
		period: '2023 — Now',
		role: 'Creative Developer — Freelance',
		company: 'Indépendant',
		text: "Expériences immersives et sites premium pour agences et marques. Direction technique, prototypage motion, développement WebGL.",
	},
	{
		period: '2021 — 2023',
		role: 'Lead Front-End Developer',
		company: 'Studio Hélice',
		text: "Responsable front-end d'un studio digital de 15 personnes. Mise en place du design system React et des standards d'animation.",
	},
	{
		period: '2019 — 2021',
		role: 'Front-End Developer',
		company: 'Agence Parallèle',
		text: "Intégration de sites WordPress sur-mesure et de campagnes emailing pour des marques retail et luxe.",
	},
	{
		period: '2018',
		role: 'Master Design Numérique',
		company: 'Gobelins, Paris',
		text: "Spécialisation développement d'interfaces interactives et motion design.",
	},
]
