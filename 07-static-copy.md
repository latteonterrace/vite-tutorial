# 정적 파일 카피


[vite-plugin-static-copy](https://www.npmjs.com/package/vite-plugin-static-copy)

```jsx
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'main.js',
          dest: ''  //  dist/main.js로 복사 된다.
        },
        {
          src: 'index.html',
          dest: 'html'  // dist/html/index.html로 복사 된다. 
        }
      ]
    })
  ],
})
```
