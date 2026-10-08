import { useRef } from 'react'
import { gsap, MEDIA, useGSAP } from '../animations/gsap'
import { heroIntro, heroScroll, heroWeightField } from '../animations/hero'
import { usePageTransition } from '../context/TransitionContext'
import { identity } from '../data/content'
import Button from '../components/Button'
import TransitionLink from '../components/TransitionLink'
import RollText from '../components/RollText'

const Chars = ({ text }) =>
  text.split('').map((c, i) => (
	 <span className="hero__mask" key={i}>
		<span className="hero__char">{c}</span>
	 </span>
  ))

export default function Hero() {
  const root = useRef(null)
  const intro = useRef(null)
  const { ready } = usePageTransition()

  // Build once: entrance timeline (paused), scroll story, pointer field.
  useGSAP(() => {
	 const mm = gsap.matchMedia()
	 mm.add({ reduce: MEDIA.reduceMotion, desktop: MEDIA.isDesktop, fine: MEDIA.finePointer }, (ctx) => {
		const { reduce, desktop, fine } = ctx.conditions
		if (reduce) {
		  intro.current = null
		  return
		}
		intro.current = heroIntro(root.current)
		if (ready) intro.current.play()
		heroScroll(root.current)
		if (desktop && fine) return heroWeightField(root.current)
	 })
	 return () => mm.revert()
  }, { scope: root })

  // Play the entrance when the curtain lifts.
  useGSAP(() => {
	 if (ready) intro.current?.play()
  }, { dependencies: [ready] })

  const fullName = `${identity.firstName} ${identity.lastName}`

  return (
	 <section className="hero" ref={root} aria-labelledby="hero-title">
		<div className="hero__disc-wrap" aria-hidden="true">
		  <div className="hero__disc" />
		</div>

		<div className="hero__meta mono">
		  <span>Portfolio ©{new Date().getFullYear()}</span>
		  <span className="hero__meta-mid">{identity.location}</span>
		  <span className="hero__meta-end">
			 <span className="hero__pulse" aria-hidden="true" />
			 {identity.availability}
		  </span>
		</div>

		<h1 className="hero__title" id="hero-title" aria-label={`${fullName} — ${identity.role}`}>
		  <span className="hero__line hero__line--1" aria-hidden="true">
			 <span className="hero__word">
				<Chars text={identity.firstName} />
			 </span>
			 <span className="hero__role serif">
				Front-End Developer <br />& Creative Developer
			 </span>
		  </span>
		  <span className="hero__line hero__line--2" aria-hidden="true">
			 <span className="hero__badge">
				<svg viewBox="0 0 120 120" className="hero__badge-ring">
				  <defs>
					 <path id="badge-circle" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
				  </defs>
				  <text>
					 <textPath href="#badge-circle">Creative developer • Interactive web • </textPath>
				  </text>
				</svg>
				<span className="hero__badge-core">✳</span>
			 </span>
			 <span className="hero__word">
				<Chars text={identity.lastName} />
			 </span>
		  </span>
		</h1>

		<span className="hero__rule" aria-hidden="true" />

		<div className="hero__bottom">
		  <p className="hero__intro">{identity.intro}</p>
		  <div className="hero__cta">
			 <Button to="/#works" ariaLabel="Voir mes projets sélectionnés">Voir mes projets</Button>
			 <TransitionLink to="/#contact" className="link-underline" aria-label="Me contacter — aller à la section contact">
				<RollText>Me contacter</RollText>
			 </TransitionLink>
		  </div>
		  <TransitionLink to="/#about" className="hero__scroll mono" aria-label="Faire défiler vers la présentation">
			 <span>Scroll</span>
			 <span className="hero__scroll-line" aria-hidden="true" />
		  </TransitionLink>
		</div>
	 </section>
  )
}
