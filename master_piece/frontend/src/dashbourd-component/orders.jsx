import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Orders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaShoppingCart className="mr-2" /> الطلبات
      </h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">أحدث الطلبات</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2">رقم الطلب</th>
              <th className="p-2">العميل</th>
              <th className="p-2">المبلغ</th>
              <th className="p-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">#12345</td>
              <td className="p-2">أحمد محمد</td>
              <td className="p-2">75 د.أ</td>
              <td className="p-2">قيد التنفيذ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
