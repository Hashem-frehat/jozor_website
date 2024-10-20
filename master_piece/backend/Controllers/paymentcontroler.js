const mongoose = require("mongoose");
const Payment = require("../Models/payment");

exports.createPayment = async (req, res) => {
  try {
    const {
      user_id,
      partner_id,
      amount,
      address_id,
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
      address_id,
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({
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
    res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message,
    });
  }
};

exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await Payment.aggregate([
      {
        $group: {
          _id: "$partner_id",
          totalSales: { $sum: { $toDouble: "$amount" } },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $project: {
          _id: 0,
          partnerId: "$_id",
          partnerName: { $arrayElemAt: ["$partner.name", 0] },
          totalSales: 1,
        },
      },
    ]);
    res.json(totalSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSalesPercentage = async (req, res) => {
  try {
    const totalSales = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $toDouble: "$amount" } },
        },
      },
    ]);

    const salesPercentage = await Payment.aggregate([
      {
        $group: {
          _id: "$partner_id",
          sales: { $sum: { $toDouble: "$amount" } },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $project: {
          _id: 0,
          partnerId: "$_id",
          partnerName: { $arrayElemAt: ["$partner.name", 0] },
          percentage: { $divide: ["$sales", totalSales[0].total] },
        },
      },
    ]);
    res.json(salesPercentage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getPartnerTotalSales = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;

    // Validate partner ID format
    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({ message: "Invalid partner ID format" });
    }

    console.log("Fetching total sales for partnerId:", partnerId);

    // Aggregate total sales for all partners
    const totalSales = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $toDouble: "$amount" } }, // Handle Decimal128
        },
      },
    ]);

    if (!totalSales.length || totalSales[0].total === 0) {
      return res.status(404).json({ message: "No total sales found" });
    }

    // Aggregate total sales for the specific partner
    const partnerSales = await Payment.aggregate([
      {
        $match: { partner_id: new mongoose.Types.ObjectId(partnerId) }, // Use 'new'
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $toDouble: "$amount" } }, // Handle Decimal128
        },
      },
    ]);

    if (partnerSales.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales found for this partner" });
    }

    // Return the total sales for the partner
    res.json({
      partnerId: req.params.partnerId,
      totalSales: partnerSales[0].totalSales,
    });
  } catch (error) {
    console.error(
      "Error fetching partner total sales:",
      error.message,
      error.stack
    );
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
