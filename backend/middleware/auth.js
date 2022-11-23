import ErrorHandler from "../utils/errorHandler.js";
import { asyncError } from "./error.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const isAuthenticated = asyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "you are not logged in" });
  }
  const userToken = jwt.verify(token, process.env.JWT);
  req.user = await User.findById(userToken.id);
  next();
});

export const authorizeAdmin = (req, res, next) => {
  if (req.user.isAdmin !== true) {
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next();
};
