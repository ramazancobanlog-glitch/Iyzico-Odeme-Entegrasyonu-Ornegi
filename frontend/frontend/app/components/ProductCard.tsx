"use client";

import { useCart, Product } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
        <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-4">{product.price} ₺</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 rounded transition text-white font-semibold"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}
