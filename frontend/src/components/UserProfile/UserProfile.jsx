import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/images/profile.png";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/66b0cbde3a59b7227f1247c6`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
        console.log("User data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="relative py-9 lg:py-11 flex flex-col justify-center items-center">
      {/* Logout Button */}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="absolute top-4 right-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
      >
        Logout
      </button>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 sm:p-10 mt-11 rounded-lg shadow-none sm:shadow-xl max-w-lg w-full">
        <div className="flex justify-center">
          <img
            src={profile}
            alt={user.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mt-4">
          {user.name}
        </h2>
        <p className="text-gray-600 text-center text-lg">{user.email}</p>
        <p className="text-gray-600 text-center text-lg">Role: {user.role}</p>

        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent border-b-2 border-blue-500 pb-2">
            Personal Information
          </h3>

          <p className="text-gray-700 mt-4">
            <span className="font-medium">Name:</span>{" "}
            {user.name || "Not provided"}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Email:</span>{" "}
            {user.email || "Not provided"}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Gender:</span>{" "}
            {user.gender || "Not provided"}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Phone:</span>{" "}
            {user.phone || "Not provided"}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Address:</span>{" "}
            {user.address || "Not provided"}
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent border-b-2 border-blue-500 pb-2">
            Upcoming Appointments
          </h3>
          <ul className="text-gray-700 mt-4">
            {user.appointments && user.appointments.length > 0 ? (
              user.appointments.map((appointment, index) => (
                <li key={index} className="mt-2">
                  <span className="font-medium">Date:</span> {appointment.date}{" "}
                  - <span className="font-medium">Doctor:</span>{" "}
                  {appointment.doctorName}
                </li>
              ))
            ) : (
              <p>No upcoming appointments.</p>
            )}
          </ul>
        </div>

        <div className="flex justify-between mt-6 sm:mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Edit Profile
          </button>
          <Link
            to="/doctors"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Find a Doctor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
