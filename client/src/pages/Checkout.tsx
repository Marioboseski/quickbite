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

const initialFormValues = {
  fullName: "",
  phoneNumber: "",
  address: ""
}

const initialErrors = {
  fullName: "",
  phoneNumber: "",
  address: "",
  paymentMethod: ""
}

const Checkout = () => {

  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [serverMessage, setServerMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateFullName(formValues.fullName),
      phoneNumber: validatePhoneNumber(formValues.phoneNumber),
      address: validateAddress(formValues.address),
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
      ...formValues,
      items: cartItems,
      totalPrice,
      paymentMethod,
    }

    const res = await createOrder(orderData);

    if (res.success) {
      clearCart();

      setFormValues(initialFormValues);

      setErrors(initialErrors);
    }

    setServerMessage(res.message);

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev, [name]: value
    }))
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
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="input-fields" />
          {errors.fullName && <p>{errors.fullName}</p>}

          <input type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input-fields" />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

          <input type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
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