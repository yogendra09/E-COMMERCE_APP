const mongoose = require('mongoose');

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
    default: false
  },
  status: {
    type: String,
    required: true,
    default: 'active',
    },
  imageUrl: {
    type: String,
    required: false,
    match:[/^(http|https):\/\/[^ "]+$/,"Invalid URL"]
  },
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
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
