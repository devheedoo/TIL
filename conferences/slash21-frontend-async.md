# 프론트엔드 비동기 처리 발표 정리

- 발표 영상: [토스 | SLASH 21 - 프론트엔드 웹 서비스에서 우아하게 비동기 처리하기](https://www.youtube.com/watch?v=FvRtoViujGg)
- 발표자: 박서진 / 토스 Frontend Developer
- keyword: 비동기 프로그래밍, React Suspense, 로딩/에러 처리

## 서론: 비동기 프로그래밍의 어려움

- 웹 서비스에서 가장 다루기 어려운 부분
- 순서가 보장되지 않는 상황에서
- 좋은 사용자 경험을 위해
- Callback, Promise, RxJS 등을 이용

## 좋은 코드란?

- 핵심 기능, 비즈니스 로직이 잘 드러남
- 성공과 실패 처리가 분리 (에러 처리를 외부로 위임)

## 현재 대부분의 프론트엔드 구현: 통합된 React 컴포넌트

- 컴포넌트에서 로딩과 에러 처리를 동시에 수행
- 비동기 로직 개수가 늘어날수록 복잡

```javascript
// BAD
function Profile() {
  const foo = useAsyncValue(() => fetchFoo());

  if (foo.error) return <div>FAIL</div>;
  if (!foo.data) return <div>LOADING</div>;

  return <div>{foo.data}</div>;
}

// GOOD
function Profile() {
  const foo = useAsyncValue(() => fetchFoo());
  return <div>{foo.data}</div>;
}
```

## 좋은 코드로 바꿔줄: React Suspense for Data Fetching

- 성공만 다루고, 로딩/에러 상태는 분리
- 동기 처리와 비슷한 코드 구조
- try-catch 구문처럼 적당한 범위로 적용
- 이미 라이브러리에서도 지원하고 있음: Recoil, SWR, react-query
- 토스에서 적용한 제품: TUBA 메신저

```javascript
<ErrorBoundary fallback={<ErrorPage />}>
  <Suspense fallback={<Loader />}>
    <Profile />
  </Suspense>
</ErrorBoundary>
```

## 추가 키워드

- 대수적 효과 (feat. Dan Abramov)
- React Concurrent Mode
- useTransition, useDeferredValue

## 소감

- 앱에 비해 웹은 화면이 커서 보여줄 요소가 많고, 당연히 한 번에 비동기 처리할 요소도 많음
- react-query의 useQuery를 사용해 isLoading/isError로 처리하는 것도 깔끔하다고 생각했는데, 더 좋은 코드를 작성할 수 있었음
- MobX를 사용하고 있으면서 RxJS에 대한 공부가 부족함
