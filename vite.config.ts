import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Avisa si algún chunk vuelve a crecer de más.
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        // Las librerías pesadas van en chunks aparte para que el bundle inicial
        // no tenga que cargar three.js ni framer-motion completo de entrada.
        // (rolldown sólo acepta la forma de función, no el objeto.)
        manualChunks(id: string) {
          if (id.includes('node_modules/three')) return 'three';
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)/.test(id)) return 'motion';
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
        },
      },
    },
  },
})
