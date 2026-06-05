export type ProductItem = {
  title: string,
  price: number
}

export type ProductProps = {
  product: ProductItem
}

export type OrderProductItem = {
  image: string,
  title: string,
  price: number,
  quantity: number,
  onIncrease: () => void,
  onDecrease: () => void
}

export type OrderProductProps = {
  orderProduct: OrderProductItem
}

export type Product = {
  id: number,
  image: string,
  title: string,
  price: number,
  category: string
}

export type CartItem = Product & {
  quantity: number
}