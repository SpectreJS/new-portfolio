import { useRef } from 'react'
import { gsap, MEDIA, useGSAP } from '../animations/gsap'
import { drawLine, fadeUp, scrubWords, splitLines } from '../animations/reveals'
import { about, skills } from '../data/content'
import SectionHeading from '../components/SectionHeading'

export default function About() {
  const root = useRef(null)

  useGSAP(() => {
	 const mm = gsap.matchMedia()
	 mm.add({ reduce: MEDIA.reduceMotion }, ({ conditions }) => {
		if (conditions.reduce) return
		const q = gsap.utils.selector(root)
		drawLine(q('.section-heading__rule'))
		fadeUp(q('.section-heading > .mono'), { trigger: q('.section-heading')[0], y: 20 })
		scrubWords(q('.about__statement')[0])
		q('.about__bio p').forEach((p) => splitLines(p))
		drawLine(q('.capability__rule'), { trigger: q('.about__capabilities')[0], stagger: 0.1 })
		fadeUp(q('.capability__body'), { trigger: q('.about__capabilities')[0], stagger: 0.1, y: 30 })
		fadeUp(q('.about__stack li'), { trigger: q('.about__stack')[0], stagger: 0.04, y: 20 })
		gsap.to(q('.about__glyph'), {
		  rotate: 180,
		  ease: 'none',
		  scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
		})
	 })
	 return () => mm.revert()
  }, { scope: root })

  return (
	 <section className="about section" id="about" ref={root} aria-labelledby="about-title">
		<SectionHeading index="01" label="À propos" aside="Developer × Designer" id="about-title" />

		<p className="about__statement display-md">
		  {about.statement}
		</p>

		<div className="about__grid">
		  <div className="about__aside">
			 <span className="about__glyph serif" aria-hidden="true">✳</span>
		  </div>

		  <div className="about__bio">
			 {about.bio.map((p, i) => (
				<p key={i}>{p}</p>
			 ))}

			 <div className="about__stack">
				<h3 className="mono about__stack-title">Technologies</h3>
				<ul>
				  {skills.map((s) => (
					 <li key={s.name} className="mono">{s.name}</li>
				  ))}
				</ul>
			 </div>
		  </div>

		  <ol className="about__capabilities" aria-label="Compétences principales">
			 {about.capabilities.map((c, i) => (
				<li className="capability" key={c.title}>
				  <span className="capability__rule" aria-hidden="true" />
				  <div className="capability__body">
					 <span className="capability__index mono">{String(i + 1).padStart(2, '0')}</span>
					 <h3 className="capability__title">{c.title}</h3>
					 <p className="capability__text">{c.text}</p>
				  </div>
				</li>
			 ))}
		  </ol>
		</div>
	 </section>
  )
}
