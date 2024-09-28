import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Partnersignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    businessType: "",
    catigory: [],
    address: "",
    storeName: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        // Add the checked category to the array
        setFormData((prevData) => ({
          ...prevData,
          catigory: [...prevData.catigory, value],
        }));
      } else {
        // Remove the unchecked category from the array
        setFormData((prevData) => ({
          ...prevData,
          catigory: prevData.catigory.filter((cat) => cat !== value),
        }));
      }
    } else {
      // Handle other inputs like text, email, etc.
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData); // Log form data before submitting
      const response = await axios.post(
        "http://localhost:3000/partner/signup",
        formData
      );
      if (response.data.success) {
        navigate("/partnerlogin");
      }
    } catch (err) {
      console.error("Error during signup:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center">
          {/* Left side - Text and Form */}
          <div className="w-full lg:w-1/2 pr-4">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Grow your business online with talabat!
            </h1>
            <p className="text-gray-600 mb-6">
              Partner with us to reach more customers, earn more money and grow
              your business online - your success story begins here
            </p>

            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Ready to grow your business?
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {/* Other input fields */}
                <div>
                  <label htmlFor="first-name" className="sr-only">
                    First name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Business Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {/* Business Type Dropdown */}
                <div>
                  <label htmlFor="business-type" className="sr-only">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    className="w-full mb-4 p-2 border rounded"
                    value={formData.businessType}
                    onChange={handleChange}
                  >
                    <option value="">Select Business Type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="grocery">Grocery</option>
                  </select>
                </div>

                {/* Phone number */}
                <div>
                  <label htmlFor="phone-number" className="sr-only">
                    Phone number
                  </label>
                  <input
                    id="phone-number"
                    name="phoneNumber"
                    type="tel"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Categories - Checkboxes */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Select Categories:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sapling"
                      name="catigory"
                      value="Sapling"
                      checked={formData.catigory.includes("Sapling")}
                      onChange={handleChange}
                    />
                    <label htmlFor="sapling" className="ml-2">
                      Sapling
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agricultural"
                      name="catigory"
                      value="Agricultural"
                      checked={formData.catigory.includes("Agricultural")}
                      onChange={handleChange}
                    />
                    <label htmlFor="agricultural" className="ml-2">
                      Agricultural
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="seeds"
                      name="catigory"
                      value="Seeds"
                      checked={formData.catigory.includes("Seeds")}
                      onChange={handleChange}
                    />
                    <label htmlFor="seeds" className="ml-2">
                      Seeds
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tools"
                      name="catigory"
                      value="Tools"
                      checked={formData.catigory.includes("Tools")}
                      onChange={handleChange}
                    />
                    <label htmlFor="tools" className="ml-2">
                      Tools
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="sr-only">
                    address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="storeName" className="sr-only">
                    storeName
                  </label>
                  <input
                    id="storeName"
                    name="storeName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Get Started
                </button>
              </form>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="/path-to-your-image.jpg"
              alt="Business owner"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnersignup;
