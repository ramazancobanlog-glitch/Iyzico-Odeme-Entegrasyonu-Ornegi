"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [cart] = useState([
    { id: "1", name: "Ürün 1", price: 50 },
    { id: "2", name: "Ürün 2", price: 30 },
  ]);

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3001/create-checkout-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          buyer: {
            name: "Ali",
            surname: "Veli",
            email: "ali@example.com",
            gsmNumber: "+905551112233",
            identityNumber: "12345678901",
            address: "İstanbul",
            city: "İstanbul",
            country: "Türkiye",
          },
        }),
      });
      const data = await res.json();
      if (data.paymentPageUrl) {
        window.location.href = data.paymentPageUrl; // iyzico sayfasına yönlendir
      }
    } catch (err) {
      console.error(err);
      alert("Ödeme başlatılamadı.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sepet</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>{item.name}: {item.price} ₺</li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Ödeme Yap</button>
    </div>
  );
}
