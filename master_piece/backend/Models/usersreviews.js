const usersReviewsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
  partnerId: { type: Schema.Types.ObjectId, ref: "Partner" },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Enforces the range constraint (1-5)
  },
});

const UsersReview = mongoose.model("UsersReview", usersReviewsSchema);
