import React, { useEffect, useState } from "react";
import axios from "axios";

export const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const partnersRes = await axios.get(
      "http://localhost:3000/api/admin/partners"
    );
    setPartners(partnersRes.data);
  };

  const togglePartnerActive = async (id) => {
    await axios.post(
      `http://localhost:3000/api/admin/partners/${id}/toggle-active`
    );
    fetchPartners();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map((partner) => (
        <div key={partner._id} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold">
            {partner.firstName} {partner.lastName}
          </h2>
          <p>{partner.email}</p>
          <p>{partner.phoneNumber}</p>
          <p>{partner.businessType}</p>
          <button
            className={`mt-2 px-4 py-2 ${
              partner.isactive ? "bg-red-500" : "bg-green-500"
            } text-white rounded`}
            onClick={() => togglePartnerActive(partner._id)}
          >
            {partner.isactive ? "Deactivate" : "Activate"}
          </button>
        </div>
      ))}
    </div>
  );
};
