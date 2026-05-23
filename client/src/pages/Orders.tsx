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
    <div className="flex flex-col text-center gap-3 p-2">
      <h2 className="text-3xl">Orders</h2>

      {categories.map((category) => (
        <div key={category} className="flex flex-col gap-3">

          <h3 className="text-xl text-amber-400">{category}</h3>

          <div className="flex flex-col items-center gap-3">
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
        </div>
      ))}
    </div>
  );
}

export default Orders;