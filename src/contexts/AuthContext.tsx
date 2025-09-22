import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  nickname: string | null;
}

// Context 객체
const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  nickname: null,
});

// Provider 컴포넌트
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setNickname(null); // 유저가 바뀌면 닉네임 초기화
      setLoadingAuth(false);

      if (u) {
        setLoadingProfile(true);
        try {
          const snap = await getDoc(doc(db, "users", u.uid));
          setNickname(snap.exists() ? snap.data().nickname ?? null : null);
        } catch (e) {
          console.error("fetch nickname failed:", e);
          setNickname(null);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setLoadingProfile(false);
      }
    });

    return () => unsub();
  }, []);

  // 전체 로딩: 인증 확인 + 프로필 로딩
  const loading = loadingAuth || loadingProfile;

  const value = useMemo(
    () => ({ user, loading, nickname }),
    [user, loading, nickname]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook (eslint 경고 무시 주석)
/* eslint-disable-next-line react-refresh/only-export-components */
export function useAuth() {
  return useContext(AuthContext);
}
