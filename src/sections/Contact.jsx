import { useRef, useState } from 'react'
import { gsap, MEDIA, SplitText, useGSAP } from '../animations/gsap'
import { identity, socials } from '../data/content'
import { useLocalTime } from '../hooks/useLocalTime'
import { scrollToTarget } from '../utils/scroll'
import SectionHeading from '../components/SectionHeading'
import Magnetic from '../components/Magnetic'
import RollText from '../components/RollText'

export default function Contact() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  const time = useLocalTime(identity.timezone)

  useGSAP(() => {
	 const mm = gsap.matchMedia()
	 mm.add({ reduce: MEDIA.reduceMotion }, ({ conditions }) => {
		if (conditions.reduce) return
		const q = gsap.utils.selector(root)

		// Title: characters rise in sequence as the section scrolls in (scrubbed).
		SplitText.create(q('.contact__title')[0], {
		  type: 'words,chars',
		  mask: 'words',
		  autoSplit: true,
		  onSplit: (self) =>
			 gsap.from(self.chars, {
				yPercent: 110,
				stagger: 0.02,
				ease: 'power2.out',
				scrollTrigger: { trigger: q('.contact__title')[0], start: 'top 90%', end: 'bottom 55%', scrub: 0.6 },
			 }),
		})

		gsap.from(q('.contact__row > *'), {
		  y: 40,
		  autoAlpha: 0,
		  stagger: 0.08,
		  scrollTrigger: { trigger: q('.contact__row')[0], start: 'top 90%', once: true },
		})

		// End of page: the disc rises and the giant signature lifts out of the floor.
		const end = gsap.timeline({
		  scrollTrigger: { trigger: q('.footer')[0], start: 'top bottom', end: 'bottom bottom', scrub: true },
		  defaults: { ease: 'none' },
		})
		end.fromTo(q('.contact__sun'), { yPercent: 60, scale: 0.6 }, { yPercent: 0, scale: 1 }, 0)
		  .from(q('.footer__sign-char'), { yPercent: 100, stagger: 0.04 }, 0)
	 })
	 return () => mm.revert()
  }, { scope: root })

  const copy = async () => {
	 try {
		await navigator.clipboard.writeText(identity.email)
		setCopied(true)
		setTimeout(() => setCopied(false), 2200)
	 } catch {
		window.location.href = `mailto:${identity.email}`
	 }
  }

  const signature = identity.lastName

  return (
	 <section className="contact" id="contact" ref={root} aria-labelledby="contact-heading">
		<div className="contact__inner section">
		  <SectionHeading index="06" label="Contact" aside="Réponse sous 48h" id="contact-heading" />

		  <p className="contact__title display-xl">
			 Let’s create something <em className="serif">extraordinary.</em>
		  </p>

		  <div className="contact__row">
			 <div className="contact__mail-block">
				<p className="mono contact__label">Écrivez-moi</p>
				<a className="contact__mail" href={`mailto:${identity.email}`} aria-label={`Envoyer un email à ${identity.email}`}>
				  <RollText>{identity.email}</RollText>
				</a>
				<button type="button" className="contact__copy mono" onClick={copy} aria-label="Copier l'adresse email">
				  {copied ? 'Copié ✓' : 'Copier l’adresse'}
				</button>
				<span className="visually-hidden" aria-live="polite">{copied ? 'Adresse email copiée' : ''}</span>
			 </div>

			 <Magnetic strength={0.45} className="contact__cta-wrap">
				<a className="contact__cta" href={`mailto:${identity.email}?subject=Nouveau%20projet`} aria-label="Démarrer un projet — envoyer un email" data-cursor="link">
				  <span className="magnetic__inner contact__cta-inner">
					 <span className="contact__cta-fill" aria-hidden="true" />
					 <span className="contact__cta-text">Démarrer<br />un projet</span>
				  </span>
				</a>
			 </Magnetic>

			 <ul className="contact__socials" aria-label="Réseaux sociaux">
				{socials.map((s) => (
				  <li key={s.label}>
					 <a href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label} — ${s.handle} (nouvel onglet)`}>
						<span className="mono contact__social-label">{s.label}</span>
						<RollText>{s.handle}</RollText>
						<span aria-hidden="true">↗</span>
					 </a>
				  </li>
				))}
			 </ul>
		  </div>
		</div>

		<footer className="footer">
		  <div className="contact__sun" aria-hidden="true" />
		  <div className="footer__meta mono">
			 <span>© {new Date().getFullYear()} {identity.firstName} {identity.lastName}</span>
			 <span>{identity.location} — {time}</span>
			 <span>Designed & built with React, GSAP & Three.js</span>
			 <button type="button" className="footer__top" onClick={() => scrollToTarget(0)} aria-label="Remonter en haut de la page">
				<RollText>Back to top ↑</RollText>
			 </button>
		  </div>
		  <p className="footer__sign" aria-hidden="true">
			 {signature.split('').map((c, i) => (
				<span className="footer__sign-mask" key={i}>
				  <span className="footer__sign-char">{c}</span>
				</span>
			 ))}
		  </p>
		</footer>
	 </section>
  )
}
