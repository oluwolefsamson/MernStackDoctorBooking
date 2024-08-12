import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Perform any necessary logout logic here, like clearing tokens
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
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="bg-white p-6 sm:p-10 mt-11 rounded-lg shadow-none sm:shadow-xl max-w-lg w-full">
        <div className="flex justify-center">
          <img
            src={user.photo || "/default-avatar.png"}
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
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
            Personal Information
          </h3>
          <p className="text-gray-700 mt-4">
            <span className="font-medium">Phone:</span>{" "}
            {user.phone || "Not provided"}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Address:</span>{" "}
            {user.address || "Not provided"}
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
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
