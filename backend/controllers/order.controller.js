const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createOrder = asyncErrorHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product"
  );

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Cart is empty",
    });
  }

  for (item of cart.items) {
    const product = await Product.findById(item.product._id);
    if (product.stock < item.quantity) {
      return res.status(400).json({
        status: "fail",
        message: `${product.name} is out of stock`,
      });
    }
  }

  const { fullName, email, phoneNumber, country, city, state, zipCode } =
    req.body;
  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !country ||
    !city ||
    !state ||
    !zipCode
  ) {
    return res.status(400).json({
      status: "fail",
      message: "All shipping address fields are required.",
    });
  }

  const shippingAddress = {
    fullName,
    email,
    phoneNumber,
    country,
    city,
    state,
    zipCode,
  };

 
  let grandTotal = cart.grandTotal;
  if (!grandTotal || grandTotal === 0) {
    grandTotal =
      cart.totalPrice ||
      cart.items.reduce((sum, i) => sum + i.priceAtTime * i.quantity, 0);
  }

  const order = await Order.create({
    user: req.user.id,
    items: cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
      priceAtTime: i.priceAtTime,
    })),
    totalQuantity: cart.totalQuantity,
    totalPrice: cart.totalPrice,
    grandTotal,
    shippingAddress,
    paymentMethod: req.body.paymentMethod || "credit_card",
  });

  await Cart.findByIdAndDelete(cart._id);

  res.status(200).json({
    status: "succcess",
    data: {
      order,
    },
  });
});

const getMyOrders = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findOne({ user: req.user._id }).sort("-createdAt");
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

const getAllOrders = asyncErrorHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Admin access required",
    });
  }
  const orders = await Order.find()
    .populate("user", "name email")
    .sort("-createdAt");
  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

// @desc    Admin: Update order status
// @route   PATCH /api/admin/orders/:id
const updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({
      status: "fail",
      message: "Order not found",
    });
  }

  const allowedStatuses = ["processing", "shipped", "delivered", "cancelled"];
  if (!allowedStatuses.includes(req.body.orderStatus)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid status",
    });
  }
  order.orderStatus = req.body.orderStatus;
  if (req.body.orderStatus === "delivered") order.deliveredAt = Date.now();
  if (req.body.isPaid) order.isPaid = true;

  await order.save();
  res.status(200).json({
    status: "success",
    data: { order },
  });
});

module.exports = { createOrder, getMyOrders, updateOrderStatus };
