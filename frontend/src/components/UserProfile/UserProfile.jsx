import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import { SyncLoader } from "react-spinners";

import doctorBg from "../../assets/images/doctorbg.jpg";
import { FaPrint } from "react-icons/fa"; // Importing a print icon from react-icons

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id; // Ensure 'id' exists in the token

          const userResponse = await axios.get(
            `https://mernstackdoctorbooking.onrender.com/api/v1/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Fetch user data
          const userData = userResponse.data.data;

          // Fetch appointments if user data is available
          const appointmentsResponse = await axios.get(
            `https://mernstackdoctorbooking.onrender.com/api/v1/appointments/users/${userId}/appointments`
          );

          // Set user and appointments data
          setUser({ ...userData, appointments: appointmentsResponse.data });
        } else {
          console.warn("No auth token found in localStorage.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page after logout
  };

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const handlePrint = () => {
    window.print(); // Native browser print function
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="blue" />
      </div>
    );

  return (
    <div
      className="relative py-9 lg:py-11 flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${doctorBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Print text and icon aligned to the right */}
      <div className="w-full flex justify-end px-4 mb-4">
        <div
          onClick={handlePrint}
          className="flex items-center cursor-pointer text-white hover:text-blue-800 transition"
        >
          <FaPrint className="mr-2" /> {/* Print Icon */}
          <span className="text-lg font-medium">Print</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-transparent sm:bg-white p-6 sm:p-10 mt-11 rounded-lg shadow-none sm:shadow-xl w-full sm:max-w-md lg:max-w-2xl mx-4">
        <div className="flex justify-center">
          <img
            src={user.photo || profile}
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
                  <span className="font-black">Date:</span>{" "}
                  {new Date(appointment.date).toLocaleDateString()}{" "}
                  <span className="text-white">|</span>{" "}
                  <span className="font-black">Doctor:</span> Dr. {""}
                  {appointment.doctor} <span className="text-white">|</span>{" "}
                  <span className="font-black">Reason:</span>{" "}
                  {appointment.reason} <span className="text-white">|</span>{" "}
                  <span className="font-black">Status:</span>{" "}
                  {appointment.status}
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
          <button
            onClick={openLogoutModal}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-center mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={closeLogoutModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
