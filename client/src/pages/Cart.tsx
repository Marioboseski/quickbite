import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity } = useCart();

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-3xl text-amber-400">Cart</h2>

      {cartItems.map((item) => (
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
      ))}
    </div>
  );
}

export default Cart;