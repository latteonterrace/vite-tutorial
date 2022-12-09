# Vite Tutorial

Vite(프랑스어로 "빠르다(Quick)"를 의미하며, 발음은 "veet"와 비슷한 /vit/ 입니다.)은 빠르고 간결한 모던 웹 프로젝트 개발 경험에 초점을 맞춰 탄생한 빌드 도구이며, 두 가지 컨셉을 중심으로 하고 있습니다.

* 개발 시 네이티브 ES Module을 넘어 더욱 다양한 기능을 제공합니다. 가령, Hot Module Replacement (HMR)과 같은 것들 말이죠.

* 번들링 시, Rollup 기반의 다양한 빌드 커맨드를 사용할 수 있습니다. 이는 높은 수준으로 최적화된 정적(Static) 리소스들을 배포할 수 있게끔 하며, 미리 정의된 설정(Pre-configured)을 제공합니다.


## 프로젝트 만들기
```shell
$ npm create vite@latest
```
framework를 선택하라고 나온다. 
```shell
? Select a framework: 
Vanilla
Vue
React
Preact
Lit
Svelte
Others
```



## index.html
만들어진 Vite 프로젝트를 유심히 보면 index.html 파일이 public 디렉터리가 아닌 프로젝트의 루트에 위치해 있다는 것을 발견할 수 있습니다.  추가적인 번들링 과정 없이 index.html 파일이 앱의 진입점이 되게끔 하기 위함입니다.

Vite는 index.html 내에 존재하는 URL에 대해 %PUBLIC_URL%과 같은 Placeholder 없이 사용할 수 있도록 URL 베이스를 자동으로 맞춰줍니다.

또한 Vite는 여러 .html 파일을 앱의 진입점으로 하는 Multi-page apps를 지원하고 있습니다.


* index.html 이 루트에 존재
* index.html 내에 존재하는 URL에 대해 %PUBLIC_URL%과 같은 Placeholder 없이 사용할 수 있도록 URL 베이스를 자동으로 맞춰준다. 
* Vite는 여러 .html 파일을 앱의 진입점으로 하는 Multi-page apps를 지원

Vite는 정적(Static) HTTP 서버와 비슷하게 "루트 디렉터리"라는 개념을 갖고 있습니다. 향후 <root>라는 이름으로 문서 내에서 보게 되는데, 이는 Absolute URL을 프로젝트 루트를 가리키게끔 함으로써 일반적인 정적 파일 서버와 동일하게 코드를 작성할 수 있게 됩니다. 또한 Vite는 프로젝트 루트 외부에서도 디펜던시를 가져올 수 있게끔 구현했는데, 이를 이용하면 모노리포 구성 등 다양한 작업이 가능합니다.

**프로젝트 루트**    
vite은 개발 서버를 시작할 때 현재 위치해 있는 디렉터리를 프로젝트 루트로 가정하고 동작합니다. 만약 특정 디렉터리를 지정해 프로젝트 루트로써 동작하게끔 하고 싶다면, vite serve some/sub/dir 명령으로 Vite를 시작해주세요.


## 커맨드 라인 인터페이스

vite가 설치된 프로젝트는 vite 명령을 통해 바로 Vite를 실행할 수 있습니다. (npx vite을 이용해도 되구요.) 기본적으로 Vite에서 제공하는 npm 스크립트는 아래와 같습니다.

```json
{
  "scripts": {
    "dev": "vite", // 개발 서버를 실행합니다. (`vite dev` 또는 `vite serve`로도 시작이 가능합니다.)
    "build": "vite build", // 배포용 빌드 작업을 수행합니다.
    "preview": "vite preview" // 로컬에서 배포용 빌드에 대한 프리뷰 서버를 실행합니다.
  }
}
```

## Hot Module Replacement
vite는 기본 ESM를 통해 HMR API를 제공합니다. HMR 기능이 있는 프레임워크는 API를 활용하여 페이지를 다시 로드하거나 애플리케이션 상태를 날려버리지 않고 즉각적이고 정확한 업데이트를 제공할 수 있습니다. 

## TypeScript

vite는 .ts 파일에 대한 컴파일링 및 Import 역시 지원합니다.

--config CLI 옵션을 사용하여 명시적으로 특정 설정 파일을 지정할 수도 있습니다. (경로는 cwd를 기준으로 하여 상대적으로 처리됩니다.)
```shell
vite --config my-config.js
```

