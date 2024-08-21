import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
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
  const { email, password, name, role, photo, gender } = req.body;

  try {
    // Check if the email already exists in the User collection
    let user = await User.findOne({ email });

    // Check if the email already exists in the Doctor collection
    let doctor = await Doctor.findOne({ email });

    // If the email exists in either collection, return an error response
    if (user || doctor) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashPassword,
      photo,
      gender,
      role,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error, try again later",
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body; // Include role in request payload

  try {
    // Attempt to find the user based on email
    let user;
    if (role === "doctor") {
      user = await Doctor.findOne({ email });
    } else if (role === "patient") {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // Generate JWT token for authenticated user
    const token = generateToken(user);
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: userData,
      role: user.role,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ status: false, message: "Login failed" });
  }
};
