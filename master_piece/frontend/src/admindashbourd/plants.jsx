import React, { useState } from "react";
import axios from "axios";

export const PlantForm = () => {
  const [plant, setPlant] = useState({
    plantName: "",
    description: "",
    careDescription: "",
    category: "",
    placeCategory: "",
    watering: "",
    fertilizing: "",
    careInstruction: "",
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(plant).forEach((key) => {
      formData.append(key, plant[key]);
    });
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await axios.post("http://localhost:3000/api/plants", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Plant added successfully!");
      setPlant({
        plantName: "",
        description: "",
        careDescription: "",
        category: "",
        placeCategory: "",
        watering: "",
        fertilizing: "",
        careInstruction: "",
      });
      setPhoto(null);
    } catch (error) {
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
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={plant.description}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Care Description</label>
          <textarea
            name="careDescription"
            value={plant.careDescription}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
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
          <input
            type="text"
            name="category"
            value={plant.category}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Place Category</label>
          <input
            type="text"
            name="placeCategory"
            value={plant.placeCategory}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Watering</label>
          <input
            type="text"
            name="watering"
            value={plant.watering}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Fertilizing</label>
          <input
            type="text"
            name="fertilizing"
            value={plant.fertilizing}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Care Instruction</label>
          <textarea
            name="careInstruction"
            value={plant.careInstruction}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
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
