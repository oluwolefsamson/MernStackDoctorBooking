import express from "express";
import { createBooking } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/book", authenticate, restrict, createBooking);

export default router;
