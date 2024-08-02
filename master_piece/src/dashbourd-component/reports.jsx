import React from "react";
import { FaChartBar } from "react-icons/fa";

const Reports = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaChartBar className="mr-2" /> التقارير
      </h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">التقارير المتاحة</h3>
        <ul>
          <li className="mb-2">تقرير المبيعات الشهري</li>
          <li className="mb-2">تقرير أداء المشاتل</li>
          <li className="mb-2">تقرير رضا العملاء</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;
