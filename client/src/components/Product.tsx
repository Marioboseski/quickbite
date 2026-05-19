import type { ProductItem } from "../types/product"

const Product = (product: ProductItem) => {

  return (
    <div className="flex justify-between">
      <p className="border-b w-full text-lg">{product.title}</p>
      <p className="text-lg">€{product.price}</p>
    </div>
  );
}

export default Product;