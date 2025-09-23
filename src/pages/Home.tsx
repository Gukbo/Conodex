import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import List from "../components/Home/list";

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
      <List />
    </div>
  );
}
