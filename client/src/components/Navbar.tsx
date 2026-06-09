import { Link } from "react-router-dom";
import { Hamburger } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const NavBar = () => {
  return (
    <header className="sticky top-0 w-full bg-white text-black z-50">
      <nav className="p-3">
        <ul className="flex justify-around items-center text-xl ">
          <Link to={"/"} className="border-r-2 flex justify-center items-center gap-1"><Hamburger size={30} />QuickBite</Link>
          <Link to={"menu"} className="border-r-2">Menu</Link>
          <Link to={"/orders"}>Orders</Link>
          <Link to={"/cart"} className="flex flex-col justify-center items-center"><ShoppingCart size={30} />Cart</Link>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;