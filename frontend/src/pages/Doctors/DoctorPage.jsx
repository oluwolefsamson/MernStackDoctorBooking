import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import starIcon from "../../assets/images/Star.png";
import Profile from "../../assets/images/profile.png";
import { SyncLoader } from "react-spinners";
import EditDoctorProfile from "../../components/EditDoctorProfile/EditDoctorProfile";
import Modal from "../../components/LogoutModal/LogoutModal";
import AppointmentsList from "../../components/Appointment/AppointmentList"; // Import the AppointmentsList component

const DoctorPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const doctorResponse = await axios.get(
          `https://mernstackdoctorbooking.onrender.com/api/v1/doctors/${doctorId}`
        );
        setDoctor(doctorResponse.data.data);

        const appointmentsResponse = await axios.get(
          `https://mernstackdoctorbooking.onrender.com/api/v1/appointments/doctor/${doctorId}`
        );
        setAppointments(appointmentsResponse.data.appointments || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor profile or appointments:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [doctorId]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/doctorLogin");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleDeleteProfile = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (confirmed) {
      try {
        await axios.delete(
          `https://mernstackdoctorbooking.onrender.com/api/v1/doctors/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        alert("Profile deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting doctor profile:", error);
        alert("Error deleting profile");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="#3498db" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-3xl lg:max-w-4xl w-full">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
        {isEditing ? (
          <EditDoctorProfile doctor={doctor} />
        ) : (
          <div className="flex flex-col items-center text-center gap-6">
            <figure className="">
              <img
                src={doctor.photo || Profile}
                alt={doctor.name || "Not Provided"}
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full shadow-md"
              />
            </figure>
            <div className="w-full">
              <span className="bg-blue-100 text-blue-600 py-1 px-4 text-xs font-semibold rounded-full">
                {doctor?.specialization || "Not Provided"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mt-3">
                Dr. {doctor.name || "Not Provided"}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-gray-700">
                  <img src={starIcon} alt="Rating" className="w-6 h-6" />
                  {doctor?.averageRating || "5.4"}
                </span>
                <span className="text-gray-500">
                  ({doctor?.totalRating || "576"})
                </span>
              </div>
              <p className="text-gray-600 mt-3 mb-3">
                Dr. {doctor.name} is a distinguished {doctor.specialization},
                celebrated for their precision and expertise in performing
                complex {doctor.specialization} procedures. Their commitment to
                delivering exceptional patient care, combined with their deep
                knowledge and experience, has earned them widespread recognition
                in the medical community.
              </p>
              <span className="text-[16px]  leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                Ticket Price: ₦{doctor?.ticketPrice}
              </span>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handleEditProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete Profile
                </button>
              </div>
              <AppointmentsList appointments={appointments} />{" "}
              {/* Use AppointmentsList component */}
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </section>
  );
};

export default DoctorPage;
