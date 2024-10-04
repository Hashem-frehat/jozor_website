import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register scales and other required elements for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Payments = () => {
  const [totalSales, setTotalSales] = useState([]);
  const [salesPercentage, setSalesPercentage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const totalSalesRes = await axios.get(
        "http://localhost:3000/api/payments/total-sales"
      );
      const salesPercentageRes = await axios.get(
        "http://localhost:3000/api/payments/sales-percentage"
      );
      setTotalSales(totalSalesRes.data);
      setSalesPercentage(salesPercentageRes.data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: salesPercentage.map((item) => item.partnerName),
    datasets: [
      {
        label: "Sales Percentage",
        data: salesPercentage.map((item) => item.percentage * 100),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Sales by Partner</h2>
          <ul>
            {totalSales.map((item) => (
              <li key={item.partnerId} className="mb-2">
                {item.partnerName}: ${item.totalSales.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">
            Sales Percentage by Partner
          </h2>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};
