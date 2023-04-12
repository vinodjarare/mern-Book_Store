import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookController.js";
import { authorizeAdmin, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/books")
  .post(isAuthenticated, authorizeAdmin, createBook)
  .get(getAllBooks);
router
  .route("/books/:id")
  .get(getBook)
  .put(isAuthenticated, authorizeAdmin, updateBook)
  .delete(isAuthenticated, authorizeAdmin, deleteBook);
export default router;
