import { menuProducts } from "../data/menuData";
import OrderProduct from "../components/OrderProduct";
import { useCart } from "../context/CartContext";

const Orders = () => {

  const { addToCart, decreaseQuantity, cartItems } = useCart();

  const categories = ["Burgers", "Gyros", "Drinks", "Sides"];

  return (
    <div className="flex flex-col text-center gap-3 p-2">
      <h2 className="text-3xl">Orders</h2>

      {categories.map((category) => (
        <div key={category} className="flex flex-col gap-3">

          <h3 className="text-xl text-amber-400">{category}</h3>

          <div className="flex flex-col items-center gap-3">
            {menuProducts.filter((product) => product.category === category)
              .map((product) => {

                const currentItem = cartItems.find((item) => item.id === product.id);

                return (
                  <OrderProduct
                    key={product.id}
                    orderProduct={{
                      ...product,
                      quantity: currentItem?.quantity || 0,
                      onIncrease: () => addToCart(product),
                      onDecrease: () => decreaseQuantity(product.id),
                    }}
                  />
                )
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;