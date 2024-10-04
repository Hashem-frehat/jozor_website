import React, { useEffect, useState } from "react";
import axios from "axios";

export const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const requestsRes = await axios.get(
      "http://localhost:3000/api/admin/requests"
    );
    setRequests(requestsRes.data);
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
      fetchRequests();
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {requests.map((request) => (
        <div key={request._id} className="bg-white shadow-md rounded-lg p-4">
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
  );
};
