import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./footer.jsx";
import "./layout.css"

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default Layout;
