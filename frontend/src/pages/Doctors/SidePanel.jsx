import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is imported correctly
import DatePicker from "react-datepicker"; // Ensure react-datepicker is installed
import "react-datepicker/dist/react-datepicker.css";

const SidePanel = ({ doctor }) => {
  const token = localStorage.getItem("authToken");
  let userRole = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBooking = async () => {
    console.log("Booking button clicked"); // Debugging line
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/book",
        {
          doctorId: doctor._id,
          ticketPrice: doctor.ticketPrice,
          appointmentDate: appointmentDate, // Use the selected date
          timeSlot: selectedSlot, // Include the selected time slot
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking successful");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again later.");
    }
  };

  // Debugging the time slots
  console.log("Available Time Slots:", doctor.timeSlots);

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          ₦{doctor.ticketPrice}
        </span>
      </div>

      {/* <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          {doctor.timeSlots && doctor.timeSlots.length > 0 ? (
            doctor.timeSlots.map((slot, index) => (
              <li
                key={index}
                className={`flex items-center justify-between mb-2 cursor-pointer ${
                  selectedSlot === slot ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  setSelectedSlot(slot);
                  console.log("Selected slot:", slot); // Debugging line
                }}
              >
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {slot.day || "Day"}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {slot.startTime || "Start Time"} -{" "}
                  {slot.endTime || "End Time"}
                </p>
              </li>
            ))
          ) : (
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              No available slots
            </p>
          )}
        </ul>
      </div> */}

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

      <div className="mt-4">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Select Appointment Date:
        </p>
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          className="mt-2 w-full px-3 py-2 border rounded-md bg-blue-100"
        />
      </div>

      <button
        className="btn px-2 w-full rounded-md mt-4"
        onClick={handleBooking}
        disabled={userRole === "doctor" || !selectedSlot} // Disable if user is a doctor or no slot is selected
      >
        {userRole === "doctor" ? "Booking Disabled" : "Book Appointment"}
      </button>
    </div>
  );
};

export default SidePanel;
