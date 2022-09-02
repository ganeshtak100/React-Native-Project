// import express (after npm install express)
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
let cors = require("cors");
let Publishable_Key =
  "pk_live_51LSdmTSEVhaEemV9cr6NdzWt1SzfD8pSPAtAoPs35hK2jeZJNSynIvyFvGMF9KniFARXGt3fXatgZ5besvVVsfNS004cRXTkDJ";
let Secret_Key =
  "sk_test_51LSdmTSEVhaEemV9mbys5ycjH20R8NpRJp6dUYrJHGuaz0fnwunistsvpu0bdtNzc17UGwbF5tDnhm7mEuK1J45e00MLYnjrQx";
const stripe = require("stripe")(Secret_Key);
// create new express app and save it as "app"

// server configuration

const PORT = 8080;

// ADD THIS

// create a route for the app

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: ["http://localhost:8080/stripe"] }));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/stripe", (req, res) => {
  // console.log("get response--", res);
  res.send("Hello World----");
});

app.post("/stripe", cors(), async function (req, res) {
  console.log("response from client--", res, "--------\n", req?.body);

  try {
    const { name, amount } = req.body;
    if (!amount)
      return res.status(400).json({ message: "Please Enter the amount" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    console.log("first=================", clientSecret);
    res.json({ message: "Payment initiated", clientSecret });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Moreover you can take more details from user
// like Address, Name, etc from form
//   stripe.customers
//     .create({
//       email: req.body.email,
//       source: req.body.id,
//       name: "Ganesh Tak",
//       address: {
//         line1: "Bikaner sudershna nager",
//         postal_code: "452331",
//         city: "Bikaner",
//         state: "Rajasthan",
//         country: "India",
//       },
//     })
//     .then((customer) => {
//       console.log("customers created info0----", customer);
//       return stripe.charges.create({
//         amount: 2500, // Charing Rs 25
//         description: "Mobile App Cost",
//         currency: "INR",
//         customer: customer.id,
//       });
//     })
//     .then((charge) => {
//       res.send("Success"); // If no error occurs
//     })
//     .catch((err) => {
//       console.log("error--", err);
//       res.send(err); // If some error occurs
//     });
// });

// let { amount, id } = req.body;
// console.log("stripe-routes.js 10 | amount and id", amount, id);
// try {
//   const payment = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: "USD",
//     description: "Your Company Description",
//     payment_method: id,
//     confirm: true,
//   });
//   console.log("stripe-routes.js 19 | payment", payment);
//   res.json({
//     message: "Payment Successful",
//     success: true,
//   });
// } catch (error) {
//   console.log("stripe-routes.js 17 | error", error);
//   res.json({
//     message: "Payment Failed",
//     success: false,
//   });
// }

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

// const express = require("express");
// const app = express();
// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
// const bodyParser = require("body-parser");
// const cors = require("cors");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// app.post("/stripe/charge", cors(), async (req, res) => {
//   console.log("stripe-routes.js 9 | route reached", req.body);
//   let { amount, id } = req.body;
//   console.log("stripe-routes.js 10 | amount and id", amount, id);
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "USD",
//       description: "Your Company Description",
//       payment_method: id,
//       confirm: true,
//     });
//     console.log("stripe-routes.js 19 | payment", payment);
//     res.json({
//       message: "Payment Successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("stripe-routes.js 17 | error", error);
//     res.json({
//       message: "Payment Failed",
//       success: false,
//     });
//   }
// });

// app.listen(process.env.PORT || 8080, () => {
//   console.log("Server started...");
// });
