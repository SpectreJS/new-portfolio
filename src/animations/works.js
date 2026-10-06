import { gsap, ScrollTrigger } from './gsap'
import { clipReveal, parallax, splitChars } from './reveals'

/* Desktop: pin the section and translate the track horizontally. */
export function horizontalWorks(root) {
  const q = gsap.utils.selector(root)
  const track = q('.works__track')[0]
  const distance = () => track.scrollWidth - window.innerWidth

  const scroller = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: q('.works__pin')[0],
      pin: true,
      scrub: 0.8,
      start: 'top top',
      end: () => `+=${distance()}`,
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(q('.works__progress-bar'), { scaleX: self.progress }),
    },
  })

  q('.work').forEach((card) => {
    const media = card.querySelector('.work__media')
    const img = card.querySelector('.work__img')
    gsap.fromTo(media, { clipPath: 'inset(12% 0% 12% 100%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'curtain',
      duration: 1.4,
      scrollTrigger: { trigger: card, containerAnimation: scroller, start: 'left 90%', once: true },
    })
    gsap.fromTo(img, { xPercent: -7 }, {
      xPercent: 7,
      ease: 'none',
      scrollTrigger: { trigger: card, containerAnimation: scroller, start: 'left right', end: 'right left', scrub: true },
    })
    gsap.from(card.querySelectorAll('.work__info > *'), {
      y: 40,
      autoAlpha: 0,
      stagger: 0.06,
      duration: 1,
      scrollTrigger: { trigger: card, containerAnimation: scroller, start: 'left 70%', once: true },
    })
  })

  // Big intro title moves slower than the track: depth.
  gsap.to(q('.works__heading'), {
    xPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: q('.works__pin')[0], start: 'top top', end: () => `+=${window.innerWidth}`, scrub: true },
  })

  return scroller
}

/* Tablet & mobile: a vertical editorial stack. */
export function verticalWorks(root) {
  const q = gsap.utils.selector(root)
  q('.work').forEach((card) => {
    clipReveal(card.querySelector('.work__media'), { inner: null, start: 'top 90%' })
    parallax(card.querySelector('.work__img'), { amount: 6, trigger: card })
    gsap.from(card.querySelectorAll('.work__info > *'), {
      y: 30,
      autoAlpha: 0,
      stagger: 0.06,
      scrollTrigger: { trigger: card.querySelector('.work__info'), start: 'top 90%', once: true },
    })
  })
}

export function worksTitle(root) {
  return splitChars(root.querySelector('.works__heading'), { stagger: 0.03 })
}

/**
 * Hover: subtle scale plus a velocity-driven skew so the image "bends"
 * slightly in the direction of travel, then settles.
 */
export function workHover(card) {
  const media = card.querySelector('.work__media')
  const img = card.querySelector('.work__img')
  const skew = gsap.quickTo(img, 'skewX', { duration: 0.6, ease: 'power3' })
  const shiftY = gsap.quickTo(img, 'y', { duration: 0.9, ease: 'power3' })
  let lastX = 0
  let settle

  const enter = (e) => {
    lastX = e.clientX
    gsap.to(media, { scale: 0.97, duration: 0.9 })
    gsap.to(img, { scale: 1.12, duration: 1.2 })
  }
  const move = (e) => {
    const r = media.getBoundingClientRect()
    const vx = e.clientX - lastX
    lastX = e.clientX
    skew(gsap.utils.clamp(-4, 4, vx * 0.25))
    shiftY(((e.clientY - r.top) / r.height - 0.5) * -16)
    settle?.kill()
    settle = gsap.delayedCall(0.08, () => skew(0))
  }
  const leave = () => {
    settle?.kill()
    skew(0)
    shiftY(0)
    gsap.to(media, { scale: 1, duration: 0.9 })
    gsap.to(img, { scale: 1, duration: 1.2 })
  }
  media.addEventListener('pointerenter', enter)
  media.addEventListener('pointermove', move, { passive: true })
  media.addEventListener('pointerleave', leave)
  return () => {
    settle?.kill()
    media.removeEventListener('pointerenter', enter)
    media.removeEventListener('pointermove', move)
    media.removeEventListener('pointerleave', leave)
  }
}

export const refreshScroll = () => ScrollTrigger.refresh()
