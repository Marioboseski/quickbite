import type { OrderProductProps } from "../types/product";

const OrderProduct = ({ orderProduct }: OrderProductProps) => {
  return (
    <div>
      <p>{orderProduct.title}</p>
      <p>{orderProduct.price}</p>
      <p>{orderProduct.quantity}</p>
      <button onClick={orderProduct.onIncrease}>+</button>
      <button onClick={orderProduct.onDecrease}>-</button>
    </div>
  );
}

export default OrderProduct;