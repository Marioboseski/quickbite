export type ProductItem = {
  title: string,
  price: number
}

export type ProductProps = {
  product: ProductItem
}

export type OrderProductItem = {
  title: string,
  price: number,
  quantity: number,
  onIncrease: () => void,
  onDecrease: () => void
}

export type OrderProductProps = {
  orderProduct: OrderProductItem
}