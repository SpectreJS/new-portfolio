/**
 * Builds Netlify Image CDN URLs so pages never ship the full-resolution
 * originals. In local Vite dev the CDN route does not exist, so the raw
 * file is used instead.
 */
const useCdn = !import.meta.env.DEV

export function cdn(src, { w, h, fit, q = 72, fm = 'webp' } = {}) {
  if (!useCdn) return src
  const params = new URLSearchParams({ url: src, fm, q: String(q) })
  if (w) params.set('w', String(w))
  if (h) params.set('h', String(h))
  if (fit) params.set('fit', fit)
  return `/.netlify/images?${params.toString()}`
}

export function srcSet(src, widths, opts) {
  if (!useCdn) return undefined
  return widths.map((w) => `${cdn(src, { ...opts, w, h: opts?.ratio ? Math.round(w / opts.ratio) : undefined })} ${w}w`).join(', ')
}
