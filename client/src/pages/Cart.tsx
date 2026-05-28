import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity } = useCart();

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h2>Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center p-1 min-h-24 w-full max-w-sm border rounded-md">
          <p>{item.title}</p>
          <p>${item.price}</p>
          <button onClick={() => decreaseQuantity(item.id)}>-</button>
          <button onClick={() => addToCart(item)}>+</button>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;