import { gsap, SplitText } from './gsap'

/**
 * Reusable animation recipes. Each returns the tween/timeline (or SplitText)
 * so it is captured by the surrounding gsap.context / useGSAP scope and
 * reverted automatically on unmount.
 */

/* Masked line reveal: lines slide up from behind their own mask. */
export function splitLines(el, { trigger = el, start = 'top 85%', delay = 0, stagger = 0.08, scroll = true } = {}) {
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.2,
        stagger,
        delay,
        scrollTrigger: scroll ? { trigger, start, once: true } : undefined,
      })
    },
  })
}

/* Character cascade for display titles. */
export function splitChars(el, { trigger = el, start = 'top 85%', stagger = 0.025, rotate = 8 } = {}) {
  return SplitText.create(el, {
    type: 'words,chars',
    mask: 'words',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.chars, {
        yPercent: 115,
        rotate,
        duration: 1.1,
        stagger,
        scrollTrigger: { trigger, start, once: true },
      })
    },
  })
}

/* Words light up one by one as the reader scrolls (scrubbed). */
export function scrubWords(el, { start = 'top 75%', end = 'bottom 45%' } = {}) {
  return SplitText.create(el, {
    type: 'words',
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.words,
        { opacity: 0.14 },
        { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start, end, scrub: true } },
      )
    },
  })
}

/* Clip-path image reveal paired with an inner scale-down. */
export function clipReveal(wrapper, { inner = wrapper.querySelector('img'), start = 'top 85%', from = 'bottom' } = {}) {
  const hidden = {
    bottom: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    center: 'inset(18% 18% 18% 18%)',
  }[from]
  const tl = gsap.timeline({ scrollTrigger: { trigger: wrapper, start, once: true } })
  tl.fromTo(wrapper, { clipPath: hidden }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'curtain' })
  if (inner) tl.fromTo(inner, { scale: 1.35 }, { scale: 1, duration: 1.8 }, 0)
  return tl
}

/* Vertical parallax drift, scrubbed to scroll position. */
export function parallax(el, { amount = 12, trigger = el } = {}) {
  return gsap.fromTo(
    el,
    { yPercent: -amount },
    { yPercent: amount, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } },
  )
}

/* Fade + translate for a batch of small elements. */
export function fadeUp(targets, { trigger, start = 'top 85%', stagger = 0.08, y = 40 } = {}) {
  return gsap.from(targets, {
    y,
    autoAlpha: 0,
    duration: 1.1,
    stagger,
    scrollTrigger: { trigger: trigger ?? targets, start, once: true },
  })
}

/* Horizontal rule drawing itself from the left. */
export function drawLine(targets, { trigger, start = 'top 90%', stagger = 0.08 } = {}) {
  return gsap.from(targets, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 1.4,
    stagger,
    ease: 'curtain',
    scrollTrigger: { trigger: trigger ?? targets, start, once: true },
  })
}
