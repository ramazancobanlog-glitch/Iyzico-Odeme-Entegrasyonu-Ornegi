"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8 relative">
      {/* Geri butonu sol üstte */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Geri
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Siparişlerim</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Henüz bir siparişiniz yok.
        </p>
      ) : (
        <ul className="space-y-6 mt-4">
          {orders.map((order) => (
            <li key={order.id} className="border rounded p-4 shadow">
              <div className="mb-2">
                <strong>Sipariş No:</strong> {order.id}
              </div>
              <div className="mb-2">
                <strong>Tarih:</strong>{" "}
                {new Date(order.date).toLocaleDateString("tr-TR")}
              </div>
              <div className="mb-2">
                <strong>Toplam:</strong> {order.total.toFixed(2)} ₺
              </div>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity} –{" "}
                    {(item.quantity * item.price).toFixed(2)} ₺
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
