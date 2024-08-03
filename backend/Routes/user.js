import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser); // GET method for fetching a single user
router.get("/", authenticate, restrict(["admin"]), getAllUser); // GET method for fetching all users
router.put("/:id", authenticate, restrict(["patient"]), updateUser); // PUT method for updating a user
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser); // DELETE method for deleting a user

export default router;
