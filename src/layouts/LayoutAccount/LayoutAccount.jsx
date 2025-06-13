import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
export const LayoutAccount = () => {
  return (
    <div className="wrap">
      <div className="bg-white sticky top-0 left-0 z-50">
        <header className="container ">
          <Navbar />
        </header>
      </div>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
