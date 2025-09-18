"use client";

import ProductCard from "./components/ProductCard";
import { CartProvider } from "./components/CartProvider";
import Cart from "./components/Cart";
import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Kablosuz Kulaklık",
    price: 499.99,
    image: "https://source.unsplash.com/featured/?headphones",
  },
  {
    id: "2",
    name: "Mekanik Klavye",
    price: 799.99,
    image: "https://source.unsplash.com/featured/?keyboard",
  },
  {
    id: "3",
    name: "Oyun Mouse",
    price: 299.99,
    image: "https://source.unsplash.com/featured/?mouse",
  },
];

export default function HomePage() {
  return (
    <CartProvider>
      <header className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mağaza</h1>
        <div className="flex gap-4">
          <Cart />
          <Link
            href="/orders"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Siparişlerim
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </CartProvider>
  );
}
