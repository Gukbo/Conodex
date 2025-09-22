import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

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
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
