require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const app = express();
// 

app.use(cors({
  origin: 'https://www.art-hub.us',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(cors());
app.use(express.json());
const path = require("path");
 
app.get("/", (req, res) => {
  res.send("Welcome to Art-Hub website.");
});
const calculateOrderAmount = (items) => {
  let totalAmount = 0;
  items.forEach((item) => {
    const { price, shipfee } = item;
    const cartItemAmount = price + shipfee
    totalAmount += cartItemAmount;
  });
  return totalAmount * 100;
};
 
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      payment_method_types: ['card'],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));

 

