const contactsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
  receiver: { type: String },
});

const Contact = mongoose.model("Contact", contactsSchema);
