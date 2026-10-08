import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { setLenis } from '../utils/scroll'
import { useReducedMotion } from './useMediaQuery'

/* Boots Lenis and drives it from GSAP's ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
	 if (reduced) return
	 const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 })
	 setLenis(lenis)
	 lenis.on('scroll', ScrollTrigger.update)
	 const tick = (time) => lenis.raf(time * 1000)
	 gsap.ticker.add(tick)
	 gsap.ticker.lagSmoothing(0)

	 return () => {
		gsap.ticker.remove(tick)
		lenis.destroy()
		setLenis(null)
	 }
  }, [reduced])
}
