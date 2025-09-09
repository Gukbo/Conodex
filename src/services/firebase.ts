// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const auth = getAuth(app);

// 1) 권장: 자동 감지
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

// 2) 여전히 에러면 위 줄 주석처리하고 이걸로 테스트
// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });
