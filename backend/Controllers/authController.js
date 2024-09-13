import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Admin from "../models/AdminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

export const register = async (req, res) => {
  const {
    email,
    password,
    name,
    phone,
    gender,
    photo,
    ticketPrice,
    specialization,
    qualifications,
    experiences,
    bio,
    about,
    timeSlots,
    role,
    address,
  } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required",
      });
    }

    let existingUser = await User.findOne({ email });
    let existingDoctor = await Doctor.findOne({ email });
    let existingAdmin = await Admin.findOne({ email });

    if (existingUser || existingDoctor || existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "doctor") {
      const doctor = new Doctor({
        email,
        password: hashPassword,
        name,
        phone,
        photo,
        ticketPrice,
        specialization,
        qualifications,
        experiences,
        bio,
        about,
        timeSlots,
        role,
      });

      await doctor.save();
      return res
        .status(201)
        .json({ success: true, message: "Doctor successfully registered" });
    } else if (role === "patient") {
      const user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        role,
        gender,
        phone,
        address,
      });

      await user.save();
      return res
        .status(201)
        .json({ success: true, message: "User successfully registered" });
    } else if (role === "admin") {
      const admin = new Admin({
        email,
        password: hashPassword,
        // You can add additional fields if required
      });

      await admin.save();
      return res
        .status(201)
        .json({ success: true, message: "Admin successfully registered" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
  } catch (err) {
    console.error("Error registering user:", err);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ success: false, message: "Validation error: " + err.message });
    } else if (err.code && err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate key error: " + err.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error, try again later",
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === "doctor") {
      user = await Doctor.findOne({ email });
    } else if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
      data: userData,
      role: user.role,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
