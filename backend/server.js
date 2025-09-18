import express from "express";
import cors from "cors";
import Iyzipay from "iyzipay";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const iyzipay = new Iyzipay({
  apiKey: "sandbox-9k0Sc6q6SjY9e3w9WIfUVgVcOc6mUY4l",
  secretKey: "sandbox-hpxQKTnhgrgH17UAFQh7OAhhMWdfrvbJ",
  uri: "https://sandbox-api.iyzipay.com",
});

// Checkout form oluşturma
app.post("/create-checkout-form", (req, res) => {
  const { cart, buyer } = req.body;

  if (!cart || !buyer) {
    return res.status(400).json({ error: "Sepet veya alıcı bilgileri eksik" });
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const conversationId = Date.now().toString();

  const request = {
    locale: "tr",
    conversationId,
    price: totalPrice.toFixed(2),
    paidPrice: totalPrice.toFixed(2),
    currency: "TRY",
    basketId: `B${Date.now()}`,
    paymentGroup: "PRODUCT",
   callbackUrl: "http://localhost:3000/api/payment/callback",

    buyer: {
      id: "BY789",
      name: buyer.name,
      surname: buyer.surname,
      gsmNumber: buyer.gsmNumber,
      email: buyer.email,
      identityNumber: buyer.identityNumber,
      registrationAddress: buyer.address,
      city: buyer.city,
      country: buyer.country,
      ip: req.ip || "85.34.78.112",
    },
    shippingAddress: {
      contactName: `${buyer.name} ${buyer.surname}`,
      city: buyer.city,
      country: buyer.country,
      address: buyer.address,
    },
    billingAddress: {
      contactName: `${buyer.name} ${buyer.surname}`,
      city: buyer.city,
      country: buyer.country,
      address: buyer.address,
    },
    basketItems: cart.map((item) => ({
      id: item.id,
      name: item.name,
      category1: "Genel",
      itemType: "PHYSICAL",
      price: item.price.toFixed(2),
    })),
  };

  iyzipay.checkoutFormInitialize.create(request, (err, result) => {
    if (err) {
      console.error("Ödeme formu oluşturma hatası:", err);
      return res.status(500).json({ error: "Ödeme formu oluşturulamadı" });
    }
    res.json({ paymentPageUrl: result.paymentPageUrl });
  });
});

// Callback endpoint (Next.js tarafı çağıracak)
app.post("/api/payment/callback", (req, res) => {
  const { token, conversationId } = req.body;

  if (!token ) {
    return res.status(400).json({ error: "Token veya conversationId eksik" });
  }

  iyzipay.checkoutForm.retrieve(
    { locale: "tr", token, conversationId },
    (err, result) => {
      if (err) {
        console.error("Ödeme doğrulama hatası:", err);
        return res.status(500).json({ error: "Ödeme doğrulama başarısız" });
      }

      if (result.status === "success") {
        // Ödeme başarılı, buraya veritabanı kaydı vs koyabilirsin
        console.log("Ödeme başarılı:", result);
      } else {
        console.warn("Ödeme başarısız:", result);
      }

      return res.status(200).json({ status: "success", result });
    }
  );
});

app.listen(3001, () => {
  console.log("Backend 3001 portunda çalışıyor");
});
