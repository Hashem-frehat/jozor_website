const usersReviewsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
  partnerId: { type: Schema.Types.ObjectId, ref: "Partner" },
});

const UsersReview = mongoose.model("UsersReview", usersReviewsSchema);
