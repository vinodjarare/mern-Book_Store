import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    auther: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    price: {
      type: Number,
      required: true,
      maxLength: [5, "price should not more than 5 digit"],
    },
    categary: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Plese Enter the Product Stock"],
      maxLength: [4, "can not exceed 4 digit"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
