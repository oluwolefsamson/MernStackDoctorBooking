import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateTimeSlots,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor); // GET method for fetching a single user
router.get("/", getAllDoctor); // GET method for fetching all users
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor); // PUT method for updating a user
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor); // DELETE method for deleting a user
router.patch(
  "/:id/time-slots",
  authenticate,
  restrict(["doctor"]),
  updateTimeSlots
); //Update Timeslot
export default router;
