const mongoose = require("mongoose");
const { type } = require("os");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

// const reviewSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const commentSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    brand: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    description: {
      type: String,
      required: true,
      default: "This is a sample description",
    },
    comments: [commentSchema],
    rating: { type: Number, required: true, default: 3 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
