const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  category: {
    type: String,
    required: false,
    trim: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  ratings: [{
    type: Number,
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    default: 0,
    min: [0, "Ratings cannot be less than 0"],
    max: [5, "Ratings cannot be more than 5"],
  }],
  images: [
    {
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
      alt: {
        type: String,
        default: "Product image",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before saving
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
