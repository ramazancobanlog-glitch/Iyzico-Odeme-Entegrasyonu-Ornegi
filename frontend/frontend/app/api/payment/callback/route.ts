import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let token: string | null = null;

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const bodyText = await request.text();
      const params = new URLSearchParams(bodyText);
      token = params.get("token");
    } else if (contentType.includes("application/json")) {
      const body = await request.json();
      token = body.token;
    }

    if (!token) {
      console.error("Token gelmedi");
      return NextResponse.redirect("http://localhost:3000/payment-result?status=error&message=Eksik+token");
    }

    const verifyRes = await fetch("http://localhost:3001/api/payment/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const result = await verifyRes.json();

    return NextResponse.redirect(
      `http://localhost:3000/payment-result?status=${result.status}&message=${encodeURIComponent(result.result?.errorMessage || "")}`
    );
  } catch (err) {
    console.error("Hata:", err);
    return NextResponse.redirect("http://localhost:3000/payment-result?status=error&message=Callback+hatasi");
  }
}
