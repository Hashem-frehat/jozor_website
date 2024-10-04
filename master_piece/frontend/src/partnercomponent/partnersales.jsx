import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const PartnerTotalSales = () => {
  const [partnerTotalSales, setPartnerTotalSales] = useState(null);

  useEffect(() => {
    const fetchPartnerTotalSales = async () => {
      try {
        const token = Cookies.get("token");
        let partnerId = null; // Declare partnerId here
        if (token) {
          const decoded = jwtDecode(token);
          partnerId = decoded.id; // Set partnerId if the token exists
        }

        if (partnerId) {
          const response = await axios.get(
            `http://localhost:3000/api/payments/partner-total-sales/${partnerId}` // Update the endpoint
          );
          setPartnerTotalSales(response.data.totalSales); // Update to fetch totalSales
        } else {
          throw new Error("Partner ID not found.");
        }
      } catch (error) {
        console.error("Error fetching partner total sales:", error);
        setPartnerTotalSales(null);
      }
    };

    fetchPartnerTotalSales();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Your Total Sales</h2>
      {partnerTotalSales !== null ? ( // Check for totalSales directly
        <p>
          Total Sales: ${partnerTotalSales.toFixed(2)}{" "}
          {/* Format total sales */}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
