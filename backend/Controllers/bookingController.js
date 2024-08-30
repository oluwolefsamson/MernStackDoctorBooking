import Booking from "../models/BookingSchema.js";

export const createBooking = async (req, res) => {
  try {
    const { doctorId, ticketPrice, appointmentDate } = req.body;
    const userId = req.user.id; // Assuming you have user information from authentication middleware

    const newBooking = new Booking({
      doctor: doctorId,
      user: userId,
      ticketPrice,
      appointmentDate,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
