import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

function manualChunks(id:string) {
	if (id.includes('node_modules')) {
		return 'vendor'
	}
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/crokinole-tourney/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks
      }
    }
  },
})
