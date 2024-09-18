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
  const [appointments, setAppointments] = useState([]); // Separate state for appointments
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [appointmentsPerPage] = useState(3); // Number of appointments per page
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
          const sortedAppointments = appointmentsResponse.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ); // Sort appointments by most recent first

          setUser(userData);
          setAppointments(sortedAppointments); // Set sorted appointments
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

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const nextPage = () => {
    if (indexOfLastAppointment < appointments.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="blue" />
      </div>
    );

  return (
    <div className="bg-slate-200 relative py-9 lg:py-11 flex flex-col justify-center items-center">
      {/* Card */}
      <div className="bg-slate-200 sm:bg-white p-6 sm:p-10  lg:mt-11 sm:mt-0 rounded-lg shadow-none sm:shadow-xl w-full sm:max-w-md lg:max-w-2xl mx-4">
        {/* Print text and icon aligned to the right */}
        <div className="w-full flex justify-end px-4 mb-4">
          <div
            onClick={handlePrint}
            className="flex items-center cursor-pointer text-black font-black hover:text-blue-800 transition"
          >
            <FaPrint className="mr-2" /> {/* Print Icon */}
            <span className="text-lg font-medium">Print</span>
          </div>
        </div>
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

        {/* Buttons below the role */}
        <div className="flex justify-between mt-6 sm:mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition text-sm">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition text-sm">
            Delete Profile
          </button>
          <Link
            to="/doctors"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition text-sm"
          >
            Find a Doctor
          </Link>
        </div>

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
            Your Upcoming Appointments
          </h3>
          <ul className="text-gray-700 mt-4">
            {currentAppointments && currentAppointments.length > 0 ? (
              currentAppointments.map((appointment, index) => (
                <li key={index} className="mt-2">
                  <span className="font-bold">{index + 1}. </span>{" "}
                  {/* Appointment Number */}
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

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6 sm:mt-8">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "bg-gray-400" : "bg-blue-500"
            } text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition text-sm`}
          >
            Previous
          </button>

          <button
            onClick={nextPage}
            disabled={indexOfLastAppointment >= appointments.length}
            className={`${
              indexOfLastAppointment >= appointments.length
                ? "bg-gray-400"
                : "bg-blue-500"
            } text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition text-sm`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
