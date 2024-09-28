const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/paymentcontroler");
const auth = require("../midleware/authpartner");
router.post("/", auth, paymentController.createPayment);
router.get("/", paymentController.getPayments);

module.exports = router;
