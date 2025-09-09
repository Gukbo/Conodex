import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import LogoutButton from "../components/LogoutBtn";

export default function Home() {
  const { user } = useAuth();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const fetchNickname = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNickname(docSnap.data().nickname);
        }
      }
    };
    fetchNickname();
  }, [user]);

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">
            {nickname
              ? `${nickname}님 환영합니다 🎵`
              : `${user.email}님 환영합니다`}
          </h1>
          <LogoutButton />
        </>
      ) : (
        <h1 className="text-xl">로그인이 필요합니다</h1>
      )}
    </div>
  );
}
