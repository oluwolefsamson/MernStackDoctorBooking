import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import starIcon from "../../assets/images/Star.png";
import Profile from "../../assets/images/profile.png";
import { RingLoader } from "react-spinners";
import EditDoctorProfile from "../../components/EditDoctorProfile/EditDoctorProfile";

const DoctorPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(
          `https://mernstackdoctorbooking.onrender.com/api/v1/doctors/${doctorId}`
        );
        setDoctor(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        setError("Error fetching doctor profile");
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [doctorId]);

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
        <RingLoader color="#3498db" />
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
        {isEditing ? (
          <EditDoctorProfile doctor={doctor} />
        ) : (
          <div className="flex flex-col items-center text-center gap-6">
            <figure className="mb-6">
              <img
                src={doctor.photo || Profile}
                alt={doctor.name || "Not Provided"}
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full shadow-md"
              />
            </figure>
            <div className="w-full">
              <span className="bg-blue-100 text-blue-600 py-1 px-4 text-xs font-semibold rounded-full">
                {doctor.specialization || "Not Provided"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mt-3">
                Dr. {doctor.name || "Not Provided"}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-gray-700">
                  <img src={starIcon} alt="Rating" className="w-6 h-6" />
                  {doctor.avgRating || "N/A"}
                </span>
                <span className="text-gray-500">
                  ({doctor.totalRating || "N/A"})
                </span>
              </div>
              <p className="text-gray-600 mt-3">
                Dr. {doctor.name} is a distinguished {doctor.specialization}
                celebrated for his precision and expertise in{" "}
                {doctor.specialization}. With a career spanning over{" "}
                {doctor.experience} years, he has earned a stellar reputation
                for his skillful hands and innovative techniques in the
                operating room. Dr. {doctor.name}'s commitment to excellence and
                patient safety is evident in his meticulous approach to
                preoperative planning and postoperative care. His compassionate
                and reassuring manner helps patients feel confident and
                well-cared for throughout their journey. Recognized by his peers
                and patients alike, Dr. {doctor.name} continues to advance the
                field of {doctor.specialization} with his dedication to
                continuous learning and improvement.
              </p>

              {/* Additional Content */}
              <div className="mt-11 mb-11 flex flex-wrap gap-6">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-blue-600">
                    Qualifications
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2 pl-4">
                    {doctor.qualifications?.map((qualification, index) => (
                      <li key={index}>{qualification}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-blue-600">
                    Experience
                  </h4>
                  <p className="text-gray-600 mt-2">
                    {doctor.experiences || "Not Available"}
                  </p>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-blue-600">
                    Patient Reviews
                  </h4>
                  <div className="space-y-4 mt-2">
                    {doctor.reviews?.length ? (
                      doctor.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 bg-gray-50"
                        >
                          <p className="font-semibold text-gray-800">
                            {review.author}
                          </p>
                          <p className="text-gray-600 mt-1">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No reviews available.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4 justify-center flex-wrap">
                <button
                  onClick={handleEditProfile}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-200"
                >
                  Delete Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorPage;
