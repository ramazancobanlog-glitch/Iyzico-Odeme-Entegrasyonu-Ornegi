"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function FormPayment() {
  const [isLoading, setIsLoading] = useState(false);
  
  interface CartItem {
    id: string;
    name: string;
    price: number;
  }

  interface Buyer {
    name: string;
    surname: string;
    gsmNumber: string;
    email: string;
    identityNumber: string;
    address: string;
    city: string;
    country: string;
  }

  const [cart] = useState<CartItem[]>([
    { id: "1", name: "Ürün 1", price: 50 },
    { id: "2", name: "Ürün 2", price: 30 },
  ]);

  const [buyer] = useState<Buyer>({
    name: "Ali",
    surname: "Veli",
    gsmNumber: "+905555555555",
    email: "ali@veli.com",
    identityNumber: "12345678901",
    address: "Test Mah. No:1",
    city: "Istanbul",
    country: "Turkey",
  });

  const handleCheckout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      console.log("Making request to:", `${baseUrl}/create-checkout-form`);
      
      const res = await axios.post(`${baseUrl}/create-checkout-form`, {
        cart,
        buyer,
      }, {
        timeout: 10000, // Timeout'u arttıralım
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("API response:", res.data);

      const paymentPageUrl = res.data.paymentPageUrl;
      if (paymentPageUrl) {
        console.log("Redirecting to payment page:", paymentPageUrl);
        window.location.href = paymentPageUrl;
      } else {
        alert("Ödeme sayfası oluşturulamadı. Lütfen tekrar deneyin.");
        console.error("Payment URL is empty:", res.data);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("Ödeme hatası detayı:", err.response?.data || err.message);
      alert("Ödeme işlemi başlatılırken bir hata oluştu. Lütfen tekrar deneyin.");
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNREFUSED') {
          console.error("Backend sunucusuna bağlanılamadı");
        } else {
          console.error("Axios hatası:", {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
          });
        }
      } else {
        console.error("Beklenmeyen hata:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Sepet</h1>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name}: {item.price}₺
        </div>
      ))}
      <button 
        onClick={handleCheckout} 
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {isLoading ? 'İşlem yapılıyor...' : 'Ödeme Yap'}
      </button>
    </div>
  );
}
