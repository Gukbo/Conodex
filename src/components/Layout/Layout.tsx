import { Outlet } from "react-router-dom";
import LogoutButton from "../LogoutBtn";
import { useAuth } from "../../contexts/AuthContext";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="bg-main-black text-main-white min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main>
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <footer>푸터</footer>
    </div>
  );
}
