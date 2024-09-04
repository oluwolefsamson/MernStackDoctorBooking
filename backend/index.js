import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import appointmentRoute from "./Routes/appointment.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: [
    "https://mern-stack-doctor-booking.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["POST", "OPTIONS", "GET", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/appointments", appointmentRoute);

app.get("/", (req, res) => {
  res.send("API is working");
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB database is connected");
  } catch (err) {
    console.error("MongoDB database connection failed:", err);
    process.exit(1);
  }
};

// Start server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
