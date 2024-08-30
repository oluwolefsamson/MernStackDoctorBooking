import React from "react";
import axios from "axios"; // Make sure axios is installed and imported

const SidePanel = ({ doctor }) => {
  const handleBooking = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/book",
        {
          doctorId: doctor._id,
          ticketPrice: doctor.ticketPrice,
          appointmentDate: new Date(), // Replace this with the actual date/time selected by the user
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the token in localStorage
          },
        }
      );

      alert("Booking successful");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed");
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          ₦{doctor.ticketPrice}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Monday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 PM - 4:00 PM
            </p>
          </li>

          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Tuesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 PM - 4:00 PM
            </p>
          </li>

          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Wednesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM - 4:00 PM
            </p>
          </li>

          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Thursday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM - 4:00 PM
            </p>
          </li>

          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Friday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM - 2:00 PM
            </p>
          </li>
        </ul>
      </div>

      <button className="btn px-2 w-full rounded-md" onClick={handleBooking}>
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
