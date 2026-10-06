import { Route, Routes, useLocation } from 'react-router-dom'
import { TransitionProvider } from './context/TransitionContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useFinePointer } from './hooks/useMediaQuery'
import Curtain from './components/Curtain'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Home from './pages/Home'
import Project from './pages/Project'
import NotFound from './pages/NotFound'

function AppRoutes() {
  const location = useLocation()
  // Keyed by pathname so every page (even /work/a → /work/b) remounts with fresh animations.
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/work/:slug" element={<Project />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  useSmoothScroll()
  const finePointer = useFinePointer()

  return (
    <TransitionProvider>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <Header />
      <AppRoutes />
      <Curtain />
      {finePointer && <Cursor />}
      <div className="grain" aria-hidden="true" />
    </TransitionProvider>
  )
}
