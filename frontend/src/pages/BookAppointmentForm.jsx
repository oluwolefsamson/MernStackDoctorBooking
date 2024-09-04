import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode"; // Use default import for jwt-decode

const AppointmentForm = ({ doctor }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [reason, setReason] = useState("");

  const token = localStorage.getItem("authToken");
  let userRole = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  const staticTimeSlots = [
    { day: "Monday", startTime: "9:00 AM", endTime: "4:00 PM" },
    { day: "Tuesday", startTime: "9:00 AM", endTime: "4:00 PM" },
    { day: "Wednesday", startTime: "9:00 AM", endTime: "4:00 PM" },
    // { day: "Thursday", startTime: "9:00 AM", endTime: "4:00 PM" },
    // { day: "Friday", startTime: "9:00 AM", endTime: "2:00 PM" },
  ];

  const handleBooking = async () => {
    try {
      if (!doctor || !doctor._id) {
        throw new Error("Doctor information is missing.");
      }

      // Use a static date for testing
      const staticDate = new Date("2024-09-15T09:00:00Z").toISOString(); // Example static date in ISO format

      // Prepare the data to be sent
      const appointmentData = {
        doctorId: doctor._id,
        date: staticDate, // Use static date here
        timeSlot: selectedSlot,
        reason,
      };

      console.log("Sending request with data:", appointmentData); // Debugging line

      const response = await axios.post(
        `https://mernstackdoctorbooking.onrender.com/api/v1/appointments/book`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure content type is set
          },
        }
      );

      setSuccessMessage("Booking successful!");
      setError(null);
    } catch (error) {
      console.error(
        "Booking failed:",
        error.response ? error.response.data : error.message
      ); // Detailed error logging
      setError("Booking failed. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Book an Appointment with {doctor?.name || "Dr. Samson"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select Appointment Date
        </label>
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
          dateFormat=" yyyy-MMMM-d"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Reason for Appointment
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
          placeholder="Enter the reason for your appointment"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Available Time Slots
        </label>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <ul className="space-y-2 md:space-y-0 md:w-1/2">
            {staticTimeSlots.map((slot, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 border rounded-md transition-colors ${
                  selectedSlot ===
                  `${slot.day} - ${slot.startTime} to ${slot.endTime}`
                    ? "bg-blue-100 border-blue-300"
                    : "hover:bg-blue-50"
                }`}
                onClick={() =>
                  setSelectedSlot(
                    `${slot.day} - ${slot.startTime} to ${slot.endTime}`
                  )
                }
              >
                {slot.day} - {slot.startTime} to {slot.endTime}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4 text-center">{successMessage}</p>
      )}

      <button
        onClick={handleBooking}
        className={`w-full py-3 font-medium text-white rounded-md transition-colors ${
          userRole === "doctor" || !selectedSlot || !reason
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={userRole === "doctor" || !selectedSlot || !reason}
      >
        {userRole === "doctor" ? "Booking Disabled" : "Book Appointment"}
      </button>
    </div>
  );
};

export default AppointmentForm;
