import React, { useEffect, useState } from "react";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersRes = await axios.get("http://localhost:3000/api/admin/users");
    setUsers(usersRes.data);
  };

  const toggleUserActive = async (id) => {
    await axios.post(
      `http://localhost:3000/api/admin/users/${id}/toggle-active`
    );
    fetchUsers();
  };

  return (
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
  );
};
