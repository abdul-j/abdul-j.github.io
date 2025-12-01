import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),  
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'], 
        ],
      },
    }),
  ],
})
