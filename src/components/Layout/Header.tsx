import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "../LogoutBtn";

export default function Header() {
  const { user, nickname } = useAuth();
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1>Conodex</h1>
      {nickname ?? user?.email}님 환영합니다. <br />
      <LogoutButton />
    </nav>
  );
}
