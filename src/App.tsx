import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MySongs from "./pages/MySongs";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;

  return (
    <Routes>
      {/* 메인: 로그인 상태에 따라 이동 */}
      <Route path="/" element={user ? <Home /> : <Navigate to="/signup" />} />

      {/* 회원가입 / 로그인 페이지 */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* 로그인해야 접근 가능한 페이지 */}
      <Route
        path="/mysongs"
        element={user ? <MySongs /> : <Navigate to="/login" />}
      />

      {/* 잘못된 경로는 홈으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
