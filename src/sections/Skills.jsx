import { useRef } from 'react'
import { gsap, MEDIA, useGSAP } from '../animations/gsap'
import { splitChars } from '../animations/reveals'
import { skillsDrop, skillsFade, skillsPlayground } from '../animations/skills'
import { skills } from '../data/content'
import SectionHeading from '../components/SectionHeading'

/* Hand-placed composition for the desktop field (percentages of the field). */
const LAYOUT = [
  { x: 6, y: 14, r: -8 },
  { x: 30, y: 4, r: 5 },
  { x: 57, y: 10, r: -3 },
  { x: 78, y: 22, r: 9 },
  { x: 14, y: 52, r: 4 },
  { x: 40, y: 40, r: -10 },
  { x: 64, y: 54, r: 6 },
  { x: 4, y: 80, r: -4 },
  { x: 48, y: 78, r: 3 },
]

export default function Skills() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add({ reduce: MEDIA.reduceMotion, desktop: MEDIA.isDesktop, fine: MEDIA.finePointer }, ({ conditions }) => {
      const { reduce, desktop, fine } = conditions
      if (reduce) return
      splitChars(root.current.querySelector('.skills__title'))
      if (desktop) skillsDrop(root.current)
      else skillsFade(root.current)
      if (desktop && fine) return skillsPlayground(root.current)
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="skills section theme-light" id="skills" ref={root} aria-labelledby="skills-title">
      <SectionHeading index="03" label="Toolkit" aside="Drag them around" id="skills-title" />

      <div className="skills__head">
        <p className="skills__title display-lg" aria-hidden="true">
          Tools I <em className="serif">shape</em> with
        </p>
        <p className="skills__lede">
          Neuf outils, une seule obsession : livrer des interfaces rapides, accessibles et mémorables.
          Attrapez-les, lancez-les, ils ne cassent pas.
        </p>
      </div>

      <ul className="skills__field" aria-label="Technologies maîtrisées">
        {skills.map((s, i) => {
          const pos = LAYOUT[i % LAYOUT.length]
          return (
            <li
              key={s.name}
              className={`skill skill--${s.shape} ${s.accent ? 'skill--accent' : ''}`}
              style={{ '--x': `${pos.x}%`, '--y': `${pos.y}%`, '--r': `${pos.r}deg` }}
              data-depth={s.depth}
              data-rotate={pos.r}
              data-cursor="drag"
            >
              <span className="skill__float">
                <span className="skill__inner">
                  <span className="skill__index mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="skill__name">{s.name}</span>
                  <span className="skill__detail mono">{s.detail}</span>
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
