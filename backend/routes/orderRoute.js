import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { authorizeAdmin, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/me").get(isAuthenticated, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeAdmin, getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeAdmin, updateOrder)
  .delete(isAuthenticated, authorizeAdmin, deleteOrder);

export default router;
