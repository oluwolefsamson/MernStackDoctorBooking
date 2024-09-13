import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch all appointments on load
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/appointments"); // Adjust API path accordingly
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">Patient Name</th>
              <th className="px-4 py-2 border border-gray-300">Doctor Name</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Time Slot</th>
              <th className="px-4 py-2 border border-gray-300">Reason</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="border-t">
                <td className="px-4 py-2 border border-gray-300">
                  {appointment.patient.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {appointment.doctor.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(appointment.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {appointment.timeSlot}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {appointment.reason}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {appointment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagement;
