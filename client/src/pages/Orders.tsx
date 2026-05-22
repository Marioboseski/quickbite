import { menuProducts } from "../data/menuData";
import OrderProduct from "../components/OrderProduct";
import { useState } from "react";

const Orders = () => {

  const categories = ["Burgers", "Gyros", "Drinks", "Sides"];

  const [quantites, setQuantities] = useState<Record<number, number>>({});

  const increaseQuantity = (id: number) => {
    setQuantities((prev) => ({
      ...prev, [id]: (prev[id] || 0) + 1
    }));
  }

  const decreaseQuantity = (id: number) => {
    setQuantities((prev) => ({
      ...prev, [id]: Math.max((prev[id] || 0) - 1)
    }))
  }

  return (
    <div>
      <h2 className="text-3xl text-amber-400">Orders</h2>

      {categories.map((category) => (
        <div key={category}>

          <h3>{category}</h3>

          {menuProducts.filter((product) => product.category === category)
            .map((product) => (

              <OrderProduct
                key={product.id}
                orderProduct={{
                  ...product,
                  quantity: quantites[product.id] || 0,
                  onIncrease: () => increaseQuantity(product.id),
                  onDecrease: () => decreaseQuantity(product.id),
                }}
              />

            ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;