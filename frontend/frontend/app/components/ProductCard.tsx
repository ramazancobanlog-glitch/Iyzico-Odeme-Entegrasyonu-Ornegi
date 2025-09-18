// app/components/ProductCard.tsx
"use client";
import { motion } from "framer-motion";
import { useCart } from "./CartProvider";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
    >
      <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500 mb-2">{product.price.toFixed(2)} ₺</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Sepete Ekle
      </button>
    </motion.div>
  );
}
