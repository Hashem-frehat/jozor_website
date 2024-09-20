import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaInfoCircle,
  FaBell,
  FaTint,
  FaSeedling,
} from "react-icons/fa";

const PlantCareGuide = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [newPlantName, setNewPlantName] = useState("");

  const plantDatabase = {
    Rose: {
      wateringInterval: 3,
      fertilizingInterval: 14,
      careInstructions: "Prune regularly and ensure good air circulation.",
      image: "https://example.com/rose.jpg",
    },
    Jasmine: {
      wateringInterval: 2,
      fertilizingInterval: 21,
      careInstructions: "Provide support for climbing and partial shade.",
      image: "https://example.com/jasmine.jpg",
    },
    Dahlia: {
      wateringInterval: 4,
      fertilizingInterval: 14,
      careInstructions: "Deadhead regularly and provide stakes for support.",
      image: "https://example.com/dahlia.jpg",
    },
  };

  const addPlant = () => {
    if (newPlantName && plantDatabase[newPlantName]) {
      setPlants([
        ...plants,
        {
          name: newPlantName,
          lastWatered: new Date(),
          lastFertilized: new Date(),
        },
      ]);
      setNewPlantName("");
    }
  };

  const removePlant = (index) => {
    const updatedPlants = plants.filter((_, i) => i !== index);
    setPlants(updatedPlants);
  };

  const selectPlant = (plant) => {
    setSelectedPlant(plant);
  };

  const checkAlerts = () => {
    plants.forEach((plant) => {
      const careInfo = plantDatabase[plant.name];
      const today = new Date();
      const daysSinceWatering = Math.floor(
        (today - new Date(plant.lastWatered)) / (1000 * 60 * 60 * 24)
      );
      const daysSinceFertilizing = Math.floor(
        (today - new Date(plant.lastFertilized)) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceWatering >= careInfo.wateringInterval) {
        alert(`Time to water your ${plant.name}!`);
      }

      if (daysSinceFertilizing >= careInfo.fertilizingInterval) {
        alert(`Time to fertilize your ${plant.name}!`);
      }
    });
  };

  useEffect(() => {
    const alertInterval = setInterval(checkAlerts, 86400000);
    return () => clearInterval(alertInterval);
  }, [plants]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-sec font-bold p-6">
          <h1 className="text-3xl font-bold">Plant Care Guide</h1>
          <p className="mt-2">Track your gardening progress effortlessly</p>
        </div>

        <div className="p-6">
          <div className="mb-6 flex">
            <select
              value={newPlantName}
              onChange={(e) => setNewPlantName(e.target.value)}
              className="flex-grow mr-2 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose a flower</option>
              {Object.keys(plantDatabase).map((plant) => (
                <option key={plant} value={plant}>
                  {plant}
                </option>
              ))}
            </select>
            <button
              onClick={addPlant}
              className="bg-primary hover:bg-hoverpri  text-white p-3 rounded-r-lg transition duration-300 ease-in-out"
            >
              <FaPlus className="inline mr-2" /> Add Flower
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {plants.map((plant, index) => (
              <div
                key={index}
                className="bg-sec p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <span className="font-semibold text-lg">{plant.name}</span>
                <div>
                  <button
                    onClick={() => selectPlant(plant)}
                    className="mr-2 text-bottonpri hover:text-hoverpri"
                  >
                    <FaInfoCircle className="text-xl" />
                  </button>
                  <button
                    onClick={() => removePlant(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedPlant && (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-green-200">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedPlant.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={plantDatabase[selectedPlant.name].image}
                    alt={selectedPlant.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="mb-2">
                    <strong>Care Instructions:</strong>{" "}
                    {plantDatabase[selectedPlant.name].careInstructions}
                  </p>
                </div>
                <div>
                  <div className="bg-sec p-4 rounded-lg mb-4">
                    <p className="flex items-center mb-2">
                      <FaTint className="text-blue-500 mr-2" />
                      <strong>Watering Interval:</strong> Every{" "}
                      {plantDatabase[selectedPlant.name].wateringInterval} days
                    </p>
                    <p className="flex items-center">
                      <FaSeedling className="text-green-500 mr-2" />
                      <strong>Fertilizing Interval:</strong> Every{" "}
                      {plantDatabase[selectedPlant.name].fertilizingInterval}{" "}
                      days
                    </p>
                  </div>
                  <button className="w-full bg-primary hover:bg-hoverpri text-white p-3 rounded-lg transition duration-300 ease-in-out">
                    <FaBell className="inline mr-2" /> Set Reminders
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantCareGuide;
