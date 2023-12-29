require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(express.json());
const path = require("path");
// app.use(cors({
//   origin: ["http://art-hub.us", "http://www.art-hub.us", "https://art-hub.us", "https://www.art-hub.us"],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));
app.use(cors())
 if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Welcome to ArtHub website.");
});

const array = [];
const calculateOrderAmount = (items) => {
  items.map((item) => {
    const { price, cartQuantity } = item;
    const cartItemAmount = price * cartQuantity;
    return array.push(cartItemAmount);
  });
  const totalAmount = array.reduce((a, b) => {
    return a + b;
  }, 0);

  return totalAmount * 100;
}; 
 app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); // Log the incoming request body

    // Your existing code...
    const { items, shipping, description } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      description,
      shipping: {
        address: {
          line1: shipping.line1,
          line2: shipping.line2,
          city: shipping.city,
          country: shipping.country,
          postal_code: shipping.postal_code,
        },
        name: shipping.name,
        phone: shipping.phone,
      },
     })

    console.log("Server Response:", paymentIntent); // Log the server response

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Server Error:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));