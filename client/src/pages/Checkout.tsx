import { useState } from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {

  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="flex flex-col gap-3 p-2">

      <div className="flex flex-col justify-center gap-2 border-b border-white">
        {cartItems.map((item) => (
          <div className="flex gap-3">
            <p className="text-lg">{item.title} x{item.quantity}</p>
            <p className="text-lg">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <p className="text-lg">Items: {cartItems.length}</p>
        <p className="text-lg">Total price: ${(totalPrice).toFixed(2)}</p>
      </div>

      <div className="flex justify-center items-center">
        <form className="flex flex-col gap-3 border-2 border-amber-400 rounded-lg w-full max-w-sm p-2">
          <h3 className="text-xl">Delivery Information</h3>
          <input type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="p-2 text-lg rounded-md" />

          <input type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="p-2 text-lg rounded-md" />

          <input type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="p-2 text-lg rounded-md" />

          <button type="submit" className="text-lg border border-amber-400 p-1 rounded-md">Add information</button>
        </form>
      </div>

    </div>
  );
}

export default Checkout;