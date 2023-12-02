// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// const app = express();
// // 

// // app.use(cors({
// //   origin: 'https://www.art-hub.us',                  
// // }));
// // app.use(cors());
// app.use(express.json());
// const path = require("path");
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, 'build')));
//   app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// }
// app.get("/", (req, res) => {
//   res.send("Welcome to Art-Hub website.");
// });
// const calculateOrderAmount = (items) => {
//   let totalAmount = 0;
//   items.forEach((item) => {
//     const { price, shipfee } = item;
//     const cartItemAmount = price + shipfee
//     totalAmount += cartItemAmount;
//   });
//   return totalAmount * 100;
// };
// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { items } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(items),
//       currency: "usd",
//       payment_method_types: ['card'],
//     });
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating payment intent:", error);
//     res.status(500).json({ error: "Failed to create payment intent" });
//   }
// });

// const PORT = process.env.PORT || 4242;
// app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));

 


 


 




// // Checkout Page file.



// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   CALCULATE_SUBTOTAL,
//   CALCULATE_TOTAL_QUANTITY,
//   selectCartItems,
//   selectCartTotalAmount,
// } from "../../redux/slice/cartSlice";
// import { selectEmail } from "../../redux/slice/authSlice";
// import {
//   selectBillingAddress,
//   selectShippingAddress,
// } from "../../redux/slice/checkoutSlice";
// import { toast } from "react-toastify";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// const Checkout = () => {
//   const [message, setMessage] = useState("Initializing checkout...");
//   const [clientSecret, setClientSecret] = useState("");
//   const cartItems = useSelector(selectCartItems);
//   const totalAmount = useSelector(selectCartTotalAmount);
//   const customerEmail = useSelector(selectEmail);
//   const shippingAddress = useSelector(selectShippingAddress);
//   const billingAddress = useSelector(selectBillingAddress);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(CALCULATE_SUBTOTAL());
//     dispatch(CALCULATE_TOTAL_QUANTITY());
//   }, [dispatch, cartItems]);
//   const description = `ArtHub payment: email: ${customerEmail}, Amount: ${totalAmount}`;  
//   const apiUrl = 'https://art-hub.us/create-payment-intent' 
//   useEffect(() => {
//     // http://localhost:4242/create-payment-intent  
//       fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         mode: 'cors',
//         body: JSON.stringify({
//           items: cartItems,
//           userEmail: customerEmail,
//           shipping: shippingAddress,
//           billing: billingAddress,
//           description,
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`${response.status} - ${response.statusText}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setClientSecret(data.clientSecret);
//         })
//         .catch((error) => {
//           setMessage("Failed to initialize checkout");
//           console.error("Something went wrong", error);
//         });
      
//   }, []);
//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <>
//       <section>
//         <div className="CheckoutContainer">{!clientSecret && <h3>{message}</h3>}</div>
//       </section>
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </>
//   );
// };

// export default Checkout;
