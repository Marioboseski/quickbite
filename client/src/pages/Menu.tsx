import { menuProducts } from "../data/menuData";
import Product from "../components/Product";

const Menu = () => {

  const categories = ["Burgers", "Gyros", "Drinks", "Sides"];

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 border-2 border-amber-400 rounded-md p-2">
        <h2 className="text-center text-3xl text-amber-400">Menu</h2>
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-2">
            <p className="text-2xl text-amber-400">{category}</p>
            {menuProducts.filter((product) => product.category === category)
              .map((product) => (
                <Product key={product.id} title={product.title} price={product.price} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;