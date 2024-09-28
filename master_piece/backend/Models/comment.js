const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  partnerid: { type: Schema.Types.ObjectId, ref: "Partner", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Rating", ratingSchema);
module.exports = Comment;
