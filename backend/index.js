import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDatabase from "./db.js";
import authRoute from "./routes/auth.js";
import bookRoute from "./routes/bookRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cartRoute from "./routes/cartRoute.js";
import paymentRoute from "./routes/payment.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";
const app = express();
dotenv.config();

//Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser({ limit: "50mb" }));
app.use(cors());

//setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//connect to the database
connectDatabase();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", paymentRoute);

//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shuting down the server due to Uncaught Exception`);
  process.exit(1);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shuting down the server due to Unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

//Error Middleware
app.use(errorMiddleware);
