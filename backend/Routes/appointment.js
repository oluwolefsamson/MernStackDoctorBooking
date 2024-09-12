import express from "express";
import {
  bookAppointment,
  getDoctorWithAppointments,
  updateAppointmentStatus,
  getUserProfile,
} from "../Controllers/appointmentController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

// Route to book an appointment
router.post("/book", authenticate, bookAppointment);

// Route to change appointment status
router.patch("/:appointmentId/status", updateAppointmentStatus);

// Route to get user profile including appointments
// router.get("/:id/appointments", getUserProfile);
router.get("/users/:userId/appointments", getUserProfile);

// Route to get a doctor with their appointments
router.get("/doctor/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await getDoctorWithAppointments(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
