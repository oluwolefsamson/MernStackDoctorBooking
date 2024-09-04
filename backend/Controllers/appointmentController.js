import Appointment from "../models/AppointmentSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Function to create an appointment
const createAppointment = async (
  patientId,
  doctorId,
  date,
  timeSlot,
  reason
) => {
  try {
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      reason,
    });

    const savedAppointment = await appointment.save();

    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { appointments: savedAppointment._id },
    });

    return savedAppointment;
  } catch (error) {
    throw error;
  }
};

// Controller function to handle appointment booking
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;
    const patientId = req.userId; // Assuming you have the logged-in patient's ID

    const appointment = await createAppointment(
      patientId,
      doctorId,
      date,
      timeSlot,
      reason
    );

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get doctor with appointments
export const getDoctorWithAppointments = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId)
      .populate("appointments")
      .exec();
    return doctor;
  } catch (error) {
    throw error;
  }
};
