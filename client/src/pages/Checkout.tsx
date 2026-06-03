import { useState } from "react";
import { useCart } from "../context/CartContext";
import { validateFullName, validateAddress, validatePhoneNumber } from "../utils/validators";
import { createOrder } from "../services/orderService";

type FormErrors = {
  fullName: string,
  phoneNumber: string,
  address: string,
  paymentMethod: string
}

const Checkout = () => {

  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    phoneNumber: "",
    address: "",
    paymentMethod: ""
  });
  const [serverMessage, setServerMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateFullName(fullName),
      phoneNumber: validatePhoneNumber(phoneNumber),
      address: validateAddress(address),
      paymentMethod: !paymentMethod ? "Please select payment method"
        : "",
    }

    setErrors(newErrors);

    if (newErrors.fullName || newErrors.phoneNumber ||
      newErrors.address || newErrors.paymentMethod
    ) {
      return;
    }

    const orderData = {
      fullName,
      phoneNumber,
      address,
      items: cartItems,
      totalPrice,
      paymentMethod,
    }

    const res = await createOrder(orderData);

    if (res.success) {
      clearCart();

      setFullName("");
      setPhoneNumber("");
      setAddress("");
      
      setErrors({
        fullName: "",
        phoneNumber: "",
        address: "",
        paymentMethod: ""
      });
    }

    setServerMessage(res.message);

  }

  return (
    <div className="flex flex-col gap-3 p-2">

      <div className="flex flex-col justify-center gap-2 border-b border-white">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
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
            className="input-fields" />
          {errors.fullName && <p>{errors.fullName}</p>}

          <input type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="input-fields" />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

          <input type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="input-fields" />
          {errors.address && <p>{errors.address}</p>}


          <h3 className="text-xl">Payment Method</h3>

          <div className="flex gap-2">
            <input type="radio"
              name="paymentMethod"
              value={"cash"}
              onChange={(e) => setPaymentMethod(e.target.value)} />
            <p>Cash On Delivery</p>
          </div>

          <div className="flex gap-2">
            <input type="radio"
              name="paymentMethod"
              value={"card"}
              onChange={(e) => setPaymentMethod(e.target.value)} />
            <p>Card</p>
          </div>

          {errors.paymentMethod && <p>{errors.paymentMethod}</p>}

          <button type="submit">Place Order</button>

          <p className="text-xl text-green-500">{serverMessage}</p>

        </form>
      </div>

    </div>
  );
}

export default Checkout;