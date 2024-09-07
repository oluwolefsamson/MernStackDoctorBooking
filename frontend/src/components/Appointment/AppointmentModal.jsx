import React from "react";

const AppointmentModal = ({
  isOpen,
  onClose,
  appointment,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
        <p>
          <strong>Date: </strong>
          {isNaN(new Date(appointment.date))
            ? "Invalid Date"
            : new Date(appointment.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Reason: </strong> {appointment.reason || "Not Provided"}
        </p>
        <p>
          <strong>Status: </strong> {appointment.status || "Not Provided"}
        </p>

        <div className="mt-4 space-x-2">
          <button
            onClick={() => onConfirm(appointment._id)} // Confirm the appointment
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={() => onCancel(appointment._id)} // Cancel the appointment
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentModal;
