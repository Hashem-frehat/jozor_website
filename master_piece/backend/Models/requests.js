const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: String,
  },
  messegefromadmin: {
    type: String,
  },
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
