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
    let user = await User.findOne({ email });

    // Check if user exists
    if (user) {
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
  const { email, password } = req.body;

  try {
    // Combined lookup
    const user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

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
