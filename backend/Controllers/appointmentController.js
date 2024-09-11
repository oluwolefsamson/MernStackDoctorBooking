import Appointment from "../models/AppointmentSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Function to create an appointment
const createAppointment = async (
  name,
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
      name,
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

    // Add appointment reference to the patient appointments array
    await User.findByIdAndUpdate(patientId, {
      $push: { appointments: savedAppointment._id },
    });

    return savedAppointment;
  } catch (error) {
    console.error("Error creating appointment:", error.message);
    throw error;
  }
};

// Controller function to handle appointment booking
export const bookAppointment = async (req, res) => {
  try {
    const { name, doctorId, date, timeSlot, reason } = req.body;

    if (!doctorId || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Doctor ID, date, and time slot are required" });
    }

    const patientId = req.userId; // Assuming you have the logged-in patient's ID

    // Create appointment
    const appointment = await createAppointment(
      name,
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
    console.error("Error booking appointment:", error.message);
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
    console.error("Error fetching doctor with appointments:", error.message);
    throw error;
  }
};

// Function to update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid appointment status" });
    }

    // Update appointment
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true } // Return updated document
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment status not found" });
    }

    res.status(200).json({
      message: `Appointment ${status} successfully`,
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
