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
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
dotenv.config();

//setting up socket.io

const server = http.createServer(app);

export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A new client connected");

  // emit a welcome message to the client
  socket.emit("message", "Welcome to my Socket.io server!");

  // listen for new_order and order_status_update events and broadcast them to all connected clients
  socket.on("new_order", (order) => {
    console.log("New order:", order);
    socket.broadcast.emit("new_order", order);
  });

  socket.on("order_status_update", (order) => {
    console.log("Order status update:", order);
    socket.broadcast.emit("order_status_update", order);
  });
});

const port = process.env.PORT || 4000;

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
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shuting down the server due to Uncaught Exception`);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
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
