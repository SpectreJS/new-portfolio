import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, CustomEase, useGSAP)

/* House easings — used everywhere so the motion feels like one voice. */
CustomEase.create('expo', '0.16, 1, 0.3, 1')
CustomEase.create('curtain', '0.76, 0, 0.24, 1')

gsap.defaults({ ease: 'expo', duration: 1 })
ScrollTrigger.config({ ignoreMobileResize: true })

/* Shared media conditions for gsap.matchMedia(). */
export const MEDIA = {
  isDesktop: '(min-width: 1024px)',
  isMobile: '(max-width: 1023px)',
  finePointer: '(hover: hover) and (pointer: fine)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}

export { gsap, ScrollTrigger, SplitText, Draggable, useGSAP }
