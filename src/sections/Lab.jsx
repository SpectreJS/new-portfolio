import { useEffect, useRef, useState } from 'react'
import { gsap, MEDIA, ScrollTrigger, useGSAP } from '../animations/gsap'
import { fadeUp, splitLines } from '../animations/reveals'
import { useInView } from '../hooks/useInView'
import { useIsDesktop, useReducedMotion } from '../hooks/useMediaQuery'
import SectionHeading from '../components/SectionHeading'
import Img from '../components/Img'

const SPECS = [
  ['Particules', '25 921'],
  ['Rendu', 'GLSL · GPU'],
  ['Cible', '60 fps'],
  ['Poids', '≈ 0 Ko d’asset'],
]

/**
 * Experimental section. The WebGL scene is code-split and only booted on
 * desktop, without reduced motion, once the section approaches the viewport.
 * It stops rendering whenever the section is off-screen.
 */
export default function Lab() {
  const root = useRef(null)
  const stage = useRef(null)
  const canvas = useRef(null)
  const scene = useRef(null)
  const [webgl, setWebgl] = useState(false)
  const desktop = useIsDesktop()
  const reduced = useReducedMotion()
  const near = useInView(root, { rootMargin: '400px 0px' })
  const enabled = desktop && !reduced

  // Lazy boot.
  useEffect(() => {
	 if (!enabled || !near || scene.current) return
	 let cancelled = false
	 import('../three/LabScene.js')
		.then(({ default: LabScene }) => {
		  if (cancelled || !canvas.current) return
		  scene.current = new LabScene(canvas.current)
		  scene.current.start()
		  setWebgl(true)
		})
		.catch(() => setWebgl(false))
	 return () => {
		cancelled = true
	 }
  }, [enabled, near])

  // Pause when off-screen.
  useEffect(() => {
	 if (!scene.current) return
	 if (near) scene.current.start()
	 else scene.current.stop()
  }, [near, webgl])

  // Full teardown on unmount / when leaving desktop.
  useEffect(() => {
	 if (enabled) return
	 scene.current?.dispose()
	 scene.current = null
	 setWebgl(false)
  }, [enabled])
  useEffect(() => () => scene.current?.dispose(), [])

  // Pointer → shader.
  useEffect(() => {
	 const el = stage.current
	 if (!el || !webgl) return
	 const move = (e) => {
		const r = el.getBoundingClientRect()
		scene.current?.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1))
	 }
	 const leave = () => scene.current?.releasePointer()
	 el.addEventListener('pointermove', move, { passive: true })
	 el.addEventListener('pointerleave', leave)
	 return () => {
		el.removeEventListener('pointermove', move)
		el.removeEventListener('pointerleave', leave)
	 }
  }, [webgl])

  useGSAP(() => {
	 const mm = gsap.matchMedia()
	 mm.add({ reduce: MEDIA.reduceMotion }, ({ conditions }) => {
		if (conditions.reduce) return
		const q = gsap.utils.selector(root)
		splitLines(q('.lab__title')[0], { stagger: 0.1 })
		fadeUp(q('.lab__spec'), { trigger: q('.lab__specs')[0], stagger: 0.08, y: 20 })
		fadeUp(q('.lab__copy'), { y: 20 })
		gsap.from(q('.lab__stage'), {
		  scale: 0.85,
		  autoAlpha: 0,
		  duration: 1.8,
		  scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
		})
		ScrollTrigger.create({
		  trigger: root.current,
		  start: 'top bottom',
		  end: 'bottom top',
		  onUpdate: (self) => scene.current?.setProgress(self.progress),
		})
	 })
	 return () => mm.revert()
  }, { scope: root })

  return (
	 <section className="lab section" id="lab" ref={root} aria-labelledby="lab-title">
		<SectionHeading index="04" label="Lab — Expérimentations" aside="WebGL / GLSL" id="lab-title" />

		<div className="lab__layout">
		  <div className="lab__text">
			 <p className="lab__title display-lg">
				Code is my medium. <em className="serif">Motion</em> is my language.
			 </p>
			 <p className="lab__copy">
				Un orbe de particules déformé en temps réel par un bruit simplex, calculé entièrement sur le GPU.
				Il respire, réagit à la souris et se transforme au fil du scroll.
			 </p>
			 <dl className="lab__specs">
				{SPECS.map(([k, v]) => (
				  <div className="lab__spec" key={k}>
					 <dt className="mono">{k}</dt>
					 <dd>{v}</dd>
				  </div>
				))}
			 </dl>
		  </div>

		  <div className="lab__stage" ref={stage} data-cursor={webgl ? 'drag' : undefined}>
			 {enabled && <canvas ref={canvas} className={`lab__canvas ${webgl ? 'is-ready' : ''}`} aria-hidden="true" />}
			 {!webgl && (
				<Img
				  src="/img/orbital.png"
				  alt="Champ de particules formant une sphère lumineuse"
				  className="lab__fallback"
				  widths={[480, 800, 1200]}
				  sizes="(min-width: 1024px) 50vw, 100vw"
				  ratio={1}
				/>
			 )}
			 <p className="lab__hint mono" aria-hidden="true">{webgl ? 'Move your cursor' : 'Static preview'}</p>
			 <span className="lab__ring" aria-hidden="true" />
		  </div>
		</div>
	 </section>
  )
}
