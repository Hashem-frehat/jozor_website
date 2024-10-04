const mongoose = require("mongoose");
const { Schema } = mongoose;

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

exports.Plant = mongoose.model("Plant", plantsSchema);
