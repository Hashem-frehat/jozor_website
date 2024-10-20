const mongoose = require("mongoose");
const { Schema } = mongoose;
const myplantsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  plantId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },
  nextWateringDate: { type: Date, required: true },
  nextFertilizingDate: { type: Date, required: true },
  lastWatered: { type: Date }, // تاريخ آخر سقاية
  lastFertilized: { type: Date }, // تاريخ آخر تسميد
  wateringReminderActive: { type: Boolean, default: false },
  fertilizingReminderActive: { type: Boolean, default: false },
});

// Indexes for faster query performance
myplantsSchema.index({ userId: 1, plantId: 1 });
module.exports = mongoose.model("MyPlant", myplantsSchema);
