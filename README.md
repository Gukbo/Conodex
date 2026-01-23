노래방 애창곡 저장 웹 페이지

(모바일전용)

<img width="427" height="904" alt="1" src="https://github.com/user-attachments/assets/4d8deb2e-7b9f-49e4-9f29-3b5739defb78" />
<img width="517" height="759" alt="2" src="https://github.com/user-attachments/assets/3da9cc7b-6b0d-41d6-9186-0988bbdcce46" />

# 🎤 Conodex (노래방 애창곡 관리 앱)

### 1. 프로젝트 소개
React Query와 Zustand의 효율적인 상태 관리 패턴을 학습하고 검증하기 위해 개발한 토이 프로젝트입니다.
노래 검색 시 발생하는 불필요한 API 호출을 **디바운싱 기법**으로 줄이고, 사용자 경험(UX)을 개선하는 데 초점을 맞췄습니다.

### 2. 기술 스택 (Tech Stack)
* **Core:** React, TypeScript, Vite
* **State Management:**
    * **Server State:** React Query (TanStack Query) - 데이터 캐싱 및 비동기 상태 관리
    * **Client State:** Zustand - 장바구니(애창곡 리스트) 전역 상태 및 로컬 스토리지 연동
* **Optimization:** Custom Debounce Hook (검색 최적화)

* 

### 3. 핵심 문제 해결 (Troubleshooting)
#### ⚡️ 검색 API 호출 낭비 방지 (Debouncing)
* **문제:** 사용자가 검색어를 입력하는 도중(`ㅇ`, `아`, `아이`...) API가 과도하게 호출되는 문제 발생.
* **해결:** `useDebounce` 커스텀 훅을 구현하여, 입력이 300ms 멈췄을 때만 요청을 보내도록 최적화.
* **결과:** API 호출 횟수 약 **80% 감소**.

#### 🔄 서버 데이터와 클라이언트 상태의 분리
* **문제:** `useState` 하나로 모든 데이터를 관리하려다 보니 코드가 복잡해지고 불필요한 리렌더링 발생.
* **해결:**
    * **데이터 패칭(Search):** React Query를 도입하여 `staleTime`을 활용한 캐싱 적용.
    * **UI 상태(Cart):** Zustand를 도입하여 컴포넌트 간 Props Drilling 제거 및 `persist` 미들웨어로 새로고침 데이터 유지.

#### 🎨 사용자 경험(UX) 개선 : Blocking Alert 제거
* **문제:** 초기 구현 시 `window.alert`를 사용하여 알림을 띄웠으나, 확인 버튼을 누르기 전까지 **브라우저 전체가 멈추는(Blocking)** 현상이 발생하여 모바일에서의 사용 흐름이 끊김.
* **해결:** `react-hot-toast`를 도입하여 **Non-blocking(비차단)** 방식의 UI 피드백 시스템 구축.
* **결과:** 사용자가 노래를 담는 동안 흐름이 끊기지 않으며, 시각적인 피드백(성공/실패 아이콘)을 통해 앱의 완성도를 높임.
