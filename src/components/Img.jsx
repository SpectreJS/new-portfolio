import { cdn, srcSet } from '../utils/image'

/* Responsive, lazy image served through the Netlify Image CDN. */
export default function Img({ src, alt, widths = [640, 960, 1376], sizes = '100vw', ratio, eager = false, className = '', ...rest }) {
  const fit = ratio ? 'cover' : undefined
  const mid = widths[Math.floor(widths.length / 2)]
  return (
	 <img
		className={className}
		src={cdn(src, { w: mid, h: ratio ? Math.round(mid / ratio) : undefined, fit })}
		srcSet={srcSet(src, widths, { fit, ratio })}
		sizes={sizes}
		alt={alt}
		loading={eager ? 'eager' : 'lazy'}
		fetchPriority={eager ? 'high' : undefined}
		decoding="async"
		draggable="false"
		{...rest}
	 />
  )
}
