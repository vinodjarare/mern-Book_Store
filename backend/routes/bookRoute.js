import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/books").post(createBook).get(getAllBooks);
router.route("/books/:id").get(getBook).put(updateBook).delete(deleteBook);
export default router;
