import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // react(): versteht JSX/TSX, tailwindcss(): erzeugt das CSS aus unseren Klassen
  plugins: [react(), tailwindcss()],
})
