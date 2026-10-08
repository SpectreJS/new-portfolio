import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  WebGLRenderer,
} from 'three'
import { fragmentShader, vertexShader } from './shaders'

/**
 * Particle orb displaced by simplex noise in the vertex shader.
 * Everything heavy happens on the GPU; the CPU only eases a few uniforms.
 * Lifecycle: new → start()/stop() as it enters/leaves view → dispose().
 */
export default class LabScene {
  constructor(canvas) {
	 this.canvas = canvas
	 this.pointer = { x: 0, y: 0, tx: 0, ty: 0 }
	 this.intensity = { value: 0, target: 0 }
	 this.progress = 0
	 this.running = false
	 this.clockStart = performance.now()

	 this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
	 this.pixelRatio = Math.min(window.devicePixelRatio, 1.5)
	 this.renderer.setPixelRatio(this.pixelRatio)

	 this.scene = new Scene()
	 this.camera = new PerspectiveCamera(35, 1, 0.1, 50)
	 this.camera.position.z = 7

	 const geometry = new SphereGeometry(1.6, 160, 160)
	 const count = geometry.attributes.position.count
	 const seeds = new Float32Array(count)
	 for (let i = 0; i < count; i++) seeds[i] = Math.random()
	 geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))

	 this.material = new ShaderMaterial({
		vertexShader,
		fragmentShader,
		transparent: true,
		depthWrite: false,
		blending: AdditiveBlending,
		uniforms: {
		  uTime: { value: 0 },
		  uIntensity: { value: 0 },
		  uProgress: { value: 0 },
		  uPointer: { value: [0, 0] },
		  uPixelRatio: { value: this.pixelRatio },
		  uBone: { value: new Color('#efebe4') },
		  uAccent: { value: new Color('#ff4f1a') },
		},
	 })

	 this.points = new Points(geometry, this.material)
	 this.scene.add(this.points)

	 this.tick = this.tick.bind(this)
	 this.resize = this.resize.bind(this)
	 this.resize()
	 window.addEventListener('resize', this.resize)
  }

  resize() {
	 const { clientWidth: w, clientHeight: h } = this.canvas.parentElement
	 this.renderer.setSize(w, h, false)
	 this.camera.aspect = w / h
	 this.camera.updateProjectionMatrix()
  }

  /* Pointer in normalized device coords (-1..1). */
  setPointer(x, y) {
	 this.pointer.tx = x
	 this.pointer.ty = y
	 this.intensity.target = 1
  }

  releasePointer() {
	 this.intensity.target = 0
  }

  setProgress(p) {
	 this.progress = p
  }

  start() {
	 if (this.running) return
	 this.running = true
	 this.raf = requestAnimationFrame(this.tick)
  }

  stop() {
	 this.running = false
	 cancelAnimationFrame(this.raf)
  }

  tick() {
	 if (!this.running) return
	 const t = (performance.now() - this.clockStart) / 1000
	 const p = this.pointer
	 p.x += (p.tx - p.x) * 0.06
	 p.y += (p.ty - p.y) * 0.06
	 this.intensity.value += (this.intensity.target - this.intensity.value) * 0.05

	 const u = this.material.uniforms
	 u.uTime.value = t
	 u.uIntensity.value = this.intensity.value
	 u.uProgress.value += (this.progress - u.uProgress.value) * 0.08
	 u.uPointer.value = [p.x * 1.6, p.y * 1.6]

	 this.points.rotation.y = t * 0.08 + p.x * 0.35
	 this.points.rotation.x = -p.y * 0.25 + this.progress * 0.6

	 this.renderer.render(this.scene, this.camera)
	 this.raf = requestAnimationFrame(this.tick)
  }

  dispose() {
	 this.stop()
	 window.removeEventListener('resize', this.resize)
	 this.points.geometry.dispose()
	 this.material.dispose()
	 this.renderer.dispose()
	 this.renderer.forceContextLoss?.()
  }
}
