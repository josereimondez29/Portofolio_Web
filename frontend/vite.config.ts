import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  base: '/',
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'markdown': ['react-markdown', 'rehype-raw', 'rehype-sanitize'],
        }
      }
    },
    // Target modern browsers for smaller output
    target: 'esnext',
    // Enable minification with esbuild (included with Vite)
    minify: 'esbuild',
    // Increase chunk size warning to 1MB (since we're optimizing)
    chunkSizeWarningLimit: 1000,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
})
