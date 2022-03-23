# Vue 3

## 1강: Vue 3 버전 설치랑 셋팅

- CLI 설치: `$ npm install -g @vue/cli`
- VS Code Extension: Vetur, HTML CSS Support, Vue 3 Snippets
- 프로젝트 생성: `$ vue create vuedongsan`
- 첫 시작 파일: `src/App.vue`
- 기본 코드 구성
  - `<template>`: HTML
  - `<script>`: JavaScript
  - `<style>`: CSS
- 미리보기: `$ npm run serve`

## 2강: 데이터 바인딩

- `export default { name: 'App', /* ... */ }` 안에 데이터 저장하고
- HTML 안에서 이중괄호 안에 코드로 호출 `{{}}`
- 데이터 바인딩 하는 이유: 변경하기 쉽고, 실시간 자동 렌더링하기 위해 (페이지 새로고침 없이 리렌더링)

```javascript
export default {
  name: 'App',
  data() {
    return {
      title: 'ABC',
      price: 10000,
    };
  },
  components: {},
};
```

```html
<h4>{{ title }}</h4>
<p>{{ price }}</p>
```

- HTML attribute도 바인딩할 수 있음: attribute명 앞에 `:` prefix 추가

## 3강: v-for

- `<a v-for="menu in menus" :key="menu.id">{{ menu.name }}</a>`

## 4강: 이벤트 핸들러

- event명 앞에 `@` prefix 추가해서 함수 호출
- `<button @click="room.rCount++">신고</button> <span>{{ room.rCount }}</span>`
- 기명 함수를 만드려면 export default 객체에 `methods: {}` 생성해서 안에서 정의
- 함수 안에서 data 호출할 때는 `this.데이터명`

## 5강: Modal 만들기

- 동적인 UI를 만들 때는 첫 상태를 저장해놓고, 그걸 보여주도록 작성
- `v-if` 속성값이 true면 해당 컴포넌트가 나타나고, false면 사라짐
