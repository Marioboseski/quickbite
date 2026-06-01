import { useState } from "react";
import { useCart } from "../context/CartContext";
import { validateFullName, validateAddress, validatePhoneNumber } from "../utils/validators";

type FormErrors = {
  fullName: string,
  phoneNumber: string,
  address: string
}

const Checkout = () => {

  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    phoneNumber: "",
    address: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateFullName(fullName),
      phoneNumber: validatePhoneNumber(phoneNumber),
      address: validateAddress(address)
    }

    setErrors(newErrors);

  }

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-2 border-amber-400 rounded-lg w-full max-w-sm p-2">
          <h3 className="text-xl">Delivery Information</h3>
          <input type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="p-2 text-lg rounded-md" />
          {errors.fullName && <p>{errors.fullName}</p>}

          <input type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="p-2 text-lg rounded-md" />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

          <input type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="p-2 text-lg rounded-md" />
          {errors.address && <p>{errors.address}</p>}

          <button type="submit" className="text-lg border border-amber-400 p-1 rounded-md">Add information</button>
        </form>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <h3 className="text-xl text-center">Payment Method</h3>

        <div className="flex gap-2">
          <input type="checkbox" />
          <p>Cash On Delivery</p>
        </div>

        <div className="flex gap-2">
          <input type="checkbox" />
          <p>Card</p>
        </div>

        <button>Place Order</button>

      </div>

    </div>
  );
}

export default Checkout;