import React from "react";
import {
  FaHome,
  FaLeaf,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBell,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaHome className="mr-2" /> الصفحة الرئيسية
      </h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">ملخص النشاط</h3>
        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* Header */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div className="flex items-center">
              <button className="mr-4">
                <FaBell className="text-gray-600" />
              </button>
              <span className="text-gray-700">Hello, Admin</span>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                <p className="text-2xl font-bold">12,500 JOD</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Orders</h3>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Nurseries</h3>
                <p className="text-2xl font-bold">48</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">New Customers</h3>
                <p className="text-2xl font-bold">27</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-4 rounded-lg shadow mb-8">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-100">
                    <th className="p-2">Order Number</th>
                    <th className="p-2">Customer</th>
                    <th className="p-2">Nursery</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">#12345</td>
                    <td className="p-2">Ahmed Mohammed</td>
                    <td className="p-2">Flower Nursery</td>
                    <td className="p-2">75 JOD</td>
                    <td className="p-2">
                      <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-sm">
                        Delivered
                      </span>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>

            {/* Top Nurseries */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Top Performing Nurseries
              </h3>
              <ul>
                <li className="flex justify-between items-center mb-2">
                  <span>Oasis Nursery</span>
                  <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-sm">
                    4.9 ★
                  </span>
                </li>
                <li className="flex justify-between items-center mb-2">
                  <span>Spring Nursery</span>
                  <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-sm">
                    4.8 ★
                  </span>
                </li>
                {/* Add more nurseries as needed */}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
