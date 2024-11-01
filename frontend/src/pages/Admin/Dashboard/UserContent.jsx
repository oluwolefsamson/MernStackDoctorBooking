import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../../../assets/images/profile.png";

const UserContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://mernstackdoctorbooking.onrender.com/api/v1/users`
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtered users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Patients</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search patient..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display loading, error, or user list */}
      {loading ? (
        <p className="text-gray-500">Loading patients...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={user.photo || Profile} // Use user photo or default image
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </h2>
                    {/* Adjust email display for wrapping */}
                    <p className="text-gray-600 break-all">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserContent;
