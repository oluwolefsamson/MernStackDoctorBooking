import React, { useState } from "react";
import axios from "axios";
import AppointmentModal from "./AppointmentModal"; // Assuming you have this component

const AppointmentsList = ({ appointments: initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments); // Manage state locally
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For showing loading state

  // Function to handle status updates (confirm/cancel)
  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      setLoading(true); // Show loading while request is being processed

      // // Get the token from localStorage (assuming you're storing it there)
      // const token = localStorage.getItem("token");
      // console.log("Token:", token); // Verify that the token is being retrieved correctly

      const response = await axios.patch(
        `http://localhost:8000/api/v1/appointments/${appointmentId}/status`,
        { status } // Pass the status in the body
      );

      alert(response.data.message); // Notify user of status change

      // Update the appointment status in the local state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status } // Update status of the matching appointment
            : appointment
        )
      );

      // Close the modal after successful status update
      handleCloseModal();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else {
        console.error("Error message:", error.message);
      }
      alert("Failed to update appointment status");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Open the modal and set the selected appointment
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Confirm the appointment
  const handleConfirm = (appointmentId) => {
    handleStatusUpdate(appointmentId, "confirmed");
  };

  // Cancel the appointment
  const handleCancel = (appointmentId) => {
    handleStatusUpdate(appointmentId, "cancelled");
  };

  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold mb-4">Appointments</h4>
      <ul className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li
              key={appointment._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => handleOpenModal(appointment)} // Open the modal when clicked
                className="w-full text-left"
              >
                <p>
                  <strong className="text-blue-500 font-black">Name: </strong>{" "}
                  {appointment.name || "Not Provided"}
                </p>
                <p>
                  <strong className="text-blue-500 font-black">Date:</strong>{" "}
                  {isNaN(new Date(appointment.date))
                    ? "Invalid Date"
                    : new Date(appointment.date).toLocaleDateString()}
                </p>{" "}
                <p>
                  <strong className="text-blue-500 font-black">
                    TimeSlot:{" "}
                  </strong>{" "}
                  {appointment.timeSlot || "No time slot available"}
                </p>
                <p>
                  <strong className="text-blue-500 font-black">Reason: </strong>{" "}
                  {appointment.reason || "Not Provided"}
                </p>
                <p>
                  <strong className="text-blue-500 font-black">Status: </strong>{" "}
                  {appointment.status || "Pending"}
                </p>
              </button>
            </li>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </ul>

      {/* Modal for showing appointment details and handling confirmation/cancellation */}
      {selectedAppointment && (
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          appointment={selectedAppointment}
          onConfirm={() => handleConfirm(selectedAppointment._id)} // Pass the ID for confirmation
          onCancel={() => handleCancel(selectedAppointment._id)} // Pass the ID for cancellation
          loading={loading} // Pass loading state to the modal (if necessary)
        />
      )}
    </div>
  );
};

export default AppointmentsList;
