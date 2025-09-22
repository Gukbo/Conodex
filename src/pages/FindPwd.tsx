import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";

export default function FindPwd() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      alert(`비밀번호 재설정 이메일 전송 실패: ${err.code}`);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-main-black">
      <form
        onSubmit={handleReset}
        className="bg-point-black p-6 rounded-xl shadow-md flex flex-col gap-4 w-80"
      >
        <h2 className="text-main-white font-bold">비밀번호 재설정</h2>
        {sent ? (
          <>
            <p className="text-sm text-green-600">
              {email} 주소로 재설정 메일을 보냈습니다.
            </p>
            <Link className="text-main-white" to="/login">
              로그인으로
            </Link>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded text-main-white"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              재설정 메일 보내기
            </button>
            <Link className="text-main-white self-start" to="/login">
              돌아가기
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
