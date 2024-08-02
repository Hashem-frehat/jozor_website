import React from "react";
import { FaCog } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaCog className="mr-2" /> الإعدادات
      </h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">إعدادات الحساب</h3>
        <form>
          <div className="mb-4">
            <label className="block mb-2">اسم المستخدم</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">البريد الإلكتروني</label>
            <input type="email" className="w-full p-2 border rounded" />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
