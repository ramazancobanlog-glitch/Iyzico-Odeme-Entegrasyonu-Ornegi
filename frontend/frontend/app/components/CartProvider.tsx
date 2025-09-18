// app/components/CartProvider.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => useContext(CartContext)!;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
