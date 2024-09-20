import React from "react";
import { Link } from "react-router-dom";

function DeliveryAddress() {
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
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Address Name</p>
                  <p className="font-medium text-gray-600">Address</p>
                  <p className="font-medium text-gray-600">Mobile Number</p>
                </div>
                <div>
                  <p className="text-gray-800">House</p>
                  <p className="text-gray-800">Army Street, بيت رقم 10</p>
                  <p className="text-gray-800">+962 780213988</p>
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300">
                  Edit Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
