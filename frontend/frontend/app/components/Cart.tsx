"use client";
import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Cart() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ödeme sayfasına yönlendirme işlevi
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Backend URL'ini kendi ayarına göre değiştir
      const response = await fetch("http://localhost:3001/create-checkout-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          buyer: {
            // Örnek sabit bilgiler, bunu kullanıcıdan alabilirsin
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

      if (!response.ok) {
        throw new Error("Ödeme formu oluşturulamadı");
      }

      const data = await response.json();

      if (data.paymentPageUrl) {
        window.location.href = data.paymentPageUrl; // Iyzipay ödeme sayfasına yönlendir
      } else {
        throw new Error("Ödeme sayfası URL'si alınamadı");
      }
    } catch (err: any) {
      setError(err.message || "Bilinmeyen hata");
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="fixed top-4 right-4 z-50 bg-white shadow-md rounded-full p-3"
        onClick={() => setOpen((prev) => !prev)}
      >
        🛒 <span className="ml-1 text-sm font-semibold">({cart.length})</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded p-4 z-40"
          >
            <h4 className="text-lg font-bold mb-2">Sepet</h4>
            {cart.length === 0 ? (
              <p>Sepetiniz boş</p>
            ) : (
              <>
                <ul className="max-h-40 overflow-y-auto">
                  {cart.map((item, i) => (
                    <li key={i} className="flex justify-between border-b py-1 text-sm">
                      <span>{item.name}</span>
                      <span>{item.price.toFixed(2)} ₺</span>
                    </li>
                  ))}
                </ul>

                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

                <button
                  disabled={loading}
                  onClick={handleCheckout}
                  className={`mt-4 w-full py-2 rounded text-white font-semibold ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
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
