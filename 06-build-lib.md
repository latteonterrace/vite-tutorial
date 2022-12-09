# 빌드하기 

Vite를 이용하여 빌드하는 방법에 대해서 살펴보겠습니다. 


## 라이브러리 빌드 

만약 브라우저 기반의 라이브러리를 개발하고 있다면, 라이브러리 갱신 시마다 테스트 페이지에서 이를 불러오는 데 많은 시간을 소모할 것입니다. Vite는 index.html을 이용해 좀 더 나은 개발 환경(경험)을 마련해줍니다.

라이브러리 배포 시점에서, build.lib 설정 옵션을 이용해보세요. 또한 라이브러리에 포함하지 않을 디펜던시를 명시할 수도 있습니다.

자세한 내용은 [라이브러리 빌드](https://vitejs-kr.github.io/guide/build.html#library-mo)을 참고하세요.


다음과 같이 라이브러리 파일을 lib/ 디렉토리에 저장합니다.

**use-mark.js**
```jsx
// ./lib/use-mark.js
function render() {
  console.log(("render() called"));
}
export { render }
```

다음과 같이 vite.config.js 파일을 생성합니다.
**vite.config.js**
```jsx 
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
  // 라이브러리로 빌드한다.
   lib: {
    // 라이브러리 엔트리로 HTML을 사용할 수 없기 때문에 요구된다. 
    entry: './lib/use-mark.js',
    // name은 전역변수로 노출된다. 
    name: 'mylibrary',
    fileName: 'my-lib'  // 파일이름 
  },    
    minify: false,
  }
})
```


**main.js**
패키지의 진입점이 되는 파일에는 패키지의 사용자가 import 할 수 있도록 export 구문이 포함되게 됩니다:
```jsx
// lib/main.js
import { render } from './lib/use-mark.js'
export { render } 
```


package.json에는 아래와 같이 사용할 라이브러리를 명시해주세요.
**package.json**   
```json
{
  "name": "my-lib",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "files":["dist"],
  "main": "dist/my-lib.umd.cjs",
  "module": "dist/my-lib.js",
}
```

vite build 명령을 실행하게 되면, es 및 umd 두 가지의 포맷으로 번들링 과정이 진행되게 됩니다.

dist에는 다음과 같이 파일이 생성됩니다.

```shell
 📂dist 
   📄my-lib.js
   📄my-lib.umd.cjs
```

lib 디렉토리 아래에 use-mark.js 파일을 만들고 render() 함수를 다음과 같이 작성합니다.  

**use-mark.js**    

```jsx
function render() {
  console.log(("render() called"));
}
export { render }
```

use-mark.js 파일을 빌드하여 빌드된 파일이 어떻게 생성되는지 살펴보겠습니다. 빌드할 때 선택할 수 있는 포맷은 다음과 같습니다. 주의할 점은 ES5로는 빌드되는 형식이 없습니다. 

* es 
* cjs
* umd
* iife 



### ES 모듈로 빌드하기
다음과 같이 es 모듈로 빌드하도록 설정한다. 
**vite.config.js**    
```jsx
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  ],
  build: {
    // 라이브러리로 빌드한다.
    lib: {
      // 라이브러리 엔트리로 HTML을 사용할 수 없기 때문에 요구된다. 
      entry: './lib/use-mark.js',
      // name은 전역변수로 노출된다. 
      name: 'mylibrary',
      // formats: ['es', 'iife'],  // ('es' | 'cjs' | 'umd' | 'iife')
      formats: ['es'],  // ('es' | 'cjs' | 'umd' | 'iife')
      // javascript 파일 이름, 디폴트는 package.json의 name
      fileName: 'my-lib'  // 파일이름 
    }
  }
})
```

'npm run build'를 실행하여 빌드한다.  dis 디렉토리 안에 my-lib.js 파일이 생성된다. 다음과 같이 변환된다.  

vite.config.js에서 name을 mylibrary로 설정했지만 mylibrary가 사용되지 않았습니다. 

**my-lib.js**    
```jsx
function render() {
  console.log("render() called");
}
export {
  render
};
```




### CommonJS 모듈로 빌드하기

이번에는 CommonJS 모듈로 빌드해보겠습니다.  포맷을 cjs로 설정하고 빌드합니다. 
```jsx
formats: ['cjs'],  // ('es' | 'cjs' | 'umd' | 'iife')
```

파일의 확장자가 .cjs로 변경됩니다. vite.config.js에서 name을 mylibrary로 설정했지만 mylibrary가 사용되지 않았습니다. 


**my-lib.cjs**    
```jsx
"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
function render() {
  console.log("render() called");
}
exports.render = render;
```

### IIFE 빌드하기

iife 포맷으로 빌드하면 다음과 같이 생성됩니다. vite.config.js에서 name을 mylibrary로 설정기 때문에 전역변수로 mylibrary가 사용됩니다. 

**my-lib.js**    
```jsx
var mylibrary = function(exports) {
  "use strict";
  function render() {
    console.log("render() called");
  }
  exports.render = render;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({});
```



### UMD 빌드하기 

파일명이 my-lib.umd.cjs로 변경되었습니다.vite.config.js에서 name을 mylibrary로 설정기 때문에 전역변수로 mylibrary가 사용됩니다. 

**my-lib.umd.cjs**
```jsx
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.mylibrary = {}));
})(this, function(exports2) {
  "use strict";
  function render() {
    console.log("render() called");
  }
  exports2.render = render;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
```


## 의존성 제외 

use-mark.js 파일을 다음과 같이 변경합니다. 
```jsx
import markdownIt from 'markdown-it'
function render() {
  console.log(("render() called"));
}

export { render }
```

그리고 다시 빌드합니다. 이 경우에 makrdown-it이 포함됩니다. 이것을 제외하려면 다음과 같이 설정합니다. 

```jsx
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  ],
  build: {
    // 라이브러리로 빌드한다.
    lib: {
      // 라이브러리 엔트리로 HTML을 사용할 수 없기 때문에 요구된다. 
      entry: './lib/use-mark.js',
      // name은 전역변수로 노출된다. 
      name: 'mylibrary',
      // formats: ['es', 'iife'],  // ('es' | 'cjs' | 'umd' | 'iife')
      //formats: ['es'],  // ('es' | 'cjs' | 'umd' | 'iife')
      // javascript 파일 이름, 디폴트는 package.json의 name
      fileName: 'my-lib'  // 파일이름 
    },
    rollupOptions: {
      // 라이브러리에 포함하지 않을 디펜던시를 명시해주세요
      external: ['markdown-it'],
      output: {
        // 라이브러리 외부에 존재하는 디펜던시를 위해
        // UMD(Universal Module Definition) 번들링 시 사용될 전역 변수를 명시할 수도 있습니다.
        globals: {
          vue: 'markdownIt'
        }
      }
    }    
    minify: false,
  }
})
```

다시 빌드하면 다음과 같이 my-lib.js 파일이 생성됩니다.  import markdownIt from 'markdown-it' 구문이 추가된 것을 확인할 수 있습니다. 

```jsx
import "markdown-it";
function render() {
  console.log("render() called");
}
export {
  render
};
```







