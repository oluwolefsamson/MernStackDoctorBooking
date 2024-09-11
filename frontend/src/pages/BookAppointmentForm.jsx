import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DotLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";

const AppointmentForm = ({ doctor }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

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
    { day: "Thursday", startTime: "9:00 AM", endTime: "4:00 PM" },
    { day: "Friday", startTime: "9:00 AM", endTime: "1:00 PM" },
  ];

  const handleBooking = async () => {
    try {
      if (!doctor || !doctor._id) {
        throw new Error("Doctor information is missing.");
      }

      if (!name) {
        throw new Error("Please enter your name.");
      }

      if (!appointmentDate) {
        throw new Error("Please select an appointment date.");
      }

      if (!selectedSlot) {
        throw new Error("Please select a time slot.");
      }

      const formattedDate = appointmentDate.toISOString();

      const appointmentData = {
        name,
        doctorId: doctor._id,
        date: formattedDate,
        timeSlot: selectedSlot,
        reason,
      };

      setLoading(true);
      const response = await axios.post(
        `https://mernstackdoctorbooking.onrender.com/api/v1/appointments/book`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Booking successful!");
      setError(null);
      window.location.reload();
    } catch (error) {
      setError("Booking failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-lg mx-auto h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">
        Book an Appointment with Dr. {doctor.name || "Dr. Samson"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Name input */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="name"
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Appointment Date
          </label>
          <DatePicker
            selected={appointmentDate}
            onChange={(date) => setAppointmentDate(date)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            dateFormat="yyyy-MMMM-d"
          />
        </div>
      </div>

      {/* Reason for Appointment */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Reason for Appointment
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          placeholder="Enter the reason for your appointment"
          rows="3"
        />
      </div>

      {/* Available Time Slots */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Available Time Slots
        </label>
        <div className="flex flex-wrap gap-2">
          {staticTimeSlots.map((slot, index) => (
            <div
              key={index}
              className={`flex-1 min-w-[200px] cursor-pointer p-3 border rounded-md transition-colors ${
                selectedSlot ===
                `${slot.day} - ${slot.startTime} to ${slot.endTime}`
                  ? "bg-blue-100 border-blue-400"
                  : "hover:bg-blue-50"
              }`}
              onClick={() =>
                setSelectedSlot(
                  `${slot.day} - ${slot.startTime} to ${slot.endTime}`
                )
              }
            >
              <div className="text-sm font-medium text-gray-800">
                {slot.day}
              </div>
              <div className="text-sm text-gray-600">
                {slot.startTime} - {slot.endTime}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4 text-center">{successMessage}</p>
      )}

      <button
        onClick={handleBooking}
        className={`w-full py-2 font-medium text-white rounded-md transition-colors ${
          userRole === "doctor" || !selectedSlot || !reason || !name || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={
          userRole === "doctor" || !selectedSlot || !reason || !name || loading
        }
      >
        {loading ? (
          <DotLoader size={25} color="white" />
        ) : userRole === "doctor" ? (
          "Booking Disabled"
        ) : (
          "Book Appointment"
        )}
      </button>
    </div>
  );
};

export default AppointmentForm;
