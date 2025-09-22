import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { getAuthErrorMessage } from "../utils/firebaseError";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanEmail = email.trim().toLowerCase();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        nickname: nickname,
        createdAt: new Date(),
      });
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error: any) {
      alert(getAuthErrorMessage(error.code));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-main-black">
      <form
        onSubmit={handleSignup}
        className="bg-point-black p-6 rounded-xl shadow-md flex flex-col gap-4 w-80"
      >
        <h2 className="text-main-white text-xl font-bold">회원가입</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-main-white"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-main-white"
          required
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 rounded text-main-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-main-white p-2 rounded hover:bg-blue-600"
        >
          회원가입
        </button>
        <Link className="text-main-white self-start" to="/login">
          돌아가기
        </Link>
      </form>
    </div>
  );
}
