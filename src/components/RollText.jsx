/* Text that rolls up to a duplicate of itself on hover (pure CSS, transform-only). */
export default function RollText({ children }) {
  return (
    <span className="roll" data-text={children}>
      <span className="roll__text">{children}</span>
    </span>
  )
}
