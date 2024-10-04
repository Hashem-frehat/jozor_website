const { Plant } = require("../Models/plants");

exports.createPlant = async (req, res) => {
  try {
    const plantData = req.body;
    if (req.file) {
      plantData.photo = req.file.path;
    }
    const newPlant = new Plant(plantData);
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
