import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import { usePageTransition } from '../context/TransitionContext'
import { identity } from '../data/content'
import { prefersReducedMotion } from '../utils/media'

const PANELS = 5

/* Full-screen curtain: doubles as the first-visit preloader and the page-transition cover. */
export default function Curtain() {
  const { curtainRef, label, finishBoot, booted } = usePageTransition()
  const counterRef = useRef(null)

  useEffect(() => {
    const counter = { value: 0 }
    const reduced = prefersReducedMotion()
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    let cancelled = false
    let tl

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true })
      tl.from('.curtain__boot-name .char', { yPercent: 120, stagger: 0.04, duration: 1 })
        .to(counter, {
          value: 100,
          duration: reduced ? 0.3 : 1.6,
          ease: 'power3.inOut',
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
          },
        }, 0)
        .to('.curtain__boot', { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: 'power2.in' })
    }, curtainRef)

    fontsReady.then(() => {
      if (cancelled) return
      tl.eventCallback('onComplete', finishBoot)
      tl.play()
    })
    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [finishBoot, curtainRef])

  const bootName = `${identity.firstName} ${identity.lastName}`

  return (
    <div className="curtain" ref={curtainRef} aria-hidden="true">
      {Array.from({ length: PANELS }, (_, i) => (
        <div className="curtain__panel" key={i} />
      ))}

      {!booted && (
        <div className="curtain__boot">
          <p className="curtain__boot-name">
            {bootName.split('').map((c, i) => (
              <span className="char" key={i}>{c === ' ' ? ' ' : c}</span>
            ))}
          </p>
          <p className="curtain__counter mono" ref={counterRef}>000</p>
          <p className="curtain__boot-role mono">{identity.role}</p>
        </div>
      )}

      {booted && (
        <div className="curtain__content">
          <p className="curtain__meta mono">Loading</p>
          <p className="curtain__label">{label || identity.initials}</p>
        </div>
      )}
    </div>
  )
}
