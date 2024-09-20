import React from "react";
import {
  FaHome,
  FaLeaf,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white flex-shrink-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Nurseries</h1>
        </div>
        <nav className="mt-6">
          <Link to="/home" className="block py-2 px-4 hover:bg-green-700">
            <FaHome className="inline-block ml-2" /> الرئيسية
          </Link>
          <Link to="/nurseries" className="block py-2 px-4 hover:bg-green-700">
            <FaLeaf className="inline-block ml-2" /> المشاتل
          </Link>
          <Link to="/orders" className="block py-2 px-4 hover:bg-green-700">
            <FaShoppingCart className="inline-block ml-2" /> الطلبات
          </Link>
          <Link to="/customers" className="block py-2 px-4 hover:bg-green-700">
            <FaUsers className="inline-block ml-2" /> العملاء
          </Link>
          <Link to="/reports" className="block py-2 px-4 hover:bg-green-700">
            <FaChartBar className="inline-block ml-2" /> التقارير
          </Link>
          <Link to="/settings" className="block py-2 px-4 hover:bg-green-700">
            <FaCog className="inline-block ml-2" /> الإعدادات
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
