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
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    businis Email
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
                <div>
                  <label htmlFor="business-type" className="sr-only">
                    Business Type
                  </label>
                  <select
                    name="businessType" // Updated to match the formData field
                    className="w-full mb-4 p-2 border rounded"
                    value={formData.businessType}
                    onChange={handleChange}
                  >
                    <option value="">Select Business Type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="grocery">Grocery</option>
                  </select>
                </div>
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

        {/* Why partner with us section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why you should{" "}
            <span className="text-secondary">partner with us</span>
          </h2>
          <div className="flex flex-wrap justify-center">
            {/* Reach more customers */}
            <div className="w-full md:w-1/3 p-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src="/path-to-icon1.png"
                  alt="Reach more customers"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Reach more customers
                </h3>
                <p className="text-gray-600">
                  We have thousands of hungry customers in your area waiting to
                  order from you and we'll help you deliver their food faster.
                </p>
              </div>
            </div>
            {/* Earn more money */}
            <div className="w-full md:w-1/3 p-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src="/path-to-icon2.png"
                  alt="Earn more money"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Earn more money</h3>
                <p className="text-gray-600">
                  We'll help you serve more hungry customers without adding more
                  chairs to your restaurant and we'll make sure you get paid
                  promptly.
                </p>
              </div>
            </div>
            {/* Grow your business */}
            <div className="w-full md:w-1/3 p-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src="/path-to-icon3.png"
                  alt="Grow your business"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Grow your business
                </h3>
                <p className="text-gray-600">
                  Increase sales, reach more customers or market your business
                  better. We deliver ways to grow your business because when you
                  succeed, we do too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnersignup;
