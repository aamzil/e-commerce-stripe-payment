require("dotenv").config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const express = require("express");
const stripe = require("stripe")(stripeSecretKey);
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;

  const line_items = cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        description: item.description,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 4040;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
