import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EditDoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    name: "",
    ticketPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken.id !== doctorId) {
      setError("You are not authorized to edit this profile");
      setLoading(false);
      return;
    }

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `https://mernstackdoctorbooking.onrender.com/api/v1/doctors/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor({
          name: response.data.data.name,
          ticketPrice: response.data.data.ticketPrice,
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to load doctor details");
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://mernstackdoctorbooking.onrender.com/api/v1/doctors/${doctorId}`,
        { name: doctor.name, ticketPrice: doctor.ticketPrice },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      setError("Failed to update doctor details");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="max-w-xl mx-auto p-5 mt-6">
        <h2 className="text-2xl font-bold mb-11 text-blue-400">
          Welcome Doctor! Edit your Profile
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-11">
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleInputChange}
              placeholder="Edit Your Name"
              className="mt-1 block w-full bg-blue-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-6"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              name="ticketPrice"
              value={doctor.ticketPrice}
              onChange={handleInputChange}
              placeholder="Edit Price"
              className="mt-1 block w-full bg-blue-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-6"
            />
          </div>

          <div className="flex justify-between mt-11">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctorProfile;
