"use client";

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

interface OrdersProps {
  orders: Order[];
}

export default function Orders({ orders }: OrdersProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Henüz siparişiniz yok.
      </div>
    );
  }

  return (
    
    <ul className="space-y-6 max-w-4xl mx-auto">
      {orders.map((order) => (
        <li
  key={order.id}
  className="border rounded p-4 shadow bg-white dark:bg-gray-800 text-black dark:text-gray-100"
>

          <div className="flex justify-between mb-4">
            <span className="font-semibold">Sipariş No:</span>
            <span>{order.id}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Tarih:</span>
            <span>{order.date}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Toplam:</span>
            <span>{order.total.toFixed(2)} ₺</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ürünler:</h3>
            <ul className="list-disc list-inside space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.quantity} — {(item.price * item.quantity).toFixed(2)} ₺
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
