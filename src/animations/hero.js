import { gsap, SplitText } from './gsap'

/* Entrance choreography — played once the curtain lifts. */
export function heroIntro(root) {
  const q = gsap.utils.selector(root)
  const role = SplitText.create(q('.hero__role'), { type: 'lines', mask: 'lines' })
  const intro = SplitText.create(q('.hero__intro'), { type: 'lines', mask: 'lines' })

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo' } })
  tl.from(q('.hero__char'), { yPercent: 115, rotate: 6, duration: 1.6, stagger: 0.045 }, 0.1)
	 .from(q('.hero__disc'), { scale: 0, duration: 2, ease: 'expo' }, 0.2)
	 .from(role.lines, { yPercent: 110, duration: 1.2, stagger: 0.08 }, 0.6)
	 .from(q('.hero__meta > *'), { yPercent: 100, autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.7)
	 .from(intro.lines, { yPercent: 110, duration: 1.2, stagger: 0.06 }, 0.8)
	 .from(q('.hero__rule'), { scaleX: 0, transformOrigin: 'left', duration: 1.6, ease: 'curtain' }, 0.6)
	 .from(q('.hero__cta > *'), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1 }, 1)
	 .from(q('.hero__badge'), { scale: 0, rotate: -120, duration: 1.6 }, 0.9)
	 .from(q('.hero__scroll'), { autoAlpha: 0, y: 20, duration: 1 }, 1.2)
  return tl
}

/* Scroll-out story: the two name lines drift apart, the disc swells and sinks. */
export function heroScroll(root) {
  const q = gsap.utils.selector(root)
  const tl = gsap.timeline({
	 scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
	 defaults: { ease: 'none' },
  })
  tl.to(q('.hero__line--1'), { xPercent: -8 }, 0)
	 .to(q('.hero__line--2'), { xPercent: 8 }, 0)
	 .to(q('.hero__disc-wrap'), { yPercent: 40, scale: 1.4 }, 0)
	 .to(q('.hero__bottom'), { autoAlpha: 0, y: -60 }, 0)
  return tl
}

/**
 * Variable-weight field: each glyph of the name gets thinner as the pointer
 * approaches it. Rects are cached and only re-measured on resize.
 */
export function heroWeightField(root, { min = 250, max = 820, radius = 380 } = {}) {
  const chars = [...root.querySelectorAll('.hero__char')]
  const disc = root.querySelector('.hero__disc')
  const setters = chars.map((c) => gsap.quickTo(c, '--wght', { duration: 0.6, ease: 'power3' }))
  const discX = gsap.quickTo(disc, 'x', { duration: 1.6, ease: 'power3' })
  const discY = gsap.quickTo(disc, 'y', { duration: 1.6, ease: 'power3' })
  let centers = []
  let raf = 0

  const measure = () => {
	 centers = chars.map((c) => {
		const r = c.getBoundingClientRect()
		return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY }
	 })
  }
  const update = (x, y) => {
	 const py = y + window.scrollY
	 centers.forEach((c, i) => {
		const d = Math.hypot(x - c.x, py - c.y)
		const t = Math.min(d / radius, 1)
		setters[i](min + (max - min) * t * t)
	 })
	 const rect = root.getBoundingClientRect()
	 discX(((x - rect.left) / rect.width - 0.5) * 80)
	 discY(((y - rect.top) / rect.height - 0.5) * 80)
  }
  const onMove = (e) => {
	 cancelAnimationFrame(raf)
	 raf = requestAnimationFrame(() => update(e.clientX, e.clientY))
  }
  const onLeave = () => {
	 setters.forEach((s) => s(max))
	 discX(0)
	 discY(0)
  }

  measure()
  window.addEventListener('resize', measure)
  root.addEventListener('pointerenter', measure)
  root.addEventListener('pointermove', onMove, { passive: true })
  root.addEventListener('pointerleave', onLeave)

  return () => {
	 cancelAnimationFrame(raf)
	 window.removeEventListener('resize', measure)
	 root.removeEventListener('pointerenter', measure)
	 root.removeEventListener('pointermove', onMove)
	 root.removeEventListener('pointerleave', onLeave)
  }
}
