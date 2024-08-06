import Doctor from "../models/DoctorSchema.js";

// Update a doctor by ID
export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Ensure that the update respects schema validations
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

// Get all approved doctors with optional search query
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

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
