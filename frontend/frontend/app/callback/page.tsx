"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      try {
        const token = searchParams.get("token");
       

        if (!token) {
          throw new Error("Gerekli parametreler eksik");
        }

        // API route'u kullanarak doğrulama isteği gönder
        const response = await fetch(
          `/api/payment/callback?token=${encodeURIComponent(token)}}`
        );

        if (!response.ok) {
          throw new Error(`Doğrulama hatası: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "SUCCESS") {
          alert("Ödeme başarıyla tamamlandı!");
        } else if (result.status === "FAILURE") {
          alert(`Ödeme başarısız: ${result.errorMessage || "Bir hata oluştu"}`);
        } else {
          alert("Ödeme durumu belirsiz.");
        }

    
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          router.push("/payment");
        }, 2000);
      }
    }

    verifyPayment();
  }, [searchParams, router]);

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fee2e2",
        padding: "1rem"
      }}>
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center"
        }}>
          <h1 style={{
            color: "#dc2626",
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem"
          }}>
            Hata Oluştu
          </h1>
          <p style={{ color: "#4b5563" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          marginBottom: "1rem"
        }}>
          {isLoading ? "Ödeme İşleniyor..." : "Yönlendiriliyor..."}
        </h1>
        <p style={{ color: "#4b5563" }}>
          {isLoading ? "Lütfen bekleyin, ödemeniz doğrulanıyor." : "Ödeme sayfasına yönlendiriliyorsunuz..."}
        </p>
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6"
      }}>
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem"
          }}>
            Yükleniyor...
          </h1>
          <p style={{ color: "#4b5563" }}>
            Lütfen bekleyin...
          </p>
        </div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      try {
        const token = searchParams.get("token");
        const conversationId = searchParams.get("conversationId");

        // Debug için parametreleri logla
        console.log("Callback parametreleri:", {
          token,
          conversationId,
          allParams: Object.fromEntries(searchParams.entries())
        });

        if (!token || !conversationId) {
          throw new Error("Gerekli parametreler eksik");
        }

        // API route'u kullanarak doğrulama isteği gönder
        const response = await fetch(
          `/api/payment/callback?token=${encodeURIComponent(token)}&conversationId=${encodeURIComponent(conversationId)}`
        );

        if (!response.ok) {
          throw new Error(`Doğrulama hatası: ${response.status}`);
        }

        const result = await response.json();
        console.log("Doğrulama sonucu:", result);

        if (result.status === "SUCCESS") {
          alert("Ödeme başarıyla tamamlandı!");
        } else if (result.status === "FAILURE") {
          alert(`Ödeme başarısız: ${result.errorMessage || "Bir hata oluştu"}`);
        } else {
          alert("Ödeme durumu belirsiz.");
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu";
        console.error("Ödeme doğrulama hatası:", err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        // Kısa bir gecikme ile yönlendirme yap
        setTimeout(() => {
          router.push("/payment");
        }, 2000);
      }
    }

    verifyPayment();
  }, [searchParams, router]);

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fee2e2",
        padding: "1rem"
      }}>
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center"
        }}>
          <h1 style={{
            color: "#dc2626",
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem"
          }}>
            Hata Oluştu
          </h1>
          <p style={{ color: "#4b5563" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
      padding: "1rem"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          marginBottom: "1rem"
        }}>
          {isLoading ? "Ödeme İşleniyor..." : "İşlem Tamamlandı"}
        </h1>
        <p style={{ color: "#4b5563" }}>
          {isLoading ? "Lütfen bekleyin, ödemeniz doğrulanıyor." : "Anasayfaya yönlendiriliyorsunuz..."}
        </p>
      </div>
    </div>
  );
}
