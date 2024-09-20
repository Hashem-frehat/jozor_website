const plantsSchema = new Schema({
  plantName: { type: String },
  description: { type: String },
  careDescription: { type: String },
  photo: { type: String },
  category: { type: String },
  placeCategory: { type: String },
  watering: { type: String },
  fertilizing: { type: String },
  careInstruction: { type: String },
});

const Plant = mongoose.model("Plant", plantsSchema);
