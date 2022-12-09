# 에셋가져오기

이번 장에서는 에셋을 가져오는 방법을 알아보겠습니다.  자세한 사항은 [에셋 가져오기](https://vitejs-kr.github.io/guide/assets.html)를 참고하세요.



## URL을 통해 에셋 가져오기

프로젝트 루트의 index.html을 다음과 같이 작성합니다. 
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
    <img id="hero-img"/>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```
프로젝트 루트의 main.js를 다음과 같이 작성합니다. 정적 에셋을 가져오게 되면 에셋에 접근할 수 있는 URL이 반환됩니다.
**main.js**   
```jsx
import imgUrl from './gominsi.png'
document.getElementById('hero-img').src = imgUrl
```

예를 들어, imgUrl 객체는 개발 시 /img.png 값으로 할당되겠으나, 실제 프로덕션 버전에서는 /assets/img.2d8efhg.png와 같은 값*이 할당됩니다. (* 여기서 2d8efhg는 해시 값을 의미합니다.)

vite.config.js를 다음과 같이 작성합니다. 
```jsx
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
  ],
  build: {
    minify: false,
  }
})
```

다음을 실행합니다. 
```shell
npm run build
```

dist 폴더를 열어보면, 에셋이 복사되어 있음을 확인할 수 있습니다. 
```shell
 📂project_root
    📂dist 
        📂assets
          📄gominsi.8c4ade81.png
          📄index.4df62998.js
```

index.html은 다음과 같이 변경됩니다. 
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script type="module" crossorigin src="/assets/index.4df62998.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <div id="hero-img"></div>
    
  </body>
</html>
```
다음을 실행하면 이미지가 표시됩니다. 
```shell
npm run dev
```

Vite는 절대 경로와 상대 경로 둘 다 사용할 수 있습니다.

* url()로 참조되는 CSS의 경우 동일한 방식으로 동작합니다.
* 일반적인 이미지, 미디어, 폰트 파일 타입은 자동으로 에셋 목록에 포함됩니다. 물론 assetsInclude 옵션을 이용해 더 많은 파일 타입을 포함하도록 할 수 있습니다.

* 참조된 에셋은 빌드 에셋 그래프의 일부 요소로 포함되며, 파일 이름이 해싱되거나 최적화를 위해 플러그인으로 처리될 수 있습니다.

* assetsInlineLimit 옵션의 값보다 작은 에셋 파일의 경우, Base64 포맷의 데이터 URL* 문자열로 가져옵니다. (* 데이터 URL MDN doc)


## public 디렉토리

public 디렉터리 아래에 에셋을 위치시키세요. 이 곳에 위치한 에셋은 개발 시에 / 경로에, 배포 시에는 dist 디렉터리에 위치하게 됩니다. 

간단히 말하면 public에 있는 파일들은 빌드 시에 dist로 복사되는 것입니다.

만약 <root>/public 디렉터리가 아닌 다른 디렉터리를 사용하고자 하는 경우, publicDir 옵션을 이용할 수 있습니다.


마지막으로, 다음의 사항을 유의해주세요.

* public 디렉터리에 위치해 있는 에셋을 가져오고자 하는 경우, 항상 루트를 기준으로 하는 절대 경로로 가져와야만 합니다. ( public/icon.png 에셋은 소스 코드에서 /icon.png으로 접근이 가능합니다.)

* public 디렉터리에 위치한 에셋은 JavaScript 코드로 가져올 수 없습니다.


