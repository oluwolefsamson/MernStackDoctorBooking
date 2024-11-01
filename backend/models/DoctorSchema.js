import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
    phone: { type: Number },

    ticketPrice: { type: Number },
    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor",
    },
    specialization: { type: String },
    qualifications: { type: Array, default: [] },
    experiences: { type: Array, default: [] },
    bio: { type: String, maxLength: 50 },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    about: { type: String },
    timeSlots: { type: Array, default: [] },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }
); // Automatically manages createdAt and updatedAt fields

export default mongoose.model("Doctor", DoctorSchema);
