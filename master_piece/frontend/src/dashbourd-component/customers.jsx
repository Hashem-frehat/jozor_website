import React from "react";
import { FaUsers } from "react-icons/fa";

const Customers = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaUsers className="mr-2" /> العملاء
      </h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">قائمة العملاء</h3>
        <ul>
          <li className="mb-2">أحمد محمد</li>
          <li className="mb-2">سارة أحمد</li>
          <li className="mb-2">محمد علي</li>
        </ul>
      </div>
    </div>
  );
};

export default Customers;
