import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../services/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

// Context 객체
const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

// Provider 컴포넌트
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook (eslint 경고 무시 주석 추가)
/* eslint-disable-next-line react-refresh/only-export-components */
export function useAuth() {
  return useContext(AuthContext);
}
