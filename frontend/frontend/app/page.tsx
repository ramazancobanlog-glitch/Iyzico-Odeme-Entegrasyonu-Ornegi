"use client";

import ProductCard from "./components/ProductCard";
import { CartProvider } from "./components/CartProvider";
import Cart from "./components/Cart";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import Link from "next/link";

const products = [
  { id: "1", name: "Kablosuz Kulaklık", price: 499.99, image: "https://source.unsplash.com/featured/?headphones" },
  { id: "2", name: "Mekanik Klavye", price: 799.99, image: "https://source.unsplash.com/featured/?keyboard" },
  { id: "3", name: "Oyun Mouse", price: 299.99, image: "https://source.unsplash.com/featured/?mouse" },
];

export default function HomePage() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ThemeProvider>
  );
}

function MainContent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="max-w-7xl mx-auto p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">TechStore</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <Cart />
          <Link href="/orders" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">
            Siparişlerim
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto p-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">En Yeni Teknoloji Ürünleri</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Kablosuz kulaklıklardan mekanik klavyelere, oyun ekipmanları burada!
        </p>
        <Link
          href="#products"
          className="inline-block px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-lg font-semibold transition"
        >
          Alışverişe Başla
        </Link>
      </section>

      <section id="products" className="max-w-7xl mx-auto p-6">
        <h3 className="text-3xl font-bold mb-6 text-center">Ürünler</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <footer className="mt-16
        bg-gray-800 text-gray-200 py-6 text-center">
        &copy; {new Date().getFullYear()} TechStore. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}