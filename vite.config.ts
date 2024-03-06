import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { splitVendorChunkPlugin } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/crokinole-tourney/',
  plugins: [react(), splitVendorChunkPlugin(), visualizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            id = id.split('node_modules')[1]
            if (id.startsWith('/@radix-ui/')) { return 'radix-ui' }
            if (id.startsWith('/react-dom/')) { return 'react-dom' }
            if (id.startsWith('/react/')) { return 'react' }
          }
        },
      },
    },
  },
})