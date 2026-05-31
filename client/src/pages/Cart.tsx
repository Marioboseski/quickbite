import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-3xl text-amber-400">Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <p className="text-3xl">Your cart is empty!</p>
        </div>
      ) : (

        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-center p-1 min-h-24 w-full max-w-sm border rounded-md">
            <div>
              <p>{item.title}</p>
              <p>${item.price}</p>
            </div>
            <div className="flex justify-around items-center p-2 w-full max-w-24">
              <button onClick={() => decreaseQuantity(item.id)} className="border w-1/2 p-1">-</button>
              <p className="border w-1/2 p-1">{item.quantity}</p>
              <button onClick={() => addToCart(item)} className="border w-1/2 p-1">+</button>
            </div>
          </div>
        ))
      )}
      <div className="w-full p-2">
        <div className="flex flex-col gap-3 p-2 border-2 border-amber-400 rounded-md">
          <h3 className="text-3xl text-center">Cart Review</h3>
          <div className="flex justify-between items-center">
            <p className="text-xl">Total</p>
            <p className="text-xl">${totalPrice.toFixed(2)}</p>
          </div>
          <Link to={"/checkout"}>Checkout</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;