import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Button from '../components/Button'

export default function NotFound() {
  useDocumentTitle('404 — Page introuvable')
  return (
	 <main className="page page--404 notfound section" data-page id="main">
		<p className="mono notfound__eyebrow">Erreur 404</p>
		<h1 className="notfound__title display-xl">
		  Lost in <em className="serif">space.</em>
		</h1>
		<p className="notfound__text">Cette page n’existe pas — ou plus. Revenons sur des terres connues.</p>
		<Button to="/" ariaLabel="Retour à l'accueil">Retour à l’accueil</Button>
	 </main>
  )
}
