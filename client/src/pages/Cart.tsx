import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div> 
      <h2>Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;