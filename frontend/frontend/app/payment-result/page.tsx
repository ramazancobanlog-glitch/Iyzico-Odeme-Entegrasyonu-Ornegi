"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PaymentResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const paymentStatus = searchParams.get("status");
    const errorMessage = searchParams.get("message");

    console.log("Payment result:", { status: paymentStatus, message: errorMessage });

    if (paymentStatus === "success" || paymentStatus === "SUCCESS") {
      setStatus("success");
      setMessage("Ödeme başarıyla tamamlandı!");
    } else {
      setStatus("error");
      setMessage(decodeURIComponent(errorMessage || "Ödeme işlemi başarısız oldu."));
    }
  }, [searchParams]);

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
    backgroundColor: status === "error" ? "#fee2e2" : status === "success" ? "#ecfdf5" : "#f3f4f6",
    padding: "1rem"
  };

  const cardStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
    maxWidth: "400px",
    width: "100%"
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: status === "error" ? "#dc2626" : status === "success" ? "#059669" : "#374151"
  };

  const messageStyle = {
    color: "#4b5563"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>
          {status === "loading" ? "Ödeme İşleniyor..." :
           status === "success" ? "Ödeme Başarılı!" :
           "Ödeme Hatası"}
        </h1>
        <p style={messageStyle}>
          {status === "loading" ? "Lütfen bekleyin, ödemeniz doğrulanıyor..." : message}
        </p>
        {status !== "loading" && (
          <p style={{ ...messageStyle, marginTop: "1rem", fontSize: "0.875rem" }}>
            Ana sayfaya yönlendiriliyorsunuz...
          </p>
        )}
      </div>
    </div>
  );
}

export default function PaymentResult() {
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
      <PaymentResultContent />
    </Suspense>
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const paymentStatus = searchParams.get("status");
    const errorMessage = searchParams.get("message");

    console.log("Payment result:", { status: paymentStatus, message: errorMessage });

    if (paymentStatus === "success" || paymentStatus === "SUCCESS") {
      setStatus("success");
      setMessage("Ödeme başarıyla tamamlandı!");
    } else {
      setStatus("error");
      setMessage(decodeURIComponent(errorMessage || "Ödeme işlemi başarısız oldu."));
    }
  }, [searchParams]);

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
    backgroundColor: status === "error" ? "#fee2e2" : status === "success" ? "#ecfdf5" : "#f3f4f6",
    padding: "1rem"
  };

  const cardStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
    maxWidth: "400px",
    width: "100%"
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: status === "error" ? "#dc2626" : status === "success" ? "#059669" : "#374151"
  };

  const messageStyle = {
    color: "#4b5563"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>
          {status === "loading" ? "Ödeme İşleniyor..." :
           status === "success" ? "Ödeme Başarılı!" :
           "Ödeme Hatası"}
        </h1>
        <p style={messageStyle}>
          {status === "loading" ? "Lütfen bekleyin, ödemeniz doğrulanıyor..." : message}
        </p>
        {status !== "loading" && (
          <p style={{ ...messageStyle, marginTop: "1rem", fontSize: "0.875rem" }}>
            Ana sayfaya yönlendiriliyorsunuz...
          </p>
        )}
      </div>
    </div>
  );
}
