const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  priceAtTime: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: [true, "Full name is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
      },
      phoneNumber: {
        type: Number,
        required: [true, "Phone Number is required"],
      },
      street: {
        type: String,
        required: [true, "Street is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      zipCode: {
        type: String,
        required: [true, "Enter Zip code"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit_card", "paypal", "cash_on_delivery"],
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed", "refunded"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    deliveryAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
