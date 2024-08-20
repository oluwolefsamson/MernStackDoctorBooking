import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, default: "" }, // Changed to String and added default value
  photo: { type: String, default: "" }, // Added default value
  ticketPrice: { type: Number, default: 0 }, // Added default value
  role: {
    type: String,
    enum: ["doctor"], // Ensure role is only "doctor" for this schema
    default: "doctor", // Added default value
  },

  // Fields for doctors only
  specialization: { type: String, default: "" }, // Added default value
  qualifications: {
    type: [String], // Ensures qualifications is an array of strings
    default: [], // Added default value
  },
  experiences: {
    type: [String], // Ensures experiences is an array of strings
    default: [], // Added default value
  },
  bio: { type: String, maxLength: 500, default: "" }, // Increased maxLength and added default value
  about: { type: String, default: "" }, // Added default value
  timeSlots: { type: [String], default: [] }, // Ensures timeSlots is an array of strings and added default value
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", DoctorSchema);
