import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }, // Optional
  phone: { type: Number }, // Optional
  photo: { type: String }, // Optional
  ticketPrice: { type: Number }, // Optional
  role: {
    type: String,
    enum: ["doctor"],
    default: "doctor",
  },

  // Fields for doctors only
  specialization: { type: String }, // Optional
  qualifications: {
    type: Array,
    default: [],
  },
  experiences: {
    type: Array,
    default: [],
  },
  bio: { type: String, maxLength: 50 }, // Optional
  about: { type: String }, // Optional
  timeSlots: { type: Array, default: [] },
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

  // New field for education
  education: [
    {
      institution: { type: String, required: true },
      startYear: { type: Number },
      endYear: { type: Number },
    },
  ],
});

export default mongoose.model("Doctor", DoctorSchema);
