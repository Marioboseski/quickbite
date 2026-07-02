import { Link } from "react-router-dom";
import { Hamburger } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ScrollText } from "lucide-react";
import { Settings } from "lucide-react";
import { CircleStar } from "lucide-react";

const NavBar = () => {
  return (
    <header className="sticky top-0 w-full bg-black text-white z-50 border-b border-gray-500">
      <nav className="p-3">
        <ul className="flex justify-between items-center text-lg md:text-xl md:justify-around">
          <Link to={"/"} className="flex justify-center items-center gap-1"><Hamburger size={30} />QuickBite</Link>
          <Link to={"menu"} className="flex justify-center items-center gap-1"><ScrollText size={30}/>Menu</Link>
          <Link to={"/orders"} className="flex justify-center items-center gap-1"><CircleStar size={30} />Orders</Link>
          <Link to={"/cart"} className="flex flex-col justify-center items-center"><ShoppingCart size={30} />Cart</Link>
          <Link to={"/profile"}><Settings size={30} /></Link>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;