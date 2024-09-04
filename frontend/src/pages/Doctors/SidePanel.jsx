import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import AppointmentForm from "../BookAppointmentForm"; // Import AppointmentForm

const SidePanel = ({ doctor }) => {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const token = localStorage.getItem("authToken");
  let userRole = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  const [selectedSlot, setSelectedSlot] = useState("");

  // Static time slots
  const staticTimeSlots = [
    { day: "Monday", startTime: "9:00 AM", endTime: "4:00 PM" },
    { day: "Tuesday", startTime: "9:00 AM", endTime: "4:00 PM" },
    { day: "Wednesday", startTime: "9:00 AM", endTime: "4:00 PM" },
    { day: "Thursday", startTime: "9:00 AM", endTime: "4:00 PM" },
    { day: "Friday", startTime: "9:00 AM", endTime: "2:00 PM" },
  ];

  const handleBookingClick = () => {
    setShowForm(true); // Show the form
  };

  const handleCloseForm = () => {
    setShowForm(false); // Hide the form
  };

  return (
    <div className="relative">
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
            {staticTimeSlots.map((slot, index) => (
              <li
                key={index}
                className={`flex items-center justify-between mb-2 cursor-pointer ${
                  selectedSlot === slot ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {slot.day}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {slot.startTime} - {slot.endTime}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="btn px-2 w-full rounded-md mt-4"
          onClick={handleBookingClick}
        >
          Book Appointment
        </button>
      </div>

      {/* Conditionally render the AppointmentForm */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <AppointmentForm doctor={doctor} />
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
