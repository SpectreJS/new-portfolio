/**
 * Tiny registry for the global Lenis instance so any module can scroll
 * without prop drilling. Falls back to native scrolling when Lenis is off
 * (reduced motion).
 */
let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}
export const getLenis = () => lenis

export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (target !== 0 && !el) return
  if (lenis) {
    lenis.scrollTo(target === 0 ? 0 : el, { immediate, offset, duration: 1.6, force: true })
    return
  }
  const top = target === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
}

export const lockScroll = (locked) => {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.classList.toggle('is-locked', locked)
}
