import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("로그아웃 성공!");
    } catch (err) {
      console.error(err);
      alert("로그아웃 실패");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded border-1 border-main-white hover:bg-red-600"
    >
      로그아웃
    </button>
  );
}
