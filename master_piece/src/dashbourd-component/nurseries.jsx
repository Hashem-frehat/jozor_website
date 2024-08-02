import React from "react";
import { FaLeaf } from "react-icons/fa";

const Nurseries = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaLeaf className="mr-2" /> المشاتل
      </h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">قائمة المشاتل</h3>
        <ul>
          <li className="mb-2">مشتل الواحة</li>
          <li className="mb-2">مشتل الربيع</li>
          <li className="mb-2">مشتل الزهور</li>
        </ul>
      </div>
    </div>
  );
};

export default Nurseries;
