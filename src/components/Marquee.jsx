import { useRef } from 'react'
import { gsap, MEDIA, ScrollTrigger, useGSAP } from '../animations/gsap'

/* Infinite band whose speed and slant respond to scroll velocity. */
export default function Marquee({ items, speed = 40, className = '' }) {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add({ reduce: MEDIA.reduceMotion }, ({ conditions }) => {
      if (conditions.reduce) return
      const track = root.current.querySelector('.marquee__track')
      const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: speed, repeat: -1 })
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' })
      let direction = 1
      let settle

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        onUpdate: (self) => {
          const v = self.getVelocity()
          direction = self.direction
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400)
          gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true })
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2 })
          skew(gsap.utils.clamp(-8, 8, v / -300))
          settle?.kill()
          settle = gsap.delayedCall(0.15, () => skew(0))
        },
      })
    })
    return () => mm.revert()
  }, { scope: root })

  const row = items.map((item, i) => (
    <span className="marquee__item" key={i}>
      {item}
      <span className="marquee__sep" aria-hidden="true">✳</span>
    </span>
  ))

  return (
    <div className={`marquee ${className}`} ref={root} aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__group">{row}</div>
        <div className="marquee__group">{row}</div>
      </div>
    </div>
  )
}
