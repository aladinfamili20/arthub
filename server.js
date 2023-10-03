require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
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
  const { items, shipping, description } = req.body;
   const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    payment_method_types: ['card'],
   });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
