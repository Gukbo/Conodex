// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout"; // ✅ 레이아웃 추가
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MySongs from "./pages/MySongs";
import FindPwd from "./pages/FindPwd";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-main-black" />; // 깜빡임 방지

  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="findpwd" element={<FindPwd />} />

      {/* ✅ 공통 레이아웃으로 감싸고, Outlet 위치에 아래 자식 라우트가 그려짐 */}
      <Route element={<Layout />}>
        {/* index는 "/" 경로 */}
        <Route index element={user ? <Home /> : <Navigate to="login" />} />

        {/* 보호 라우트 */}
        <Route
          path="mysongs"
          element={user ? <MySongs /> : <Navigate to="login" />}
        />

        {/* 그 외 → 홈 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
