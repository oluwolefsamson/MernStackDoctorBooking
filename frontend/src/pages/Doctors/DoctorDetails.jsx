import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../../assets/data/doctors"; // This should be replaced with an API call if data is fetched dynamically
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";

const DoctorDetails = () => {
  const { id } = useParams(); // Extract the doctor ID from the URL
  const [doctor, setDoctor] = useState(null);
  const [tab, setTab] = useState("about");

  useEffect(() => {
    // Fetch doctor details based on the ID
    // Replace the following with your data fetching logic
    const fetchedDoctor = doctors.find((doc) => doc.id === id);
    setDoctor(fetchedDoctor);
  }, [id]);

  if (!doctor) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center flex-wrap gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctor.photo} alt={doctor.name} className="w-full" />
              </figure>
              <div>
                <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {doctor.specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  {doctor.name}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" /> {doctor.avgRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({doctor.totalRating})
                  </span>
                </div>
                <p className="text__para text-[14px] leading-6 md:text-[15px] max-w-[390px]">
                  {doctor.aboutshort}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={` ${
                  tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>

              <button
                onClick={() => setTab("feedback")}
                className={` ${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <DoctorAbout />}
              {tab === "feedback" && <Feedback />}
            </div>
          </div>

          <div>
            <SidePanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
