import Book from "../models/bookModel.js";
import { asyncError } from "../middleware/error.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import ApiFeatures from "../utils/apiFeatures.js";
export const createBook = asyncError(async (req, res, next) => {
  // req.body.user = req.user._id;
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "covers",
    width: 150,
    crop: "scale",
  });
  const book = await Book.create({
    ...req.body,
    cover: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  // console.log(req.user._id);
  // console.log(req.body);
  res.status(201).json({
    success: true,
    message: "Book has been created successfully",
  });
});

export const getAllBooks = asyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const booksCount = await Book.countDocuments();

  const apiFeature = new ApiFeatures(Book.find(), req.query).search().filter();

  let books = await apiFeature.query;
  let filteredbooksCount = books.length;

  apiFeature.pagination(resultPerPage);

  books = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    books,
    booksCount,
    resultPerPage,
    filteredbooksCount,
  });
});

export const getBook = asyncError(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    book,
  });
});

export const updateBook = asyncError(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  await cloudinary.v2.uploader.destroy(book.cover.public_id);

  const imagesLink = {};

  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "covers",
  });

  imagesLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.image = imagesLink;

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    book,
  });
});

export const deleteBook = asyncError(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  await cloudinary.v2.uploader.destroy(book.cover.public_id);
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});
