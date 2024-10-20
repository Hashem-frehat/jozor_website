const mongoose = require("mongoose");
const { Schema } = mongoose;

const plantsSchema = new Schema({
  plantName: { type: String, required: true, minlength: 1, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  careDescription: { type: String, maxlength: 500 },
  photo: { type: String },
  category: {
    type: String,
    enum: ["Indoor", "Outdoor", "Succulent", "Herb"],
    required: true,
  },
  placeCategory: {
    type: String,
    enum: ["Living Room", "Kitchen", "Garden"],
    required: true,
  },
  watering: {
    frequency: { type: Number, required: true, min: 1 }, // Number of days between each watering
  },
  fertilizing: {
    frequency: { type: Number, required: true, min: 1 }, // Number of days between each fertilizing
  },
  careInstruction: { type: String, maxlength: 500 },
});

module.exports = mongoose.model("Plant", plantsSchema);
