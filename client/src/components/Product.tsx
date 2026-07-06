import type { ProductProps } from "../types/product"

const Product = ({product}: ProductProps) => {

  return (
    <div className="flex justify-between">
      <p className="border-b w-full text-lg">{product.title}</p>
      <p className="text-lg">€{product.price.toFixed(2)}</p>
    </div>
  );
}

export default Product;