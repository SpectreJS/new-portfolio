import { useRef } from 'react'
import { gsap, MEDIA, useGSAP } from '../animations/gsap'
import { horizontalWorks, verticalWorks, workHover, worksTitle } from '../animations/works'
import { projects } from '../data/content'
import Img from '../components/Img'
import TransitionLink from '../components/TransitionLink'
import Button from '../components/Button'
import RollText from '../components/RollText'

const total = String(projects.length).padStart(2, '0')

export default function Works() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add({ reduce: MEDIA.reduceMotion, desktop: MEDIA.isDesktop, fine: MEDIA.finePointer }, ({ conditions }) => {
      const { reduce, desktop, fine } = conditions
      if (reduce) return
      worksTitle(root.current)
      if (desktop) horizontalWorks(root.current)
      else verticalWorks(root.current)
      if (fine) {
        const cleanups = gsap.utils.toArray('.work', root.current).map(workHover)
        return () => cleanups.forEach((c) => c())
      }
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="works" id="works" ref={root} aria-labelledby="works-title">
      <div className="works__pin">
        <div className="works__track">
          <header className="works__intro">
            <p className="mono works__eyebrow">(02) — Selected Works · 2024—2026</p>
            <h2 className="works__heading display-xl" id="works-title">
              Selected <em className="serif">works</em>
            </h2>
            <p className="works__lede">
              Une sélection de projets où direction artistique, motion et performance avancent ensemble.
              <span className="mono works__hint" aria-hidden="true"> Scroll →</span>
            </p>
          </header>

          {projects.map((p, i) => (
            <article className={`work work--${i % 2 ? 'low' : 'high'}`} key={p.slug} aria-labelledby={`work-${p.slug}`}>
              <TransitionLink
                to={`/work/${p.slug}`}
                label={p.title}
                className="work__media"
                data-cursor="view"
                aria-label={`Voir l'étude de cas ${p.title}`}
              >
                <Img
                  src={p.image}
                  alt={`Visuel du projet ${p.title} — ${p.category}`}
                  className="work__img"
                  widths={[640, 960, 1376]}
                  sizes="(min-width: 1024px) 64vw, 100vw"
                />
                <span className="work__index-big" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </TransitionLink>

              <div className="work__info">
                <p className="work__index mono">
                  {String(i + 1).padStart(2, '0')} / {total} — {p.year}
                </p>
                <h3 className="work__title" id={`work-${p.slug}`}>
                  <TransitionLink to={`/work/${p.slug}`} label={p.title} data-cursor="view">
                    {p.title}
                  </TransitionLink>
                </h3>
                <p className="work__category serif">{p.category}</p>
                <p className="work__desc">{p.description}</p>
                <ul className="work__tech" aria-label="Technologies">
                  {p.tech.map((t) => (
                    <li key={t} className="mono">{t}</li>
                  ))}
                </ul>
                <a className="work__link link-underline" href={p.url} target="_blank" rel="noreferrer" aria-label={`Visiter le site ${p.title} (nouvel onglet)`}>
                  <RollText>Visiter le site</RollText> <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}

          <div className="works__outro">
            <p className="works__outro-text display-md">
              D'autres projets <em className="serif">sous NDA</em>, sur demande.
            </p>
            <Button to="/#contact" ariaLabel="Parlons de votre projet — aller au contact">Parlons-en</Button>
          </div>
        </div>
        <div className="works__progress" aria-hidden="true">
          <span className="works__progress-bar" />
        </div>
      </div>
    </section>
  )
}
