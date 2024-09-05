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
    // Ensure the doctor exists
    const doctorExists = await Doctor.findById(doctorId);
    if (!doctorExists) {
      throw new Error("Doctor not found");
    }

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      reason,
    });

    const savedAppointment = await appointment.save();

    // Add appointment reference to the doctor's appointments array
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

    if (!doctorId || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Doctor ID, date, and time slot are required" });
    }

    const patientId = req.userId; // Assuming you have the logged-in patient's ID

    // Create appointment
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
    console.error("Error booking appointment:", error); // Log the error
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get doctor with appointments
export const getDoctorWithAppointments = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId)
      .populate("appointments")
      .exec();

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return doctor;
  } catch (error) {
    throw error;
  }
};
