import Nav from "./nav";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
export default function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
