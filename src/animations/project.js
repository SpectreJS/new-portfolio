import { gsap, SplitText } from './gsap'
import { clipReveal, parallax, splitLines } from './reveals'

/* Case-study entrance, paused until the curtain lifts. */
export function projectIntro(root) {
  const q = gsap.utils.selector(root)
  const title = SplitText.create(q('.case__title')[0], { type: 'chars', mask: 'chars' })
  const tl = gsap.timeline({ paused: true })
  tl.from(title.chars, { yPercent: 110, duration: 1.4, stagger: 0.04 }, 0.1)
	 .from(q('.case__eyebrow, .case__back, .case__category'), { yPercent: 100, autoAlpha: 0, stagger: 0.08 }, 0.4)
	 .from(q('.case__meta > div'), { y: 30, autoAlpha: 0, stagger: 0.07 }, 0.6)
	 .fromTo(q('.case__hero'), { clipPath: 'inset(30% 12% 0% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'curtain' }, 0.5)
	 .from(q('.case__hero img'), { scale: 1.4, duration: 2.2 }, 0.5)
  return tl
}

export function projectScroll(root) {
  const q = gsap.utils.selector(root)
  parallax(q('.case__hero img')[0], { amount: 8, trigger: q('.case__hero')[0] })
  splitLines(q('.case__lede')[0])
  q('.case__block p').forEach((p) => splitLines(p))
  q('.case__shot').forEach((shot, i) => {
	 clipReveal(shot, { from: i % 2 ? 'left' : 'bottom' })
	 parallax(shot.querySelector('img'), { amount: 5 + i * 2, trigger: shot })
  })
  gsap.from(q('.case__next-title'), {
	 yPercent: 60,
	 autoAlpha: 0,
	 duration: 1.4,
	 scrollTrigger: { trigger: q('.case__next')[0], start: 'top 80%', once: true },
  })
}
