"use client";

import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Cart() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      total: cart.reduce((sum, item) => sum + item.price, 0),
      items: cart.map(i => ({ name: i.name, quantity: 1, price: i.price })),
    };
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/create-checkout-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          buyer: {
            name: "Ali",
            surname: "Veli",
            gsmNumber: "+905555555555",
            email: "ali.veli@example.com",
            identityNumber: "12345678901",
            address: "İstanbul, Türkiye",
            city: "İstanbul",
            country: "Türkiye",
          },
        }),
      });

      if (!res.ok) throw new Error("Ödeme formu oluşturulamadı");
      const data = await res.json();
      if (data.paymentPageUrl) window.location.href = data.paymentPageUrl;
      else throw new Error("Ödeme sayfası URL'si alınamadı");
    } catch (err: any) {
      setError(err.message || "Bilinmeyen hata");
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="fixed top-6 right-6 z-50 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 shadow-lg rounded-full p-4 hover:scale-110 transform transition"
        onClick={() => setOpen(prev => !prev)}
      >
        🛒 <span className="ml-1 font-semibold">({cart.length})</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-6 mt-2 w-80 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 shadow-2xl rounded-xl p-5 z-40"
          >
            <h4 className="text-xl font-bold mb-3">Sepet</h4>

            {cart.length === 0 ? (
              <p className="text-gray-400 dark:text-gray-600 text-center py-6">Sepetiniz boş</p>
            ) : (
              <>
                <ul className="max-h-64 overflow-y-auto divide-y divide-gray-700 dark:divide-gray-300">
                  {cart.map((item, i) => (
                    <li key={i} className="flex justify-between py-2 text-sm">
                      <span>{item.name}</span>
                      <span className="font-semibold">{item.price.toFixed(2)} ₺</span>
                    </li>
                  ))}
                </ul>

                {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

                <button
                  disabled={loading}
                  onClick={handleCheckout}
                  className={`mt-5 w-full py-3 rounded-xl font-semibold ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed text-gray-300"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  } transition`}
                >
                  {loading ? "Yönlendiriliyor..." : "Sepeti Onayla"}
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
