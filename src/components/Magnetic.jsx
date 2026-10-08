import { useRef } from 'react'
import { gsap, useGSAP } from '../animations/gsap'
import { canHover, prefersReducedMotion } from '../utils/media'

/**
 * Wraps a single interactive child and lets it be pulled toward the cursor.
 * The optional `.magnetic__inner` element travels further, giving a layered parallax.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  useGSAP(() => {
	 const el = ref.current
	 if (!el || !canHover() || prefersReducedMotion()) return
	 const inner = el.querySelector('.magnetic__inner')
	 const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
	 const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
	 const ixTo = inner && gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
	 const iyTo = inner && gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

	 const move = (e) => {
		const r = el.getBoundingClientRect()
		const dx = e.clientX - (r.left + r.width / 2)
		const dy = e.clientY - (r.top + r.height / 2)
		xTo(dx * strength)
		yTo(dy * strength)
		ixTo?.(dx * strength * 0.5)
		iyTo?.(dy * strength * 0.5)
	 }
	 const leave = () => {
		xTo(0)
		yTo(0)
		ixTo?.(0)
		iyTo?.(0)
	 }
	 el.addEventListener('pointermove', move)
	 el.addEventListener('pointerleave', leave)
	 return () => {
		el.removeEventListener('pointermove', move)
		el.removeEventListener('pointerleave', leave)
	 }
  }, { scope: ref })

  return (
	 <span className={`magnetic ${className}`} ref={ref}>
		{children}
	 </span>
  )
}
