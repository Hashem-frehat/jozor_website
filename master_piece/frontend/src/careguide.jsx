import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaTrash,
  FaInfoCircle,
  FaBell,
  FaTint,
  FaSeedling,
  FaLeaf,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const PlantCareGuide = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [myPlants, setMyPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [activeTab, setActiveTab] = useState("myPlants");
  const userId = "66f886e6d776fffc22eaf596"; // Replace with actual user ID

  useEffect(() => {
    fetchAllPlants();
    fetchMyPlants();
  }, []);

  const fetchAllPlants = async () => {
    const response = await axios.get("http://localhost:3000/api/plants/plant");
    setAllPlants(response.data);
  };

  const fetchMyPlants = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/plants/myplants/${userId}`
    );
    setMyPlants(response.data);
  };

  const addToMyPlants = async (plantId) => {
    // تحقق مما إذا كان النبات موجودًا بالفعل
    const existingPlant = myPlants.find(
      (plant) => plant.plantId._id === plantId
    );
    if (existingPlant) {
      alert("هذا النبات موجود بالفعل في قائمة نباتاتي.");
      return;
    }

    await axios.post("http://localhost:3000/api/plants/myplants", {
      plantId,
      userId,
    });
    fetchMyPlants();
  };
  const removeFromMyPlants = async (plantId) => {
    console.log(plantId);
    console.log(userId);
    try {
      await axios.delete(
        `http://localhost:3000/api/plants/myplants/${plantId}`,
        {
          data: {
            userId, // تأكد من تضمين userId هنا بشكل صحيح
          },
        }
      );
      fetchMyPlants(); // تحديث قائمة النباتات بعد الحذف
    } catch (error) {
      console.error("خطأ في حذف النبات:", error.response.data); // طباعة رسالة الخطأ
    }
  };
  const toggleReminder = async (plantId, reminderType, isActive) => {
    const endpoint = isActive ? "cancel-reminder" : "reminder";
    await axios.post(`http://localhost:3000/api/plants/${endpoint}`, {
      userId,
      plantId,
      reminderType,
    });
    alert(
      isActive
        ? "Reminder cancelled successfully!"
        : "Reminder set successfully!"
    );
    fetchMyPlants();
  };
  const updatePlantCare = async (plantId, careType) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/plants/myplants/update-care",
        {
          userId,
          plantId,
          careType,
        }
      );
      alert(
        `${
          careType === "water" ? "Watering" : "Fertilizing"
        } recorded successfully!`
      );
      fetchMyPlants();
    } catch (error) {
      console.error(`Error updating ${careType}:`, error.response.data);
      alert(
        `Error recording ${
          careType === "water" ? "watering" : "fertilizing"
        }. Please try again.`
      );
    }
  };

  const selectPlant = (plant) => {
    setSelectedPlant(plant);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const TabButton = ({ title, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
        isActive
          ? "bg-green-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {title}
    </motion.button>
  );
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold p-6"
        >
          <h1 className="text-4xl font-bold">Plant Care Guide</h1>
          <p className="mt-2 text-xl">
            Track your gardening progress effortlessly
          </p>
        </motion.div>

        <div className="p-6">
          <div className="flex justify-center space-x-4 mb-6">
            <TabButton
              title="My Plants"
              isActive={activeTab === "myPlants"}
              onClick={() => setActiveTab("myPlants")}
            />
            <TabButton
              title="All Plants"
              isActive={activeTab === "allPlants"}
              onClick={() => setActiveTab("allPlants")}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "myPlants" ? (
                <div className="grid grid-cols-1 gap-4">
                  {myPlants.map((plant) => (
                    <motion.div
                      key={plant._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={`http://localhost:3000/${plant.plantId.photo}`}
                          alt={plant.plantId.plantName}
                          className="w-24 h-24 object-cover rounded-full mr-4 border-4 border-green-400"
                        />
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800">
                            {plant.plantId.plantName}
                          </h3>
                          <p className="text-gray-600">
                            {plant.plantId.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <FaLeaf className="text-green-500 mr-2" />
                          <span className="text-gray-700">
                            Category: {plant.plantId.category}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-red-500 mr-2" />
                          <span className="text-gray-700">
                            Place: {plant.plantId.placeCategory}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaTint className="text-blue-500 mr-2" />
                          <span className="text-gray-700">
                            Water every {plant.plantId.watering.frequency} days
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaSeedling className="text-yellow-500 mr-2" />
                          <span className="text-gray-700">
                            Fertilize every{" "}
                            {plant.plantId.fertilizing.frequency} days
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        <strong>Care Instructions:</strong>{" "}
                        {plant.plantId.careInstruction}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <p className="text-sm text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            Last Watered: {formatDate(plant.lastWatered)}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            Last Fertilized: {formatDate(plant.lastFertilized)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updatePlantCare(plant.plantId, "water")
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-full transition duration-300 ease-in-out flex items-center"
                          >
                            <FaTint className="mr-1" />
                            Water Now
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updatePlantCare(plant.plantId, "fertilize")
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full transition duration-300 ease-in-out flex items-center"
                          >
                            <FaSeedling className="mr-1" />
                            Fertilize Now
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            toggleReminder(
                              plant.plantId._id,
                              "watering",
                              plant.wateringReminderActive
                            )
                          }
                          className={`${
                            plant.wateringReminderActive
                              ? "bg-red-500"
                              : "bg-blue-500"
                          } hover:opacity-90 text-white px-3 py-2 rounded-full transition duration-300 ease-in-out flex items-center`}
                        >
                          <FaBell className="mr-1" />
                          {plant.wateringReminderActive
                            ? "Cancel Water Reminder"
                            : "Set Water Reminder"}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            toggleReminder(
                              plant.plantId._id,
                              "fertilizing",
                              plant.fertilizingReminderActive
                            )
                          }
                          className={`${
                            plant.fertilizingReminderActive
                              ? "bg-orange-500"
                              : "bg-green-500"
                          } hover:opacity-90 text-white px-3 py-2 rounded-full transition duration-300 ease-in-out flex items-center`}
                        >
                          <FaBell className="mr-1" />
                          {plant.fertilizingReminderActive
                            ? "Cancel Fertilize Reminder"
                            : "Set Fertilize Reminder"}
                        </motion.button>
                      </div>
                      <button
                        onClick={() => removeFromMyPlants(plant._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition duration-300"
                      >
                        Remove Plant
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allPlants.map((plant) => (
                    <motion.div
                      key={plant._id}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={`http://localhost:3000/${plant.photo}`}
                        alt={plant.plantName}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-800">
                        {plant.plantName}
                      </h3>
                      <p className="text-gray-600">{plant.description}</p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        {plant.placeCategory}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToMyPlants(plant._id)}
                        className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center justify-center w-full"
                      >
                        <FaPlus className="mr-2" />
                        Add to My Plants
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {selectedPlant && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-green-200"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {selectedPlant.plantName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={`http://localhost:3000/${selectedPlant.photo}`}
                    alt={selectedPlant.plantName}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p className="mb-2 text-gray-700">
                    <strong>Care Instructions:</strong>{" "}
                    {selectedPlant.careInstruction}
                  </p>
                </div>
                <div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="flex items-center mb-2 text-gray-700">
                      <FaTint className="text-blue-500 mr-2" />
                      <strong>Watering Frequency:</strong> Every{" "}
                      {selectedPlant.watering.frequency} days
                    </p>
                    <p className="flex items-center text-gray-700">
                      <FaSeedling className="text-green-500 mr-2" />
                      <strong>Fertilizing Frequency:</strong> Every{" "}
                      {selectedPlant.fertilizing.frequency} days
                    </p>
                  </div>
                  <p className="text-gray-700">
                    {selectedPlant.careDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantCareGuide;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaPlus,
//   FaTrash,
//   FaInfoCircle,
//   FaBell,
//   FaTint,
//   FaSeedling,
//   FaLeaf,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
// } from "react-icons/fa";

// const PlantCareGuide = () => {
//   const [allPlants, setAllPlants] = useState([]);
//   const [myPlants, setMyPlants] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState(null);
//   const [activeTab, setActiveTab] = useState("myPlants");
//   const userId = "66f886e6d776fffc22eaf596"; // Replace with actual user ID

//   useEffect(() => {
//     fetchAllPlants();
//     fetchMyPlants();
//   }, []);

//   const fetchAllPlants = async () => {
//     const response = await axios.get("http://localhost:3000/api/plants/plant");
//     setAllPlants(response.data);
//   };

//   const fetchMyPlants = async () => {
//     const response = await axios.get(
//       `http://localhost:3000/api/plants/myplants/${userId}`
//     );
//     setMyPlants(response.data);
//   };

//   const addToMyPlants = async (plantId) => {
//     const existingPlant = myPlants.find(
//       (plant) => plant.plantId._id === plantId
//     );
//     if (existingPlant) {
//       alert("هذا النبات موجود بالفعل في قائمة نباتاتي.");
//       return;
//     }

//     await axios.post("http://localhost:3000/api/plants/myplants", {
//       plantId,
//       userId,
//     });
//     fetchMyPlants();
//   };

//   const removeFromMyPlants = async (plantId) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/api/plants/myplants/${plantId}`,
//         {
//           data: { userId },
//         }
//       );
//       fetchMyPlants();
//     } catch (error) {
//       console.error("خطأ في حذف النبات:", error.response.data);
//     }
//   };

//   const toggleReminder = async (plantId, reminderType, isActive) => {
//     const endpoint = isActive ? "cancel-reminder" : "reminder";
//     await axios.post(`http://localhost:3000/api/plants/${endpoint}`, {
//       userId,
//       plantId,
//       reminderType,
//     });
//     alert(
//       isActive
//         ? "Reminder cancelled successfully!"
//         : "Reminder set successfully!"
//     );
//     fetchMyPlants();
//   };

//   const updatePlantCare = async (plantId, careType) => {
//     try {
//       await axios.post(
//         "http://localhost:3000/api/plants/myplants/update-care",
//         {
//           userId,
//           plantId,
//           careType,
//         }
//       );
//       alert(
//         `${
//           careType === "water" ? "Watering" : "Fertilizing"
//         } recorded successfully!`
//       );
//       fetchMyPlants();
//     } catch (error) {
//       console.error(`Error updating ${careType}:`, error.response.data);
//       alert(
//         `Error recording ${
//           careType === "water" ? "watering" : "fertilizing"
//         }. Please try again.`
//       );
//     }
//   };

//   const selectPlant = (plant) => {
//     setSelectedPlant(plant);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const TabButton = ({ title, isActive, onClick }) => (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
//         isActive
//           ? "bg-green-500 text-white shadow-lg"
//           : "bg-white text-green-700 hover:bg-green-100 shadow"
//       }`}
//     >
//       {title}
//     </motion.button>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold p-8"
//         >
//           <h1 className="text-4xl font-bold mb-2">Plant Care Guide</h1>
//           <p className="text-xl opacity-80">
//             Track your gardening progress effortlessly
//           </p>
//         </motion.div>

//         <div className="p-8">
//           <div className="flex justify-center space-x-4 mb-8">
//             <TabButton
//               title="My Plants"
//               isActive={activeTab === "myPlants"}
//               onClick={() => setActiveTab("myPlants")}
//             />
//             <TabButton
//               title="All Plants"
//               isActive={activeTab === "allPlants"}
//               onClick={() => setActiveTab("allPlants")}
//             />
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {activeTab === "myPlants" ? (
//                 <div className="grid grid-cols-1 gap-6">
//                   {myPlants.map((plant) => (
//                     <motion.div
//                       key={plant._id}
//                       whileHover={{ scale: 1.02 }}
//                       className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
//                     >
//                       <div className="flex items-center mb-6">
//                         <img
//                           src={`http://localhost:3000/${plant.plantId.photo}`}
//                           alt={plant.plantId.plantName}
//                           className="w-28 h-28 object-cover rounded-full mr-6 border-4 border-green-400 shadow-md"
//                         />
//                         <div>
//                           <h3 className="text-2xl font-bold text-gray-800 mb-1">
//                             {plant.plantId.plantName}
//                           </h3>
//                           <p className="text-gray-600 italic">
//                             {plant.plantId.description}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4 mb-6 bg-green-50 p-4 rounded-lg">
//                         <div className="flex items-center">
//                           <FaLeaf className="text-green-500 mr-2 text-xl" />
//                           <span className="text-gray-700 font-medium">
//                             {plant.plantId.category}
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <FaMapMarkerAlt className="text-red-500 mr-2 text-xl" />
//                           <span className="text-gray-700 font-medium">
//                             {plant.plantId.placeCategory}
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <FaTint className="text-blue-500 mr-2 text-xl" />
//                           <span className="text-gray-700 font-medium">
//                             Water every {plant.plantId.watering.frequency} days
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <FaSeedling className="text-yellow-500 mr-2 text-xl" />
//                           <span className="text-gray-700 font-medium">
//                             Fertilize every{" "}
//                             {plant.plantId.fertilizing.frequency} days
//                           </span>
//                         </div>
//                       </div>
//                       <p className="text-gray-700 mb-6 bg-blue-50 p-4 rounded-lg">
//                         <strong className="text-blue-600">
//                           Care Instructions:
//                         </strong>{" "}
//                         {plant.plantId.careInstruction}
//                       </p>
//                       <div className="flex justify-between items-center mt-6">
//                         <div>
//                           <p className="text-sm text-gray-500 flex items-center mb-2">
//                             <FaCalendarAlt className="mr-2 text-green-500" />
//                             Last Watered: {formatDate(plant.lastWatered)}
//                           </p>
//                           <p className="text-sm text-gray-500 flex items-center">
//                             <FaCalendarAlt className="mr-2 text-green-500" />
//                             Last Fertilized: {formatDate(plant.lastFertilized)}
//                           </p>
//                         </div>
//                         <div className="flex space-x-3">
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() =>
//                               updatePlantCare(plant.plantId._id, "water")
//                             }
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center shadow-md"
//                           >
//                             <FaTint className="mr-2" />
//                             Water Now
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() =>
//                               updatePlantCare(plant.plantId._id, "fertilize")
//                             }
//                             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center shadow-md"
//                           >
//                             <FaSeedling className="mr-2" />
//                             Fertilize Now
//                           </motion.button>
//                         </div>
//                       </div>

//                       <div className="flex space-x-3 mt-6">
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() =>
//                             toggleReminder(
//                               plant.plantId._id,
//                               "watering",
//                               plant.wateringReminderActive
//                             )
//                           }
//                           className={`${
//                             plant.wateringReminderActive
//                               ? "bg-red-500 hover:bg-red-600"
//                               : "bg-blue-500 hover:bg-blue-600"
//                           } text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center shadow-md flex-grow`}
//                         >
//                           <FaBell className="mr-2" />
//                           {plant.wateringReminderActive
//                             ? "Cancel Water Reminder"
//                             : "Set Water Reminder"}
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() =>
//                             toggleReminder(
//                               plant.plantId._id,
//                               "fertilizing",
//                               plant.fertilizingReminderActive
//                             )
//                           }
//                           className={`${
//                             plant.fertilizingReminderActive
//                               ? "bg-orange-500 hover:bg-orange-600"
//                               : "bg-green-500 hover:bg-green-600"
//                           } text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center shadow-md flex-grow`}
//                         >
//                           <FaBell className="mr-2" />
//                           {plant.fertilizingReminderActive
//                             ? "Cancel Fertilize Reminder"
//                             : "Set Fertilize Reminder"}
//                         </motion.button>
//                       </div>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => removeFromMyPlants(plant._id)}
//                         className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition duration-300 w-full flex items-center justify-center shadow-md"
//                       >
//                         <FaTrash className="mr-2" />
//                         Remove Plant
//                       </motion.button>
//                     </motion.div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {allPlants.map((plant) => (
//                     <motion.div
//                       key={plant._id}
//                       whileHover={{ scale: 1.05 }}
//                       className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
//                     >
//                       <img
//                         src={`http://localhost:3000/${plant.photo}`}
//                         alt={plant.plantName}
//                         className="w-full h-56 object-cover rounded-lg mb-4 shadow-md"
//                       />
//                       <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                         {plant.plantName}
//                       </h3>
//                       <p className="text-gray-600 mb-4">{plant.description}</p>
//                       <p className="text-sm text-gray-500 mb-4 flex items-center">
//                         <FaMapMarkerAlt className="mr-1" />
//                         {plant.placeCategory}
//                       </p>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => addToMyPlants(plant._id)}
//                         className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center justify-center w-full"
//                       >
//                         <FaPlus className="mr-2" />
//                         Add to My Plants
//                       </motion.button>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>

//           {selectedPlant && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-green-200"
//             >
//               <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//                 {selectedPlant.plantName}
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <img
//                     src={`http://localhost:3000/${selectedPlant.photo}`}
//                     alt={selectedPlant.plantName}
//                     className="w-full h-64 object-cover rounded-lg mb-4"
//                   />
//                   <p className="mb-2 text-gray-700">
//                     <strong>Care Instructions:</strong>{" "}
//                     {selectedPlant.careInstruction}
//                   </p>
//                 </div>
//                 <div>
//                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                     <p className="flex items-center mb-2 text-gray-700">
//                       <FaTint className="text-blue-500 mr-2" />
//                       <strong>Watering Frequency:</strong> Every{" "}
//                       {selectedPlant.watering.frequency} days
//                     </p>
//                     <p className="flex items-center text-gray-700">
//                       <FaSeedling className="text-green-500 mr-2" />
//                       <strong>Fertilizing Frequency:</strong> Every{" "}
//                       {selectedPlant.fertilizing.frequency} days
//                     </p>
//                   </div>
//                   <p className="text-gray-700">
//                     {selectedPlant.careDescription}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlantCareGuide;
