import express from "express";
import {
  deleteCart,
  getCartItems,
  insertCart,
  updateCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/cart/:id").post(isAuthenticated, insertCart);
router
  .route("/cart/:id")
  .put(isAuthenticated, updateCart)
  .delete(isAuthenticated, deleteCart);
router.route("/cart").get(isAuthenticated, getCartItems);
export default router;
