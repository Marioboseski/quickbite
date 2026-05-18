import homeImg from "../assets/home-page.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh bg-black p-2">
      <div className="flex flex-col text-center gap-3">
        <h1 className="text-4xl text-amber-400">Welcome to Quck Bite</h1>
        <img src={homeImg} alt="home-img" className="rounded-lg" />
        <p>Best Food, Fast Delivery!</p>
        <h2 className="text-3xl text-amber-400">Tasty food, one click away!</h2>
        <p>Choose from our menu and enjoy in your favourite food
          wherever you are.</p>
        <div className="flex gap-3">
          <Link to={"/orders"} className="bg-red-500 rounded-md w-full">Order Now</Link>
          <Link to={"/menu"} className="border-2 border-white rounded-md w-full">Menu</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;