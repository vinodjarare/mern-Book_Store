import Order from "../models/orderModel.js";
import Book from "../models/bookModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncError } from "../middleware/error.js";
// Create new Order
export const newOrder = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
export const getSingleOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
export const myOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
export const getAllOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
export const updateOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.id, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const book = await Book.findById(id);

  book.stock -= quantity;

  await book.save({ validateBeforeSave: false });
}

// delete Order -- Admin
export const deleteOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

export const income = async (req, res) => {
  const date = new Date();
  const sixMonthsAgo = new Date(
    date.getFullYear(),
    date.getMonth() - 6,
    date.getDate()
  );

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
          paidAt: {
            $gte: sixMonthsAgo,
            $lt: date,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$paidAt" },
          totalIncome: { $sum: "$totalPrice" },
        },
      },
    ]);

    const stats = [];
    const monthMap = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    // Initialize stats array with 0 income for past 6 months
    for (let i = 0; i < 6; i++) {
      let date = new Date();
      let month = date.getMonth() - i;
      let year = date.getFullYear();

      if (month < 0) {
        month += 12;
        year -= 1;
      }
      let monthName = new Date(year, month).toLocaleString("en-US", {
        month: "long",
      });
      let id = month + 1;
      stats.unshift({ id, name: monthName, Total: 0 });
    }

    // Update stats array with income from orders
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < stats.length; j++) {
        if (orders[i]._id === stats[j].id) {
          stats[j].Total = orders[i].totalIncome;
        }
      }
    }

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
