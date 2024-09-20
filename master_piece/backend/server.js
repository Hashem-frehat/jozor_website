const express = require("express");
const mongoose = require("./Config/config");
require("dotenv").config();
const app = express();
const PORT = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const signuproutes = require("./Routes/signup");
const partnerroutes = require("./Routes/partner");
const product = require("./Routes/productroutes");

app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Middleware
app.use(express.json());
app.use(cookieParser());
// Import routes

// Use routes
app.use("/api", signuproutes);
app.use("/partner", partnerroutes);
app.use("/products", product);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
