# Multi-Page App

아래와 같은 구조의 소스 코드를 갖고 있다고 가정해봅시다. 자세한 설명은 [Multi-Page App](https://vitejs-kr.github.io/guide/build.html#rebuild-on-files-changes)을 참고하세요. 



```shell
├── package.json
├── vite.config.js
├── index.html
├── main.js
└── nested
    ├── index.html
    └── nested.js
```    

개발 시, /nested/ 디렉터리 아래에 있는 페이지는 간단히 /nested/로 참조가 가능합니다. 일반적인 정적 파일 서버와 다르지 않습니다.


빌드 시에는, 사용자가 접근할 수 있는 모든 .html 파일에 대해 아래와 같이 빌드 진입점이라 명시해줘야만 합니다. 다음과 같이 작성합니다. 

**/nested/index.html**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <script type="module" src="/nested/nested.js"></script>
  </body>
</html>
```


**/nested/nested.js**    
```jsx
console.log('nested.js')
```

**vite.config.js**
```jsx
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html')
      }
    },    
    watch: {
      // https://rollupjs.org/guide/en/#watch-options
      exclude: 'node_modules/**',
      include: 'lib/**',
    },
    minify: false,
  }
})
```

dist 디렉토리 안에 아래와 같이 빌드 결과가 생성됩니다. 

```shell
 📂dist 
   📂assets
     📄main.1b9e8e3b.js
     📄nested.1b9e8e3b.js
   📂nested
     📄index.html
   📄index.html  
```




