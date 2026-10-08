import { useEffect, useState } from 'react'

/* Reports whether an element is near the viewport. Used to lazily boot and pause heavy work. */
export function useInView(ref, { rootMargin = '0px', once = false } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
	 const el = ref.current
	 if (!el) return
	 const io = new IntersectionObserver(
		([entry]) => {
		  setInView(entry.isIntersecting)
		  if (entry.isIntersecting && once) io.disconnect()
		},
		{ rootMargin },
	 )
	 io.observe(el)
	 return () => io.disconnect()
  }, [ref, rootMargin, once])

  return inView
}
