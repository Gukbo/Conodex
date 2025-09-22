// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPending(true);
      // 세션 유지 (브라우저 로컬)
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // 로그인 성공 → 홈으로
    } catch (err: any) {
      console.error("LOGIN FAIL:", err.code, err.message);
      alert(`로그인 실패: ${err.code}`);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-main-black">
      <form
        onSubmit={handleLogin}
        className="bg-point-black p-6 rounded-xl shadow-md flex flex-col gap-4 w-80"
      >
        <h2 className="text-main-white text-xl font-bold">
          나만의 애창곡 | Conodex
        </h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-2 p-2 rounded text-main-white"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-2 p-2 rounded text-main-white"
          required
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-main-white p-2 rounded hover:bg-blue-600 disabled:opacity-60"
        >
          {pending ? "로그인 중..." : "로그인"}
        </button>
        <Link className="text-main-white self-start" to="/signUp">
          회원가입
        </Link>
        <Link className="text-main-white self-start" to="/FindPwd">
          비밀번호 찾기
        </Link>
      </form>
    </div>
  );
}
