import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '../animations/gsap'

const LABELS = { view: 'View', drag: 'Drag', open: 'Open' }

/**
 * Desktop-only cursor follower. States are declared in the markup with
 * `data-cursor="link|view|drag|open|hide"`; links and buttons get the link state automatically.
 */
export default function Cursor() {
  const ref = useRef(null)
  const labelRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const el = ref.current
    const root = document.documentElement
    root.classList.add('has-cursor')

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
    let visible = false

    const setState = (state) => {
      if (el.dataset.state === state) return
      el.dataset.state = state
      labelRef.current.textContent = LABELS[state] ?? ''
    }

    const onMove = (e) => {
      if (!visible) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        el.classList.add('is-visible')
        visible = true
      }
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor], a, button, input, textarea, label')
      if (!target) return setState('default')
      setState(target.dataset.cursor || (target.matches('input, textarea') ? 'hide' : 'link'))
    }
    const onLeaveWindow = () => {
      el.classList.remove('is-visible')
      visible = false
    }
    const onDown = () => el.classList.add('is-pressed')
    const onUp = () => el.classList.remove('is-pressed')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  // Reset on route change: the hovered element no longer exists.
  useEffect(() => {
    if (ref.current) ref.current.dataset.state = 'default'
    if (labelRef.current) labelRef.current.textContent = ''
  }, [location.pathname])

  return (
    <div className="cursor" ref={ref} data-state="default" aria-hidden="true">
      <span className="cursor__circle" />
      <span className="cursor__label" ref={labelRef} />
    </div>
  )
}
