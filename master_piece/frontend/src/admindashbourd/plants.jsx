import React, { useState } from "react";
import axios from "axios";

export const PlantForm = () => {
  const [plant, setPlant] = useState({
    plantName: "",
    description: "",
    careDescription: "",
    category: "Indoor", // قيم مبدئية بناءً على enum
    placeCategory: "Living Room", // قيم مبدئية بناءً على enum
    watering: {
      frequency: 1,
      lastWatered: new Date(),
    },
    fertilizing: {
      frequency: 1,
      lastFertilized: new Date(),
    },
    careInstruction: "",
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("watering") || name.includes("fertilizing")) {
      const [key, subKey] = name.split(".");
      setPlant((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      setPlant({ ...plant, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(plant).forEach((key) => {
      if (key === "watering" || key === "fertilizing") {
        Object.keys(plant[key]).forEach((subKey) => {
          formData.append(`${key}[${subKey}]`, plant[key][subKey]);
        });
      } else {
        formData.append(key, plant[key]);
      }
    });
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await axios.post("http://localhost:3000/api/plants/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Plant added successfully!");
      setPlant({
        plantName: "",
        description: "",
        careDescription: "",
        category: "Indoor",
        placeCategory: "Living Room",
        watering: {
          frequency: 1,
          lastWatered: new Date(),
        },
        fertilizing: {
          frequency: 1,
          lastFertilized: new Date(),
        },
        careInstruction: "",
      });
      setPhoto(null);
    } catch (error) {
      console.error(
        "Error response:",
        error.response ? error.response.data : error.message
      );
      alert("Error adding plant");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Plant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Plant Name</label>
          <input
            type="text"
            name="plantName"
            value={plant.plantName}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
            minLength={1}
            maxLength={100}
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={plant.description}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            maxLength={500}
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Care Description</label>
          <textarea
            name="careDescription"
            value={plant.careDescription}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            maxLength={500}
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category"
            value={plant.category}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Succulent">Succulent</option>
            <option value="Herb">Herb</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Place Category</label>
          <select
            name="placeCategory"
            value={plant.placeCategory}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="Living Room">Living Room</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Garden">Garden</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Watering Frequency (days)</label>
          <input
            type="number"
            name="watering.frequency"
            value={plant.watering.frequency}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1">Fertilizing Frequency (days)</label>
          <input
            type="number"
            name="fertilizing.frequency"
            value={plant.fertilizing.frequency}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1">Care Instruction</label>
          <textarea
            name="careInstruction"
            value={plant.careInstruction}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            maxLength={500}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Plant
        </button>
      </form>
    </div>
  );
};
