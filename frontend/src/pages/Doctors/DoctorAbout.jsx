import React from "react";
import { formateDate } from "../../Utils/formateDate.js";

const DoctorAbout = ({ doctor }) => {
  return (
    <div>
      {" "}
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center  gap-2">
          About Dr.
          <span className="text-irisBlueColor font-bold text-[20px] leading-9">
            {doctor.name}
          </span>
        </h3>
        <p className="text__para">
          Dr. {doctor.name} is a distinguished {doctor.specialization}{" "}
          celebrated for his precision and expertise in {doctor.specialization}.
          With a career spanning over {doctor.experiences} of experiences. He
          has earned a stellar reputation for his skillful hands and innovative
          techniques in the operating room. Dr. {doctor.name} commitment to
          excellence and patient safety is evident in his meticulous approach to
          preoperative planning and postoperative care. His compassionate and
          reassuring manner helps patients feel confident and well-cared for
          throughout their journey. Recognized by his peers and patients alike,
          Dr. {doctor.name} continues to advance the field of{" "}
          {doctor.specialization} with his dedication to continuous learning and
          improvement.
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("10-03-2015")} - {formateDate("10-03-2017")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in {doctor.specialization || "Not Provided"}
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              {doctor.hospital || "Not Provided"}
            </p>
          </li>
        </ul>

        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("7-04-2010")} - {formateDate("7-04-2014")}
              </span>
              <p className="text-[15px] leading-6 font-medium text-textColor">
                PHD in {doctor.specialization || "Not Provided"}
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              {doctor.hospital || "Not Provided"}
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("07-04-2010") || "Not Provided"} -{" "}
              {formateDate("08-13-2014") || "Not Provided"}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. {doctor.specialization || "Not Provided"}
            </p>

            <p className="text-[14px] leading-5 font-medium text-textColor">
              {doctor.hospital || "Not Provided"}
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("07-04-2010") || "Not Provided"} -{" "}
              {formateDate("08-13-2014") || "Not Provided"}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. {doctor.specialization || "Not Provided"}
            </p>

            <p className="text-[14px] leading-5 font-medium text-textColor">
              {doctor.hospital || "Not Provided"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
