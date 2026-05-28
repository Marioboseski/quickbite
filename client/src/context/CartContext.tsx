import { createContext, useContext, useState, type ReactNode } from "react";

export type CartItem = {
  id: number,
  title: string,
  price: number,
  category: string,
  quantity: number
}

type CartContextType = {
  cartItems: CartItem[],
  addToCart: (product: Omit<CartItem, "quantity">) => void,
  decreaseQuantity: (id: number) => void
}

export const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: ReactNode
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        return prev.map((item) => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1,
        } : item);
      }

      return [
        ...prev, {
          ...product,
          quantity: 1
        }
      ]
    })
  }

  const decreaseQuantity = (id: number) => {
    setCartItems((prev) => {
      return prev.map((item) => item.id === id ? {
        ...item,
        quantity: item.quantity - 1,
      } : item).filter((item) => item.quantity > 0)
    })
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export default CartProvider;