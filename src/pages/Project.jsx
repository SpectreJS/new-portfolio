import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { gsap, MEDIA, useGSAP } from '../animations/gsap'
import { projectIntro, projectScroll } from '../animations/project'
import { usePageTransition } from '../context/TransitionContext'
import { projects } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Img from '../components/Img'
import Button from '../components/Button'
import TransitionLink from '../components/TransitionLink'
import RollText from '../components/RollText'
import NotFound from './NotFound'

export default function Project() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const root = useRef(null)
  const intro = useRef(null)
  const { ready } = usePageTransition()

  useDocumentTitle(project ? `${project.title} — Étude de cas` : 'Projet introuvable')

  useGSAP(() => {
	 if (!project) return
	 const mm = gsap.matchMedia()
	 mm.add({ reduce: MEDIA.reduceMotion }, ({ conditions }) => {
		if (conditions.reduce) return
		intro.current = projectIntro(root.current)
		if (ready) intro.current.play()
		projectScroll(root.current)
	 })
	 return () => mm.revert()
  }, { scope: root, dependencies: [slug] })

  useGSAP(() => {
	 if (ready) intro.current?.play()
  }, { dependencies: [ready] })

  if (!project) return <NotFound />

  return (
	 <main className="page page--case case" data-page id="main" ref={root}>
		<header className="case__head section">
		  <div className="case__top">
			 <TransitionLink to="/#works" label="Works" className="case__back mono link-underline" aria-label="Retour aux projets">
				<RollText>← Tous les projets</RollText>
			 </TransitionLink>
			 <p className="case__eyebrow mono">
				Étude de cas — {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
			 </p>
		  </div>
		  <h1 className="case__title display-xl">{project.title}</h1>
		  <p className="case__category serif">{project.category}</p>

		  <dl className="case__meta">
			 <div>
				<dt className="mono">Client</dt>
				<dd>{project.client}</dd>
			 </div>
			 <div>
				<dt className="mono">Année</dt>
				<dd>{project.year}</dd>
			 </div>
			 <div>
				<dt className="mono">Rôle</dt>
				<dd>{project.role}</dd>
			 </div>
			 <div>
				<dt className="mono">Stack</dt>
				<dd>{project.tech.join(' · ')}</dd>
			 </div>
		  </dl>
		</header>

		<figure className="case__hero">
		  <Img src={project.image} alt={`${project.title} — visuel principal`} eager widths={[800, 1200, 1376]} sizes="100vw" />
		</figure>

		<section className="case__body section" aria-label="Description du projet">
		  <p className="case__lede display-md">{project.description}</p>

		  <div className="case__columns">
			 <div className="case__block">
				<h2 className="mono case__block-title">(01) Le défi</h2>
				<p>{project.challenge}</p>
			 </div>
			 <div className="case__block">
				<h2 className="mono case__block-title">(02) L’approche</h2>
				<p>{project.approach}</p>
			 </div>
		  </div>

		  <div className="case__gallery">
			 <figure className="case__shot case__shot--tall">
				<Img src={project.image} alt={`${project.title} — détail`} ratio={0.8} widths={[480, 720, 960]} sizes="(min-width: 768px) 40vw, 100vw" style={{ objectPosition: '30% 50%' }} />
			 </figure>
			 <figure className="case__shot case__shot--wide">
				<Img src={project.image} alt={`${project.title} — composition`} ratio={1.25} widths={[640, 960, 1376]} sizes="(min-width: 768px) 55vw, 100vw" style={{ objectPosition: '75% 50%' }} />
			 </figure>
		  </div>

		  <div className="case__visit">
			 <Button href={project.url} target="_blank" rel="noreferrer" ariaLabel={`Visiter le site ${project.title} (nouvel onglet)`}>
				Visiter le site
			 </Button>
		  </div>
		</section>

		<TransitionLink to={`/work/${next.slug}`} label={next.title} className="case__next" data-cursor="view" aria-label={`Projet suivant : ${next.title}`}>
		  <span className="case__next-label mono">Projet suivant</span>
		  <span className="case__next-title display-xl">{next.title}</span>
		  <span className="case__next-media" aria-hidden="true">
			 <Img src={next.image} alt="" widths={[480, 800]} sizes="30vw" />
		  </span>
		</TransitionLink>
	 </main>
  )
}
