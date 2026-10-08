import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				sourceMap: true,
			},
		},
	},
	build: {
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules/three')) return 'three'
					if (id.includes('node_modules/gsap')) return 'gsap'
				},
			},
		},
	},
})
