import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Next.js callback route tetiklendi");
    const contentType = request.headers.get("content-type") || "";
    console.log("Headers:", contentType);

    let token: string | null = null;

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const bodyText = await request.text();
      console.log("Body (urlencoded):", bodyText);
      const params = new URLSearchParams(bodyText);
      token = params.get("token");
    } else if (contentType.includes("application/json")) {
      const body = await request.json();
      console.log("Body (json):", body);
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

    const text = await verifyRes.text();
    console.log("Backend yanıtı:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("Backend yanıtı JSON değil!");
      return NextResponse.redirect("http://localhost:3000/payment-result?status=error&message=Geçersiz+yanıt");
    }

    const status = result?.status === "success" ? "success" : "error";
    const message = result?.result?.errorMessage || "";

    return NextResponse.redirect(`http://localhost:3000/payment-result?status=${status}&message=${encodeURIComponent(message)}`);
  } catch (err) {
    console.error("Hata:", err);
    return NextResponse.redirect("http://localhost:3000/payment-result?status=error&message=Callback+hatasi");
  }
}
