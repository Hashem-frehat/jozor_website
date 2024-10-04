import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Myaccount() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [emailEditable, setEmailEditable] = useState(false);
  const [firstNameEditable, setFirstNameEditable] = useState(false);
  const [lastNameEditable, setLastNameEditable] = useState(false);
  const [phoneNumberEditable, setPhoneNumberEditable] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = Cookies.get("tokenuser");
      const decodedToken = jwtDecode(token);
      const userid = decodedToken.userId;

      const response = await axios.get(
        `http://localhost:3000/api/user/${userid}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("tokenuser");
      const decodedToken = jwtDecode(token);
      const userid = decodedToken.userId;
      console.log(userid);
      await axios.put(`http://localhost:3000/api/user/${userid}`, user);
      alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update user information. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold p-6 border-b">My Account</h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 p-6 border-r">
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="/myaccount"
            >
              Account Info
            </Link>
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="/deleveryaddres"
            >
              Delivery Address
            </Link>
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="/myorders"
            >
              My Orders
            </Link>
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="#"
            >
              Jozor Vouchers
            </Link>
          </div>
          <div className="w-3/4 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="flex items-center">
                <label htmlFor="email" className="w-1/4 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                  disabled={!emailEditable}
                />
                <button
                  type="button"
                  className="ml-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                  onClick={() => setEmailEditable(!emailEditable)}
                >
                  {emailEditable ? "Disable" : "Edit"}
                </button>
              </div>

              {/* First Name Field */}
              <div className="flex items-center">
                <label htmlFor="firstName" className="w-1/4 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                  disabled={!firstNameEditable}
                />
                <button
                  type="button"
                  className="ml-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                  onClick={() => setFirstNameEditable(!firstNameEditable)}
                >
                  {firstNameEditable ? "Disable" : "Edit"}
                </button>
              </div>

              {/* Last Name Field */}
              <div className="flex items-center">
                <label htmlFor="lastName" className="w-1/4 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                  disabled={!lastNameEditable}
                />
                <button
                  type="button"
                  className="ml-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                  onClick={() => setLastNameEditable(!lastNameEditable)}
                >
                  {lastNameEditable ? "Disable" : "Edit"}
                </button>
              </div>

              {/* Phone Number Field */}
              <div className="flex items-center">
                <label htmlFor="phoneNumber" className="w-1/4 font-medium">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                  disabled={!phoneNumberEditable}
                />
                <button
                  type="button"
                  className="ml-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                  onClick={() => setPhoneNumberEditable(!phoneNumberEditable)}
                >
                  {phoneNumberEditable ? "Disable" : "Edit"}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myaccount;
