const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  gender: {
    type: String,
    trim: true,
    enum: ["men", "women", "unisex"],
    required: false,
  },
  size: {
    type: String,
    trim: true,
    enum: ["XS", "S", "M", "XL", "XXL"],
    required: false,
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  subCategory: {
    type: String,
    trim: true,
  },
  basePrice: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
  },
  currency: {
    type: String,
    default: "N",
  },
  discount: {
    percentage: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
    },
  },
  stock: {
    available: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  images: {
    type: [String],
    required: [true, "Please provide at least one image for this product"],
    validate: {
      validator: function (arr) {
        return arr && arr.length > 0;
      },
      message: "At least one image is required",
    },
  },
  description: {
    type: String,
    required: [true, "Description is a required field"],
  },
  shipping: {
    weight: { type: String },
    dimensions: { type: String },
    from: { type: String },
    options: [
      {
        method: { type: String },
        cost: { type: Number },
        estimated_days: { type: String },
      },
    ],
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
