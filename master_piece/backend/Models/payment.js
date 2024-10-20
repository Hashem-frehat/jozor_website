const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  ],
  partner_id: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
    required: true,
  },
  amount: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  payment_method: {
    type: String,
    enum: ["cash", "PayPal"],
    default: "cash",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  payment_date: {
    type: Date,
  },
  paypal_details: {
    type: Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
