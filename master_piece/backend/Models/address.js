const addressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  addressName: { type: String },
  address: { type: String },
  mobileNumber: { type: String },
});

const Address = mongoose.model("Address", addressSchema);
