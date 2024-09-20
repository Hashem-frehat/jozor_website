const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  businessType: { type: String, required: true },
  address: { type: String },
  storeName: { type: String },
  storeCategory: { type: String },
  description: { type: String },
  photo: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  isactive: { type: Boolean, default: true },
});

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
