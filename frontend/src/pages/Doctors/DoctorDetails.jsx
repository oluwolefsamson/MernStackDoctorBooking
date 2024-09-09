import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import Profile from "../../assets/images/profile.png";
import { RingLoader } from "react-spinners";
import Modal from "../../components/LogoutModal/LogoutModal"; // Import the Modal component
import { jwtDecode } from "jwt-decode";

// Main DoctorDetails Component
const DoctorDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [tab, setTab] = useState("about");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(
          `https://mernstackdoctorbooking.onrender.com/api/v1/doctors/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const decodedToken = jwtDecode(localStorage.getItem("authToken"));
        console.log(decodedToken); // Log the decoded token to check its structure

        setDoctor(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        navigate("/choose");
      }
    };

    fetchDoctorProfile();
  }, [navigate, doctorId]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="blue" />
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Doctor {doctor.name} Details</h2>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on button click
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center flex-wrap gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img
                  src={doctor.photo || Profile}
                  alt={doctor.name || "Not Provided"}
                  className="w-full bg-blue-300"
                />
              </figure>
              <div>
                <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 mt-11 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {doctor.specialization || "Not Provided"}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  Dr. {doctor.name || "Not Provided"}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" /> {doctor.avgRating || 4.5}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({doctor.totalRating || 576})
                  </span>
                </div>
                <p className="text-para text-[14px] leading-6 md:text-[15px] max-w-[390px]">
                  Dr. {doctor.name} is a distinguished {doctor.specialization}{" "}
                  celebrated for his precision and expertise in complex{" "}
                  {doctor.specialization} procedures.
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>

              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <DoctorAbout doctor={doctor} />}
              {tab === "feedback" && <Feedback />}
            </div>
          </div>

          <div>
            <SidePanel doctor={doctor} />
          </div>
        </div>
      </div>
      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </section>
  );
};

export default DoctorDetails;
