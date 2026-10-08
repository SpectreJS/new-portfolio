import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP } from '../animations/gsap'
import { identity, navigation, socials } from '../data/content'
import { useLocalTime } from '../hooks/useLocalTime'
import { lockScroll } from '../utils/scroll'
import { prefersReducedMotion } from '../utils/media'
import { usePageTransition } from '../context/TransitionContext'
import TransitionLink from './TransitionLink'
import RollText from './RollText'
import Magnetic from './Magnetic'

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const headerRef = useRef(null)
  const time = useLocalTime(identity.timezone)
  const location = useLocation()
  const { ready } = usePageTransition()

  const shown = useRef(false)

  // Header slides in once, when the first page is revealed.
  useGSAP(() => {
	 if (!ready || shown.current) return
	 shown.current = true
	 gsap.from('.header__item', { yPercent: -120, autoAlpha: 0, stagger: 0.06, duration: 1, delay: 0.5 })
  }, { scope: headerRef, dependencies: [ready] })

  // Menu open/close timeline.
  useGSAP(() => {
	 const menu = menuRef.current
	 const reduced = prefersReducedMotion()
	 if (open) {
		lockScroll(true)
		gsap.set(menu, { visibility: 'visible' })
		gsap.timeline()
		  .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0.01 : 0.9, ease: 'curtain' })
		  .fromTo('.menu__link-text', { yPercent: 110 }, { yPercent: 0, stagger: 0.07, duration: reduced ? 0.01 : 1 }, reduced ? 0 : 0.35)
		  .fromTo('.menu__foot > *', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.05 }, reduced ? 0 : 0.6)
		menu.querySelector('a')?.focus({ preventScroll: true })
	 } else if (menu.style.visibility === 'visible') {
		gsap.to(menu, {
		  clipPath: 'inset(0% 0% 100% 0%)',
		  duration: reduced ? 0.01 : 0.7,
		  ease: 'curtain',
		  onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
		})
		lockScroll(false)
	 }
  }, { scope: menuRef, dependencies: [open] })

  // Close on route change and on Escape; keep focus inside the open menu.
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
	 if (!open) return
	 const onKey = (e) => {
		if (e.key === 'Escape') {
		  setOpen(false)
		  toggleRef.current?.focus()
		}
		if (e.key === 'Tab') {
		  const items = [toggleRef.current, ...menuRef.current.querySelectorAll('a')]
		  const idx = items.indexOf(document.activeElement)
		  const next = e.shiftKey ? (idx <= 0 ? items.length - 1 : idx - 1) : (idx + 1) % items.length
		  e.preventDefault()
		  items[next].focus()
		}
	 }
	 document.addEventListener('keydown', onKey)
	 return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
	 <>
		<header className={`header ${open ? 'is-open' : ''}`} ref={headerRef}>
		  <div className="header__item header__brand">
			 <TransitionLink to="/" label="Index" className="header__logo" aria-label={`${identity.firstName} ${identity.lastName} — retour à l'accueil`}>
				<span className="header__logo-mark">{identity.initials}</span>
				<span className="header__logo-name">
				  {identity.firstName} {identity.lastName}
				</span>
			 </TransitionLink>
		  </div>

		  <p className="header__item header__status mono">
			 <span className="header__dot" aria-hidden="true" />
			 {identity.location} — <time>{time}</time>
		  </p>

		  <nav className="header__item header__nav" aria-label="Navigation principale">
			 <ul>
				{navigation.map((item) => (
				  <li key={item.href}>
					 <TransitionLink to={item.href} label={item.label} className="header__link">
						<RollText>{item.label}</RollText>
					 </TransitionLink>
				  </li>
				))}
			 </ul>
		  </nav>

		  <div className="header__item header__toggle-wrap">
			 <Magnetic strength={0.25}>
				<button
				  ref={toggleRef}
				  type="button"
				  className="header__toggle"
				  aria-expanded={open}
				  aria-controls="site-menu"
				  aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
				  onClick={() => setOpen((v) => !v)}
				>
				  <span className="magnetic__inner header__toggle-inner">
					 <span className="header__toggle-lines" aria-hidden="true">
						<span />
						<span />
					 </span>
					 <span className="mono">{open ? 'Close' : 'Menu'}</span>
				  </span>
				</button>
			 </Magnetic>
		  </div>
		</header>

		<div className="menu" id="site-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
		  <nav className="menu__nav" aria-label="Menu mobile">
			 <ul>
				{navigation.map((item) => (
				  <li key={item.href}>
					 <TransitionLink to={item.href} label={item.label} className="menu__link" onClick={() => setOpen(false)}>
						<span className="menu__link-mask">
						  <span className="menu__link-text">
							 <span className="menu__index mono">{item.index}</span>
							 {item.label}
						  </span>
						</span>
					 </TransitionLink>
				  </li>
				))}
			 </ul>
		  </nav>
		  <div className="menu__foot">
			 <a href={`mailto:${identity.email}`} className="menu__mail">{identity.email}</a>
			 <ul className="menu__socials">
				{socials.map((s) => (
				  <li key={s.label}>
					 <a href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label} (nouvel onglet)`}>{s.label}</a>
				  </li>
				))}
			 </ul>
		  </div>
		</div>
	 </>
  )
}
