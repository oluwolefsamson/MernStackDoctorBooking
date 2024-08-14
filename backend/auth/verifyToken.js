import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

// Middleware to authenticate user based on JWT
export const authenticate = async (req, res, next) => {
  // Extract token from Authorization header
  const authToken = req.headers.authorization;

  // Validate token presence and format
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authentication denied" });
  }

  try {
    // Extract token from header
    const token = authToken.split(" ")[1];
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user details to request object
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    // Handle different token errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is Expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Middleware to restrict access based on user roles
export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  // Ensure user ID is available
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "User ID is not available" });
  }

  let user;

  // Fetch user from User collection, then Doctor collection
  user = await User.findById(userId);
  if (!user) {
    user = await Doctor.findById(userId);
  }

  // Handle user not found
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Check if user's role is permitted
  if (!roles.includes(user.role)) {
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });
  }

  next();
};
