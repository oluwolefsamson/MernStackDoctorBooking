import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }, // Not required
  phone: { type: Number }, // Not required
  photo: { type: String }, // Not required
  ticketPrice: { type: Number }, // Not required
  role: {
    type: String,
    enum: ["doctor"],
    default: "doctor",
  },

  // Fields for doctors only
  specialization: { type: String }, // Not required
  qualifications: {
    type: Array,
    default: [], // Provide default empty array if needed
  },

  experiences: {
    type: Array,
    default: [], // Provide default empty array if needed
  },

  bio: { type: String, maxLength: 50 }, // Not required
  about: { type: String }, // Not required
  timeSlots: { type: Array, default: [] }, // Provide default empty array if needed
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
