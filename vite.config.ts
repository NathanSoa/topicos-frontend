import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@components': path.resolve(__dirname, './src/presentation/components'),
        '@pages': path.resolve(__dirname, './src/presentation/pages/index'),
        '@main': path.resolve(__dirname, './src/main'),
        '@domain': path.resolve(__dirname, './src/domain'),
        '@infra': path.resolve(__dirname, './src/infra'),
    }
  } 
})
