import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [usersRes, partnersRes, requestsRes] = await Promise.all([
      axios.get("http://localhost:3000/api/admin/users"),
      axios.get("http://localhost:3000/api/admin/partners"),
      axios.get("http://localhost:3000/api/admin/requests"),
    ]);
    setUsers(usersRes.data);
    setPartners(partnersRes.data);
    setRequests(requestsRes.data);
  };

  const toggleUserActive = async (id) => {
    await axios.post(
      `http://localhost:3000/api/admin/users/${id}/toggle-active`
    );
    fetchData();
  };

  const togglePartnerActive = async (id) => {
    await axios.post(
      `http://localhost:3000/api/admin/partners/${id}/toggle-active`
    );
    fetchData();
  };

  const updateRequest = async (id, price, message) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/admin/requests/${id}/update`,
        {
          price,
          messegefromadmin: message,
        }
      );
      console.log("Server response:", response.data);
      alert("Request updated successfully");
      fetchData();
    } catch (error) {
      console.error(
        "Error updating request:",
        error.response?.data || error.message
      );
      alert(
        `Error updating request: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleRequestSubmit = (event, request) => {
    event.preventDefault();
    const price = event.target.elements.price.value;
    const message = event.target.elements.message.value;
    updateRequest(request._id, price, message);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Tab buttons remain the same */}
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === "partners" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("partners")}
        >
          Partners
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "requests" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
      </div>

      {/* Users and Partners sections remain the same */}
      {activeTab === "users" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
              <button
                className={`mt-2 px-4 py-2 ${
                  user.isactive ? "bg-red-500" : "bg-green-500"
                } text-white rounded`}
                onClick={() => toggleUserActive(user._id)}
              >
                {user.isactive ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "partners" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
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
      )}

      {/* Updated Requests section */}
      {activeTab === "requests" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h2 className="text-xl font-bold">
                Request from {request.userId.email}
              </h2>
              <p>Address: {request.address}</p>
              <p>Description: {request.description}</p>
              <p>Date: {new Date(request.date).toLocaleDateString()}</p>
              <p>Time: {request.time}</p>
              <form onSubmit={(e) => handleRequestSubmit(e, request)}>
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  className="mt-2 w-full p-2 border rounded"
                  defaultValue={request.price}
                />
                <textarea
                  name="message"
                  placeholder="Message from admin"
                  className="mt-2 w-full p-2 border rounded"
                  defaultValue={request.messegefromadmin}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Send Update
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
