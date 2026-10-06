import Magnetic from './Magnetic'
import TransitionLink from './TransitionLink'

/**
 * Pill CTA with a liquid fill on hover and a rolling label.
 * Renders a TransitionLink for internal routes, an <a> for external/mailto, or a <button>.
 */
export default function Button({ to, href, children, variant = 'solid', ariaLabel, cursor = 'link', ...rest }) {
  const content = (
    <span className="magnetic__inner btn__inner">
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__label" data-text={children}>
        <span>{children}</span>
      </span>
      <span className="btn__arrow" aria-hidden="true">↗</span>
    </span>
  )
  const props = { className: `btn btn--${variant}`, 'aria-label': ariaLabel, 'data-cursor': cursor, ...rest }

  return (
    <Magnetic>
      {to ? (
        <TransitionLink to={to} {...props}>{content}</TransitionLink>
      ) : href ? (
        <a href={href} {...props}>{content}</a>
      ) : (
        <button type="button" {...props}>{content}</button>
      )}
    </Magnetic>
  )
}
