# JavaScript 프로젝트 생성하기

## 프로젝트 만들기
```shell
$ npm create vite@latest
```
Project 이름을 vite-javascript로 설정한다. 
```shell
?Project name: vite-javascript
```
framework를 선택하라고 나온다.  Vanilla를 선택한다. 
```shell
? Select a framework: 
Vanilla <-- 이거 선택
Vue
React
Preact
Lit
Svelte
Others
```


## markdown-it 설치
markdown-it을 설치합니다. 
```shell
$ npm install markdown-it
```
## index.md 파일 생성
읽어 올 markdown 파일을 생성하고 간단히 작성합니다.


## main.js
markdown-it을 임포트하고 index.md 파일을 임포트합니다.  
```jsx
import markdownIt from 'markdown-it'
import copy from "./index.md?raw"; // ad

// This code render our data from the markdown to the app
document.querySelector("#app").innerHTML = markdownIt().render(copy); 
```

## 테스트
다음을 실행하여 브라우저에서 테스트합니다.
```shell
$ npm run dev
```














