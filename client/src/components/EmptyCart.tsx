import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-evenly items-center text-center min-h-[80vh]">
      <h3 className="text-3xl text-amber-400">Cart</h3>
      <p className="text-3xl">Your cart is empty!</p>
      <Link to={"/orders"} className="border-2 border-amber-400 rounded-md w-full max-w-xs p-1 text-lg duration-100 hover:scale-105">Browse products</Link>
    </div>
  );
}

export default EmptyCart;