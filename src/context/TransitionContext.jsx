import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { lockScroll, scrollToTarget } from '../utils/scroll'
import { prefersReducedMotion } from '../utils/media'

/**
 * Global page-transition orchestrator.
 *  1. transitionTo() covers the screen with the curtain and fades the page out
 *  2. the route changes while hidden, scroll is reset to the top
 *  3. the curtain lifts and pages are told they may play their entrance (`ready`)
 */
const TransitionContext = createContext(null)

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const curtainRef = useRef(null)
  const busy = useRef(false)
  const pendingHash = useRef(null)
  const [ready, setReady] = useState(false)
  const [label, setLabel] = useState('')
  const [booted, setBooted] = useState(false)

  const reveal = useCallback(() => {
    const curtain = curtainRef.current
    const reduced = prefersReducedMotion()
    ScrollTrigger.refresh()
    setReady(true)
    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false
        lockScroll(false)
        gsap.set(curtain, { visibility: 'hidden' })
      },
    })
    if (reduced) {
      tl.to(curtain, { autoAlpha: 0, duration: 0.3 })
      return
    }
    tl.to(curtain.querySelectorAll('.curtain__label, .curtain__meta'), { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
      .to(curtain.querySelectorAll('.curtain__panel'), { yPercent: -100, duration: 0.9, stagger: 0.06, ease: 'curtain' }, 0.15)
      .set(curtain.querySelectorAll('.curtain__panel'), { yPercent: 100 })
  }, [])

  const transitionTo = useCallback(
    (to, nextLabel = '') => {
      if (busy.current) return
      const [path, hash] = to.split('#')
      const target = path || '/'
      if (target === location.pathname) {
        if (hash) scrollToTarget(`#${hash}`)
        else scrollToTarget(0)
        return
      }
      busy.current = true
      pendingHash.current = hash ? `#${hash}` : null
      setLabel(nextLabel)
      lockScroll(true)

      const curtain = curtainRef.current
      const page = document.querySelector('[data-page]')
      const reduced = prefersReducedMotion()
      const go = () => {
        setReady(false)
        navigate(target)
      }

      gsap.set(curtain, { visibility: 'visible', autoAlpha: 1 })
      if (reduced) {
        gsap.fromTo(curtain, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, onComplete: go })
        return
      }
      const tl = gsap.timeline({ onComplete: go })
      tl.fromTo(curtain.querySelectorAll('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.75, stagger: 0.06, ease: 'curtain' })
      if (page) tl.to(page, { y: -80, autoAlpha: 0.4, duration: 0.75, ease: 'curtain' }, 0)
      tl.fromTo(
        curtain.querySelectorAll('.curtain__label, .curtain__meta'),
        { yPercent: 100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6 },
        0.45,
      )
    },
    [location.pathname, navigate],
  )

  /* After the new route has rendered underneath the curtain: reset scroll, then reveal. */
  useLayoutEffect(() => {
    if (!booted) return
    if (!busy.current) {
      // Browser back/forward: no curtain, just land at the top.
      window.scrollTo(0, 0)
      scrollToTarget(0, { immediate: true })
      return
    }
    window.scrollTo(0, 0)
    scrollToTarget(0, { immediate: true })
    const id = requestAnimationFrame(() => {
      reveal()
      if (pendingHash.current) {
        const hash = pendingHash.current
        pendingHash.current = null
        gsap.delayedCall(0.5, () => scrollToTarget(hash))
      }
    })
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  /* First visit: the preloader hands over to reveal(). */
  const finishBoot = useCallback(() => {
    setBooted(true)
    busy.current = true
    reveal()
    if (window.location.hash) gsap.delayedCall(0.6, () => scrollToTarget(window.location.hash))
  }, [reveal])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  const value = useMemo(() => ({ transitionTo, ready, curtainRef, label, finishBoot, booted }), [transitionTo, ready, label, finishBoot, booted])
  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>
}

export const usePageTransition = () => useContext(TransitionContext)
