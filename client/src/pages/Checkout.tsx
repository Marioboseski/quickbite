import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { createOrder } from "../services/orderService";
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkoutSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Checkout = () => {

  const { cartItems, clearCart } = useCartStore();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const [serverMessage, setServerMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors }, } =
    useForm<CheckoutFormData>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: {
        fullName: "",
        phoneNumber: "",
        address: "",
      },
    });

  const onSubmit = async (data: CheckoutFormData) => {

    const orderData = {
      ...data,
      items: cartItems,
      totalPrice,
    }

    const res = await createOrder(orderData);

    if (res.success) {
      clearCart();
      reset();
    }

    if (res.message) {
      setServerMessage(res.message);

      setTimeout(() => {
        setServerMessage("");
      }, 3000);
    }

  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 p-2">

      <div className="flex flex-col justify-center items-start gap-2 border-b border-white w-full max-w-sm">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <p className="text-lg">{item.title} x{item.quantity}</p>
            <p className="text-lg">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <p className="text-lg">Items: {cartItems.length}</p>
        <p className="text-lg">Total price: ${(totalPrice).toFixed(2)}</p>
      </div>

      <div className="flex justify-center items-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 border-2 border-amber-400 rounded-lg w-full max-w-sm p-2">
          <h3 className="text-xl">Delivery Information</h3>

          <div>
            <input type="text"
              placeholder="Full Name"
              className="input-fields"
              {...register("fullName")} />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
          </div>

          <div>
            <input type="text"
              placeholder="Phone Number"
              className="input-fields"
              {...register("phoneNumber")} />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <input type="text"
              placeholder="Address"
              className="input-fields"
              {...register("address")} />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>

          <h3 className="text-xl">Payment Method</h3>

          <div className="flex gap-2">
            <input type="radio"
              value={"cash"}
              {...register("paymentMethod")} />
            <p>Cash On Delivery</p>
          </div>

          <div className="flex gap-2">
            <input type="radio"
              value={"card"}
              {...register("paymentMethod")} />
            <p>Card</p>
          </div>

          {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>}

          <div className="flex flex-col justify-center items-center text-center gap-3">
            <button type="submit" className="border-2 border-amber-400 rounded-md w-full max-w-xs p-1 text-lg duration-100 hover:scale-105">Place Order</button>
            <p className="text-xl text-green-500">{serverMessage}</p>
          </div>

        </form>
      </div>

    </div>
  );
}

export default Checkout;