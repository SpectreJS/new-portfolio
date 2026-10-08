import { gsap, Draggable } from './gsap'

/* Stickers drop into the field like objects tossed on a table. */
export function skillsDrop(root) {
  const items = root.querySelectorAll('.skill')
  return gsap.from(items, {
	 y: () => -window.innerHeight * 0.6,
	 rotate: () => gsap.utils.random(-50, 50),
	 autoAlpha: 0,
	 duration: 1.4,
	 ease: 'back.out(1.2)',
	 stagger: { each: 0.07, from: 'random' },
	 scrollTrigger: { trigger: root.querySelector('.skills__field'), start: 'top 75%', once: true },
  })
}

export function skillsFade(root) {
  return gsap.from(root.querySelectorAll('.skill'), {
	 y: 30,
	 autoAlpha: 0,
	 stagger: 0.05,
	 scrollTrigger: { trigger: root.querySelector('.skills__field'), start: 'top 85%', once: true },
  })
}

/**
 * Desktop playground: every sticker is draggable with inertia inside the field,
 * and floats on its own depth layer as the pointer moves.
 */
export function skillsPlayground(root) {
  const field = root.querySelector('.skills__field')
  const items = [...root.querySelectorAll('.skill')]
  let z = 10

  const draggables = Draggable.create(items, {
	 type: 'x,y',
	 bounds: field,
	 inertia: true,
	 edgeResistance: 0.75,
	 zIndexBoost: false,
	 onPress() {
		this.target.style.zIndex = ++z
		gsap.to(this.target.querySelector('.skill__inner'), { scale: 1.08, rotate: 0, duration: 0.4 })
	 },
	 onRelease() {
		gsap.to(this.target.querySelector('.skill__inner'), { scale: 1, rotate: this.target.dataset.rotate, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
	 },
  })

  const layers = items.map((el) => ({
	 depth: Number(el.dataset.depth),
	 x: gsap.quickTo(el.querySelector('.skill__float'), 'x', { duration: 1.2, ease: 'power3' }),
	 y: gsap.quickTo(el.querySelector('.skill__float'), 'y', { duration: 1.2, ease: 'power3' }),
  }))
  const onMove = (e) => {
	 const r = field.getBoundingClientRect()
	 const nx = (e.clientX - r.left) / r.width - 0.5
	 const ny = (e.clientY - r.top) / r.height - 0.5
	 layers.forEach((l) => {
		l.x(nx * -60 * l.depth)
		l.y(ny * -40 * l.depth)
	 })
  }
  field.addEventListener('pointermove', onMove, { passive: true })

  return () => {
	 field.removeEventListener('pointermove', onMove)
	 draggables.forEach((d) => d.kill())
  }
}
