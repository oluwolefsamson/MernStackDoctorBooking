import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check if token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authentication denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is Expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "User ID is not available" });
  }

  let user;
  user = await User.findById(userId);
  if (!user) {
    user = await Doctor.findById(userId);
  }

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (!roles.includes(user.role)) {
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });
  }

  next();
};
