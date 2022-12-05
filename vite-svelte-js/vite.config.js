import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // alias를 사용하여 아래와 같이 경로 지정
      // import TestComp from '@/lib/TestComp.svelte'
      '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [svelte()]
})
