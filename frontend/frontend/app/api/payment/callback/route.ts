import { NextRequest, NextResponse } from "next/server";

// İyzico'dan gelen POST callback'i
export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();
    const params = new URLSearchParams(bodyText);
    const token = params.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL(
          `/payment-result?status=error&message=${encodeURIComponent("Eksik token")}`,
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        )
      );
    }

    const apiUrl = process.env.BACKEND_URL || "http://localhost:3001";
    const verifyUrl = `${apiUrl}/verify-payment?token=${token}`;

    const verifyResponse = await fetch(verifyUrl);
    const result = await verifyResponse.json();

    return NextResponse.redirect(
      new URL(
        `/payment-result?status=${result.status}&message=${encodeURIComponent(result.errorMessage || "")}`,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      )
    );
  } catch (error) {
    console.error("Callback işlenirken hata:", error);

    return NextResponse.redirect(
      new URL(
        `/payment-result?status=error&message=${encodeURIComponent("Callback işlenirken hata oluştu")}`,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      )
    );
  }
}
