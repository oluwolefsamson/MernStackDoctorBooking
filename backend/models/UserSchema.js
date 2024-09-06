import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, default: "" },
    role: {
      type: String,
      enum: ["patient"],
      default: "patient",
    },
    address: { type: String },
    phone: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

export default mongoose.model("User", UserSchema);
