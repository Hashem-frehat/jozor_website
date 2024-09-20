import React from "react";
import { Link } from "react-router-dom";

function Myaccount() {
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
          <div className="col-span-5 pl-4">
            <form className="space-y-6">
              <div className="flex items-center">
                <label htmlFor="email" className="w-1/4 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                />
                <button type="button" className="text-hoverpri ml-auto">
                  Change email
                </button>
              </div>

              <div className="flex items-center">
                <label htmlFor="firstName" className="w-1/4 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="lastName" className="w-1/4 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="password" className="w-1/4 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                />
                <button type="button" className="text-hoverpri ml-auto">
                  Change password
                </button>
              </div>

              <div className="flex items-center">
                <label htmlFor="phone" className="w-1/4 font-medium">
                  Mobile number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your mobile number"
                  className="border-b p-2 w-1/2 focus:outline-none focus:border-hoverpri"
                />
                <button type="button" className="text-hoverpri ml-auto">
                  Change phone number
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
