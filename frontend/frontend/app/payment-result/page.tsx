"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentResult() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const paymentStatus = searchParams.get("status");
    const errorMessage = searchParams.get("message");

    if (paymentStatus === "success" || paymentStatus === "SUCCESS") {
      setStatus("success");
      setMessage("Ödeme başarıyla tamamlandı!");
    } else {
      setStatus("error");
      setMessage(decodeURIComponent(errorMessage || "Ödeme başarısız oldu."));
    }
  }, [searchParams]);

  // 3 saniye sonra yönlendirme
  useEffect(() => {
    if (status !== "loading") {
      const timer = setTimeout(() => {
        router.push("/payment");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      status === "success"
        ? "#ecfdf5"
        : status === "error"
        ? "#fee2e2"
        : "#f3f4f6",
    padding: "1rem",
  };

  const cardStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
    maxWidth: "400px",
    width: "100%",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color:
      status === "success"
        ? "#059669"
        : status === "error"
        ? "#dc2626"
        : "#374151",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>
          {status === "loading"
            ? "Ödeme İşleniyor..."
            : status === "success"
            ? "Ödeme Başarılı!"
            : "Ödeme Hatası"}
        </h1>
        <p style={{ color: "#4b5563" }}>
          {status === "loading"
            ? "Lütfen bekleyin, ödemeniz doğrulanıyor..."
            : message}
        </p>
        {status !== "loading" && (
          <p
            style={{
              color: "#6b7280",
              marginTop: "1rem",
              fontSize: "0.875rem",
            }}
          >
            Ana sayfaya yönlendiriliyorsunuz...
          </p>
        )}
      </div>
    </div>
  );
}
