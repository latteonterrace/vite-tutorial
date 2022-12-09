# 프로덕션으로 빌드하기

vite build 명령을 실행해주세요. 빌드 시 기본적으로 <root>/index.html 파일이 빌드를 위한 진입점(Entry point)으로 사용되며, 정적 호스팅을 위한 형태로 진행됩니다. 

자세한 내용은 [프로덕션으로 빌드하기](https://vitejs-kr.github.io/guide/build.html#public-base-path)을 참고하세요. 


## Public Base Path
만약 배포하고자 하는 디렉터리가 루트 디렉터리가 아닌가요? 간단히 base 설정을 이용해 프로젝트의 루트가 될 디렉터리를 명시해 줄 수 있습니다. 또는 vite build --base=/my/public/path 명령과 같이 커맨드 라인에서도 지정이 가능합니다.


만약 동적으로 에셋의 URL을 생성해야 하는 경우라면, import.meta.env.BASE_URL을 이용해주세요. 이 상수는 빌드 시 Public Base Path로 변환되어 이를 이용해 동적으로 가져오려는 에셋에 대한 URL을 생성할 수 있습니다.


## 청크를 만드는 방법

build.rollupOptions.output.manualChunks를 사용해 청크를 분할하는 방식을 구성할 수 있습니다(자세한 사항은 Rollup 문서를 참고해주세요).

Vite 2.9부터 manualChunks는 더 이상 기본적으로 수정하지 않습니다. 만약 계속 manualChunks를 수정하기 원한다면 splitVendorChunkPlugin을 사용해주세요.


[splitVendorChunkPlugin : require is not defined on prod BUILD ](https://github.com/vitejs/vite/issues/9935)를 참고해 주세요. 


이러한 방식은 사용자 정의 로직을 사용한 구성이 필요한 경우를 대비해 splitVendorChunk({ cache: SplitVendorChunkCache }) 팩토리 함수로도 제공됩니다. 이 때, 빌드 감시 모드가 정상적으로 작동하기 위해서는 cache.reset()을 buildStart 훅에서 호출해야 합니다.

이 방식에 대한 설명이 충분하지 않아서 찾아 보니 다음과 같은 플러그인이 있었습니다.

[vite-plugin-chunk-split](https://www.npmjs.com/package/vite-plugin-chunk-split)


