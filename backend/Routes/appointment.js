import express from "express";
import {
  bookAppointment,
  getDoctorWithAppointments,
} from "../Controllers/appointmentController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Route to book an appointment
router.post("/book", authenticate, bookAppointment);

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
