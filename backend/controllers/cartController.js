import Cart from "../models/cartModel.js";
import { asyncError } from "../middleware/error.js";
import ErrorHandler from "../utils/errorHandler.js";

export const insertCart = asyncError(async (req, res, next) => {
  const cart = await Cart.findOne({
    $and: [{ book: req.params.id }, { user: req.user._id }],
  });

  if (cart) {
    return res.status(400).json({ message: "Item already in the cart" });
  }
  req.body.user = req.user._id;
  req.body.book = req.params.id;
  const book = new Cart(req.body);
  book.save();
  res.status(201).json({
    book,
  });
});

export const updateCart = asyncError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  console.log(req.params.id, req.body);
  if (!cart) {
    return next(new ErrorHandler("Item not found", 404));
  }
  const book = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    success: true,
    book,
  });
});

export const deleteCart = asyncError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new ErrorHandler("Item not found", 404));
  }
  const book = await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "cart item deleted successfully",
  });
});

export const getCartItems = asyncError(async (req, res, next) => {
  const cart = await Cart.find(req.user._id).populate(
    "book",
    "name auther price cover stock"
  );
  res.status(200).json({
    success: true,
    cart,
  });
});
