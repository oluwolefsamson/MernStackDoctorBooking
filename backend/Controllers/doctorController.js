import Doctor from "../models/DoctorSchema.js";

// Update a doctor by ID
export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      error: err.message,
    });
  }
};

// Delete a doctor by ID
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deletedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
      error: err.message,
    });
  }
};

// Get a single doctor by ID
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password"); // Exclude sensitive fields

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor",
      error: err.message,
    });
  }
};

// Get all doctors with optional search query and status filter
export const getAllDoctor = async (req, res) => {
  try {
    // Check for an optional status filter (approved or pending)
    const { status } = req.query;
    const query = status ? { isApproved: status } : {}; // Use status if provided, otherwise fetch all

    const doctors = await Doctor.find(query).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors",
      error: err.message,
    });
  }
};

// Update doctor time slots
export const updateTimeSlots = async (req, res) => {
  const { doctorId } = req.params;
  const { timeSlots } = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { timeSlots },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("Error updating time slots:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDoctorCount = async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor count" });
  }
};

// In doctorController.js
export const approveOrDeclineDoctor = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expect 'approved' or 'cancelled' from the request body

  if (!["approved", "cancelled"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status. Allowed values are 'approved' or 'cancelled'.",
    });
  }

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { isApproved: status },
      { new: true }
    );

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: `Doctor has been ${status}`,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update approval status",
      error: error.message,
    });
  }
};
