import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  login,
  logout,
  myProfile,
  register,
  updateUser,
} from "../controllers/auth.js";
import { authorizeAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isAuthenticated, logout);
router.route("/me").get(isAuthenticated, myProfile);
router
  .route("/user/:id")
  .put(updateUser)
  .delete(deleteUser)
  .get(isAuthenticated, getUser);
router.route("/users").get(isAuthenticated, authorizeAdmin, getAllUser);

export default router;
