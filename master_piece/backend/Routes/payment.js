const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/paymentcontroler");
const auth = require("../midleware/authpartner");
router.post("/", auth, paymentController.createPayment);
router.get("/", paymentController.getPayments);
router.get("/total-sales", paymentController.getTotalSales);
router.get("/sales-percentage", paymentController.getSalesPercentage);
router.get(
  "/partner-total-sales/:partnerId",
  paymentController.getPartnerTotalSales
);

module.exports = router;
