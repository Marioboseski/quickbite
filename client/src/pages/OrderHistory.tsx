import { useEffect, useState } from "react";
import { getOrdersHistory } from "../services/orderService";
import type { HistoryOrder } from "../types/product";

const HistoryOrders = () => {

  const [orders, setOrders] = useState<HistoryOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersHistory();

      setOrders(data);

    }

    fetchOrders();

  }, []);


  return (
    <div className="flex flex-col justify-center gap-3 p-2">
      <h3 className="text-2xl text-center">History orders</h3>
      {orders.map((order) => (
        <div key={order.id} className="border-b p-1">
          <p>Name: {order.fullName}</p>
          <p>Phone Number: {order.phoneNumber}</p>
          <p>Address: {order.address}</p>
          {(order.items).map((orderItem) => (
            <div key={orderItem.id}>
              <p>Product: {orderItem.title}</p>
              <p>Quantity: {orderItem.quantity}</p>
              <p>Price: ${orderItem.price * orderItem.quantity}</p>
            </div>
          ))}
          <p>Payment method: {order.paymentMethod}</p>
          <p>Ordered: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default HistoryOrders;