import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to the patient
  doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true }, // Reference to the doctor
  date: { type: Date, required: true }, // Date of the appointment
  timeSlot: { type: String, required: true }, // Time slot of the appointment
  reason: { type: String }, // Reason for the appointment
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending", // Default status is pending
  },
});

export default mongoose.model("Appointment", AppointmentSchema);
