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
    <div>
      <p>History orders</p>
      {orders.map((order) => (
       <div key={order.id}>
         <p>{order.fullName}</p>
        <p>{order.phoneNumber}</p>
        <p>{order.address}</p>
        <p>{order.paymentMethod}</p>
       </div>
      ))}
    </div>
  );
}

export default HistoryOrders;