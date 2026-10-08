import Hero from '../sections/Hero'
import About from '../sections/About'
import Works from '../sections/Works'
import Skills from '../sections/Skills'
import Lab from '../sections/Lab'
import Experience from '../sections/Experience'
import Contact from '../sections/Contact'
import Marquee from '../components/Marquee'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { identity } from '../data/content'

const BAND = ['React', 'GSAP', 'Three.js', 'WordPress', 'Creative Development', 'Motion', 'WebGL']

export default function Home() {
  useDocumentTitle(`${identity.firstName} ${identity.lastName} — Front-End & Creative Developer`)

  return (
	 <main className="page page--home" data-page id="main">
		<Hero />
		<About />
		<Works />
		<Marquee items={BAND} />
		<Skills />
		<Lab />
		<Experience />
		<Contact />
	 </main>
  )
}
