const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  addressName: { type: String },
  address: { type: String },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  isactive: { type: Boolean, default: false },
});

addressSchema.index({ location: "2dsphere" });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
