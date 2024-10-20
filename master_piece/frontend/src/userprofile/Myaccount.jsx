import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar";
import { LanguageContext } from "../LanguageContext";

export const Myaccount = () => {
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

  const { language } = useContext(LanguageContext);
  const intl = useIntl();

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
      await axios.put(`http://localhost:3000/api/user/${userid}`, user);
      alert(
        intl.formatMessage({
          id: "updateSuccess",
          defaultMessage: "User information updated successfully!",
        })
      );
    } catch (error) {
      console.error("Error updating user data:", error);
      alert(
        intl.formatMessage({
          id: "updateError",
          defaultMessage:
            "Failed to update user information. Please try again.",
        })
      );
    }
  };

  return (
    <div className="container max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-3xl font-bold p-6 border-b">
        <FormattedMessage id="myAccount" defaultMessage="My Account" />
      </h1>

      <div className="flex">
        {/* Sidebar */}

        <div className="w-3/4 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="flex items-center">
              <label htmlFor="email" className="w-1/4 font-medium">
                <FormattedMessage id="email" defaultMessage="Email" />
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
                <FormattedMessage
                  id={emailEditable ? "disable" : "edit"}
                  defaultMessage={emailEditable ? "Disable" : "Edit"}
                />
              </button>
            </div>

            {/* First Name Field */}
            <div className="flex items-center">
              <label htmlFor="firstName" className="w-1/4 font-medium">
                <FormattedMessage id="firstName" defaultMessage="First Name" />
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
                <FormattedMessage
                  id={firstNameEditable ? "disable" : "edit"}
                  defaultMessage={firstNameEditable ? "Disable" : "Edit"}
                />
              </button>
            </div>

            {/* Last Name Field */}
            <div className="flex items-center">
              <label htmlFor="lastName" className="w-1/4 font-medium">
                <FormattedMessage id="lastName" defaultMessage="Last Name" />
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
                <FormattedMessage
                  id={lastNameEditable ? "disable" : "edit"}
                  defaultMessage={lastNameEditable ? "Disable" : "Edit"}
                />
              </button>
            </div>

            {/* Phone Number Field */}
            <div className="flex items-center">
              <label htmlFor="phoneNumber" className="w-1/4 font-medium">
                <FormattedMessage
                  id="mobileNumber"
                  defaultMessage="Mobile Number"
                />
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
                <FormattedMessage
                  id={phoneNumberEditable ? "disable" : "edit"}
                  defaultMessage={phoneNumberEditable ? "Disable" : "Edit"}
                />
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
              >
                <FormattedMessage
                  id="saveChanges"
                  defaultMessage="Save Changes"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
