const express = require("express");
const mongoose = require("./Config/config");
require("dotenv").config();
const app = express();
const PORT = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const signuproutes = require("./Routes/signup");
const partnerroutes = require("./Routes/partner");
const partnerdashRoutes = require("./Routes/partnerRoutes");
const productRoutes = require("./Routes/productRoutes");

const feedbackRoutes = require("./Routes/feedbackroutes");

const paymentRoutes = require("./Routes/payment");
const requestRoutes = require("./Routes/requests");
const userRoutes = require("./Routes/user");
const admindashbourd = require("./Routes/admin");
// const product = require("./Routes/productroutes");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Import routes

// Use routes
app.use("/api", signuproutes);
app.use("/partner", partnerroutes);
app.use("/api/partners", partnerdashRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.use("/api/feedback", feedbackRoutes);
app.use("/api/payments", paymentRoutes);
// app.use("/products", product);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", admindashbourd);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
