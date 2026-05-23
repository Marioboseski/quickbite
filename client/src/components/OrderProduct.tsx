import type { OrderProductProps } from "../types/product";

const OrderProduct = ({ orderProduct }: OrderProductProps) => {
  return (
    <div className="flex justify-between items-center p-1 min-h-24 w-full max-w-sm border rounded-md">

      <div>
        <p>{orderProduct.title}</p>
        <p>${orderProduct.price}</p>
      </div>

      <div className="flex justify-around items-center p-2 w-full max-w-24 ">
        <button onClick={orderProduct.onDecrease} className="border w-1/2 p-1">-</button>
        <p className="border w-1/2 p-1">{orderProduct.quantity}</p>
        <button onClick={orderProduct.onIncrease} className="border w-1/2 p-1">+</button>
      </div>

    </div>
  );
}

export default OrderProduct;