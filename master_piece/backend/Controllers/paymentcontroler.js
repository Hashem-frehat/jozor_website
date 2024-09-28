const Payment = require("../Models/payment");

exports.createPayment = async (req, res) => {
  try {
    const {
      user_id,
      partner_id,
      amount,
      payment_method,
      payment_date,
      paypal_details,
    } = req.body;

    const newPayment = new Payment({
      user_id,
      partner_id,
      amount,
      payment_method,
      payment_date,
      paypal_details,
    });

    await newPayment.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Payment created successfully",
        payment: newPayment,
      });
  } catch (error) {
    console.error("Error creating payment:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating payment",
        error: error.message,
      });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching payments",
        error: error.message,
      });
  }
};
