import { usePageTransition } from '../context/TransitionContext'

/**
 * Internal link that routes through the global curtain transition.
 * Keeps a real href so it stays crawlable, keyboard-accessible and middle-clickable.
 */
export default function TransitionLink({ to, label, children, onClick, ...rest }) {
  const { transitionTo } = usePageTransition()

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    transitionTo(to, label)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
