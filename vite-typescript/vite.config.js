import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
export default defineConfig({
  plugins: [
    svelte({
      emitCss: false
    })
  ],
  build: {
    // 라이브러리로 빌드한다.
    lib: {
      // 라이브러리 엔트리로 HTML을 사용할 수 없기 때문에 요구된다. 
      entry: 'src/main.ts',
      // name은 전역변수로 노출된다. 
      name: 'mylibrary', 
      formats: ['es', 'iife'],  // ('es' | 'cjs' | 'umd' | 'iife')
      // javascript 파일 이름, 디폴트는 package.json의 name
      fileName: 'myLib'  // 파일이름 
    }
  }
})