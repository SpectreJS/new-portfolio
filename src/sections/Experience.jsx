import { useRef } from 'react'
import { gsap, MEDIA, ScrollTrigger, useGSAP } from '../animations/gsap'
import { splitChars } from '../animations/reveals'
import { experience } from '../data/content'
import SectionHeading from '../components/SectionHeading'

export default function Experience() {
  const root = useRef(null)

  useGSAP(() => {
	 const mm = gsap.matchMedia()
	 mm.add({ reduce: MEDIA.reduceMotion }, ({ conditions }) => {
		const q = gsap.utils.selector(root)
		// The active row follows the reading position, with or without motion.
		q('.timeline__item').forEach((item) => {
		  ScrollTrigger.create({ trigger: item, start: 'top 62%', end: 'bottom 38%', toggleClass: 'is-active' })
		})
		if (conditions.reduce) return

		splitChars(q('.experience__title')[0])
		gsap.fromTo(q('.timeline__progress'), { scaleY: 0 }, {
		  scaleY: 1,
		  ease: 'none',
		  scrollTrigger: { trigger: q('.timeline')[0], start: 'top 60%', end: 'bottom 60%', scrub: true },
		})
		q('.timeline__item').forEach((item) => {
		  const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%', once: true } })
		  tl.from(item.querySelector('.timeline__rule'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'curtain' })
			 .from(item.querySelectorAll('.timeline__cell'), { yPercent: 40, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.15)
		})
	 })
	 return () => mm.revert()
  }, { scope: root })

  return (
	 <section className="experience section" id="experience" ref={root} aria-labelledby="experience-title">
		<SectionHeading index="05" label="Parcours" aside="2018 — Aujourd'hui" id="experience-title" />
		<p className="experience__title display-lg" aria-hidden="true">
		  A <em className="serif">timeline</em> of craft
		</p>

		<ol className="timeline">
		  <span className="timeline__track" aria-hidden="true">
			 <span className="timeline__progress" />
		  </span>
		  {experience.map((e) => (
			 <li className="timeline__item" key={`${e.period}-${e.role}`}>
				<span className="timeline__rule" aria-hidden="true" />
				<span className="timeline__dot" aria-hidden="true" />
				<p className="timeline__cell timeline__period mono">{e.period}</p>
				<h3 className="timeline__cell timeline__role">{e.role}</h3>
				<p className="timeline__cell timeline__company serif">{e.company}</p>
				<p className="timeline__cell timeline__text">{e.text}</p>
			 </li>
		  ))}
		</ol>
	 </section>
  )
}
