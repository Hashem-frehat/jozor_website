import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserCircleIcon as UserIcon,
  PhoneIcon,
  EnvelopeIcon as MailIcon,
  MapPinIcon as LocationMarkerIcon,
  CalendarDaysIcon as CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
function RequestFarmer() {
  const [formData, setFormData] = useState({
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("tokenuser");
        const decodedToken = jwtDecode(token);
        const userid = decodedToken.userId;
        const response = await axios.get(
          `http://localhost:3000/api/user/${userid}`
        ); // Adjust this endpoint as needed
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/requests/create",
        {
          ...formData,
          userId: userData._id,
        }
      );
      console.log("Request submitted:", response.data);
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error("Error submitting request:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EAE3]">
      <header className="bg-sec py-6">
        <h1 className="text-4xl font-bold text-center text-[#519335]">
          طلب مزارع محترف
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-[#519335] mb-6 text-center">
            احصل على مساعدة محترفة للعناية بنباتاتك
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4 rtl:space-x-reverse">
              <div className="flex-1 relative">
                <UserIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="text"
                  value={`${userData.firstName} ${userData.lastName}`}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              <div className="flex-1 relative mt-4 md:mt-0">
                <PhoneIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="tel"
                  value={userData.phoneNumber}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg bg-gray-100"
                  disabled
                />
              </div>
            </div>

            <div className="relative">
              <MailIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
              <input
                type="email"
                value={userData.email}
                className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg bg-gray-100"
                disabled
              />
            </div>

            <div className="relative">
              <LocationMarkerIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
              <input
                type="text"
                name="address"
                placeholder="العنوان"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 rtl:space-x-reverse">
              <div className="flex-1 relative">
                <CalendarIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                  required
                />
              </div>
              <div className="flex-1 relative mt-4 md:mt-0">
                <ClockIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                  required
                />
              </div>
            </div>

            <div>
              <textarea
                name="description"
                placeholder="صف مشكلة النبات أو نوع المساعدة التي تحتاجها"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-bottonpri hover:bg-hoverpri text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              إرسال الطلب
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default RequestFarmer;
