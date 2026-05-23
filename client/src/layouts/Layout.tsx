import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="">

      <NavBar />

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;