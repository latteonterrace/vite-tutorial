# 파일변경 시 다시 빌드하기 


vite build --watch 명령을 통해 Rollup Watcher를 활성화 할 수 있습니다. 또는, build.watch 옵션에서 WatcherOptions를 직접 명시할 수도 있습니다.

```jsx
// vite.config.js
export default defineConfig({
  build: {
    watch: {
      // https://rollupjs.org/guide/en/#watch-options
    }
  }
})
```
--watch 플래그가 활성화된 상태에서 vite.config.js 또는 번들링 된 파일을 변경하게 되면 다시 빌드가 시작됩니다.  vite build --watch 명령을 통해 Rollup Watcher를 활성화 할 수 있습니다.

package.json에서 다음과 같이 변경합니다. 
```json
  "scripts": {
    "build": "vite build --watch",
  },
```
다음과 같이 설정하면 index.html, main.js가 변경되면 다시 빌드합니다.  그런데 main.js에서 lib 아래의 js 파일을 참조하지 않으면 lib 아래의 파일이 수정되어도 다시 빌드하지 않았습니다. 

**vite.config.js**   
```jsx
import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  build: {
    watch: {
      // https://rollupjs.org/guide/en/#watch-options
      exclude: 'node_modules/**',
    },
    minify: false,
  }
})
```


include를 추가해도 마찬가지입니다.
```jsx
    watch: {
      // https://rollupjs.org/guide/en/#watch-options
      exclude: 'node_modules/**',
      include: 'lib/**',
    },
```

