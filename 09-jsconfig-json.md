# jsconfig.json

jsconfig.json디렉토리에 파일이 있으면 해당 디렉토리가 JavaScript 프로젝트의 루트임을 나타냅니다. 이 파일은 JavaScript 언어 서비스jsconfig.json 에서 제공하는 기능에 대한 루트 파일 및 옵션을 지정합니다 .

자세한 내용은 [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig)를 참조하세요.

jsconfig.json은 TypeScript의 구성 파일인 tsconfig.json의 자손입니다. jsconfig.json은 "allowJs" 속성이 true로 설정된 tsconfig.json 입니다. 



## jsconfig.json 파일이 필요한 이유는 무엇입니까?
Visual Studio Code의 JavaScript 지원은 다음 두 가지 모드에서 실행할 수 있습니다.

* File Scope - jsconfig.json 없음: 이 모드에서 Visual Studio Code에서 열린 JavaScript 파일은 독립적인 단위로서 취급됩니다.  a.js 가 b.ts 를 참조하지 않는 한, 두 파일 사이에는 공통적인 project context가 없습니다. 
* 명확한(explicit) Scope - jsconfig.json 있음: JavaScript project는 jsconfig.json을 통해 정의됩니다. 어떤 디렉토리에서 그런 파일의 존재가 그 디렉토리가 JavaScript 프로젝트의 루트라는 것을 나타냅니다. 




## jsconfig.json의 위치

jsconfig.json 파일을 생성함으로써 자바스크립트 프로젝트로서, 우리는 우리의 코드의 부분을, 우리 웹사이트의 클라이언트 사이드를 정의합니다. 아래와 같이 프로젝트의 루트에 그 파일을 두어야 합니다.  
```shell
 📂website
    📂client
        📂typings
          📄client.js
          📄jsconfig.json
```


## Examples
기본적으로 Javascript language service는 분석하고(analyzed) 당신의 자바스크립트 프로젝트 모든 파일을 위해  IntelliSense를 제공할 것입니다. 

적절한 IntelliSense를 제공하기 위해 제외하거나 포함할 파이를 나열하기 원할 수 있습니다. 

### exclude property 사용하기 
exclude attribute는 파일들이 당신의 소스 코드의 부분이 아니다라고 말해 줍니다. 높은 수준의 퍼포먼스를 유지지시켜 줍니다. IntelliSense가 느리다면,  excluse 목록에 폴더들을 포함시킵니다. 

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}
```


### include property 사용하기
다르게, include attribute는 파일들이 당신의 소스 코드의 부분이라고 말해 줍니다. 기본으로 이 속성이 없다면 포함하는 모든 디렉토리와 서브 디렉토리의 모든 파일들을 포함하고, 속성이 특정되었다면,그 파일들 만이 포함될 것입니다. 

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "include": ["src/**/*"]
}
```




## jsconfig Options

아래는 JavaScript language support를 구성하기 위한 jsconfig "compilerOptions"입니다. 



| 옵션                           | 설명                                                                                                                              |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| noLib                        | 기본 라이브러리 파일(lib.d.ts)을 포함하지 마십시오.                                                                                               |
| target                       | 사용할 기본 라이브러리(lib.d.ts)를 지정합니다. 값은 "es3", "es5", "es6", "es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "esnext"입니다. |
| module                       | 모듈 코드를 생성할 때 모듈 시스템을 지정합니다. 값은 "amd", "commonJS", "es2015", "es6", "esnext", "none", "system", "umd"입니다.                        |
| moduleResolution             | 가져오기를 위해 모듈을 확인하는 방법을 지정합니다. 값은 "node" 및 "classic"입니다.                                                                                |
| checkJs                      | JavaScript 파일에 대한 유형 검사를 활성화합니다.                                                                                                |
| experimentalDecorators       | 제안된 ES 데코레이터에 대한 실험적 지원을 활성화합니다.                                                                                                |
| allowSyntheticDefaultImports | 기본 내보내기 없이 모듈에서 기본 가져오기를 허용합니다. 이는 코드 방출에 영향을 미치지 않고 유형 검사에만 영향을 미칩니다.                                                          |
| baseUrl                      | 상대적이지 않은 모듈 이름을 확인하기 위한 기본 디렉터리입니다.                                                                                             |
| paths                        | baseUrl 옵션을 기준으로 계산할 경로 매핑을 지정합니다.                                                                                              |


[TypeScript compilerOptions documentation](https://www.typescriptlang.org/tsconfig#compilerOptions)에서 유효한 compilerOptions를 더 확인할 수 있습니다.

