import { create } from "zustand";
import type { Product, CartItem } from "../types/product";

type CartStore = {
  cartItems: CartItem[],
  addToCart: (product: Product) => void,
  decreaseQuantity: (id: number) => void,
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addToCart: (product) => set((state) => {
    const existingProduct = state.cartItems.find((item) =>
      item.id === product.id);

    if (existingProduct) {
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            } : item
        ),
      };
    }

    return {
      cartItems: [
        ...state.cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]
    }
  }),

  decreaseQuantity: (id) => set((state) => ({
    cartItems: state.cartItems.map((item) => item.id === id
      ? {
        ...item,
        quantity: item.quantity - 1,
      } : item
    ).filter((item) => item.quantity > 0)

  })),

  clearCart: () => set(() => ({
    cartItems: []
  }))

}));