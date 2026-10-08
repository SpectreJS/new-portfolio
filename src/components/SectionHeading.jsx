/* Editorial section marker: index, label and an optional aside line. */
export default function SectionHeading({ index, label, aside, id }) {
  return (
	 <div className="section-heading" data-reveal-heading>
		<span className="section-heading__index mono">({index})</span>
		<h2 className="section-heading__label mono" id={id}>{label}</h2>
		{aside && <span className="section-heading__aside mono">{aside}</span>}
		<span className="section-heading__rule" aria-hidden="true" />
	 </div>
  )
}
