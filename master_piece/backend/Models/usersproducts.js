const usersProductsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  creationDate: { type: Date, default: Date.now },
  isDelivered: { type: Boolean, default: false },
});

const UsersProduct = mongoose.model("UsersProduct", usersProductsSchema);
