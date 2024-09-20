const requestsSchema = new Schema({
  address: { type: String },
  requestDate: { type: Date, default: Date.now },
  description: { type: String },
  time: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Request = mongoose.model("Request", requestsSchema);
