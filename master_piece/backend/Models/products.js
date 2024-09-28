const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  logo: { type: String },
  partnerId: { type: Schema.Types.ObjectId, ref: "Partner", required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
