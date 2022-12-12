import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    // rollupOptions: {
    // },    
    // watch: {
    //   // https://rollupjs.org/guide/en/#watch-options
    //   exclude: 'node_modules/**',
    //   include: 'lib/**',
    // },
  // 라이브러리로 빌드한다.
   lib: {
    // 라이브러리 엔트리로 HTML을 사용할 수 없기 때문에 요구된다. 
    entry: './lib/use-mark.js',
    // name은 전역변수로 노출된다. 
    name: 'mylibrary',
    // formats: ['es', 'iife'],  // ('es' | 'cjs' | 'umd' | 'iife')
    formats: ['umd', 'es', 'cjs'],  // ('es' | 'cjs' | 'umd' | 'iife')
    // javascript 파일 이름, 디폴트는 package.json의 name
    fileName: 'my-lib'  // 파일이름 
  },    
    minify: false,
  }
})