import React from "react";
import { Link } from "react-router-dom";
import tanween from "./images/tanween.png";

function Myorders() {
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

          {/* Main content */}
          <div className="w-3/4 p-6">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center mb-6 pb-6 border-b last:border-b-0"
              >
                <img
                  src={tanween}
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg mr-6"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">Tanween</h2>
                  <p className="text-gray-600 mb-1">6 July 2023 - 22:51</p>
                  <p className="mb-2">
                    Order ID: 161616514
                    <span className="text-green-500 font-semibold ml-2">
                      Delivered
                    </span>
                  </p>
                  <div className="space-x-4 mt-2">
                    <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300">
                      Rate
                    </button>
                    <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-300">
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myorders;
